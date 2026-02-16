import { useState } from 'react';
import { useJDAnalyzer } from '../../hooks/useJDAnalyzer';
import { FitAssessment as FitAssessmentType } from '../../types';

const FitAssessment = () => {
  const [jobDescription, setJobDescription] = useState('');
  const { isAnalyzing, result, error, analyzeJD, reset } = useJDAnalyzer();

  const handleAnalyze = () => {
    analyzeJD(jobDescription);
  };

  const handleReset = () => {
    setJobDescription('');
    reset();
  };

  const getVerdictColor = (verdict: FitAssessmentType['verdict']) => {
    switch (verdict) {
      case 'strong_fit':
        return 'text-accent-teal';
      case 'worth_conversation':
        return 'text-accent-amber';
      case 'probably_not':
        return 'text-red-400';
      default:
        return 'text-text-secondary';
    }
  };

  const getVerdictBadge = (verdict: FitAssessmentType['verdict']) => {
    switch (verdict) {
      case 'strong_fit':
        return 'bg-accent-teal/10 border-accent-teal/30';
      case 'worth_conversation':
        return 'bg-accent-amber/10 border-accent-amber/30';
      case 'probably_not':
        return 'bg-red-400/10 border-red-400/30';
      default:
        return 'bg-card border-border';
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold mb-4">
            Fit Assessment
          </h2>
          <p className="text-text-secondary text-lg">
            Paste a job description to see how well this candidate matches the role
          </p>
        </div>

        {/* Input Panel */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <label
            htmlFor="jobDescription"
            className="block text-sm font-medium mb-3 text-white"
          >
            Job Description
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full h-64 bg-background border border-border rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-teal focus:border-transparent resize-none"
            disabled={isAnalyzing}
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAnalyze}
              disabled={!jobDescription.trim() || isAnalyzing}
              className="flex-1 bg-accent-teal hover:bg-accent-teal/90 text-black font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Analyze Fit'
              )}
            </button>
            {(jobDescription || result || error) && (
              <button
                onClick={handleReset}
                disabled={isAnalyzing}
                className="px-6 py-3 border border-border hover:border-accent-amber text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-red-400 font-semibold mb-1">Analysis Error</h3>
                <p className="text-text-secondary">{error.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Panel */}
        {result && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Verdict Header */}
            <div className={`p-6 border-b border-border ${getVerdictBadge(result.verdict)}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${getVerdictBadge(result.verdict)} uppercase tracking-wide`}>
                  {result.verdict.replace('_', ' ')}
                </span>
              </div>
              <h3 className={`text-2xl sm:text-3xl font-playfair font-bold ${getVerdictColor(result.verdict)}`}>
                {result.headline}
              </h3>
            </div>

            {/* Opening Statement */}
            <div className="p-6 border-b border-border">
              <p className="text-white text-lg leading-relaxed">
                {result.opening}
              </p>
            </div>

            {/* Gaps Section */}
            {result.gaps && result.gaps.length > 0 && (
              <div className="p-6 border-b border-border">
                <h4 className="text-xl font-playfair font-semibold text-accent-amber mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Potential Gaps
                </h4>
                <ul className="space-y-2">
                  {result.gaps.map((gap, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent-amber mt-1">•</span>
                      <span className="text-text-secondary">{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Transferable Skills Section */}
            {result.transfers && result.transfers.length > 0 && (
              <div className="p-6 border-b border-border">
                <h4 className="text-xl font-playfair font-semibold text-accent-teal mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Transferable Skills
                </h4>
                <ul className="space-y-2">
                  {result.transfers.map((transfer, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent-teal mt-1">•</span>
                      <span className="text-text-secondary">{transfer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendation Section */}
            <div className="p-6 bg-background/50">
              <h4 className="text-lg font-semibold text-white mb-2">Recommendation</h4>
              <p className="text-text-secondary leading-relaxed">
                {result.recommendation}
              </p>
            </div>
          </div>
        )}

        {/* Empty State Hint */}
        {!result && !error && !isAnalyzing && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-text-secondary text-lg">
              Paste a job description above to get started
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FitAssessment;
