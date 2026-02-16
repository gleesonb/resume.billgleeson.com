/**
 * SkillsMatrix Component - Usage Example
 *
 * This file demonstrates how to use the SkillsMatrix component with sample data.
 * Import it in your App.tsx or any other component like this:
 *
 * import { SkillsMatrix } from './components/sections';
 *
 * // Then use it with your skills data:
 * <SkillsMatrix skills={candidateSkills} />
 */

import { Skill } from '../../types';

// Sample data for testing
const sampleSkills: Skill[] = [
  // Strong Skills
  {
    id: '1',
    skill_name: 'React & TypeScript',
    category: 'strong',
    evidence: 'Built 10+ production applications using React and TypeScript over 5 years',
    honest_notes: 'Deep understanding of hooks, context, and advanced patterns',
  },
  {
    id: '2',
    skill_name: 'Node.js & Express',
    category: 'strong',
    evidence: 'Developed and maintained multiple microservices handling 10k+ requests/day',
  },
  {
    id: '3',
    skill_name: 'PostgreSQL',
    category: 'strong',
    evidence: 'Designed complex schemas for e-commerce platforms with millions of records',
  },

  // Moderate Skills
  {
    id: '4',
    skill_name: 'AWS',
    category: 'moderate',
    evidence: 'Deployed applications using EC2, S3, and RDS',
    honest_notes: 'Comfortable with basic services, learning advanced features like Lambda',
  },
  {
    id: '5',
    skill_name: 'Docker',
    category: 'moderate',
    evidence: 'Containerized several applications for development environments',
    honest_notes: 'Can create and run containers, still learning orchestration',
  },

  // Gaps & Growth Areas
  {
    id: '6',
    skill_name: 'Kubernetes',
    category: 'gap',
    evidence: 'Completed introductory course',
    honest_notes: 'Currently studying for CKA certification, planning to use in production next quarter',
  },
  {
    id: '7',
    skill_name: 'GraphQL',
    category: 'gap',
    evidence: 'Built small personal projects',
    honest_notes: 'Understand the concepts, need more real-world experience',
  },
];

export { sampleSkills };
