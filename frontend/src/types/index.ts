// Database types matching the Supabase schema

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  title: string;
  headline: string;
  summary: string;
  location: string;
  github_url: string | null;
  linkedin_url: string | null;
  availability_status: string;
}

export interface Experience {
  id: string;
  company_name: string;
  title: string;
  description: string;
  location: string;
  started_on: string;
  finished_on: string | null;
  is_current: boolean;
  // AI context fields
  why_joined: string | null;
  why_left: string | null;
  actual_contributions: string | null;
  proudest_achievement: string | null;
  challenges_faced: string | null;
  lessons_learned: string | null;
}

export type SkillCategory = 'strong' | 'moderate' | 'gap';

export interface Skill {
  id: string;
  skill_name: string;
  category: SkillCategory;
  evidence: string | null;
  honest_notes: string | null;
}

export interface Certification {
  id: string;
  name: string;
  url: string | null;
  authority: string | null;
  started_on: string | null;
  finished_on: string | null;
}

export interface GapWeakness {
  id: string;
  gap_type: string;
  description: string;
  why_its_a_gap: string;
}

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface FitAssessment {
  verdict: string;
  headline: string;
  opening: string;
  gaps: string[];
  transfers: string[];
  recommendation: string;
}
