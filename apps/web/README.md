# Community Dictionary Web

Next.js web application for the Community Dictionary.

## Features

- **Modern UI**: Built with Next.js 14+ App Router
- **Responsive Design**: Works on all devices
- **Fast Search**: Real-time word lookup
- **SEO Optimized**: Server-side rendering for better discoverability
- **Offline Support**: Progressive Web App capabilities

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shared from `@community-dictionary/ui`
- **State Management**: React Context / Zustand
- **Data Fetching**: React Query

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
apps/web/
├── app/                   # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/              # API routes (if needed)
├── components/           # React components
├── lib/                  # Utilities
└── public/               # Static assets
```

## Build

```bash
npm run build
npm start
```
