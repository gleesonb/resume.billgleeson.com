-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Candidate profile table
CREATE TABLE candidate_profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  title VARCHAR(255),
  headline TEXT,
  summary TEXT,
  location VARCHAR(255),
  github_url TEXT,
  linkedin_url TEXT,
  availability_status VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experiences table with AI context fields
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidate_profile(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  started_on DATE,
  finished_on DATE,
  is_current BOOLEAN DEFAULT FALSE,
  -- AI context fields
  why_joined TEXT,
  why_left TEXT,
  actual_contributions TEXT,
  proudest_achievement TEXT,
  challenges_faced TEXT,
  lessons_learned TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills table with categories
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidate_profile(id) ON DELETE CASCADE,
  skill_name VARCHAR(255) NOT NULL,
  category VARCHAR(20) NOT NULL CHECK (category IN ('strong', 'moderate', 'gap')),
  evidence TEXT,
  honest_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certifications table
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidate_profile(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  url TEXT,
  authority VARCHAR(255),
  started_on DATE,
  finished_on DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gaps and weaknesses table
CREATE TABLE gaps_weaknesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidate_profile(id) ON DELETE CASCADE,
  gap_type VARCHAR(100),
  description TEXT,
  why_its_a_gap TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI instructions table for guiding chat behavior
CREATE TABLE ai_instructions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidate_profile(id) ON DELETE CASCADE,
  instruction_type VARCHAR(100),
  instruction TEXT,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat history table
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for foreign keys
CREATE INDEX idx_experiences_candidate_id ON experiences(candidate_id);
CREATE INDEX idx_skills_candidate_id ON skills(candidate_id);
CREATE INDEX idx_certifications_candidate_id ON certifications(candidate_id);
CREATE INDEX idx_gaps_weaknesses_candidate_id ON gaps_weaknesses(candidate_id);
CREATE INDEX idx_ai_instructions_candidate_id ON ai_instructions(candidate_id);

-- Index for chat history session lookups
CREATE INDEX idx_chat_history_session_id ON chat_history(session_id);
CREATE INDEX idx_chat_history_created_at ON chat_history(created_at);

-- Enable Row Level Security
ALTER TABLE candidate_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE gaps_weaknesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_instructions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read for profile, experiences, skills, certifications
CREATE POLICY "Allow public read access to candidate_profile"
  ON candidate_profile FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow service role write access to candidate_profile"
  ON candidate_profile FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to experiences"
  ON experiences FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow service role write access to experiences"
  ON experiences FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to skills"
  ON skills FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow service role write access to skills"
  ON skills FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to certifications"
  ON certifications FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow service role write access to certifications"
  ON certifications FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to gaps_weaknesses"
  ON gaps_weaknesses FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow service role write access to gaps_weaknesses"
  ON gaps_weaknesses FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read access to ai_instructions"
  ON ai_instructions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow service role write access to ai_instructions"
  ON ai_instructions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role full access to chat_history"
  ON chat_history FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_candidate_profile_updated_at
  BEFORE UPDATE ON candidate_profile
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON certifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gaps_weaknesses_updated_at
  BEFORE UPDATE ON gaps_weaknesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_instructions_updated_at
  BEFORE UPDATE ON ai_instructions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
