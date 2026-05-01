# Setup Guide

Complete setup instructions for the Community Dictionary project.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Supabase Account** (free tier available at [supabase.com](https://supabase.com))

## Step 1: Clone the Repository

```bash
git clone https://github.com/chenkham/community-dictionary.git
cd community-dictionary
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install dependencies for all apps and packages in the monorepo.

## Step 3: Set Up Supabase

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - **Name**: community-dictionary
   - **Database Password**: (choose a strong password)
   - **Region**: Choose closest to your location (for India, select Singapore or Mumbai)
5. Click "Create new project"
6. Wait 2-3 minutes for setup to complete

### Get Your API Keys

1. In your Supabase project dashboard
2. Go to "Settings" → "API"
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

### Run Database Migrations

1. In Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Open `packages/database/schema.sql` from this project
4. Copy all the SQL code
5. Paste into Supabase SQL Editor
6. Click "Run"
7. You should see "Success. No rows returned"

### Verify Database Setup

1. Go to "Table Editor" in Supabase
2. You should see these tables:
   - `words`
   - `languages`
3. Click on `languages` - it should have 3 rows (Tai Khamyang, English, Assamese)

## Step 4: Configure Environment Variables

### API Environment

```bash
cd apps/api
cp .env.example .env
```

Edit `apps/api/.env`:
```env
PORT=3001
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here
```

### Web Environment

```bash
cd apps/web
cp .env.example .env.local
```

Edit `apps/web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Mobile Environment

```bash
cd apps/mobile
cp .env.example .env
```

Edit `apps/mobile/.env`:
```env
EXPO_PUBLIC_API_URL=http://localhost:3001
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 5: Start Development

### Start All Services

From the root directory:
```bash
npm run dev
```

This starts:
- API server on `http://localhost:3001`
- Web app on `http://localhost:3000`
- Mobile app (Expo dev server)

### Start Individual Services

**API only:**
```bash
cd apps/api
npm run dev
```

**Web only:**
```bash
cd apps/web
npm run dev
```

**Mobile only:**
```bash
cd apps/mobile
npm run dev
```

## Step 6: Verify Everything Works

### Test API

Open browser or use curl:
```bash
curl http://localhost:3001/api/health
```

Should return:
```json
{"status":"ok","timestamp":"2024-..."}
```

### Test Web App

1. Open `http://localhost:3000`
2. You should see the Community Dictionary homepage

### Test Mobile App

1. Install Expo Go on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. Scan the QR code from the terminal
3. App should load on your phone

## Step 7: Add Dictionary Data

### Option 1: Manual Entry (Supabase Dashboard)

1. Go to Supabase → Table Editor → words
2. Click "Insert row"
3. Fill in the fields:
   - tai_khamyang_word
   - english_word
   - assamese_word
   - pronunciation (optional)
   - part_of_speech (optional)
   - example_sentence (optional)
4. Click "Save"

### Option 2: Bulk Upload (CSV)

1. Create a CSV file:
   ```csv
   tai_khamyang_word,english_word,assamese_word,pronunciation,part_of_speech,example_sentence
   ꤢꤢ꤬,water,পানী,nam,noun,I drink water every day
   ꤢꤢ꤬ꤗꤢꤩ,food,খাদ্য,khao,noun,We eat food together
   ```

2. In Supabase:
   - Go to Table Editor → words
   - Click "Insert" → "Import data from CSV"
   - Upload your CSV file
   - Map columns correctly
   - Click "Import"

### Option 3: SQL Insert

In Supabase SQL Editor:
```sql
INSERT INTO words (tai_khamyang_word, english_word, assamese_word, pronunciation, part_of_speech)
VALUES 
  ('ꤢꤢ꤬', 'water', 'পানী', 'nam', 'noun'),
  ('ꤘꤢꤩ', 'house', 'ঘৰ', 'huen', 'noun');
```

## Troubleshooting

### Port Already in Use

If port 3001 or 3000 is already in use:

**Windows:**
```bash
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Supabase Connection Error

- Verify your API keys are correct
- Check if your Supabase project is active
- Ensure you're using the correct project URL

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### TypeScript Errors

```bash
# Rebuild TypeScript
npm run build
```

## Next Steps

- Read [CONTRIBUTING.md](../CONTRIBUTING.md) to learn how to contribute
- Check [API Documentation](./API.md) for backend endpoints
- Explore the codebase structure

## Need Help?

- Open an issue on GitHub
- Check existing issues for solutions
- Contact: [@chenkham](https://github.com/chenkham)

Happy coding! 🚀
