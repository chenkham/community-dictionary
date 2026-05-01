# Community Dictionary API

Backend API built with Hono.js - a lightweight, fast web framework for the Edge.

## Features

- **Fast & Lightweight**: Hono.js provides excellent performance
- **Type-Safe**: Full TypeScript support with Zod validation
- **Supabase Integration**: Direct connection to PostgreSQL database
- **RESTful API**: Clean and intuitive endpoints

## API Endpoints

### Words

- `GET /api/words` - Get all words (with pagination)
- `GET /api/words/:id` - Get a specific word
- `GET /api/words/search?q=query` - Search words
- `POST /api/words` - Create a new word (admin only)
- `PUT /api/words/:id` - Update a word (admin only)
- `DELETE /api/words/:id` - Delete a word (admin only)

### Languages

- `GET /api/languages` - Get supported languages

## Environment Variables

Create a `.env` file in this directory:

```env
PORT=3001
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
apps/api/
├── src/
│   ├── index.ts           # Entry point
│   ├── routes/            # API routes
│   │   ├── words.ts
│   │   └── languages.ts
│   ├── lib/               # Utilities
│   │   ├── supabase.ts
│   │   └── validation.ts
│   └── types/             # TypeScript types
└── package.json
```

## Tech Stack

- **Hono.js**: Web framework
- **Supabase**: Database client
- **Zod**: Schema validation
- **TypeScript**: Type safety
