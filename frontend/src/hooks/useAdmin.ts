import { useState, useEffect } from 'react';
import { CandidateProfile, Experience } from '../types';
import { supabase } from '../lib/supabase';

export const useAdmin = () => {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('candidate_profiles')
        .select('*')
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch experiences
      const { data: experiencesData, error: experiencesError } = await supabase
        .from('experiences')
        .select('*')
        .order('started_on', { ascending: false });

      if (experiencesError) throw experiencesError;
      setExperiences(experiencesData || []);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<CandidateProfile>): Promise<void> => {
    try {
      const { error } = await supabase
        .from('candidate_profiles')
        .update(data)
        .eq('id', profile?.id);

      if (error) throw error;
      setProfile(prev => prev ? { ...prev, ...data } : null);
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const updateExperience = async (id: string, data: Partial<Experience>): Promise<void> => {
    try {
      const { error } = await supabase
        .from('experiences')
        .update(data)
        .eq('id', id);

      if (error) throw error;
      setExperiences(prev =>
        prev.map(exp => (exp.id === id ? { ...exp, ...data } : exp))
      );
    } catch (err) {
      console.error('Error updating experience:', err);
      throw err;
    }
  };

  const createExperience = async (data: Partial<Experience>): Promise<void> => {
    try {
      const { data: newData, error } = await supabase
        .from('experiences')
        .insert({
          ...data,
          candidate_id: profile?.id,
        })
        .select()
        .single();

      if (error) throw error;
      setExperiences(prev => [newData, ...prev]);
    } catch (err) {
      console.error('Error creating experience:', err);
      throw err;
    }
  };

  const deleteExperience = async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setExperiences(prev => prev.filter(exp => exp.id !== id));
    } catch (err) {
      console.error('Error deleting experience:', err);
      throw err;
    }
  };

  return {
    profile,
    experiences,
    loading,
    error,
    updateProfile,
    updateExperience,
    createExperience,
    deleteExperience,
    refetch: fetchData,
  };
};
