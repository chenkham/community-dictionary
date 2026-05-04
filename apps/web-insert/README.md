# Tai Khamyang — Insert Hub (`@community-dictionary/web-insert`)

A small **members-only** Next.js editor for adding and managing words in
the Tai Khamyang Dictionary. It talks to the existing Hono API in
`apps/api` — no separate backend needed.

```
apps/
├── api/           ← Hono + Supabase (data lives here)
├── web/           ← Public site (read-only browsing)
└── web-insert/    ← THIS APP (members write data here)
```

## Features

- **Dashboard** — recent entries, total count, live API health
- **Add Word** — validated form for trilingual entries (zod, mirrors backend schema)
- **Manage Entries** — search, edit-in-modal, delete-with-confirm
- **Member gate** — simple shared passcode, stored in `localStorage`
- **Toasts** — success/error feedback for every API operation
- Same **green/blue/white** palette as the public site for visual consistency

## Setup

```bash
# from the monorepo root
npm install

# create the env file
cp apps/web-insert/.env.example apps/web-insert/.env.local
```

Edit `apps/web-insert/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_MEMBER_PASSCODE=khamyang2025
```

> **Note:** the passcode is a lightweight gate stored client-side. It is
> *not* a substitute for real authentication — replace `MemberGate.tsx`
> with Supabase Auth / Clerk / NextAuth when you are ready to harden it.

## Run it

```bash
# 1. start the API in one terminal
cd apps/api && npm run dev          # → http://localhost:3001

# 2. start this editor in another
cd apps/web-insert && npm run dev   # → http://localhost:3002
```

The public site (`apps/web`) keeps running on port 3000 — all three apps
can run side by side.

## Routes

| Route       | Purpose                                              |
| ----------- | ---------------------------------------------------- |
| `/`         | Dashboard with stats, API health, recent words       |
| `/add`      | Add Word form (trilingual + pronunciation + audio)   |
| `/manage`   | List, search, edit, delete                           |

## API contract used

All endpoints are at `apps/api/src/routes/words.ts`:

- `GET /api/words` — paginated list
- `GET /api/words/search?q=` — full-text search
- `POST /api/words` — create entry
- `PUT /api/words/:id` — update entry
- `DELETE /api/words/:id` — delete entry
- `GET /api/health` — health check

## Build

```bash
cd apps/web-insert
npm run build
npm start                 # production server on :3002
```
