import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { CandidateProfile, Experience, Skill, Certification } from '../types';

export function useCandidateData() {
  // Fetch candidate profile
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['candidateProfile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('candidate_profile')
        .select('*')
        .single();

      if (error) throw error;
      return data as CandidateProfile;
    },
  });

  // Fetch experiences
  const { data: experiences, isLoading: experiencesLoading, error: experiencesError } = useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('started_on', { ascending: false });

      if (error) throw error;
      return data as Experience[];
    },
  });

  // Fetch skills
  const { data: skills, isLoading: skillsLoading, error: skillsError } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: false });

      if (error) throw error;
      return data as Skill[];
    },
  });

  // Fetch certifications
  const { data: certifications, isLoading: certificationsLoading, error: certificationsError } = useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('finished_on', { ascending: false });

      if (error) throw error;
      return data as Certification[];
    },
  });

  const isLoading = profileLoading || experiencesLoading || skillsLoading || certificationsLoading;
  const error = profileError || experiencesError || skillsError || certificationsError;

  return {
    profile,
    experiences,
    skills,
    certifications,
    isLoading,
    error,
  };
}
