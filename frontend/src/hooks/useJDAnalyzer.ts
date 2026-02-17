import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { FitAssessment } from '../types';

interface AnalyzeJDResult {
  isAnalyzing: boolean;
  result: FitAssessment | null;
  error: Error | null;
  analyzeJD: (jobDescription: string) => Promise<void>;
  reset: () => void;
}

export function useJDAnalyzer(): AnalyzeJDResult {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<FitAssessment | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const analyzeJD = async (jobDescription: string) => {
    if (!jobDescription.trim()) {
      setError(new Error('Job description cannot be empty'));
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: supabaseError } = await supabase.functions.invoke('analyze-jd', {
        body: {
          jobDescription: jobDescription,
        },
      });

      if (supabaseError) throw supabaseError;

      setResult(data as FitAssessment);
    } catch (err) {
      const errorObj = err as Error;
      console.error('Error analyzing JD:', errorObj);
      setError(errorObj);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setIsAnalyzing(false);
    setResult(null);
    setError(null);
  };

  return {
    isAnalyzing,
    result,
    error,
    analyzeJD,
    reset,
  };
}
