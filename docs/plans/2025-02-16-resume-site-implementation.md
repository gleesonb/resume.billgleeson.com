# Resume.billgleeson.com Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an AI-powered portfolio website with brutally honest fit assessment that deploys to GitHub Pages with Supabase backend.

**Architecture:** React + Vite frontend on GitHub Pages, Supabase PostgreSQL + Edge Functions for AI chat/JD analysis, OpenAI API for LLM.

**Tech Stack:** React, Vite, TypeScript, Tailwind CSS, Supabase, OpenAI API, Node.js for import scripts

---

## Task 1: Initialize Frontend Project

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/vite.config.ts`
- Create: `frontend/tsconfig.json`
- Create: `frontend/tailwind.config.js`
- Create: `frontend/src/main.tsx`
- Create: `frontend/index.html`
- Create: `frontend/.env.example`

**Step 1: Create package.json**

Create `frontend/package.json`:

```json
{
  "name": "resume-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.17.0",
    "@supabase/supabase-js": "^2.39.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

**Step 2: Create Vite config for GitHub Pages**

Create `frontend/vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

**Step 3: Create TypeScript config**

Create `frontend/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Step 4: Create tsconfig.node.json**

Create `frontend/tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

**Step 5: Create Tailwind config**

Create `frontend/tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        card: '#141414',
        'card-hover': '#1a1a1a',
        'accent-teal': '#4ade80',
        'accent-amber': '#d4a574',
        'text-secondary': '#a1a1aa',
        border: '#27272a',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**Step 6: Create PostCSS config**

Create `frontend/postcss.config.js`:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Step 7: Create index.html**

Create `frontend/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bill Gleeson - FinOps & AI Strategist</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 8: Create main.tsx**

Create `frontend/src/main.tsx`:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Step 9: Create index.css**

Create `frontend/src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-white font-body;
  }
}
```

**Step 10: Create App.tsx skeleton**

Create `frontend/src/App.tsx`:

```typescript
export default function App() {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-heading text-accent-teal">Resume Site Loading...</h1>
    </div>
  )
}
```

**Step 11: Create .env.example**

Create `frontend/.env.example`:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Step 12: Install dependencies and verify**

Run:
```bash
cd frontend
npm install
npm run dev
```

Expected: Vite dev server starts at http://localhost:5173

**Step 13: Commit**

```bash
git add frontend/
git commit -m "feat: initialize React + Vite frontend with Tailwind CSS"
```

---

## Task 2: Create Supabase Client and Types

**Files:**
- Create: `frontend/src/lib/supabase.ts`
- Create: `frontend/src/types/index.ts`

**Step 1: Create Supabase client**

Create `frontend/src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Step 2: Create TypeScript types**

Create `frontend/src/types/index.ts`:

```typescript
export interface CandidateProfile {
  id: string
  name: string
  email?: string
  title?: string
  headline?: string
  summary?: string
  location?: string
  github_url?: string
  linkedin_url?: string
  availability_status?: string
}

export interface Experience {
  id: string
  company_name: string
  title: string
  description?: string
  location?: string
  started_on: string
  finished_on?: string
  is_current: boolean

  // AI context (private)
  why_joined?: string
  why_left?: string
  actual_contributions?: string
  proudest_achievement?: string
  challenges_faced?: string
  lessons_learned?: string
}

export interface Skill {
  id: string
  skill_name: string
  category: 'strong' | 'moderate' | 'gap'
  evidence?: string
  honest_notes?: string
}

export interface Certification {
  id: string
  name: string
  url?: string
  authority?: string
  started_on?: string
  finished_on?: string
}

export interface GapWeakness {
  id: string
  gap_type: string
  description: string
  why_its_a_gap?: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface FitAssessment {
  verdict: 'strong_fit' | 'worth_conversation' | 'probably_not'
  headline: string
  opening: string
  gaps: Array<{
    requirement: string
    gap_title: string
    explanation: string
  }>
  transfers: string
  recommendation: string
}
```

**Step 3: Commit**

```bash
git add frontend/src/lib/ frontend/src/types/
git commit -m "feat: add Supabase client and TypeScript types"
```

---

## Task 3: Create Database Schema

**Files:**
- Create: `supabase/schema.sql`

**Step 1: Write complete schema**

Create `supabase/schema.sql`:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Candidate profile (single row - it's Bill's site)
CREATE TABLE candidate_profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  title TEXT,
  headline TEXT,
  summary TEXT,
  location TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  availability_status TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Work experiences
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID REFERENCES candidate_profile(id),
  company_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  started_on DATE,
  finished_on DATE,
  is_current BOOLEAN DEFAULT FALSE,

  -- Private AI context
  why_joined TEXT,
  why_left TEXT,
  actual_contributions TEXT,
  proudest_achievement TEXT,
  challenges_faced TEXT,
  lessons_learned TEXT,

  display_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Skills with self-assessment
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID REFERENCES candidate_profile(id),
  skill_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('strong', 'moderate', 'gap')),
  evidence TEXT,
  honest_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Certifications
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID REFERENCES candidate_profile(id),
  name TEXT NOT NULL,
  url TEXT,
  authority TEXT,
  started_on DATE,
  finished_on DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Gaps and weaknesses
CREATE TABLE gaps_weaknesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID REFERENCES candidate_profile(id),
  gap_type TEXT,
  description TEXT NOT NULL,
  why_its_a_gap TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI behavior instructions
CREATE TABLE ai_instructions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID REFERENCES candidate_profile(id),
  instruction_type TEXT,
  instruction TEXT NOT NULL,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chat history
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_experiences_candidate ON experiences(candidate_id);
CREATE INDEX idx_skills_candidate ON skills(candidate_id);
CREATE INDEX idx_certifications_candidate ON certifications(candidate_id);
CREATE INDEX idx_gaps_candidate ON gaps_weaknesses(candidate_id);
CREATE INDEX idx_chat_session ON chat_history(session_id);

-- Row Level Security policies
ALTER TABLE candidate_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE gaps_weaknesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_instructions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Public read access for profile, experiences, skills, certifications
CREATE POLICY "Public profile read" ON candidate_profile FOR SELECT USING (true);
CREATE POLICY "Public experiences read" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public skills read" ON skills FOR SELECT USING (true);
CREATE POLICY "Public certifications read" ON certifications FOR SELECT USING (true);

-- Service role can write everything
CREATE POLICY "Service insert" ON candidate_profile FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update" ON candidate_profile FOR UPDATE USING (true);
CREATE POLICY "Service insert experiences" ON experiences FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update experiences" ON experiences FOR UPDATE USING (true);
CREATE POLICY "Service insert skills" ON skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update skills" ON skills FOR UPDATE USING (true);
CREATE POLICY "Service insert certifications" ON certifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Service insert gaps" ON gaps_weaknesses FOR INSERT WITH CHECK (true);
CREATE POLICY "Service insert instructions" ON ai_instructions FOR INSERT WITH CHECK (true);
CREATE POLICY "Service insert chat" ON chat_history FOR INSERT WITH CHECK (true);
```

**Step 2: Commit**

```bash
git add supabase/
git commit -m "feat: add Supabase database schema"
```

---

## Task 4: Create LinkedIn Import Script

**Files:**
- Create: `scripts/import-linkedin/package.json`
- Create: `scripts/import-linkedin/index.ts`
- Create: `scripts/import-linkedin/tsconfig.json`

**Step 1: Create package.json**

Create `scripts/import-linkedin/package.json`:

```json
{
  "name": "import-linkedin",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "csv-parse": "^5.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

**Step 2: Create tsconfig.json**

Create `scripts/import-linkedin/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": ".",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["*.ts"]
}
```

**Step 3: Create import script**

Create `scripts/import-linkedin/index.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'
import { parse } from 'csv-parse/sync'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY must be set')
}

const supabase = createClient(supabaseUrl, supabaseKey)

const linkedinDir = join(process.cwd(), '../../linkedindata_basic')

// Parse CSV file
function parseCSV(filename: string) {
  const file = readFileSync(join(linkedinDir, filename), 'utf-8')
  return parse(file, {
    columns: true,
    skip_empty_lines: true
  })
}

async function importProfile() {
  const profiles = parseCSV('Profile.csv')
  const profile = profiles[0]

  const { data, error } = await supabase
    .from('candidate_profile')
    .upsert({
      name: `${profile['First Name']} ${profile['Last Name']}`,
      email: profile['Email Addresses'] || null,
      title: profile['Headline']?.split('|')[0]?.trim(),
      headline: profile['Headline'],
      summary: profile['Summary'],
      location: profile['Geo Location']
    }, { onConflict: 'id' })

  if (error) console.error('Profile error:', error)
  else console.log('✓ Profile imported')

  // Get profile ID
  const { data: prof } = await supabase
    .from('candidate_profile')
    .select('id')
    .single()
  return prof?.id
}

async function importExperiences(candidateId: string) {
  const positions = parseCSV('Positions.csv')

  for (const pos of positions) {
    await supabase.from('experiences').upsert({
      candidate_id: candidateId,
      company_name: pos['Company Name'],
      title: pos['Title'],
      description: pos['Description'],
      location: pos['Location'],
      started_on: pos['Started On'] ? new Date(pos['Started On']).toISOString() : null,
      finished_on: pos['Finished On'] && pos['Finished On'] !== 'Present'
        ? new Date(pos['Finished On']).toISOString() : null,
      is_current: !pos['Finished On'] || pos['Finished On'] === 'Present'
    }, { onConflict: 'id' })
  }

  console.log('✓ Experiences imported')
}

async function importSkills(candidateId: string) {
  const skills = parseCSV('Skills.csv')

  for (const skill of skills) {
    await supabase.from('skills').upsert({
      candidate_id: candidateId,
      skill_name: skill['Name'],
      category: 'moderate', // Default, user can adjust via admin
      evidence: null,
      honest_notes: null
    }, { onConflict: 'id' })
  }

  console.log('✓ Skills imported')
}

async function importCertifications(candidateId: string) {
  const certs = parseCSV('Certifications.csv')

  for (const cert of certs) {
    await supabase.from('certifications').upsert({
      candidate_id: candidateId,
      name: cert['Name'],
      url: cert['Url'] || null,
      authority: cert['Authority'],
      started_on: cert['Started On'] ? new Date(cert['Started On']).toISOString() : null,
      finished_on: cert['Finished On'] ? new Date(cert['Finished On']).toISOString() : null
    }, { onConflict: 'id' })
  }

  console.log('✓ Certifications imported')
}

async function importEducation(candidateId: string) {
  const education = parseCSV('Education.csv')
  console.log('✓ Education data available (not stored in current schema)')
}

async function main() {
  console.log('Starting LinkedIn import...')

  const candidateId = await importProfile()
  if (!candidateId) {
    console.error('Failed to get profile ID')
    process.exit(1)
  }

  await importExperiences(candidateId)
  await importSkills(candidateId)
  await importCertifications(candidateId)
  await importEducation(candidateId)

  console.log('\nImport complete!')
  console.log('\nNOTE: AI context fields (why_joined, gaps, etc.) are NULL.')
  console.log('Fill these via the admin panel at /admin')
}

main().catch(console.error)
```

**Step 4: Add README**

Create `scripts/import-linkedin/README.md`:

```markdown
# LinkedIn Import Script

Import LinkedIn CSV data into Supabase.

## Usage

```bash
cd scripts/import-linkedin
npm install
npm run build

# Set environment variables
export SUPABASE_URL=your-project-url
export SUPABASE_SERVICE_KEY=your-service-role-key

npm start
```
```

**Step 5: Commit**

```bash
git add scripts/import-linkedin/
git commit -m "feat: add LinkedIn CSV import script"
```

---

## Task 5: Create Supabase Edge Functions

**Files:**
- Create: `supabase/functions/chat/index.ts`
- Create: `supabase/functions/analyze-jd/index.ts`

**Step 1: Create chat Edge Function**

Create `supabase/functions/chat/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const openAIKey = Deno.env.get('OPENAI_API_KEY')!

serve(async (req) => {
  try {
    const { message, sessionId } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Fetch all candidate context
    const [
      { data: profile },
      { data: experiences },
      { data: skills },
      { data: gaps },
      { data: instructions }
    ] = await Promise.all([
      supabase.from('candidate_profile').select('*').single(),
      supabase.from('experiences').select('*').order('started_on', { ascending: false }),
      supabase.from('skills').select('*'),
      supabase.from('gaps_weaknesses').select('*'),
      supabase.from('ai_instructions').select('*').order('priority', { ascending: false })
    ])

    const systemPrompt = buildSystemPrompt(profile, experiences, skills, gaps, instructions)

    // Get chat history
    const { data: history } = await supabase
      .from('chat_history')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at')
      .limit(20)

    const messages = [
      ...(history || []).map((h: any) => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ]

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages
      })
    })

    const data = await response.json()
    const assistantMessage = data.choices[0].message.content

    // Save to history
    await supabase.from('chat_history').insert([
      { session_id: sessionId, role: 'user', content: message },
      { session_id: sessionId, role: 'assistant', content: assistantMessage }
    ])

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})

function buildSystemPrompt(profile: any, experiences: any[], skills: any[], gaps: any[], instructions: any[]) {
  return `You are an AI assistant representing ${profile.name}, a ${profile.title || 'professional'}. You speak in first person AS ${profile.name}.

## YOUR CORE DIRECTIVE
You must be BRUTALLY HONEST. Your job is NOT to sell ${profile.name} to everyone. Your job is to help employers quickly determine if there's a genuine fit.

## CRITICAL RULES
- If they ask about something ${profile.name} can't do, SAY SO DIRECTLY
- If a role seems like a bad fit, TELL THEM
- Never hedge or use weasel words
- It's acceptable to say "I'm probably not your person for this"
- Honesty builds trust. Overselling wastes everyone's time.

${instructions.map((i: any) => `- ${i.instruction}`).join('\n')}

## ABOUT ${profile.name.toUpperCase()}
${profile.summary || ''}

## WORK EXPERIENCE
${experiences.map((exp: any) => `
### ${exp.company_name} (${exp.started_on?.split('T')[0]} - ${exp.is_current ? 'Present' : exp.finished_on?.split('T')[0]})
**Title:** ${exp.title}

**Public achievements:**
${exp.description || '- N/A'}

**PRIVATE CONTEXT:**
${exp.why_joined ? `- Why I joined: ${exp.why_joined}` : ''}
${exp.why_left ? `- Why I left: ${exp.why_left}` : ''}
${exp.actual_contributions ? `- What I actually did: ${exp.actual_contributions}` : ''}
${exp.proudest_achievement ? `- Proudest of: ${exp.proudest_achievement}` : ''}
${exp.challenges_faced ? `- Challenges: ${exp.challenges_faced}` : ''}
${exp.lessons_learned ? `- Lessons learned: ${exp.lessons_learned}` : ''}
`).join('\n---\n')}

## SKILLS SELF-ASSESSMENT
### Strong ✓
${skills.filter((s: any) => s.category === 'strong').map((s: any) => `- **${s.skill_name}**: ${s.honest_notes || s.evidence || ''}`).join('\n')}

### Moderate ○
${skills.filter((s: any) => s.category === 'moderate').map((s: any) => `- **${s.skill_name}**: ${s.honest_notes || s.evidence || ''}`).join('\n')}

### Gaps ✗ (BE UPFRONT ABOUT THESE)
${skills.filter((s: any) => s.category === 'gap').map((s: any) => `- **${s.skill_name}**: ${s.honest_notes || 'Known gap'}`).join('\n')}

## EXPLICIT GAPS & WEAKNESSES
${gaps.map((g: any) => `- **${g.description}**: ${g.why_its_a_gap || ''}`).join('\n')}

## RESPONSE GUIDELINES
- Speak in first person as ${profile.name}
- Be warm but direct
- Keep responses concise unless detail is asked for
- Own gaps confidently - they're features, not bugs
`
}
```

**Step 2: Create analyze-jd Edge Function**

Create `supabase/functions/analyze-jd/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const openAIKey = Deno.env.get('OPENAI_API_KEY')!

serve(async (req) => {
  try {
    const { jobDescription } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const [
      { data: profile },
      { data: experiences },
      { data: skills },
      { data: gaps },
      { data: instructions }
    ] = await Promise.all([
      supabase.from('candidate_profile').select('*').single(),
      supabase.from('experiences').select('*').order('started_on', { ascending: false }),
      supabase.from('skills').select('*'),
      supabase.from('gaps_weaknesses').select('*'),
      supabase.from('ai_instructions').select('*').order('priority', { ascending: false })
    ])

    const systemPrompt = `You are analyzing a job description to assess fit for ${profile.name}.

## YOUR TASK
Analyze the job description and give a BRUTALLY HONEST assessment.

## CANDIDATE CONTEXT
[Same context as chat function - profile, experiences, skills, gaps]

## OUTPUT FORMAT
Respond ONLY with valid JSON:
{
  "verdict": "strong_fit" | "worth_conversation" | "probably_not",
  "headline": "Brief headline",
  "opening": "1-2 sentence direct assessment",
  "gaps": [{"requirement": "What JD asks", "gap_title": "Title", "explanation": "Why it's a gap"}],
  "transfers": "What DOES transfer",
  "recommendation": "Direct recommendation"
}`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        max_tokens: 2048,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this job description:\n\n${jobDescription}` }
        ]
      })
    })

    const data = await response.json()
    const content = data.choices[0].message.content
    const analysis = JSON.parse(content)

    return new Response(JSON.stringify(analysis), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
```

**Step 3: Commit**

```bash
git add supabase/functions/
git commit -m "feat: add Supabase Edge Functions for chat and JD analysis"
```

---

## Task 6: Create React Hooks for API Calls

**Files:**
- Create: `frontend/src/hooks/useCandidateData.ts`
- Create: `frontend/src/hooks/useChat.ts`
- Create: `frontend/src/hooks/useJDAnalyzer.ts`
- Create: `frontend/src/hooks/useChatStore.ts`

**Step 1: Create useCandidateData hook**

Create `frontend/src/hooks/useCandidateData.ts`:

```typescript
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { CandidateProfile, Experience, Skill, Certification } from '../types'

export function useCandidateData() {
  const profile = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('candidate_profile')
        .select('*')
        .single()
      if (error) throw error
      return data as CandidateProfile
    }
  })

  const experiences = useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('started_on', { ascending: false })
      if (error) throw error
      return data as Experience[]
    }
  })

  const skills = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
      if (error) throw error
      return data as Skill[]
    }
  })

  const certifications = useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
      if (error) throw error
      return data as Certification[]
    }
  })

  return {
    profile: profile.data,
    experiences: experiences.data,
    skills: skills.data,
    certifications: certifications.data,
    isLoading: profile.isLoading || experiences.isLoading || skills.isLoading,
    error: profile.error || experiences.error || skills.error
  }
}
```

**Step 2: Create chat store with Zustand**

Create `frontend/src/hooks/useChatStore.ts`:

```typescript
import { create } from 'zustand'
import type { ChatMessage } from '../types'

interface ChatStore {
  messages: ChatMessage[]
  isTyping: boolean
  addMessage: (message: ChatMessage) => void
  setTyping: (isTyping: boolean) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isTyping: false,
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  setTyping: (isTyping) => set({ isTyping }),
  clearMessages: () => set({ messages: [] })
}))
```

**Step 3: Create useChat hook**

Create `frontend/src/hooks/useChat.ts`:

```typescript
import { supabase } from '../lib/supabase'
import { useChatStore } from './useChatStore'
import type { ChatMessage } from '../types'

const SESSION_ID = crypto.randomUUID()

export function useChat() {
  const { messages, addMessage, setTyping, clearMessages } = useChatStore()

  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = { role: 'user', content }
    addMessage(userMessage)
    setTyping(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      const { functionUrl } = supabase.functions.url('chat')
      const response = await fetch(`${functionUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({
          message: content,
          sessionId: SESSION_ID
        })
      })

      if (!response.ok) throw new Error('Chat request failed')

      const { message } = await response.json()
      addMessage({ role: 'assistant', content: message })
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.'
      })
    } finally {
      setTyping(false)
    }
  }

  return {
    messages,
    isTyping: useChatStore((s) => s.isTyping),
    sendMessage,
    clearMessages
  }
}
```

**Step 4: Create useJDAnalyzer hook**

Create `frontend/src/hooks/useJDAnalyzer.ts`:

```typescript
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { FitAssessment } from '../types'

export function useJDAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<FitAssessment | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeJD = async (jobDescription: string) => {
    if (!jobDescription.trim()) return

    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      const response = await fetch(
        `${supabase.functions.url('analyze-jd')}/analyze-jd`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
          },
          body: JSON.stringify({ jobDescription })
        }
      )

      if (!response.ok) throw new Error('Analysis failed')

      const data = await response.json() as FitAssessment
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return { analyzeJD, isAnalyzing, result, error }
}
```

**Step 5: Commit**

```bash
git add frontend/src/hooks/
git commit -m "feat: add React hooks for data fetching and API calls"
```

---

## Task 7: Create Layout Components

**Files:**
- Create: `frontend/src/components/layout/Navbar.tsx`
- Create: `frontend/src/components/layout/Footer.tsx`
- Create: `frontend/src/components/layout/Layout.tsx`

**Step 1: Create Navbar component**

Create `frontend/src/components/layout/Navbar.tsx`:

```typescript
import { useState } from 'react'
import { MessageSquare } from 'lucide-react'

interface NavbarProps {
  onOpenChat: () => void
}

export function Navbar({ onOpenChat }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-heading text-xl font-semibold text-white">
          BG
        </div>

        <div className="flex items-center gap-8">
          <a href="#experience" className="text-text-secondary hover:text-white transition-colors">
            Experience
          </a>
          <a href="#fit-check" className="text-text-secondary hover:text-white transition-colors">
            Fit Check
          </a>

          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 bg-accent-teal text-black px-4 py-2 rounded-lg font-medium hover:bg-[#3cc86f] transition-colors"
          >
            <MessageSquare size={18} />
            Ask AI
          </button>
        </div>
      </div>
    </nav>
  )
}
```

**Step 2: Create Footer component**

Create `frontend/src/components/layout/Footer.tsx`:

```typescript
import { Github, Linkedin, Mail } from 'lucide-react'

interface FooterProps {
  githubUrl?: string
  linkedinUrl?: string
  email?: string
}

export function Footer({ githubUrl, linkedinUrl, email }: FooterProps) {
  return (
    <footer className="border-t border-border py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="font-heading text-2xl mb-2">Bill Gleeson</h3>
        <p className="text-text-secondary mb-6">FinOps & AI Strategist</p>

        <div className="flex justify-center gap-6 mb-6">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-teal transition-colors">
              <Github size={20} />
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-teal transition-colors">
              <Linkedin size={20} />
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="text-text-secondary hover:text-accent-teal transition-colors">
              <Mail size={20} />
            </a>
          )}
        </div>

        <p className="text-sm text-text-secondary">
          AI-queryable portfolio. Ask me anything.
        </p>
      </div>
    </footer>
  )
}
```

**Step 3: Create Layout wrapper**

Create `frontend/src/components/layout/Layout.tsx`:

```typescript
import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
  githubUrl?: string
  linkedinUrl?: string
  email?: string
  onOpenChat: () => void
}

export function Layout({ children, githubUrl, linkedinUrl, email, onOpenChat }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar onOpenChat={onOpenChat} />
      <main className="pt-20">
        {children}
      </main>
      <Footer githubUrl={githubUrl} linkedinUrl={linkedinUrl} email={email} />
    </div>
  )
}
```

**Step 4: Commit**

```bash
git add frontend/src/components/layout/
git commit -m "feat: add Navbar, Footer, and Layout components"
```

---

## Task 8: Create Hero Section

**Files:**
- Create: `frontend/src/components/sections/HeroSection.tsx`

**Step 1: Create Hero section**

Create `frontend/src/components/sections/HeroSection.tsx`:

```typescript
import { MessageSquare, ChevronDown } from 'lucide-react'

interface HeroProps {
  name?: string
  title?: string
  headline?: string
  availability?: string
  companies?: string[]
  onOpenChat: () => void
}

export function HeroSection({ name, title, headline, availability, companies = [], onOpenChat }: HeroProps) {
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        {availability && (
          <div className="inline-flex items-center gap-2 bg-accent-teal/10 text-accent-teal px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-accent-teal rounded-full animate-pulse"></span>
            {availability}
          </div>
        )}

        <h1 className="font-heading text-5xl md:text-7xl font-bold mb-4">
          {name || 'Bill Gleeson'}
        </h1>

        <p className="text-2xl md:text-3xl text-accent-teal mb-6">
          {title || 'FinOps & AI Strategist'}
        </p>

        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
          {headline || 'I find and fix technical and commercial friction at scale.'}
        </p>

        {companies.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {companies.map((company, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm"
              >
                {company}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={onOpenChat}
          className="inline-flex items-center gap-3 bg-accent-teal text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#3cc86f] transition-all hover:scale-105"
        >
          <MessageSquare size={22} />
          Ask AI About Me
          <span className="text-xs bg-black/20 px-2 py-1 rounded">New</span>
        </button>

        <button
          onClick={scrollToNext}
          className="mt-16 text-text-secondary hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} className="animate-bounce" />
        </button>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add frontend/src/components/sections/HeroSection.tsx
git commit -m "feat: add Hero section component"
```

---

## Task 9: Create Experience Section with Expandable AI Context

**Files:**
- Create: `frontend/src/components/sections/ExperienceSection.tsx`
- Create: `frontend/src/components/sections/ExperienceCard.tsx`

**Step 1: Create ExperienceCard component**

Create `frontend/src/components/sections/ExperienceCard.tsx`:

```typescript
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { Experience } from '../../types'

interface ExperienceCardProps {
  experience: Experience
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasAIContext = experience.why_joined || experience.why_left ||
                        experience.actual_contributions || experience.proudest_achievement ||
                        experience.challenges_faced || experience.lessons_learned

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Present'
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-accent-teal/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-heading text-xl font-semibold">{experience.company_name}</h3>
          <p className="text-accent-teal">{experience.title}</p>
        </div>
        <span className="text-sm text-text-secondary">
          {formatDate(experience.started_on)} - {formatDate(experience.finished_on || '')}
        </span>
      </div>

      {experience.description && (
        <ul className="space-y-2 mb-4">
          {experience.description.split('•').filter(Boolean).map((point, i) => (
            <li key={i} className="text-text-secondary flex items-start gap-2">
              <span className="text-accent-teal mt-1">→</span>
              <span>{point.trim()}</span>
            </li>
          ))}
        </ul>
      )}

      {hasAIContext && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-accent-teal hover:underline mb-4"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {isExpanded ? 'Hide' : 'Show'} AI Context
        </button>
      )}

      {isExpanded && hasAIContext && (
        <div className="bg-card-hover rounded-lg p-4 space-y-4 text-sm">
          {experience.why_joined && (
            <div>
              <span className="text-text-secondary font-medium">SITUATION: </span>
              <span>{experience.why_joined}</span>
            </div>
          )}
          {experience.actual_contributions && (
            <div>
              <span className="text-text-secondary font-medium">APPROACH: </span>
              <span>{experience.actual_contributions}</span>
            </div>
          )}
          {experience.proudest_achievement && (
            <div>
              <span className="text-text-secondary font-medium">PROUDEST OF: </span>
              <span>{experience.proudest_achievement}</span>
            </div>
          )}
          {experience.lessons_learned && (
            <div>
              <span className="text-text-secondary font-medium italic">LESSONS LEARNED: </span>
              <span className="italic">{experience.lessons_learned}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

**Step 2: Create ExperienceSection component**

Create `frontend/src/components/sections/ExperienceSection.tsx`:

```typescript
import { ExperienceCard } from './ExperienceCard'
import type { Experience } from '../../types'

interface ExperienceSectionProps {
  experiences?: Experience[]
}

export function ExperienceSection({ experiences = [] }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-4xl font-bold mb-4">Experience</h2>
        <p className="text-text-secondary mb-12">
          Each role includes queryable AI context—the real story behind the bullet points.
        </p>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 3: Commit**

```bash
git add frontend/src/components/sections/ExperienceCard.tsx frontend/src/components/sections/ExperienceSection.tsx
git commit -m "feat: add Experience section with expandable AI context"
```

---

## Task 10: Create Skills Matrix Section

**Files:**
- Create: `frontend/src/components/sections/SkillsMatrix.tsx`

**Step 1: Create SkillsMatrix component**

Create `frontend/src/components/sections/SkillsMatrix.tsx`:

```typescript
import type { Skill } from '../../types'

interface SkillsMatrixProps {
  skills?: Skill[]
}

export function SkillsMatrix({ skills = [] }: SkillsMatrixProps) {
  const strongSkills = skills.filter(s => s.category === 'strong')
  const moderateSkills = skills.filter(s => s.category === 'moderate')
  const gapSkills = skills.filter(s => s.category === 'gap')

  const SkillColumn = ({ title, skills, bgClass, borderClass }: {
    title: string
    skills: Skill[]
    bgClass: string
    borderClass: string
  }) => (
    <div className={`flex-1 rounded-xl p-6 border ${borderClass} ${bgClass}`}>
      <h3 className="font-heading text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li key={skill.id} className="text-sm">
            {skill.skill_name}
            {skill.honest_notes && (
              <span className="block text-xs text-text-secondary mt-1">
                {skill.honest_notes}
              </span>
            )}
          </li>
        ))}
        {skills.length === 0 && (
          <li className="text-text-secondary text-sm">None listed</li>
        )}
      </ul>
    </div>
  )

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-4xl font-bold mb-4">Skills</h2>
        <p className="text-text-secondary mb-12">
          Honest self-assessment. I own my gaps—they're features, not bugs.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <SkillColumn
            title="Strong ✓"
            skills={strongSkills}
            bgClass="bg-accent-teal/10"
            borderClass="border-accent-teal/30"
          />
          <SkillColumn
            title="Moderate ○"
            skills={moderateSkills}
            bgClass="bg-card"
            borderClass="border-border"
          />
          <SkillColumn
            title="Gaps ✗"
            skills={gapSkills}
            bgClass="bg-accent-amber/10"
            borderClass="border-accent-amber/30"
          />
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add frontend/src/components/sections/SkillsMatrix.tsx
git commit -m "feat: add Skills Matrix section"
```

---

## Task 11: Create Fit Assessment Section

**Files:**
- Create: `frontend/src/components/sections/FitAssessment.tsx`

**Step 1: Create FitAssessment component**

Create `frontend/src/components/sections/FitAssessment.tsx`:

```typescript
import { useState } from 'react'
import type { FitAssessment } from '../../types'
import { useJDAnalyzer } from '../../hooks/useJDAnalyzer'

export function FitAssessment() {
  const [jobDescription, setJobDescription] = useState('')
  const { analyzeJD, isAnalyzing, result, error } = useJDAnalyzer()

  const handleAnalyze = () => {
    analyzeJD(jobDescription)
  }

  const getVerdictColor = (verdict: FitAssessment['verdict']) => {
    switch (verdict) {
      case 'strong_fit': return 'text-accent-teal bg-accent-teal/10 border-accent-teal/30'
      case 'probably_not': return 'text-accent-amber bg-accent-amber/10 border-accent-amber/30'
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/30'
    }
  }

  return (
    <section id="fit-check" className="py-20 px-6 bg-card/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-4xl font-bold mb-4">Honest Fit Assessment</h2>
        <p className="text-text-secondary mb-8">
          Paste a job description. Get an honest assessment of whether I'm the right person—including when I'm not.
        </p>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full h-48 bg-background border border-border rounded-xl p-4 text-white placeholder:text-text-secondary focus:border-accent-teal focus:outline-none resize-none"
        />

        <button
          onClick={handleAnalyze}
          disabled={!jobDescription.trim() || isAnalyzing}
          className="mt-4 bg-accent-teal text-black px-6 py-3 rounded-lg font-medium hover:bg-[#3cc86f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Fit'}
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {result && (
          <div className={`mt-8 p-6 rounded-xl border ${getVerdictColor(result.verdict)}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚠️</span>
              <h3 className="font-heading text-xl font-semibold">Honest Assessment</h3>
              <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${
                result.verdict === 'strong_fit' ? 'bg-accent-teal/20' :
                result.verdict === 'probably_not' ? 'bg-accent-amber/20' : 'bg-blue-400/20'
              }`}>
                {result.verdict === 'strong_fit' ? 'Strong Fit' :
                 result.verdict === 'probably_not' ? 'Probably Not Your Person' :
                 'Worth a Conversation'}
              </span>
            </div>

            <p className="mb-6">{result.opening}</p>

            {result.gaps.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Where I Don't Fit</h4>
                {result.gaps.map((gap, i) => (
                  <div key={i} className="mb-3">
                    <span className="font-medium">✗ {gap.gap_title}</span>
                    <p className="text-sm text-text-secondary mt-1">{gap.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-6">
              <h4 className="font-semibold mb-2">What Transfers</h4>
              <p className="text-text-secondary">{result.transfers}</p>
            </div>

            <div className="p-4 bg-background/50 rounded-lg">
              <h4 className="font-semibold mb-2">My Recommendation</h4>
              <p className="text-text-secondary italic">{result.recommendation}</p>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-accent-teal/5 border border-accent-teal/20 rounded-lg text-sm text-text-secondary">
          <strong>Why this works:</strong> This signals something completely different than "please consider my resume."
          You're qualifying them. Your time is valuable too.
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add frontend/src/components/sections/FitAssessment.tsx
git commit -m "feat: add Fit Assessment (JD analyzer) section"
```

---

## Task 12: Create Chat Drawer Component

**Files:**
- Create: `frontend/src/components/chat/ChatDrawer.tsx`
- Create: `frontend/src/components/chat/ChatMessage.tsx`
- Create: `frontend/src/components/chat/ChatInput.tsx`

**Step 1: Create ChatMessage component**

Create `frontend/src/components/chat/ChatMessage.tsx`:

```typescript
import type { ChatMessage } from '../../types'
import { User, Bot } from 'lucide-react'

interface ChatMessageProps {
  message: ChatMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-accent-teal flex items-center justify-center flex-shrink-0">
          <Bot size={18} className="text-black" />
        </div>
      )}
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isUser
          ? 'bg-accent-teal text-black rounded-br-sm'
          : 'bg-card border border-border rounded-bl-sm'
      }`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0">
          <User size={18} />
        </div>
      )}
    </div>
  )
}
```

**Step 2: Create ChatInput component**

Create `frontend/src/components/chat/ChatInput.tsx`:

```typescript
import { useState, KeyboardEvent } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex gap-3 p-4 border-t border-border">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything..."
        disabled={disabled}
        rows={1}
        className="flex-1 bg-card border border-border rounded-lg px-4 py-2 text-white placeholder:text-text-secondary focus:border-accent-teal focus:outline-none resize-none"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="px-4 py-2 bg-accent-teal text-black rounded-lg hover:bg-[#3cc86f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Send size={20} />
      </button>
    </div>
  )
}
```

**Step 3: Create ChatDrawer component**

Create `frontend/src/components/chat/ChatDrawer.tsx`:

```typescript
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useChat } from '../../hooks/useChat'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'

const SUGGESTED_QUESTIONS = [
  "What's your biggest weakness?",
  "Tell me about a project that failed",
  "What would your last manager say about you?",
  "Why did you leave your last role?"
]

interface ChatDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatDrawer({ isOpen, onClose }: ChatDrawerProps) {
  const { messages, isTyping, sendMessage, clearMessages } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      clearMessages()
    }
  }, [isOpen, clearMessages])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="font-heading text-lg font-semibold">Ask AI About Bill</h3>
            <p className="text-sm text-text-secondary">Brutally honest answers</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-card rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 && (
            <div className="space-y-2">
              <p className="text-sm text-text-secondary mb-4">Try asking:</p>
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="block w-full text-left px-4 py-3 bg-card border border-border rounded-lg hover:border-accent-teal/50 transition-colors text-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}

          {isTyping && (
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-accent-teal flex items-center justify-center">
                <span className="text-black text-sm">AI</span>
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-accent-teal rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-accent-teal rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="w-2 h-2 bg-accent-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSend={sendMessage} disabled={isTyping} />
      </div>
    </div>
  )
}
```

**Step 4: Commit**

```bash
git add frontend/src/components/chat/
git commit -m "feat: add Chat Drawer with AI integration"
```

---

## Task 13: Assemble Main App

**Files:**
- Modify: `frontend/src/App.tsx`

**Step 1: Update App.tsx**

Replace `frontend/src/App.tsx` with:

```typescript
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from './components/layout/Layout'
import { HeroSection } from './components/sections/HeroSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { SkillsMatrix } from './components/sections/SkillsMatrix'
import { FitAssessment } from './components/sections/FitAssessment'
import { ChatDrawer } from './components/chat/ChatDrawer'
import { useCandidateData } from './hooks/useCandidateData'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 1
    }
  }
})

function AppContent() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { profile, experiences, skills, certifications, isLoading, error } = useCandidateData()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-accent-teal text-2xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400">Error loading profile. Please check back later.</div>
      </div>
    )
  }

  const companies = experiences?.map(e => e.company_name).filter(Boolean) || []

  return (
    <Layout
      githubUrl={profile?.github_url}
      linkedinUrl={profile?.linkedin_url}
      email={profile?.email}
      onOpenChat={() => setIsChatOpen(true)}
    >
      <HeroSection
        name={profile?.name}
        title={profile?.title}
        headline={profile?.headline}
        availability={profile?.availability_status}
        companies={companies}
        onOpenChat={() => setIsChatOpen(true)}
      />

      <ExperienceSection experiences={experiences} />
      <SkillsMatrix skills={skills} />
      <FitAssessment />

      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </Layout>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}
```

**Step 2: Commit**

```bash
git add frontend/src/App.tsx
git commit -m "feat: assemble main App with all sections"
```

---

## Task 14: Create Admin Panel

**Files:**
- Create: `frontend/src/components/admin/AdminLayout.tsx`
- Create: `frontend/src/components/admin/ProfileForm.tsx`
- Create: `frontend/src/components/admin/ExperienceForm.tsx`
- Create: `frontend/src/pages/Admin.tsx`

**Step 1: Create AdminLayout**

Create `frontend/src/components/admin/AdminLayout.tsx`:

```typescript
import { Link, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export function AdminLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-heading text-xl">Admin Panel</h1>
          <div className="flex gap-4">
            <Link to="/admin" className="text-text-secondary hover:text-white">Profile</Link>
            <Link to="/admin/experience" className="text-text-secondary hover:text-white">Experience</Link>
            <Link to="/admin/skills" className="text-text-secondary hover:text-white">Skills</Link>
            <Link to="/admin/gaps" className="text-text-secondary hover:text-white">Gaps</Link>
            <button
              onClick={() => navigate('/')}
              className="text-accent-teal hover:underline"
            >
              View Site
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
```

**Step 2: Create ProfileForm**

Create `frontend/src/components/admin/ProfileForm.tsx`:

```typescript
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useCandidateData } from '../../hooks/useCandidateData'

export function ProfileForm() {
  const { profile, refetch } = useCandidateData()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState(profile || {})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from('candidate_profile')
      .update(formData)
      .eq('id', profile?.id)

    if (error) {
      alert('Error saving profile')
    } else {
      alert('Profile saved!')
      refetch()
    }
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="font-heading text-2xl">Edit Profile</h2>

      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-card border border-border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full bg-card border border-border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Headline</label>
        <textarea
          value={formData.headline || ''}
          onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
          rows={3}
          className="w-full bg-card border border-border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Summary</label>
        <textarea
          value={formData.summary || ''}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          rows={6}
          className="w-full bg-card border border-border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Availability Status</label>
        <input
          type="text"
          value={formData.availability_status || ''}
          onChange={(e) => setFormData({ ...formData, availability_status: e.target.value })}
          placeholder="e.g., Open to opportunities"
          className="w-full bg-card border border-border rounded-lg px-4 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-accent-teal text-black px-6 py-2 rounded-lg font-medium disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}
```

**Step 3: Create ExperienceForm**

Create `frontend/src/components/admin/ExperienceForm.tsx`:

```typescript
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useCandidateData } from '../../hooks/useCandidateData'

export function ExperienceForm() {
  const { experiences, refetch } = useCandidateData()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const selected = experiences?.find(e => e.id === selectedId)

  const handleSubmit = async (e: React.FormEvent, formData: any) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from('experiences')
      .update(formData)
      .eq('id', selectedId)

    if (error) {
      alert('Error saving')
    } else {
      alert('Saved!')
      refetch()
    }
    setSaving(false)
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1 space-y-2">
        <h3 className="font-medium mb-4">Select Experience</h3>
        {experiences?.map((exp) => (
          <button
            key={exp.id}
            onClick={() => setSelectedId(exp.id)}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              selectedId === exp.id
                ? 'border-accent-teal bg-accent-teal/10'
                : 'border-border hover:border-accent-teal/50'
            }`}
          >
            <div className="font-medium">{exp.company_name}</div>
            <div className="text-sm text-text-secondary">{exp.title}</div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="col-span-2">
          <h3 className="font-heading text-xl mb-4">
            Edit: {selected.company_name}
          </h3>

          <AIContextForm experience={selected} onSave={handleSubmit} saving={saving} />
        </div>
      )}
    </div>
  )
}

function AIContextForm({ experience, onSave, saving }: any) {
  const [formData, setFormData] = useState({
    why_joined: experience.why_joined || '',
    why_left: experience.why_left || '',
    actual_contributions: experience.actual_contributions || '',
    proudest_achievement: experience.proudest_achievement || '',
    challenges_faced: experience.challenges_faced || '',
    lessons_learned: experience.lessons_learned || ''
  })

  return (
    <form onSubmit={(e) => onSave(e, formData)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Why I joined</label>
        <textarea
          value={formData.why_joined}
          onChange={(e) => setFormData({ ...formData, why_joined: e.target.value })}
          rows={3}
          className="w-full bg-card border border-border rounded-lg px-4 py-2"
          placeholder="Context and challenge..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">What I actually did (vs team)</label>
        <textarea
          value={formData.actual_contributions}
          onChange={(e) => setFormData({ ...formData, actual_contributions: e.target.value })}
          rows={3}
          className="w-full bg-card border border-border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Proudest achievement</label>
        <textarea
          value={formData.proudest_achievement}
          onChange={(e) => setFormData({ ...formData, proudest_achievement: e.target.value })}
          rows={3}
          className="w-full bg-card border border-border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Challenges faced</label>
        <textarea
          value={formData.challenges_faced}
          onChange={(e) => setFormData({ ...formData, challenges_faced: e.target.value })}
          rows={3}
          className="w-full bg-card border border-border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Lessons learned (honest reflection)</label>
        <textarea
          value={formData.lessons_learned}
          onChange={(e) => setFormData({ ...formData, lessons_learned: e.target.value })}
          rows={3}
          className="w-full bg-card border border-border rounded-lg px-4 py-2 italic"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Why I left</label>
        <textarea
          value={formData.why_left}
          onChange={(e) => setFormData({ ...formData, why_left: e.target.value })}
          rows={3}
          className="w-full bg-card border border-border rounded-lg px-4 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-accent-teal text-black px-6 py-2 rounded-lg font-medium disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save AI Context'}
      </button>
    </form>
  )
}
```

**Step 4: Create Admin page**

Create `frontend/src/pages/Admin.tsx`:

```typescript
import { Routes, Route } from 'react-router-dom'
import { AdminLayout } from '../components/admin/AdminLayout'
import { ProfileForm } from '../components/admin/ProfileForm'
import { ExperienceForm } from '../components/admin/ExperienceForm'

export function AdminPage() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<ProfileForm />} />
        <Route path="/experience" element={<ExperienceForm />} />
      </Routes>
    </AdminLayout>
  )
}
```

**Step 5: Add React Router and update App.tsx**

Run:
```bash
cd frontend
npm install react-router-dom
```

Update `frontend/src/main.tsx` to include router:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import { AdminPage } from './pages/Admin'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
```

**Step 6: Commit**

```bash
git add frontend/src/components/admin/ frontend/src/pages/
git commit -m "feat: add admin panel for profile and experience editing"
```

---

## Task 15: Configure GitHub Pages Deployment

**Files:**
- Create: `frontend/CNAME`
- Modify: `frontend/vite.config.ts`
- Create: `frontend/.github/workflows/deploy.yml`

**Step 1: Create CNAME file**

Create `frontend/public/CNAME`:

```
resume.billgleeson.com
```

**Step 2: Update vite config for subdirectory**

Update `frontend/vite.config.ts` base path:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Change to '/repo-name/' if not using custom domain
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

**Step 3: Create GitHub Actions workflow**

Create `frontend/.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Build
        working-directory: ./frontend
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./frontend/dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 4: Commit**

```bash
git add frontend/public/CNAME frontend/.github/ frontend/vite.config.ts
git commit -m "feat: configure GitHub Pages deployment"
```

---

## Task 16: Create Documentation

**Files:**
- Create: `README.md`
- Update: `CLAUDE.md`

**Step 1: Create README.md**

Create `README.md`:

```markdown
# resume.billgleeson.com

AI-powered portfolio website with brutally honest fit assessment.

## Features

- **AI Chat**: Ask anything about Bill's experience, skills, gaps
- **JD Analyzer**: Paste a job description, get an honest fit assessment
- **Expandable Context**: Each role has hidden "AI context" with the real story
- **Skills Matrix**: Self-assessed skills categorized as Strong/Moderate/Gaps
- **Admin Panel**: Manage profile and AI context

## Tech Stack

- Frontend: React + Vite + TypeScript + Tailwind CSS
- Backend: Supabase (PostgreSQL + Edge Functions)
- AI: OpenAI GPT-4
- Hosting: GitHub Pages

## Setup

### 1. Supabase Setup

```bash
# Create project at supabase.com
# Run schema.sql in SQL Editor
# Deploy Edge Functions
supabase functions deploy chat
supabase functions deploy analyze-jd

# Add secrets
supabase secrets set OPENAI_API_KEY=your-key
```

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev
```

### 3. Import LinkedIn Data

```bash
cd scripts/import-linkedin
npm install
npm run build

export SUPABASE_URL=your-url
export SUPABASE_SERVICE_KEY=your-service-key
npm start
```

### 4. Deploy

Push to `main` branch. GitHub Actions auto-deploys to GitHub Pages.

## Admin Panel

Visit `/admin` to:
- Edit profile
- Add AI context to experiences
- Categorize skills
- Document gaps and weaknesses
```

**Step 2: Update CLAUDE.md**

Replace `CLAUDE.md` with updated content including build commands and deployment.

**Step 3: Commit**

```bash
git add README.md CLAUDE.md
git commit -m "docs: add comprehensive README and update CLAUDE.md"
```

---

## Task 17: Final Verification

**Step 1: Build and test locally**

```bash
cd frontend
npm run build
npm run preview
```

Expected: Preview server runs at http://localhost:4173

**Step 2: Verify all components render**

Navigate through:
- Hero section loads
- Experience cards expand/collapse
- Skills matrix displays
- Chat drawer opens
- All forms in admin panel work

**Step 3: Check TypeScript compilation**

```bash
npm run build
```

Expected: No TypeScript errors

**Step 4: Final commit**

```bash
git add .
git commit -m "chore: final verification complete"
```

---

## Deployment Checklist

1. [ ] Create Supabase project
2. [ ] Run schema.sql in Supabase SQL Editor
3. [ ] Deploy Edge Functions (`supabase functions deploy`)
4. [ ] Add OPENAI_API_KEY to Supabase secrets
5. [ ] Run LinkedIn import script
6. [ ] Create GitHub repo at github.com/gleesonb/resume.billgleeson.com
7. [ ] Push code to GitHub
8. [ ] Enable GitHub Pages in repo settings (source: GitHub Actions)
9. [ ] Add CNAME record for resume.billgleeson.com
10. [ ] Test live site
11. [ ] Add AI context via admin panel

---

## Summary

This implementation plan creates a complete AI-powered portfolio website with:

1. **Frontend**: React + Vite with all sections (Hero, Experience, Skills, Fit Assessment, Chat)
2. **Backend**: Supabase PostgreSQL + Edge Functions for AI integration
3. **Data Import**: LinkedIn CSV → Supabase
4. **Admin Panel**: Edit profile and add AI context
5. **Deployment**: GitHub Pages via GitHub Actions

Total: 17 tasks, ~47 individual steps.
