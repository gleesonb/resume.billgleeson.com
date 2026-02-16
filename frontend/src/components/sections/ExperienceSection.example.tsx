/**
 * Example usage of ExperienceSection and ExperienceCard components
 *
 * This file demonstrates how to use the ExperienceSection component with sample data.
 */

import { Experience } from '../../types';

// Sample experience data matching the Experience type
export const sampleExperiences: Experience[] = [
  {
    id: '1',
    company_name: 'Tech Startup Inc.',
    title: 'Senior Software Engineer',
    description: 'Led development of microservices architecture serving 1M+ users. Mentored junior developers and improved system performance by 40%.',
    location: 'San Francisco, CA',
    started_on: '2022-03-01',
    finished_on: undefined,
    is_current: true,
    // AI Context fields
    why_joined: 'Excited by the opportunity to build scalable systems from the ground up and work with a talented team',
    actual_contributions: 'Designed and implemented the core payment processing system, reduced API response time by 60%, and established CI/CD pipelines',
    proudest_achievement: 'Led the migration from monolithic architecture to microservices, resulting in 99.99% uptime during peak traffic',
    challenges_faced: 'Balancing rapid feature development with code quality and system stability during hyper-growth phase',
    lessons_learned: 'Communication and documentation are as critical as code quality. Investing in team processes paid dividends in scalability',
    why_left: undefined, // Current position
  },
  {
    id: '2',
    company_name: 'Enterprise Solutions Corp.',
    title: 'Software Engineer',
    description: 'Developed and maintained enterprise Java applications. Collaborated with cross-functional teams to deliver features on time.',
    location: 'New York, NY',
    started_on: '2019-06-01',
    finished_on: '2022-02-28',
    is_current: false,
    // AI Context fields
    why_joined: 'Wanted to gain experience in enterprise software development and work with large-scale systems',
    actual_contributions: 'Built RESTful APIs, implemented authentication systems, and participated in agile development processes',
    proudest_achievement: 'Delivered a critical project 2 weeks ahead of schedule that saved the company $500K annually',
    challenges_faced: 'Navigating complex organizational processes and legacy codebases',
    lessons_learned: 'Stakeholder management and understanding business requirements are key to successful software delivery',
    why_left: 'Sought more growth opportunities and wanted to work with newer technologies',
  },
];

/**
 * Usage in your main App component:
 *
 * function App() {
 *   const { experiences, loading, error } = useCandidateData();
 *
 *   if (loading) return <LoadingSpinner />;
 *   if (error) return <ErrorMessage />;
 *
 *   return (
 *     <div>
 *       <Navbar />
 *       <HeroSection />
 *       <ExperienceSection experiences={experiences} />
 *       <SkillsSection />
 *       <Footer />
 *     </div>
 *   );
 * }
 */
