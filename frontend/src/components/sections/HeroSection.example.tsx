/**
 * HeroSection Component Usage Example
 *
 * This file demonstrates how to use the HeroSection component.
 * You can integrate this into your main App.tsx or a page component.
 */

import HeroSection from './HeroSection';
import { CandidateProfile } from '../../types';

// Example 1: With mock data (for development/testing)
const mockProfile: CandidateProfile = {
  id: '1',
  name: 'Bill Gleeson',
  email: 'bill@example.com',
  title: 'Senior Software Engineer',
  headline: 'Building scalable systems that drive business impact',
  summary: 'Experienced software engineer with a passion for building...',
  location: 'San Francisco, CA',
  github_url: 'https://github.com/billgleeson',
  linkedin_url: 'https://linkedin.com/in/billgleeson',
  availability_status: 'Available',
};

// Example usage in a component:
function ExampleUsage() {
  return (
    <div>
      {/* Using the HeroSection with mock data */}
      <HeroSection profile={mockProfile} />
    </div>
  );
}

// Example 2: With real data from your API hook
/*
import { useCandidateProfile } from '../../hooks/useCandidateProfile';

function AppHero() {
  const { profile, loading, error } = useCandidateProfile();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  if (!profile) return <div>No profile found</div>;

  return <HeroSection profile={profile} />;
}
*/

export default ExampleUsage;
