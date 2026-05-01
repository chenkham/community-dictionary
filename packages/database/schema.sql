-- Community Dictionary Database Schema
-- Author: Chenkham
-- Description: PostgreSQL schema for Tai Khamyang-English-Assamese dictionary

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Languages table
CREATE TABLE IF NOT EXISTS languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  native_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert supported languages
INSERT INTO languages (code, name, native_name) VALUES
  ('tai', 'Tai Khamyang', 'ꤕꤢꤧ ꤊꤢꤧ꤬ꤗꤢꤩ'),
  ('en', 'English', 'English'),
  ('as', 'Assamese', 'অসমীয়া')
ON CONFLICT (code) DO NOTHING;

-- Words table (main dictionary entries)
CREATE TABLE IF NOT EXISTS words (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tai_khamyang_word TEXT NOT NULL,
  english_word TEXT NOT NULL,
  assamese_word TEXT NOT NULL,
  pronunciation TEXT,
  part_of_speech TEXT,
  example_sentence TEXT,
  audio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_words_tai ON words USING gin(to_tsvector('simple', tai_khamyang_word));
CREATE INDEX IF NOT EXISTS idx_words_english ON words USING gin(to_tsvector('english', english_word));
CREATE INDEX IF NOT EXISTS idx_words_assamese ON words USING gin(to_tsvector('simple', assamese_word));
CREATE INDEX IF NOT EXISTS idx_words_part_of_speech ON words(part_of_speech);
CREATE INDEX IF NOT EXISTS idx_words_created_at ON words(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_words_updated_at
  BEFORE UPDATE ON words
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE words ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all words
CREATE POLICY "Public read access"
  ON words FOR SELECT
  USING (true);

-- Allow authenticated users to insert words (for community contributions)
CREATE POLICY "Authenticated users can insert"
  ON words FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only allow users to update their own words or admins
CREATE POLICY "Users can update own words"
  ON words FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Only allow users to delete their own words or admins
CREATE POLICY "Users can delete own words"
  ON words FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Full-text search function
CREATE OR REPLACE FUNCTION search_words(search_query TEXT)
RETURNS TABLE (
  id UUID,
  tai_khamyang_word TEXT,
  english_word TEXT,
  assamese_word TEXT,
  pronunciation TEXT,
  part_of_speech TEXT,
  example_sentence TEXT,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    w.id,
    w.tai_khamyang_word,
    w.english_word,
    w.assamese_word,
    w.pronunciation,
    w.part_of_speech,
    w.example_sentence,
    ts_rank(
      to_tsvector('simple', w.tai_khamyang_word || ' ' || w.english_word || ' ' || w.assamese_word),
      plainto_tsquery('simple', search_query)
    ) as rank
  FROM words w
  WHERE 
    to_tsvector('simple', w.tai_khamyang_word || ' ' || w.english_word || ' ' || w.assamese_word) 
    @@ plainto_tsquery('simple', search_query)
  ORDER BY rank DESC;
END;
$$ LANGUAGE plpgsql;

-- Sample data (optional - remove if you want to start with empty database)
INSERT INTO words (tai_khamyang_word, english_word, assamese_word, pronunciation, part_of_speech, example_sentence) VALUES
  ('ꤢꤢ꤬', 'water', 'পানী', 'nam', 'noun', 'I drink water every day.'),
  ('ꤢꤢ꤬ꤗꤢꤩ', 'food', 'খাদ্য', 'khao', 'noun', 'We eat food together.'),
  ('ꤘꤢꤩ', 'house', 'ঘৰ', 'huen', 'noun', 'This is my house.')
ON CONFLICT DO NOTHING;

-- Create a view for easy querying
CREATE OR REPLACE VIEW words_with_metadata AS
SELECT 
  w.*,
  u.email as creator_email
FROM words w
LEFT JOIN auth.users u ON w.created_by = u.id;

-- Grant permissions
GRANT SELECT ON words_with_metadata TO anon, authenticated;
GRANT ALL ON words TO authenticated;
GRANT SELECT ON words TO anon;
