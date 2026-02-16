# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a specification for an AI-powered portfolio website with an "honest fit assessment" feature. The core concept: employers interact with an AI that knows everything about the candidate, and the AI is trained to be BRUTALLY HONEST—even telling employers when the candidate is NOT a good fit. This paradoxically builds trust and qualifies leads.

**Key insight:** The AI IS the product. Everything else is UI to invoke it.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│                    (React/Lovable App)                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   SUPABASE BACKEND                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              PostgreSQL Database                     │   │
│  │  - candidate_profile (single row, it's YOUR site)    │   │
│  │  - experiences[] (with private AI context fields)    │   │
│  │  - skills[] (strong/moderate/gap categories)         │   │
│  │  - gaps_weaknesses (explicit weaknesses)             │   │
│  │  - faq_responses[] (pre-written answers)             │   │
│  │  - ai_instructions (anti-sycophancy directives)      │   │
│  │  - chat_history[]                                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Edge Functions                          │   │
│  │  - /api/chat (handles AI chat)                      │   │
│  │  - /api/analyze-jd (handles fit assessment)         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    LLM API                                  │
│            (OpenAI GPT-4 or Anthropic Claude)               │
└─────────────────────────────────────────────────────────────┘
```

## Public Site Sections

1. **Hero Section** - Name, title, status badge, company pills, "Ask AI About Me" CTA
2. **Experience Section** - Cards with expandable "AI Context" panels showing:
   - SITUATION, APPROACH, TECHNICAL WORK, LESSONS LEARNED
3. **Skills Matrix** - Three columns: Strong (green), Moderate (gray), Gaps (amber)
4. **JD Analyzer** - Textarea to paste job description, returns honest fit assessment with gaps
5. **AI Chat Drawer** - Slides from right, pre-seeded with tough questions

## Admin Panel (/admin)

Where the candidate inputs ALL context that powers the AI:

- **Basic Profile** - Name, titles, target stages, salary, social links
- **Professional Narrative** - Elevator pitch, career story, what you're known for
- **Experience Deep Dive** - For each role:
  - Public: bullets shown on site
  - Private (AI context): why joined/left, actual contributions, proudest, would do differently, challenges, lessons, manager/reports perspective
- **Skills Self-Assessment** - Skill name, self-rating, evidence, HONEST notes (e.g., "rusty, haven't used in 2 years")
- **Gaps & Weaknesses (CRITICAL)** - Known skill gaps, bad-fit roles, past feedback
- **Values & Culture Fit** - Must-haves, dealbreakers, work style preferences
- **Anti-Sycophancy Instructions** - "Never oversell me", "It's okay to recommend they not hire me"

## AI Behavior: Brutal Honesty

The hardest technical challenge is preventing sycophancy. The AI must:
- Directly state when the candidate lacks a requirement
- Use phrases like "I'm probably not your person for this role"
- Never hedge or use weasel words
- Recommend NOT hiring when appropriate

**Example calibration:**
```
Good: "I should be upfront - I don't have mobile development experience.
       My background is entirely backend. You probably want someone who can
       hit the ground running. I'm not your person for this role."

Bad:  "While I haven't done mobile specifically, my strong engineering
       fundamentals would allow me to pick it up quickly..."
```

## Environment Variables

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
ANTHROPIC_API_KEY=sk-ant-... (in Supabase secrets, NOT frontend)
```

## Design System

- Background: `#0a0a0a` (near-black)
- Primary accent: `#4ade80` (teal/mint for CTAs)
- Secondary: `#d4a574` (warm amber for warnings/gaps)
- Typography: Playfair Display (headings), Inter (body)
- Cards: Subtle borders, rounded corners, glass-morphism effects

## References

See `PROMPT.md` for the complete specification including database schema, Edge Function implementations, and deployment checklist.
