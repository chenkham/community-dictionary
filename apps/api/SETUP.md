# API Setup Guide

Complete guide to set up and run the Community Dictionary API.

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Supabase account (free tier)

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in details:
   - **Name**: community-dictionary
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to your location
4. Click "Create new project"
5. Wait 2-3 minutes for setup

## Step 2: Get Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (⚠️ Keep this secret!)

## Step 3: Run Database Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Open `../../packages/database/schema.sql` from this project
4. Copy all the SQL code
5. Paste into Supabase SQL Editor
6. Click "Run" (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

### Verify Database Setup

1. Go to **Table Editor** in Supabase
2. You should see these tables:
   - `words` (with 3 sample rows)
   - `languages` (with 3 rows: Tai Khamyang, English, Assamese)

## Step 4: Configure Environment Variables

1. In this directory (`apps/api/`), the `.env` file should already exist
2. Edit `.env` and replace with your Supabase credentials:

```env
PORT=3001
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here
```

## Step 5: Install Dependencies

From the **root directory** of the project:

```bash
npm install
```

Or install just for the API:

```bash
cd apps/api
npm install
```

## Step 6: Start the API

From the API directory:

```bash
npm run dev
```

You should see:
```
🚀 Community Dictionary API
📍 Server running on http://localhost:3001
📚 API Documentation: http://localhost:3001/
```

## Step 7: Test the API

### Using Browser

Open http://localhost:3001 in your browser. You should see:

```json
{
  "message": "Community Dictionary API",
  "version": "1.0.0",
  "status": "healthy",
  "endpoints": {
    "health": "/api/health",
    "words": "/api/words",
    "search": "/api/words/search",
    "languages": "/api/languages"
  }
}
```

### Using curl

```bash
# Health check
curl http://localhost:3001/api/health

# Get all words
curl http://localhost:3001/api/words

# Search for a word
curl "http://localhost:3001/api/words/search?q=water"

# Get languages
curl http://localhost:3001/api/languages
```

### Using Thunder Client / Postman

Import the test collection from `tests/api-tests.http`

## Available Scripts

```bash
# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Words
- `GET /api/words` - Get all words (paginated)
- `GET /api/words/:id` - Get specific word
- `GET /api/words/search?q=query` - Search words
- `POST /api/words` - Create new word
- `PUT /api/words/:id` - Update word
- `DELETE /api/words/:id` - Delete word

### Languages
- `GET /api/languages` - Get all supported languages

## Troubleshooting

### Port Already in Use

If port 3001 is already in use:

**Windows:**
```bash
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

Or change the port in `.env`:
```env
PORT=3002
```

### Supabase Connection Error

**Error**: "Missing Supabase environment variables"

**Solution**: Make sure your `.env` file has all required variables:
- SUPABASE_URL
- SUPABASE_SERVICE_KEY

### Database Error

**Error**: "relation 'words' does not exist"

**Solution**: Run the database migration (Step 3)

### Module Not Found

**Error**: "Cannot find module '@supabase/supabase-js'"

**Solution**: Install dependencies:
```bash
npm install
```

## Adding Sample Data

### Method 1: Using Supabase Dashboard

1. Go to **Table Editor** → **words**
2. Click "Insert row"
3. Fill in:
   - tai_khamyang_word
   - english_word
   - assamese_word
   - pronunciation (optional)
4. Click "Save"

### Method 2: Using API

```bash
curl -X POST http://localhost:3001/api/words \
  -H "Content-Type: application/json" \
  -d '{
    "tai_khamyang_word": "ꤢꤢ꤬",
    "english_word": "water",
    "assamese_word": "পানী",
    "pronunciation": "nam"
  }'
```

### Method 3: Bulk Upload CSV

1. Create CSV file:
```csv
tai_khamyang_word,english_word,assamese_word,pronunciation
ꤢꤢ꤬,water,পানী,nam
ꤘꤢꤩ,house,ঘৰ,huen
```

2. In Supabase:
   - Table Editor → words
   - Insert → Import CSV
   - Upload file

## Next Steps

- ✅ API is running
- ✅ Database is set up
- ✅ Sample data is loaded

Now you can:
1. Test all endpoints
2. Add more words to the dictionary
3. Move to Phase 3: Frontend Development

## Support

For issues:
- Check the main [SETUP.md](../../docs/SETUP.md)
- Review [API.md](../../docs/API.md) documentation
- Open an issue on GitHub
