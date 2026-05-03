# Setup

Instructions for running the Tai Khamyang Hub locally.

---

## Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git**

## Installation

```bash
git clone https://github.com/chenkham/community-dictionary.git
cd community-dictionary
npm install
```

This installs dependencies for all workspaces (API, web, and shared packages).

## Environment Variables

### API (`apps/api`)

Copy the example and fill in your Supabase credentials:

```bash
cp apps/api/.env.example apps/api/.env
```

Required variables:

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_SERVICE_KEY` | Supabase service role key (server-side only) |
| `PORT` | API server port (default: `3001`) |

### Web (`apps/web`)

No `.env` file is required for basic local development. The web app connects to the API at `http://localhost:3001` by default.

If you need to override the API URL, create `apps/web/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Running Locally

### Start the API server

```bash
cd apps/api
npm run dev
```

Runs on `http://localhost:3001`.

### Start the web application

```bash
cd apps/web
npm run dev
```

Runs on `http://localhost:3000`.

### Run both together (from root)

```bash
npm run dev
```

Uses Turborepo to start all workspaces in parallel.

## Building for Production

```bash
# Build all workspaces
npm run build

# Or build web only
cd apps/web
npm run build
npm start
```

## Database

The dictionary data is stored in Supabase (PostgreSQL). The main `words` table has:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `tai_khamyang_word` | TEXT | Word in Tai Khamyang script |
| `english_word` | TEXT | English translation |
| `assamese_word` | TEXT | Assamese translation |
| `pronunciation` | TEXT | Phonetic pronunciation |
| `audio_url` | TEXT | Link to pronunciation audio |

### Adding Words

- **CSV upload** — Prepare a CSV with the columns above and import via Supabase Dashboard
- **Manual entry** — Use the Supabase Table Editor
- **In-app form** — Use the "Contribute Word" modal in the web app

## Troubleshooting

**Port already in use:** The web app automatically tries the next available port if 3000 is taken.

**Lockfile warnings:** The monorepo uses npm workspaces. Always run `npm install` from the project root, not from individual app directories.

**SWC errors on Windows:** These are handled automatically. The dev and build scripts include `NEXT_IGNORE_INCORRECT_LOCKFILE=1` to skip lockfile patching in workspace setups.
