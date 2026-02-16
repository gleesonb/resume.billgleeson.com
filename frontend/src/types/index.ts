// Database types matching the Supabase schema

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  title: string;
  headline: string;
  summary: string;
  location: string;
  github_url?: string;
  linkedin_url?: string;
  availability_status: string;
}

export interface Experience {
  id: string;
  company_name: string;
  title: string;
  description: string;
  location: string;
  started_on: string;
  finished_on?: string;
  is_current: boolean;
  // AI context fields
  why_joined?: string;
  why_left?: string;
  actual_contributions?: string;
  proudest_achievement?: string;
  challenges_faced?: string;
  lessons_learned?: string;
}

export interface Skill {
  id: string;
  skill_name: string;
  category: 'strong' | 'moderate' | 'gap';
  evidence?: string;
  honest_notes?: string;
}

export interface Certification {
  id: string;
  name: string;
  url?: string;
  authority?: string;
  started_on?: string;
  finished_on?: string;
}

export interface GapWeakness {
  id: string;
  gap_type: string;
  description: string;
  why_its_a_gap: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface FitAssessment {
  verdict: 'strong_fit' | 'worth_conversation' | 'probably_not';
  headline: string;
  opening: string;
  gaps: string[];
  transfers: string[];
  recommendation: string;
}
