# HeroSection Component

A fully-featured hero section component for portfolio/resume websites with animated status badges, company pills, and call-to-action buttons.

## Features

- **Status Badge**: Animated availability indicator with ping effect
- **Responsive Design**: Mobile-first approach with breakpoints for sm, md, lg
- **Company Pills**: Display featured companies with hover effects
- **CTA Buttons**: Primary and secondary action buttons with smooth scroll
- **Visual Effects**: Gradient background, grid pattern overlay, scroll indicator
- **Accessibility**: Semantic HTML with proper ARIA attributes

## Props

```typescript
interface HeroSectionProps {
  profile: CandidateProfile;
}
```

### `profile` (required)

A `CandidateProfile` object containing:
- `id`: string
- `name`: string
- `email`: string
- `title`: string
- `headline`: string
- `summary`: string
- `location`: string
- `github_url`: string (optional)
- `linkedin_url`: string (optional)
- `availability_status`: string

## Usage

### Basic Usage

```tsx
import HeroSection from '@/components/sections/HeroSection';
import { CandidateProfile } from '@/types';

function MyComponent() {
  const profile: CandidateProfile = {
    id: '1',
    name: 'Bill Gleeson',
    email: 'bill@example.com',
    title: 'Senior Software Engineer',
    headline: 'Building scalable systems that drive business impact',
    summary: 'Experienced software engineer...',
    location: 'San Francisco, CA',
    availability_status: 'Available',
  };

  return <HeroSection profile={profile} />;
}
```

### With Data Hook

```tsx
import HeroSection from '@/components/sections/HeroSection';
import { useCandidateProfile } from '@/hooks/useCandidateProfile';

function AppHero() {
  const { profile, loading, error } = useCandidateProfile();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  if (!profile) return <div>No profile found</div>;

  return <HeroSection profile={profile} />;
}
```

## Customization

### Company Pills

The component uses mock company data by default. To customize:

```tsx
// In HeroSection.tsx, modify the featuredCompanies array:
const featuredCompanies = [
  'Your Company 1',
  'Your Company 2',
  'Your Company 3',
];
```

Or pass as a prop by extending the component interface:

```typescript
interface HeroSectionProps {
  profile: CandidateProfile;
  featuredCompanies?: string[];
}
```

### Availability Status Colors

The component automatically colors the status badge based on availability:
- **Available/Open to opportunities**: Teal with ping animation
- **Employed/Not looking**: Gray
- **Other**: Amber

### CTA Button Actions

Buttons scroll to sections by ID:
- Primary button: `#chat`
- Secondary button: `#experience`

Modify the `scrollToSection` function to change behavior.

## Styling

The component uses:
- **Tailwind CSS** for utility classes
- **Custom animations** defined in `src/index.css`:
  - `animate-fade-in`: Slide up + fade in
  - `animate-bounce`: Bouncing scroll indicator
  - `animate-ping`: Pulsing status dot

### Color Scheme

Uses custom Tailwind colors:
- `background`: #0a0a0a
- `card`: #141414
- `accent-teal`: #4ade80
- `accent-amber`: #d4a574
- `text-secondary`: #a1a1aa
- `border`: #27272a

## Responsive Breakpoints

- **Mobile** (< 640px): Single column, stacked buttons
- **sm** (640px+): Adjusted text sizes
- **lg** (1024px+): Larger headings, max width constrained

## Accessibility

- Semantic HTML (`<section>`, `<h1>`, `<button>`)
- Proper heading hierarchy
- Keyboard navigation support
- ARIA labels on interactive elements
- Sufficient color contrast

## Dependencies

- `lucide-react`: Icon library (ArrowRight icon)
- React 18+

## File Structure

```
src/components/sections/
├── HeroSection.tsx          # Main component
├── HeroSection.example.tsx  # Usage examples
└── HeroSection.README.md    # This file
```

## Future Enhancements

Potential improvements:
- Add parallax scrolling effect
- Option for hero background image
- Social media links in hero
- Animated text typing effect for headline
- Dark/light mode toggle
- Customizable animation timings
