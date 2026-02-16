# Resume Frontend Application

A modern, responsive resume website built with React, TypeScript, and Tailwind CSS. Features real-time data synchronization via Supabase, role-based admin panel for content management, and an interactive AI-powered fit assessment tool.

## Features

- **Dynamic Resume Display**: Personalized hero section with profile information and skills
- **Professional Experience**: Interactive timeline of work experience with company details and achievements
- **Skills Matrix**: Visual representation of technical and soft skills with proficiency levels
- **Fit Assessment Tool**: AI-powered chat interface to evaluate job fit against your profile
- **Real-time Data**: Supabase integration for instant content updates
- **Admin Panel**: Role-based content management system for CRUD operations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type-Safe**: Full TypeScript implementation for reliability

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Backend**: Supabase (PostgreSQL database + real-time subscriptions)
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Code Quality**: ESLint with TypeScript support

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Supabase Account**: Free account at [supabase.com](https://supabase.com)

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**To get your Supabase credentials:**

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project or select an existing one
3. Navigate to **Settings** → **API**
4. Copy the **Project URL** and `anon` public key
5. Paste them into your `.env` file

### 4. Set Up the Database

Run the provided SQL schema in your Supabase SQL Editor:

```bash
# Navigate to Supabase Dashboard → SQL Editor
# Copy and paste the contents of supabase/schema.sql
# Execute the script
```

The schema includes:
- `profiles` table (user profiles)
- `experiences` table (work experience)
- `skills` table (technical and soft skills)
- Row Level Security (RLS) policies
- Storage configuration for profile images

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:5173
- **Network**: http://your-local-ip:5173

## Available Scripts

### `npm run dev`
Starts the Vite development server with hot module replacement (HMR).

- **Port**: 5173 (default)
- **Network Access**: Enabled (accessible from other devices on the same network)
- **Hot Reload**: Enabled for instant updates

### `npm run build`
Compiles TypeScript and creates an optimized production build.

- TypeScript compilation for type checking
- Bundles code for production
- Outputs to `dist/` directory
- Includes source maps for debugging

### `npm run preview`
Preview the production build locally.

- Serves the production build from `dist/`
- Useful for testing before deployment
- Runs on a local server

### `npm run lint`
Runs ESLint to check code quality.

- Checks TypeScript and TSX files
- Reports unused variables and imports
- Enforces code style consistency
- Fails on warnings (zero-warning policy)

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── admin/          # Admin panel components
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminPage.tsx
│   │   │   ├── ExperienceForm.tsx
│   │   │   └── ProfileForm.tsx
│   │   ├── chat/           # Chat/fit assessment components
│   │   │   ├── ChatDrawer.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── ChatMessage.tsx
│   │   ├── layout/         # Layout components
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── Navbar.tsx
│   │   └── sections/       # Page sections
│   │       ├── ExperienceCard.tsx
│   │       ├── ExperienceSection.tsx
│   │       ├── FitAssessment.tsx
│   │       ├── HeroSection.tsx
│   │       └── SkillsMatrix.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── use-admin.ts
│   │   ├── use-experience.ts
│   │   ├── use-fit-assessment.ts
│   │   ├── use-profile.ts
│   │   └── use-skills.ts
│   ├── lib/                # Utilities and configurations
│   │   ├── supabase/
│   │   │   ├── client.ts   # Supabase client initialization
│   │   │   └── types.ts    # TypeScript type definitions
│   │   └── utils.ts        # Utility functions
│   ├── stores/             # Zustand state stores
│   │   └── chat-store.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Application entry point
│   └── vite-env.d.ts       # Vite environment types
├── supabase/               # Database schema and scripts
│   └── schema.sql          # Database setup script
├── public/                 # Static assets
├── dist/                   # Production build output
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Project dependencies
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

## Configuration Files

### TypeScript Configuration (`tsconfig.json`)
- Target: ES2020
- Strict mode enabled
- JSX: react-jsx (automatic runtime)
- Module resolution: bundler mode

### Tailwind Configuration (`tailwind.config.js`)
- Content: All TypeScript/TSX files in `src/`
- Theme: Custom color palette and spacing
- Plugins: None (using base Tailwind)

### Vite Configuration (`vite.config.ts`)
- Plugin: React with Fast Refresh (HMR)
- Server: Port 5173, network access enabled
- Build: Output to `dist/`, source maps enabled

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Yes |

All environment variables must start with `VITE_` to be accessible in the client-side code.

## Database Schema

### Profiles Table
```sql
- id: uuid (primary key, references auth.users)
- email: text
- full_name: text
- title: text
- bio: text
- location: text
- website_url: text
- linkedin_url: text
- github_url: text
- avatar_url: text
- created_at: timestamp
- updated_at: timestamp
```

### Experiences Table
```sql
- id: uuid (primary key)
- profile_id: uuid (foreign key)
- company: text
- title: text
- location: text
- start_date: date
- end_date: date (nullable)
- current_job: boolean
- description: text
- created_at: timestamp
- updated_at: timestamp
```

### Skills Table
```sql
- id: uuid (primary key)
- profile_id: uuid (foreign key)
- name: text
- category: text ('technical' | 'soft')
- proficiency: integer (1-5)
- created_at: timestamp
```

## Admin Panel

The admin panel provides role-based content management. To access it:

1. Navigate to `/admin` in the application
2. You'll need to implement authentication (check Supabase Auth docs)
3. Once authenticated, you can:
   - Edit profile information
   - Add/edit/delete work experiences
   - Manage skills
   - Upload profile images

**Note**: Row Level Security (RLS) is enabled. Ensure you set up proper policies in Supabase.

## Deployment

### GitHub Pages

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Update `vite.config.ts` base path** (if deploying to a subdirectory):
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... other config
   })
   ```

3. **Deploy using GitHub Actions** or manual push:
   - Push the `dist/` folder to your `gh-pages` branch
   - Or use GitHub Actions for automatic deployment

### Netlify/Vercel

1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. **Environment variables**: Add the same variables as in `.env`

### Cloudflare Pages

1. **Build command**: `npm run build`
2. **Build output directory**: `dist`
3. **Environment variables**: Add the same variables as in `.env`

## Troubleshooting

### Common Issues

**Issue**: "Cannot find module '@supabase/supabase-js'"
- **Solution**: Run `npm install` to ensure all dependencies are installed

**Issue**: "VITE_SUPABASE_URL is not defined"
- **Solution**: Ensure you've created a `.env` file with the required variables

**Issue**: Build fails with TypeScript errors
- **Solution**: Run `npm run build` to see detailed TypeScript errors, fix them, and rebuild

**Issue**: Images not loading in production
- **Solution**: Check that image paths are correct and images are in the `public/` folder or properly stored in Supabase Storage

**Issue**: Supabase connection errors
- **Solution**: Verify your Supabase URL and anon key are correct in `.env`, and that your Supabase project is active

### Development Tips

- **Hot Reload**: Vite's HMR is fast - changes appear instantly without full page reload
- **Type Safety**: TypeScript will catch errors at compile time
- **Console Errors**: Check browser console for runtime errors
- **Network Tab**: Use browser DevTools Network tab to debug API calls
- **Supabase Dashboard**: Monitor real-time connections and database activity

## Learning Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions:

- Check the Troubleshooting section above
- Review the code comments and documentation
- Open an issue on GitHub
- Check Supabase and Vite documentation for common problems

## Acknowledgments

Built with modern web technologies and community-driven tools:
- Vite team for the blazing-fast build tool
- Supabase team for the backend-as-a-service platform
- Tailwind CSS team for the utility-first CSS framework
- React team for the amazing UI library
