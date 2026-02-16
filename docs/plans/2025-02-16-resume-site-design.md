# Resume.billgleeson.com - Design Document

**Date:** 2025-02-16
**Status:** Approved
**Author:** Claude Code

## Overview

AI-powered portfolio website for Bill Gleeson with "brutally honest" AI fit assessment. The AI tells employers when Bill is NOT a good fit, building trust and qualifying leads.

**Key insight:** The AI IS the product. Everything else is UI to invoke it.

## Architecture

```
Frontend: React + Vite → GitHub Pages → resume.billgleeson.com
Backend: Supabase (PostgreSQL + Edge Functions)
LLM: OpenAI API
```

### Repository Structure

```
resume.billgleeson.com/
├── frontend/                 # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/       # Navbar, Footer
│   │   │   ├── sections/     # Hero, Experience, SkillsMatrix, FitAssessment
│   │   │   ├── chat/         # ChatDrawer, ChatMessage, ChatInput
│   │   │   └── admin/        # Admin panel forms
│   │   ├── hooks/            # useChat, useJDAnalyzer, useCandidateData
│   │   ├── lib/supabase.ts
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── supabase/
│   ├── schema.sql
│   └── functions/
│       ├── chat/
│       └── analyze-jd/
│
├── scripts/
│   └── import-linkedin/     # CSV import script
│
├── linkedindata_basic/       # LinkedIn CSV exports
├── CLAUDE.md
└── README.md
```

## Database Schema

### Core Tables

```sql
-- Single row - it's Bill's site
candidate_profile (
  id UUID PRIMARY KEY,
  name TEXT,
  email TEXT,
  title TEXT,
  headline TEXT,
  summary TEXT,
  location TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  availability_status TEXT
)

experiences (
  id UUID PRIMARY KEY,
  candidate_id UUID REFERENCES candidate_profile(id),
  company_name TEXT,
  title TEXT,
  description TEXT,
  location TEXT,
  started_on DATE,
  finished_on DATE,
  is_current BOOLEAN,

  -- AI context (private)
  why_joined TEXT,
  why_left TEXT,
  actual_contributions TEXT,
  proudest_achievement TEXT,
  challenges_faced TEXT,
  lessons_learned TEXT
)

skills (
  id UUID PRIMARY KEY,
  candidate_id UUID REFERENCES candidate_profile(id),
  skill_name TEXT,
  category TEXT,  -- 'strong', 'moderate', 'gap'
  evidence TEXT,
  honest_notes TEXT
)

certifications (
  id UUID PRIMARY KEY,
  candidate_id UUID REFERENCES candidate_profile(id),
  name TEXT,
  url TEXT,
  authority TEXT,
  started_on DATE,
  finished_on DATE
)

gaps_weaknesses (
  id UUID PRIMARY KEY,
  candidate_id UUID REFERENCES candidate_profile(id),
  gap_type TEXT,
  description TEXT,
  why_its_a_gap TEXT
)

ai_instructions (
  id UUID PRIMARY KEY,
  candidate_id UUID REFERENCES candidate_profile(id),
  instruction_type TEXT,
  instruction TEXT,
  priority INTEGER
)

chat_history (
  id UUID PRIMARY KEY,
  session_id TEXT,
  role TEXT,  -- 'user' or 'assistant'
  content TEXT,
  created_at TIMESTAMP
)
```

## Frontend Components

### Public Pages
- **HeroSection:** Name, title, status badge, company pills, "Ask AI" CTA
- **ExperienceSection:** Job cards with expandable AI context panels
- **SkillsMatrix:** 3 columns (Strong/Moderate/Gaps)
- **FitAssessment:** JD textarea → analyze → honest assessment
- **ChatDrawer:** Slide-in with pre-seeded tough questions

### Admin Pages
- **ProfileForm:** Basic profile editing
- **ExperienceForm:** Add/edit AI context per role
- **SkillsForm:** Categorize skills, add honest notes
- **GapsForm:** Explicit weaknesses documentation

## Data Flow

```
User Input → React Hook → Supabase Edge Function
                                      ↓
                         1. Fetch all candidate context
                         2. Build system prompt
                         3. Call OpenAI API
                         4. Return response
                                      ↓
                                Frontend display
```

## LinkedIn Import

Script reads from `linkedindata_basic/`:
- Profile.csv → candidate_profile
- Positions.csv → experiences
- Skills.csv → skills
- Certifications.csv → certifications
- Recommendations_Received.csv → social proof

AI context fields left NULL for manual entry via admin panel.

## Design System

```css
--bg-primary: #0a0a0a
--bg-card: #141414
--accent-teal: #4ade80
--accent-amber: #d4a574
--font-heading: 'Playfair Display', serif
--font-body: 'Inter', sans-serif
```

## Environment Variables

```bash
# Frontend (.env)
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# Supabase secrets
OPENAI_API_KEY=your-key
```

## Deployment

1. **Frontend:** Build → push to gh-pages branch → GitHub Pages
2. **Backend:** Supabase CLI deploy functions
3. **DNS:** CNAME record for resume.billgleeson.com

## AI Behavior: Brutal Honesty

The AI must:
- Directly state when Bill lacks a requirement
- Use phrases like "I'm probably not your person"
- Never hedge or oversell
- Recommend NOT hiring when appropriate

Example calibration:
```
Good: "I should be upfront - I don't have mobile experience.
       You probably want someone who can hit the ground running.
       I'm not your person for this role."
```
