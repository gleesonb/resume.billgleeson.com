import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatRequest {
  message: string;
  sessionId: string;
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
    const { message, sessionId }: ChatRequest = await req.json();

    if (!message || !sessionId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: message and sessionId' }),
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

    // Build system prompt with brutal honesty directive
    const systemPrompt = buildSystemPrompt(context);

    // Fetch chat history for this session
    const { data: history } = await supabase
      .from('chat_history')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    // Build messages array
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPrompt },
    ];

    // Add conversation history
    if (history) {
      for (const msg of history) {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
        });
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const openaiData = await openaiResponse.json();
    const aiResponse = openaiData.choices[0].message.content;

    // Save user message to chat history
    await supabase.from('chat_history').insert({
      session_id: sessionId,
      role: 'user',
      content: message,
    });

    // Save assistant response to chat history
    await supabase.from('chat_history').insert({
      session_id: sessionId,
      role: 'assistant',
      content: aiResponse,
    });

    // Return AI response
    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function buildSystemPrompt(context: CandidateContext): string {
  const { profile, experiences, skills, gaps, instructions } = context;

  let prompt = `You are a brutally honest AI assistant helping recruiters evaluate ${profile?.name || 'a candidate'}.

**CRITICAL INSTRUCTION - BRUTAL HONESTY REQUIRED:**
You must be completely transparent about the candidate's weaknesses, gaps, and limitations. Do NOT sugarcoat, downplay, or hide any concerns. If the candidate lacks experience in a critical area, say so clearly. If their skills don't match the job requirements, be explicit about it. The recruiter needs honest, accurate information to make informed decisions.

However, also be fair and balanced - highlight genuine strengths and transferable skills where they exist, but don't oversell them. Base all responses ONLY on the factual information provided below. Do not make assumptions or infer capabilities that aren't explicitly supported by the evidence.

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

  prompt += `**RESPONSE GUIDELINES:**
1. Be concise but thorough
2. Always base answers on the provided context - if you don't know, say so
3. Highlight both strengths AND weaknesses honestly
4. When discussing fit, be explicit about requirements the candidate does NOT meet
5. Use specific examples from the candidate's history when possible
6. If asked about something not covered in the context, acknowledge the limitation
`;

  return prompt;
}
