import { useState } from 'react';
import HeroSection from './components/sections/HeroSection';
import ExperienceSection from './components/sections/ExperienceSection';
import SkillsMatrix from './components/sections/SkillsMatrix';
import FitAssessment from './components/sections/FitAssessment';
import ChatDrawer from './components/chat/ChatDrawer';
import Layout from './components/layout/Layout';
import { useCandidateData } from './hooks/useCandidateData';
import { supabase } from './lib/supabase';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Fetch all candidate data using the custom hook
  const {
    profile,
    experiences,
    skills,
    isLoading,
    error,
  } = useCandidateData();

  // Chat message handler
  const handleSendMessage = async (message: string): Promise<string> => {
    const { data, error: err } = await supabase.functions.invoke('chat', {
      body: {
        message,
        session_id: crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15),
        history: [],
      },
    });

    if (err) throw err;
    return data.response || data.message || 'Sorry, I could not process your request.';
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-teal mb-4" />
          <p className="text-text-secondary text-lg">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-8">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-2xl font-playfair font-bold text-white mb-3">
              Failed to Load Data
            </h2>
            <p className="text-text-secondary mb-6">
              {error instanceof Error ? error.message : 'An unknown error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-accent-teal hover:bg-accent-teal/90 text-background font-semibold rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Data not ready yet
  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary text-lg">No profile data available.</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection profile={profile} />

      {/* Experience Section */}
      {experiences && experiences.length > 0 && (
        <ExperienceSection experiences={experiences} />
      )}

      {/* Skills Matrix Section */}
      {skills && skills.length > 0 && (
        <SkillsMatrix skills={skills} />
      )}

      {/* Fit Assessment Section */}
      <section id="fit-assessment" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <FitAssessment />
      </section>

      {/* Chat Section Anchor */}
      <section id="chat" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-4">
            Let's Chat
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
            Have questions? Click the chat button in the bottom right corner to start a conversation.
          </p>
        </div>
      </section>

      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onOpen={() => setIsChatOpen(true)}
        onClose={() => setIsChatOpen(false)}
        onSendMessage={handleSendMessage}
        initialMessages={[]}
      />
    </Layout>
  );
}

export default App;
