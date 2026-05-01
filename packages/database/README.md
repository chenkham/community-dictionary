# Database Package

Supabase database schemas, migrations, and types for the Community Dictionary.

## Database Structure

### Tables

#### `words`
Main table storing dictionary entries.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| tai_khamyang_word | TEXT | Word in Tai Khamyang script |
| english_word | TEXT | English translation |
| assamese_word | TEXT | Assamese translation |
| pronunciation | TEXT | Phonetic pronunciation guide |
| audio_url | TEXT | URL to pronunciation audio (optional) |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |
| created_by | UUID | User who created (optional) |

#### `languages`
Supported languages in the dictionary.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| code | TEXT | Language code (e.g., 'tai', 'en', 'as') |
| name | TEXT | Language name |
| native_name | TEXT | Name in native script |

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and project name
4. Set a strong database password
5. Select region (choose closest to India for best performance)
6. Wait for project to be ready

### 2. Run Migrations

Copy the SQL from `schema.sql` and run it in the Supabase SQL Editor:

1. Open your Supabase project
2. Go to "SQL Editor"
3. Click "New Query"
4. Paste the contents of `schema.sql`
5. Click "Run"

### 3. Configure Row Level Security (RLS)

The schema includes RLS policies for security:
- Public read access to all words
- Authenticated users can suggest new words
- Only admins can update/delete words

### 4. Bulk Upload Words

#### Using CSV:

1. Prepare your CSV file with headers:
   ```csv
   tai_khamyang_word,english_word,assamese_word,pronunciation
   ```

2. In Supabase Dashboard:
   - Go to "Table Editor"
   - Select "words" table
   - Click "Insert" → "Import data from CSV"
   - Upload your CSV file

#### Using SQL:

```sql
INSERT INTO words (tai_khamyang_word, english_word, assamese_word, pronunciation)
VALUES 
  ('ꤢꤢ꤬', 'water', 'পানী', 'nam'),
  ('ꤢꤢ꤬ꤗꤢꤩ', 'food', 'খাদ্য', 'khao');
```

## Environment Variables

Add these to your `.env` files:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here
```

## Database Backup

Supabase provides automatic daily backups. For manual backups:

1. Go to "Database" → "Backups"
2. Click "Create backup"

## Local Development

For local development with Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize
supabase init

# Start local Supabase
supabase start

# Apply migrations
supabase db push
```

## Indexes

The schema includes indexes for optimal query performance:
- Full-text search on all word columns
- Indexes on frequently queried fields

## Future Enhancements

- [ ] User contributions table
- [ ] Word categories/tags
- [ ] Favorites/bookmarks
- [ ] Usage statistics
- [ ] Audio pronunciations storage
