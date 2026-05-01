# Database Documentation

Complete guide to the Community Dictionary database structure and operations.

## Overview

The database uses **PostgreSQL** via **Supabase**, providing:
- Real-time subscriptions
- Row Level Security (RLS)
- Full-text search
- Automatic backups
- RESTful API

## Schema

### Tables

#### `words`

Main dictionary table storing trilingual word entries.

```sql
CREATE TABLE words (
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
```

**Columns:**
- `id`: Unique identifier (auto-generated UUID)
- `tai_khamyang_word`: Word in Tai Khamyang script
- `english_word`: English translation
- `assamese_word`: Assamese translation (অসমীয়া)
- `pronunciation`: Phonetic guide (e.g., "nam" for water)
- `part_of_speech`: noun, verb, adjective, adverb, etc.
- `example_sentence`: Usage example
- `audio_url`: Link to pronunciation audio file
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update
- `created_by`: User ID who created the entry

#### `languages`

Supported languages in the dictionary.

```sql
CREATE TABLE languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  native_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Data:**
| code | name | native_name |
|------|------|-------------|
| tai | Tai Khamyang | ꤕꤢꤧ ꤊꤢꤧ꤬ꤗꤢꤩ |
| en | English | English |
| as | Assamese | অসমীয়া |

## Indexes

For optimal query performance:

```sql
-- Full-text search indexes
CREATE INDEX idx_words_tai ON words USING gin(to_tsvector('simple', tai_khamyang_word));
CREATE INDEX idx_words_english ON words USING gin(to_tsvector('english', english_word));
CREATE INDEX idx_words_assamese ON words USING gin(to_tsvector('simple', assamese_word));

-- Query optimization indexes
CREATE INDEX idx_words_part_of_speech ON words(part_of_speech);
CREATE INDEX idx_words_created_at ON words(created_at DESC);
```

## Row Level Security (RLS)

Security policies ensure data protection:

### Read Access
```sql
-- Anyone can read all words
CREATE POLICY "Public read access"
  ON words FOR SELECT
  USING (true);
```

### Write Access
```sql
-- Authenticated users can add words
CREATE POLICY "Authenticated users can insert"
  ON words FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Users can only update their own entries
CREATE POLICY "Users can update own words"
  ON words FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Users can only delete their own entries
CREATE POLICY "Users can delete own words"
  ON words FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);
```

## Functions

### Full-Text Search

```sql
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
```

**Usage:**
```sql
SELECT * FROM search_words('water');
```

### Auto-Update Timestamp

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_words_updated_at
  BEFORE UPDATE ON words
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Common Queries

### Get All Words
```sql
SELECT * FROM words ORDER BY created_at DESC LIMIT 50;
```

### Search Words
```sql
SELECT * FROM search_words('house');
```

### Get Words by Part of Speech
```sql
SELECT * FROM words WHERE part_of_speech = 'noun';
```

### Get Recent Additions
```sql
SELECT * FROM words 
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### Count Words by Language
```sql
SELECT 
  COUNT(*) as total_words,
  COUNT(DISTINCT tai_khamyang_word) as unique_tai_words,
  COUNT(DISTINCT english_word) as unique_english_words,
  COUNT(DISTINCT assamese_word) as unique_assamese_words
FROM words;
```

## Data Import/Export

### Import CSV

1. Prepare CSV file:
```csv
tai_khamyang_word,english_word,assamese_word,pronunciation,part_of_speech,example_sentence
ꤢꤢ꤬,water,পানী,nam,noun,I drink water every day
```

2. In Supabase Dashboard:
   - Table Editor → words
   - Insert → Import CSV
   - Upload file

### Export Data

```sql
-- Export to CSV (in Supabase SQL Editor)
COPY (SELECT * FROM words) TO '/tmp/words.csv' CSV HEADER;
```

Or use Supabase Dashboard:
- Table Editor → words
- Click "..." → Export to CSV

## Backup & Restore

### Automatic Backups

Supabase provides:
- Daily automatic backups (retained for 7 days on free tier)
- Point-in-time recovery (paid plans)

### Manual Backup

```bash
# Using Supabase CLI
supabase db dump -f backup.sql

# Restore
supabase db reset
psql -h db.xxx.supabase.co -U postgres -d postgres -f backup.sql
```

## Performance Optimization

### Tips

1. **Use Indexes**: Already created for common queries
2. **Limit Results**: Always use `LIMIT` for large datasets
3. **Pagination**: Use `OFFSET` and `LIMIT` together
4. **Caching**: Cache frequent queries in your app

### Example Pagination

```sql
-- Page 1 (first 20 results)
SELECT * FROM words ORDER BY created_at DESC LIMIT 20 OFFSET 0;

-- Page 2
SELECT * FROM words ORDER BY created_at DESC LIMIT 20 OFFSET 20;
```

## Future Enhancements

- [ ] User favorites/bookmarks table
- [ ] Word categories/tags
- [ ] Usage statistics tracking
- [ ] Audio files storage
- [ ] User contributions workflow
- [ ] Word etymology/history

## Maintenance

### Regular Tasks

1. **Monitor Storage**: Check database size in Supabase dashboard
2. **Review Logs**: Check for errors or slow queries
3. **Update Statistics**: PostgreSQL auto-vacuum handles this
4. **Backup Verification**: Test restore process periodically

### Troubleshooting

**Slow Queries:**
```sql
-- Check query performance
EXPLAIN ANALYZE SELECT * FROM search_words('test');
```

**Missing Indexes:**
```sql
-- Check existing indexes
SELECT * FROM pg_indexes WHERE tablename = 'words';
```

## Support

For database issues:
- Check Supabase [documentation](https://supabase.com/docs)
- Review PostgreSQL [docs](https://www.postgresql.org/docs/)
- Open an issue on GitHub
