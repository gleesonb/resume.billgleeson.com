# Resume.billgleeson.com - Pick Up Tomorrow

**Status:** PROJECT COMPLETE ✅ - Ready for GitHub push and deployment
**Date:** 2025-02-16

---

## Quick Start Tomorrow

```bash
cd /mnt/c/dev/html/billgleeson
```

---

## Deployment Checklist

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "feat: AI-powered portfolio website with honest fit assessment

- React + Vite frontend with Tailwind CSS
- Supabase backend with PostgreSQL and Edge Functions
- OpenAI integration for chat and JD analysis
- LinkedIn CSV import utility
- Admin panel for content management
- GitHub Pages CI/CD deployment

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

### 2. Create GitHub Repository
- Go to github.com/gleesonb and create new repo `resume.billgleeson.com`
- Don't initialize with README (we have one)

### 3. Push to GitHub
```bash
git remote add origin git@github.com:gleesonb/resume.billgleeson.com.git
git branch -M main
git push -u origin main
```

### 4. Configure GitHub Secrets
In repo settings → Secrets and variables → Actions:
```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Set Up Supabase
- Create project at supabase.com
- Copy `supabase/schema.sql` and run in SQL Editor
- Deploy Edge Functions:
  ```bash
  supabase functions deploy chat
  supabase functions deploy analyze-jd
  ```
- Add secret: `OPENAI_API_KEY` = sk-...

### 6. Enable GitHub Pages
- Settings → Pages
- Source: GitHub Actions
- Select branch: main

### 7. DNS Configuration
- Add CNAME record: `resume.billgleeson.com` → `[your-username].github.io`
- Or configure A record if using apex domain

---

## Project Structure

```
resume.billgleeson.com/
├── frontend/                 # React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/      # Navbar, Footer, Layout
│   │   │   ├── sections/    # Hero, Experience, SkillsMatrix, FitAssessment
│   │   │   ├── chat/        # ChatDrawer, ChatMessage, ChatInput
│   │   │   └── admin/       # AdminLayout, ProfileForm, ExperienceForm
│   │   ├── hooks/           # React Query hooks, Zustand stores
│   │   ├── lib/             # Supabase client
│   │   ├── types/           # TypeScript interfaces
│   │   ├── pages/           # App.tsx, Admin pages
│   │   └── main.tsx         # Router with QueryClientProvider
│   ├── .github/workflows/  # GitHub Actions for deployment
│   ├── public/CNAME         # resume.billgleeson.com
│   ├── package.json
│   ├── vite.config.ts
│   ├── README.md
│   └── CLAUDE.md
├── supabase/
│   ├── schema.sql           # Complete database schema
│   └── functions/
│       ├── chat/index.ts  # AI chat Edge Function
│       └── analyze-jd/index.ts  # JD analyzer Edge Function
├── scripts/
│   └── import-linkedin/     # LinkedIn CSV importer
│       ├── index.ts
│       ├── package.json
│       └── .env.example
└── linkedindata_basic/        # LinkedIn CSV exports
```

---

## Environment Variables Reference

**Frontend** (.env or GitHub secrets):
```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Supabase Edge Functions** (supabase.com → Edge Functions → Secrets):
```bash
OPENAI_API_KEY=sk-proj-...
```

**LinkedIn Import** (local only, not committed):
```bash
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Development Commands

```bash
cd frontend

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev              # http://localhost:5173

# Production build
npm run build            # Creates dist/

# Preview production build
npm run preview          # http://localhost:4173

# Type checking
npx tsc --noEmit
```

---

## Key Files to Reference

**For Supabase Setup:**
- `supabase/schema.sql` - Run this in SQL Editor

**For Deployment:**
- `.github/workflows/deploy.yml` - CI/CD workflow
- `frontend/public/CNAME` - Custom domain

**For Importing LinkedIn Data:**
- `scripts/import-linkedin/README.md`

**For Admin Panel:**
- Visit `/admin` after data import
- Edit profile, add AI context to experiences

---

## Important Implementation Details

### AI Behavior - "Brutal Honesty"
The Edge Functions include system prompts that instruct the AI to:
- Say "I'm probably not your person for this" when appropriate
- Never hedge or use weasel words
- Be direct about gaps and weaknesses
- Recommend NOT hiring when the fit isn't right

### LinkedIn Data Import
The script reads from `linkedindata_basic/` folder:
- `Profile.csv` → candidate_profile
- `Positions.csv` → experiences
- `Skills.csv` → skills (all marked 'moderate' initially)
- `Certifications.csv` → certifications

After import, use `/admin` to:
1. Categorize skills as Strong/Moderate/Gaps
2. Add AI context to experiences (why_joined, why_left, etc.)
3. Document gaps and weaknesses

### Color Scheme (for customizations)
```css
--bg-primary: #0a0a0a
--card: #141414
--accent-teal: #4ade80
--accent-amber: #d4a574
--text-secondary: #a1a1aa
--border: #27272a
```

---

## Testing the Site Locally

```bash
cd frontend
npm run dev
```

Then visit:
- http://localhost:5173 - Main site
- http://localhost:5173/#experience - Experience section
- http://localhost:5173/#fit-check - Fit Assessment
- http://localhost:5173/admin - Admin panel

**Note:** Chat and JD analysis require Supabase credentials to work.

---

## Final Notes

- The site is fully functional and ready to deploy
- All TypeScript compiles without errors
- Build completes successfully
- The dev server is already running (background task completed)

**Tomorrow's primary task:** Push to GitHub and configure deployment.

---

**Need Help?**
- All code is in `/mnt/c/dev/html/billgleeson/`
- Design doc: `docs/plans/2025-02-16-resume-site-design.md`
- Implementation plan: `docs/plans/2025-02-16-resume-site-implementation.md`
- This file: `PICKUP_TOMORROW.md`
