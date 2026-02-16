# HeroSection Component - Visual Preview

## Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      [STATUS BADGE]                         │
│                  ● Available  (animated)                    │
│                                                             │
│                    Bill Gleeson                             │
│                  (H1 - 5xl/6xl/7xl)                         │
│                                                             │
│            Senior Software Engineer                         │
│              (text-xl/2xl, gray)                            │
│                                                             │
│     Building scalable systems that drive business impact    │
│         (gradient text, 2xl/3xl/4xl)                        │
│                                                             │
│    [Amazon]  [Microsoft]  [Google]                          │
│    (company pills, hover effects)                           │
│                                                             │
│   ┌──────────────┐  ┌──────────────────┐                   │
│   │  Let's Talk  →│  │  View Experience │                   │
│   └──────────────┘  └──────────────────┘                   │
│      (primary)           (secondary)                        │
│                                                             │
│                      ↓                                      │
│                   (scroll indicator)                        │
└─────────────────────────────────────────────────────────────┘
```

## Color Scheme

### Background
- Primary: `#0a0a0a` (background)
- Gradient overlay: `background → card/50`
- Grid pattern: `#4ade80` at 5% opacity

### Status Badge
- **Available**: Teal (#4ade80) with ping animation
- **Not Available**: Gray (#a1a1aa)
- **Other**: Amber (#d4a574)

### Text
- Name: White (#ffffff)
- Title: Gray (#a1a1aa)
- Headline: Gradient (teal → amber)

### Buttons
- **Primary**: Teal gradient with shadow
  - Hover: Scale 105%, enhanced shadow
  - Icon: ArrowRight that slides on hover
- **Secondary**: Card background with border
  - Hover: Border turns teal

### Company Pills
- Background: `card/50` with backdrop blur
- Border: `border` (#27272a)
- Hover: Border → teal, text → teal

## Animations

### Fade In
```css
@keyframes fade-in {
  from: { opacity: 0; transform: translateY(20px); }
  to: { opacity: 1; transform: translateY(0); }
}
```
Applied to: Badge, name, title, headline, pills, buttons

### Status Ping
```css
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
```
Applied to: Status dot outer ring

### Scroll Bounce
```css
/* Tailwind's animate-bounce */
```
Applied to: Scroll indicator

## Responsive Behavior

### Mobile (< 640px)
- Name: `text-5xl`
- Title: `text-xl`
- Headline: `text-2xl`
- Buttons: Stacked vertically
- Pills: Wrap to multiple lines

### Tablet (640px - 1024px)
- Name: `text-6xl`
- Title: `text-2xl`
- Headline: `text-3xl`
- Buttons: Side by side
- Pills: Single row if space permits

### Desktop (1024px+)
- Name: `text-7xl`
- Title: `text-2xl`
- Headline: `text-4xl`
- Max width: `max-w-5xl`
- All elements single line

## Spacing

- Status badge to name: `mb-8` (2rem)
- Name to title: `mb-4` (1rem)
- Title to headline: `mb-6` (1.5rem)
- Headline to pills: `mb-8` (2rem)
- Pills to buttons: `mb-12` (3rem)
- Section padding: `px-4 sm:px-6 lg:px-8`

## Interactive States

### Primary CTA Button
- **Default**: Teal gradient
- **Hover**:
  - Brighter gradient
  - Scale 1.05
  - Teal shadow
  - Arrow icon slides right
- **Active**: Scale 0.98
- **Focus**: Visible outline

### Secondary CTA Button
- **Default**: Transparent with border
- **Hover**:
  - Border becomes teal
  - Shadow appears
- **Active**: Scale 0.98

### Company Pills
- **Default**: Gray border
- **Hover**:
  - Border becomes teal
  - Text becomes teal
  - No cursor change (not clickable)

## Accessibility Features

- Semantic HTML5 elements
- Proper heading hierarchy (h1 for name)
- Button focus states
- ARIA labels for screen readers
- Sufficient color contrast (WCAG AA)
- Keyboard navigation support
- Smooth scroll respects `prefers-reduced-motion`

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Custom Properties (for Tailwind)
- Backdrop filter (with fallback)
- CSS Animations

## Performance Considerations

- Minimal re-renders (memo-friendly)
- CSS animations (GPU accelerated)
- No JavaScript animations
- Optimized Tailwind purging
- Lazy loading support ready

## Usage Context

Designed to be:
- Full viewport height (`min-h-screen`)
- Centered content
- First section users see
- Entry point to other sections
- Brand impression maker
