# Experience Section Components

This directory contains the Experience section components for the portfolio application.

## Components

### ExperienceSection

The main section component that displays a list of experience cards.

**Props:**
- `experiences: Experience[]` - Array of experience objects from the database

**Features:**
- Automatically sorts experiences by date (most recent first)
- Responsive layout with centered max-width container
- Section header with title and description
- Empty state handling when no data is available
- Smooth scroll navigation via `#experience` anchor

**Usage:**
```tsx
import { ExperienceSection } from '@/components/sections';

function App() {
  const { experiences } = useCandidateData();

  return (
    <main>
      <HeroSection />
      <ExperienceSection experiences={experiences} />
    </main>
  );
}
```

### ExperienceCard

Individual card component for displaying a single experience entry.

**Props:**
- `experience: Experience` - A single experience object from the database

**Features:**
- Company name and title display
- Location and date information
- Current position badge indicator
- Expandable AI Context section with smooth animations
- Visual indicators for different types of content
- Responsive design for mobile and desktop

**AI Context Fields (Optional):**
The card will display an expandable section if any of these fields are present:
- `why_joined` - Motivation for joining the company
- `why_left` - Reasons for leaving
- `actual_contributions` - Real impact made
- `proudest_achievement` - Highlight accomplishments
- `challenges_faced` - Obstacles overcome
- `lessons_learned` - Key takeaways

**Visual Design:**
- Dark theme with card background (#141414)
- Teal accent color (#4ade80) for interactive elements
- Amber accent (#d4a574) for achievement highlights
- Subtle hover effects and transitions
- Clean typography with Playfair Display headings

## Data Structure

```typescript
interface Experience {
  id: string;
  company_name: string;
  title: string;
  description: string;
  location: string;
  started_on: string;
  finished_on?: string;
  is_current: boolean;

  // AI Context fields (optional)
  why_joined?: string;
  why_left?: string;
  actual_contributions?: string;
  proudest_achievement?: string;
  challenges_faced?: string;
  lessons_learned?: string;
}
```

## Styling

Components use Tailwind CSS with custom theme colors:
- `bg-card` - Card background
- `border-border` - Subtle border
- `text-accent-teal` - Primary accent
- `text-accent-amber` - Secondary accent
- `text-text-secondary` - Muted text

## Accessibility

- Semantic HTML structure
- ARIA labels for icon-only buttons
- Keyboard navigation support
- Proper heading hierarchy
- Color contrast compliance (WCAG AA)

## Future Enhancements

Potential improvements:
- Company logo integration
- Skills tags per experience
- Testimonial/quote sections
- Related projects showcase
- Timeline view alternative
- Filter/search functionality
- Export to PDF feature
