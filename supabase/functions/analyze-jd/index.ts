import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyzeJDRequest {
  jobDescription: string;
}

interface FitAssessment {
  verdict: 'strong_fit' | 'worth_conversation' | 'probably_not';
  headline: string;
  opening: string;
  gaps: string[];
  transfers: string[];
  recommendation: string;
}

interface CandidateContext {
  profile: any;
  experiences: any[];
  skills: any[];
  gaps: any[];
  instructions: any[];
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { jobDescription }: AnalyzeJDRequest = await req.json();

    if (!jobDescription) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: jobDescription' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables');
    }

    if (!openaiApiKey) {
      throw new Error('Missing OpenAI API key');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all candidate context
    const context: CandidateContext = {
      profile: null,
      experiences: [],
      skills: [],
      gaps: [],
      instructions: [],
    };

    // Get candidate profile (assuming first/only profile)
    const { data: profile } = await supabase
      .from('candidate_profile')
      .select('*')
      .limit(1)
      .single();

    if (profile) {
      context.profile = profile;
      const candidateId = profile.id;

      // Fetch experiences
      const { data: experiences } = await supabase
        .from('experiences')
        .select('*')
        .eq('candidate_id', candidateId)
        .order('display_order', { ascending: true });

      if (experiences) context.experiences = experiences;

      // Fetch skills
      const { data: skills } = await supabase
        .from('skills')
        .select('*')
        .eq('candidate_id', candidateId);

      if (skills) context.skills = skills;

      // Fetch gaps/weaknesses
      const { data: gaps } = await supabase
        .from('gaps_weaknesses')
        .select('*')
        .eq('candidate_id', candidateId);

      if (gaps) context.gaps = gaps;

      // Fetch AI instructions
      const { data: instructions } = await supabase
        .from('ai_instructions')
        .select('*')
        .eq('candidate_id', candidateId)
        .order('priority', { ascending: false });

      if (instructions) context.instructions = instructions;
    }

    // Build system prompt for JD analysis
    const systemPrompt = buildJDPrompt(context);

    // Call OpenAI API with JSON response format
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please analyze this job description:\n\n${jobDescription}` },
        ],
        temperature: 0.3,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'fit_assessment',
            strict: true,
            schema: {
              type: 'object',
              properties: {
                verdict: {
                  type: 'string',
                  enum: ['strong_fit', 'worth_conversation', 'probably_not'],
                  description: 'Overall fit verdict based on alignment with requirements',
                },
                headline: {
                  type: 'string',
                  description: 'A brief, punchy summary of the fit assessment (max 100 chars)',
                },
                opening: {
                  type: 'string',
                  description: 'Opening statement acknowledging the role and initial impression (2-3 sentences)',
                },
                gaps: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of specific requirements or qualifications the candidate does NOT meet. Be honest and specific.',
                },
                transfers: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of transferable skills or experiences that could compensate for gaps',
                },
                recommendation: {
                  type: 'string',
                  description: 'Final recommendation to the recruiter - be direct about whether this is worth pursuing (3-4 sentences)',
                },
              },
              required: ['verdict', 'headline', 'opening', 'gaps', 'transfers', 'recommendation'],
              additionalProperties: false,
            },
          },
        },
      }),
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const openaiData = await openaiResponse.json();
    const assessment: FitAssessment = JSON.parse(openaiData.choices[0].message.content);

    // Store the assessment in the database
    if (context.profile) {
      await supabase.from('fit_assessments').insert({
        profile_id: context.profile.id,
        assessor_email: 'ai-system',
        overall_fit_score: verdictToScore(assessment.verdict),
        strengths: assessment.transfers,
        concerns: assessment.gaps,
        notes: `${assessment.headline}\n\n${assessment.opening}\n\n${assessment.recommendation}`,
      });
    }

    // Return assessment
    return new Response(
      JSON.stringify(assessment),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-jd function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function verdictToScore(verdict: string): number {
  switch (verdict) {
    case 'strong_fit':
      return 5;
    case 'worth_conversation':
      return 3;
    case 'probably_not':
      return 1;
    default:
      return 3;
  }
}

function buildJDPrompt(context: CandidateContext): string {
  const { profile, experiences, skills, gaps, instructions } = context;

  let prompt = `You are an expert technical recruiter conducting a brutally honest assessment of ${profile?.name || 'a candidate'}'s fit for a job description.

**CRITICAL INSTRUCTION - BRUTAL HONESTY REQUIRED:**
Your assessment must be completely transparent about the candidate's weaknesses and gaps. Do NOT sugarcoat or minimize missing requirements. If the candidate lacks critical skills or experience, you MUST highlight this clearly. The recruiter needs accurate, unvarnished information to make good decisions.

However, also be fair - acknowledge genuine strengths and transferable skills where they exist. But do NOT oversell the candidate. Base ALL assessments ONLY on the factual information provided below.

**VERDICT GUIDELINES:**
- "strong_fit": Only use if the candidate meets MOST key requirements and has relevant experience
- "worth_conversation": Use if there are some gaps but enough transferable skills to warrant a conversation
- "probably_not": Use if critical requirements are missing OR there are significant experience gaps

**ASSESSMENT STRUCTURE:**
You will return a JSON object with these fields:
- verdict: One of "strong_fit", "worth_conversation", or "probably_not"
- headline: Brief punchy summary (max 100 chars)
- opening: 2-3 sentences setting context
- gaps: Array of specific missing requirements/skills
- transfers: Array of transferable skills/experiences
- recommendation: 3-4 sentences with final verdict

`;

  // Add profile information
  if (profile) {
    prompt += `**CANDIDATE PROFILE:**
Name: ${profile.name}
Title: ${profile.title || 'N/A'}
Headline: ${profile.headline || 'N/A'}
Summary: ${profile.summary || 'N/A'}
Location: ${profile.location || 'N/A'}
Email: ${profile.email || 'N/A'}
LinkedIn: ${profile.linkedin_url || 'N/A'}
GitHub: ${profile.github_url || 'N/A'}
Availability: ${profile.availability_status || 'N/A'}

`;
  }

  // Add experiences
  if (experiences.length > 0) {
    prompt += `**WORK EXPERIENCE:**
`;
    experiences.forEach((exp, i) => {
      prompt += `${i + 1}. ${exp.title} at ${exp.company_name}
   Location: ${exp.location || 'N/A'}
   Dates: ${exp.started_on} - ${exp.is_current ? 'Present' : exp.finished_on}
   Description: ${exp.description || 'N/A'}
`;

      if (exp.why_joined) prompt += `   Why Joined: ${exp.why_joined}\n`;
      if (exp.why_left) prompt += `   Why Left: ${exp.why_left}\n`;
      if (exp.actual_contributions) prompt += `   Actual Contributions: ${exp.actual_contributions}\n`;
      if (exp.proudest_achievement) prompt += `   Proudest Achievement: ${exp.proudest_achievement}\n`;
      if (exp.challenges_faced) prompt += `   Challenges Faced: ${exp.challenges_faced}\n`;
      if (exp.lessons_learned) prompt += `   Lessons Learned: ${exp.lessons_learned}\n`;
      prompt += '\n';
    });
  }

  // Add skills
  if (skills.length > 0) {
    prompt += `**SKILLS ASSESSMENT:**
`;

    const strongSkills = skills.filter(s => s.category === 'strong');
    const moderateSkills = skills.filter(s => s.category === 'moderate');
    const gapSkills = skills.filter(s => s.category === 'gap');

    if (strongSkills.length > 0) {
      prompt += `Strong Skills (well-established, proven):
`;
      strongSkills.forEach(skill => {
        prompt += `  - ${skill.skill_name}`;
        if (skill.evidence) prompt += ` (Evidence: ${skill.evidence})`;
        if (skill.honest_notes) prompt += ` | Note: ${skill.honest_notes}`;
        prompt += `\n`;
      });
      prompt += `\n`;
    }

    if (moderateSkills.length > 0) {
      prompt += `Moderate Skills (some experience, not expert):
`;
      moderateSkills.forEach(skill => {
        prompt += `  - ${skill.skill_name}`;
        if (skill.evidence) prompt += ` (Evidence: ${skill.evidence})`;
        if (skill.honest_notes) prompt += ` | Note: ${skill.honest_notes}`;
        prompt += `\n`;
      });
      prompt += `\n`;
    }

    if (gapSkills.length > 0) {
      prompt += `Skill Gaps (limited or no experience):
`;
      gapSkills.forEach(skill => {
        prompt += `  - ${skill.skill_name}`;
        if (skill.honest_notes) prompt += ` | Note: ${skill.honest_notes}`;
        prompt += `\n`;
      });
      prompt += `\n`;
    }
  }

  // Add gaps and weaknesses
  if (gaps.length > 0) {
    prompt += `**KNOWN GAPS & WEAKNESSES:**
`;
    gaps.forEach((gap, i) => {
      prompt += `${i + 1}. ${gap.gap_type || 'Gap'}
   Description: ${gap.description}
   Why it's a gap: ${gap.why_its_a_gap}

`;
    });
  }

  // Add AI instructions
  if (instructions.length > 0) {
    prompt += `**ADDITIONAL INSTRUCTIONS:**
`;
    instructions.forEach((inst) => {
      prompt += `- [${inst.instruction_type}] ${inst.instruction}\n`;
    });
    prompt += `\n`;
  }

  prompt += `**ANALYSIS GUIDELINES:**
1. Compare JD requirements AGAINST the candidate's actual skills/experience
2. Be explicit about requirements the candidate does NOT meet in the "gaps" array
3. Identify transferable skills that could compensate in the "transfers" array
4. The "verdict" should reflect honest overall alignment - be conservative
5. In "recommendation", give the recruiter a clear yes/no with reasoning
6. Never assume capabilities beyond what's documented above
7. If critical requirements are missing, say so directly
`;

  return prompt;
}
