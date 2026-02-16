# HeroSection Integration Guide

## Quick Start

### 1. Import the Component

```tsx
import HeroSection from '@/components/sections/HeroSection';
// OR
import { HeroSection } from '@/components/sections';
```

### 2. Prepare Your Data

Ensure you have a `CandidateProfile` object:

```tsx
import { CandidateProfile } from '@/types';

const profile: CandidateProfile = {
  id: '1',
  name: 'Bill Gleeson',
  email: 'bill@example.com',
  title: 'Senior Software Engineer',
  headline: 'Building scalable systems that drive business impact',
  summary: 'Your professional summary...',
  location: 'San Francisco, CA',
  github_url: 'https://github.com/billgleeson',
  linkedin_url: 'https://linkedin.com/in/billgleeson',
  availability_status: 'Available',
};
```

### 3. Use in Your App

```tsx
function App() {
  return (
    <Layout>
      <HeroSection profile={profile} />
      {/* Other sections... */}
    </Layout>
  );
}
```

## Integration Examples

### Example 1: Static Data

```tsx
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import { CandidateProfile } from '@/types';

const STATIC_PROFILE: CandidateProfile = {
  id: '1',
  name: 'Bill Gleeson',
  email: 'bill@example.com',
  title: 'Senior Software Engineer',
  headline: 'Building scalable systems that drive business impact',
  summary: 'Experienced software engineer...',
  location: 'San Francisco, CA',
  availability_status: 'Available',
};

function App() {
  return (
    <Layout>
      <HeroSection profile={STATIC_PROFILE} />
    </Layout>
  );
}

export default App;
```

### Example 2: With Supabase Data Hook

```tsx
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import { useCandidateProfile } from '@/hooks/useCandidateProfile';

function App() {
  const { profile, loading, error } = useCandidateProfile();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-text-secondary">Loading profile...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500">Error: {error.message}</div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-text-secondary">No profile found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <HeroSection profile={profile} />
      {/* Other sections */}
    </Layout>
  );
}

export default App;
```

### Example 3: With Loading Skeleton

```tsx
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import { useCandidateProfile } from '@/hooks/useCandidateProfile';

function HeroSkeleton() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <div className="h-8 w-32 bg-card rounded-full mx-auto animate-pulse" />
        <div className="h-20 w-96 bg-card rounded-lg mx-auto animate-pulse" />
        <div className="h-6 w-64 bg-card rounded-lg mx-auto animate-pulse" />
      </div>
    </section>
  );
}

function App() {
  const { profile, loading } = useCandidateProfile();

  return (
    <Layout>
      {loading ? <HeroSkeleton /> : <HeroSection profile={profile} />}
    </Layout>
  );
}
```

## Required Sections for CTA Buttons

The HeroSection's CTA buttons scroll to these section IDs. Make sure they exist:

```tsx
function App() {
  return (
    <Layout>
      <HeroSection profile={profile} />

      {/* Required for "Let's Talk" button */}
      <section id="chat">
        <ChatDrawer />
      </section>

      {/* Required for "View Experience" button */}
      <section id="experience">
        <ExperienceSection experiences={experiences} />
      </section>

      {/* Other sections... */}
    </Layout>
  );
}
```

## Customization Options

### Change CTA Button Targets

```tsx
// In HeroSection.tsx, modify the scrollToSection calls:
<button onClick={() => scrollToSection('contact')}>
  Contact Me
</button>
<button onClick={() => scrollToSection('projects')}>
  View Projects
</button>
```

### Customize Company Pills

```tsx
// Option 1: Hardcode different companies
const featuredCompanies = [
  'Company A',
  'Company B',
  'Company C',
];

// Option 2: Extract from experience data
const featuredCompanies = experiences
  .filter(exp => exp.is_current || exp.proudest_achievement)
  .slice(0, 3)
  .map(exp => exp.company_name);
```

### Modify Availability Status

```tsx
// Update your profile data:
const profile = {
  // ... other fields
  availability_status: 'Open to opportunities', // Custom message
  // or
  availability_status: 'Available for contract work',
};
```

## Styling Customization

### Override Colors

If you want different accent colors, update `tailwind.config.js`:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        'accent-teal': '#your-color',
        'accent-amber': '#your-color',
        // ... other colors
      },
    },
  },
};
```

### Adjust Animation Speed

Update `src/index.css`:

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards; /* Changed from 0.6s */
}
```

## Testing Your Integration

### 1. Visual Test
```tsx
import HeroSection from '@/components/sections/HeroSection';
import { CandidateProfile } from '@/types';

const testProfile: CandidateProfile = {
  id: 'test',
  name: 'Test User',
  email: 'test@example.com',
  title: 'Test Title',
  headline: 'Test Headline',
  summary: 'Test',
  location: 'Test Location',
  availability_status: 'Available',
};

export default function TestHero() {
  return <HeroSection profile={testProfile} />;
}
```

### 2. Responsive Test
- View on mobile (< 640px)
- View on tablet (640px - 1024px)
- View on desktop (> 1024px)

### 3. Interaction Test
- Click "Let's Talk" - should scroll to #chat
- Click "View Experience" - should scroll to #experience
- Hover over buttons - should see animations
- Hover over company pills - should see color change

### 4. Accessibility Test
- Tab through buttons
- Check keyboard navigation
- Verify screen reader announces content properly

## Common Issues & Solutions

### Issue: Buttons don't scroll
**Solution**: Ensure target sections have matching IDs:
```tsx
<section id="chat">...</section>
<section id="experience">...</section>
```

### Issue: Status badge wrong color
**Solution**: Check `availability_status` value matches cases in `getAvailabilityBadgeColor()`

### Issue: Text overflows on mobile
**Solution**: Already handled with responsive text sizes. If still an issue, reduce headline length.

### Issue: Animations not smooth
**Solution**: Check browser supports CSS animations. Reduce animation complexity if needed.

## Next Steps

After integrating HeroSection:
1. Add Experience section
2. Add Skills Matrix
3. Add Fit Assessment
4. Add Chat Drawer
5. Test full page flow
6. Deploy and verify

## Support

For issues or questions:
- Check the main README: `HeroSection.README.md`
- View visual preview: `HeroSection.PREVIEW.md`
- See usage examples: `HeroSection.example.tsx`
