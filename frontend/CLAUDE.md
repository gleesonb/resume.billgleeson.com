# Claude AI Development Guide

This file contains project-specific conventions, build commands, and deployment information for AI-assisted development.

## Project Overview

**Resume Frontend Application** - A modern resume website built with React, TypeScript, Vite, and Supabase.

**Tech Stack**:
- React 18 + TypeScript
- Vite 5 (build tool)
- Tailwind CSS 3.4
- Supabase (backend + real-time)
- Zustand (state management)
- TanStack Query (data fetching)
- React Router DOM v7

## Development Commands

### Primary Commands

```bash
# Install dependencies
npm install

# Start development server (with HMR)
npm run dev
# Server: http://localhost:5173
# Network: http://<local-ip>:5173
# Hot Module Replacement: Enabled

# Production build
npm run build
# Output: dist/
# Includes: TypeScript compilation + bundling + sourcemaps

# Preview production build locally
npm run preview
# Serves the dist/ folder locally

# Run linter
npm run lint
# Checks: TypeScript/TSX files
# Policy: Zero warnings (fails on warnings)
```

### Development Workflow

1. **Start Development**: `npm run dev`
2. **Make Changes**: Edit files in `src/`
3. **See Updates**: HMR updates automatically (no manual refresh)
4. **Check Types**: TypeScript checks in real-time in IDE
5. **Lint Before Commit**: `npm run lint`
6. **Test Build**: `npm run build` before pushing

## Code Conventions

### TypeScript

- **Type Syntax**: Use modern TypeScript 3.12+ syntax
  ```typescript
  // Good
  name: string | null
  items: string[]
  callback: () => void

  // Avoid
  name: string | undefined (use null instead)
  items: Array<string> (use [] syntax)
  ```

- **Strict Mode**: Enabled in `tsconfig.json`
  - `strict: true`
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noFallthroughCasesInSwitch: true`

- **Type Imports**: Use `import type` for type-only imports
  ```typescript
  import type { Profile, Experience } from './types'
  ```

### React Components

- **Functional Components**: Only use functional components with hooks
- **Props Destructuring**: Destructure props in function signature
  ```typescript
  interface Props {
    title: string
    onSave: () => void
  }

  export function Component({ title, onSave }: Props) {
    // ...
  }
  ```

- **Component Files**: Use `.tsx` extension for components with JSX
- **Hooks**: Follow React Hooks rules (no conditional calls)

### File Organization

```
src/
├── components/          # Group by feature
│   ├── admin/          # Admin feature components
│   ├── chat/           # Chat feature components
│   ├── layout/         # Layout components
│   └── sections/       # Page section components
├── hooks/              # Custom React hooks
├── lib/                # Utilities, configurations
│   └── supabase/       # Supabase-specific code
└── stores/             # Zustand state stores
```

- **Index Files**: Use `index.ts` to export from directories (clean imports)
- **Barrel Exports**: Prefer named exports over default exports

### State Management

- **Server State**: Use TanStack Query (`useQuery`, `useMutation`)
- **Client State**: Use Zustand stores
- **Form State**: Use controlled components with React state

```typescript
// Server data fetching
const { data, isLoading, error } = useQuery({
  queryKey: ['profile'],
  queryFn: () => supabase.from('profiles').select('*').single()
})

// Client state (Zustand)
const { isOpen, toggle } = useChatStore()
```

### Styling

- **Utility-First**: Use Tailwind CSS classes
- **Responsive**: Mobile-first approach with Tailwind breakpoints
- **Dark Mode**: Not currently implemented (future enhancement)

```typescript
// Example Tailwind usage
<div className="container mx-auto px-4 py-8">
  <h1 className="text-2xl font-bold text-gray-900">
    Content
  </h1>
</div>
```

### Error Handling

- **Async Functions**: Use try-catch blocks
- **API Errors**: Check for errors in Supabase responses

```typescript
async function fetchData() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}
```

## Build & Deployment

### Build Process

1. **TypeScript Compilation**: `tsc` checks all types
2. **Vite Bundling**: Creates optimized production bundle
3. **Output**: `dist/` directory
4. **Source Maps**: Generated for debugging

```bash
npm run build
```

**Build Output**:
```
dist/
├── index.html          # Entry point
├── assets/             # Bundled JS/CSS
│   ├── index-[hash].js
│   └── index-[hash].css
└── ...other assets
```

### Deployment Options

#### 1. GitHub Pages

**Manual Deployment**:
```bash
# Build
npm run build

# Update base path in vite.config.ts if needed
base: '/your-repo-name/',

# Push to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

**GitHub Actions** (Automatic):
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Configuration**:
- Set `base` path in `vite.config.ts` if deploying to a subdirectory
- Add environment variables in GitHub repository settings

#### 2. Netlify

**Build Settings**:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment variables**: Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**netlify.toml** (optional):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

#### 3. Vercel

**Build Settings**:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: Add in Vercel dashboard

#### 4. Cloudflare Pages

**Build Settings**:
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Environment variables**: Add in Cloudflare dashboard

### Environment Variables in Production

**Required Variables** (set in deployment platform):
```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Important**:
- All client-side variables must start with `VITE_`
- Never commit `.env` files
- Use `.env.example` as a template

### Pre-Deployment Checklist

- [ ] Run `npm run lint` - fix all warnings
- [ ] Run `npm run build` - ensure successful build
- [ ] Run `npm run preview` - test production build locally
- [ ] Set environment variables in deployment platform
- [ ] Verify Supabase connection works
- [ ] Test all features (hero, experience, skills, chat, admin)
- [ ] Check responsive design on mobile devices
- [ ] Verify database RLS policies are set correctly

## Database (Supabase)

### Schema Location
- **File**: `supabase/schema.sql`
- **Contains**: Tables, types, RLS policies, triggers

### Running Schema
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `supabase/schema.sql`
3. Execute the script

### Database Tables
- **profiles**: User profile information
- **experiences**: Work experience entries
- **skills**: Technical and soft skills

### Row Level Security (RLS)
- Enabled on all tables
- Policies defined in `schema.sql`
- Ensure proper policies before deploying

## Testing

### Manual Testing Checklist

**Development**:
- [ ] Dev server starts without errors (`npm run dev`)
- [ ] HMR works on file changes
- [ ] No console errors in browser
- [ ] TypeScript types are correct

**Build**:
- [ ] Build completes successfully
- [ ] Output size is reasonable
- [ ] Preview works correctly

**Features**:
- [ ] Hero section displays profile info
- [ ] Experience section loads data
- [ ] Skills matrix displays skills
- [ ] Fit assessment chat works
- [ ] Admin panel CRUD operations work
- [ ] Real-time updates work (Supabase subscriptions)

## Troubleshooting

### Common Build Issues

**TypeScript Errors**:
```bash
# Check specific errors
npm run build

# View detailed TypeScript output
npx tsc --noEmit
```

**Import Errors**:
- Ensure all imports use correct paths
- Check `tsconfig.json` for path aliases
- Verify file extensions match imports

**Missing Dependencies**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Deployment Issues

**404 Errors**:
- Check `base` path in `vite.config.ts`
- Ensure all assets are in `dist/`
- Verify deployment platform settings

**Environment Variables Not Working**:
- Ensure variables start with `VITE_`
- Re-deploy after adding variables
- Check platform's variable settings UI

**Supabase Connection Issues**:
- Verify URL and key are correct
- Check Supabase project is active
- Ensure RLS policies allow access
- Check browser console for specific errors

## Git Workflow

### Branching Strategy
- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: Feature branches
- `fix/*`: Bugfix branches

### Commit Message Format
```
type(scope): description

# Types: feat, fix, docs, style, refactor, test, chore

# Examples
feat(admin): add experience form validation
fix(chat): resolve message display bug
docs(readme): update deployment instructions
```

### Before Committing
```bash
# Lint code
npm run lint

# Build to check for errors
npm run build

# Stage and commit
git add .
git commit -m "type(scope): description"
```

## Performance Considerations

- **Bundle Size**: Monitor with `npm run build`
- **Lazy Loading**: Use React.lazy() for large components
- **Image Optimization**: Use WebP format when possible
- **Caching**: Supabase queries are cached with React Query
- **Code Splitting**: Vite does this automatically

## Security Best Practices

- **Environment Variables**: Never expose sensitive keys in client code
- **RLS Policies**: Enable on all Supabase tables
- **API Keys**: Use Supabase anon key (not service_role key) in frontend
- **Authentication**: Implement Supabase Auth for admin panel
- **Input Validation**: Validate all user inputs
- **XSS Prevention**: React automatically escapes JSX content

## AI Development Tips

When using Claude Code or other AI assistants:

1. **Context First**: Always provide relevant context from this file
2. **Type Safety**: Request TypeScript types for all new code
3. **Testing**: Ask for test cases if appropriate
4. **Documentation**: Request inline comments for complex logic
5. **Refactoring**: AI can suggest improvements, but review carefully
6. **Dependencies**: AI should suggest adding new dependencies only when necessary

### Example Prompts

```
# Add new feature
"Create a new component for displaying project cards with title, description, and tags. Use TypeScript types, Tailwind CSS for styling, and follow the project conventions in CLAUDE.md."

# Fix bug
"The chat messages aren't displaying timestamps. Can you fix the ChatMessage component to show when each message was sent?"

# Refactor
"Can you refactor the ExperienceSection to use TanStack Query for data fetching instead of useEffect?"

# Add tests
"Write unit tests for the useProfile hook using the testing conventions in CLAUDE.md"
```

## Additional Resources

- [Vite Guide](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)
- [Supabase Client Docs](https://supabase.com/docs/reference/javascript)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
