-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'recruiter');

-- Create candidate_profiles table
CREATE TABLE candidate_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    linkedin_url TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    headline TEXT,
    location TEXT,
    about TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create experiences table
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES candidate_profile(id) ON DELETE CASCADE,
    company TEXT NOT NULL,
    title TEXT NOT NULL,
    started_on DATE NOT NULL,
    finished_on DATE,
    description TEXT,
    CONSTRAINT date_order_check CHECK (
        finished_on IS NULL OR finished_on > started_on
    )
);

-- Create skills table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES candidate_profile(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT,
    endorsement_count INTEGER DEFAULT 0
);

-- Create fit_assessments table
CREATE TABLE fit_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES candidate_profile(id) ON DELETE CASCADE,
    assessor_email TEXT NOT NULL,
    overall_fit_score INTEGER NOT NULL CHECK (overall_fit_score BETWEEN 1 AND 5),
    strengths TEXT[],
    concerns TEXT[],
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chat_history table
CREATE TABLE chat_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES candidate_profile(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_experiences_profile_id ON experiences(profile_id);
CREATE INDEX idx_skills_profile_id ON skills(profile_id);
CREATE INDEX idx_fit_assessments_profile_id ON fit_assessments(profile_id);
CREATE INDEX idx_chat_history_profile_id ON chat_history(profile_id);
CREATE INDEX idx_chat_history_created_at ON chat_history(created_at DESC);

-- Enable Row Level Security
ALTER TABLE candidate_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE fit_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for candidate_profile
CREATE POLICY "Allow public read access for candidate_profile"
    ON candidate_profile FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow authenticated insert for candidate_profile"
    ON candidate_profile FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update for candidate_profile"
    ON candidate_profile FOR UPDATE
    TO authenticated
    USING (true);

-- RLS Policies for experiences
CREATE POLICY "Allow public read access for experiences"
    ON experiences FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow authenticated insert for experiences"
    ON experiences FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update for experiences"
    ON experiences FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated delete for experiences"
    ON experiences FOR DELETE
    TO authenticated
    USING (true);

-- RLS Policies for skills
CREATE POLICY "Allow public read access for skills"
    ON skills FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow authenticated insert for skills"
    ON skills FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update for skills"
    ON skills FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated delete for skills"
    ON skills FOR DELETE
    TO authenticated
    USING (true);

-- RLS Policies for fit_assessments
CREATE POLICY "Allow public read access for fit_assessments"
    ON fit_assessments FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow authenticated insert for fit_assessments"
    ON fit_assessments FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update for fit_assessments"
    ON fit_assessments FOR UPDATE
    TO authenticated
    USING (true);

-- RLS Policies for chat_history
CREATE POLICY "Allow public read access for chat_history"
    ON chat_history FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow authenticated insert for chat_history"
    ON chat_history FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated delete for chat_history"
    ON chat_history FOR DELETE
    TO authenticated
    USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_candidate_profile_updated_at BEFORE UPDATE ON candidate_profile
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
