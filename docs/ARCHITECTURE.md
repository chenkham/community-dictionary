# Architecture Documentation

Technical architecture of the Community Dictionary project.

## Overview

Community Dictionary is built as a **universal monorepo** using modern web technologies, enabling code sharing between web and mobile platforms while maintaining platform-specific optimizations.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Clients                              │
├──────────────────┬──────────────────┬──────────────────────┤
│   Web Browser    │   iOS Device     │   Android Device     │
│   (Next.js)      │   (Expo)         │   (Expo)             │
└────────┬─────────┴────────┬─────────┴────────┬─────────────┘
         │                  │                  │
         └──────────────────┼──────────────────┘
                            │
                    ┌───────▼────────┐
                    │   API Layer    │
                    │   (Hono.js)    │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │   Supabase     │
                    │  (PostgreSQL)  │
                    └────────────────┘
```

## Technology Stack

### Frontend

#### Web Application
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context / Zustand
- **Data Fetching**: React Query
- **UI Components**: Shared from `@community-dictionary/ui`

#### Mobile Application
- **Framework**: Expo (React Native)
- **Navigation**: Expo Router (file-based)
- **Language**: TypeScript
- **Styling**: NativeWind / Tamagui
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Local Storage**: Expo SQLite
- **UI Components**: Shared from `@community-dictionary/ui`

### Backend

#### API Server
- **Framework**: Hono.js
- **Runtime**: Node.js
- **Language**: TypeScript
- **Validation**: Zod
- **Authentication**: Supabase Auth

#### Database
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Supabase Client
- **Migrations**: SQL scripts
- **Search**: PostgreSQL Full-Text Search

### Infrastructure

#### Development
- **Monorepo**: Turborepo
- **Package Manager**: npm workspaces
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions

#### Production (Future)
- **Web Hosting**: Vercel / Netlify
- **API Hosting**: Railway / Fly.io
- **Database**: Supabase (managed PostgreSQL)
- **CDN**: Cloudflare
- **Monitoring**: Sentry

## Project Structure

```
community-dictionary/
├── apps/
│   ├── api/                    # Backend API
│   │   ├── src/
│   │   │   ├── index.ts       # Entry point
│   │   │   ├── routes/        # API routes
│   │   │   ├── lib/           # Utilities
│   │   │   └── types/         # TypeScript types
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── web/                    # Next.js web app
│   │   ├── app/               # App Router pages
│   │   ├── components/        # React components
│   │   ├── lib/               # Utilities
│   │   ├── public/            # Static assets
│   │   ├── package.json
│   │   └── next.config.js
│   │
│   └── mobile/                 # Expo mobile app
│       ├── app/               # Expo Router pages
│       ├── components/        # React Native components
│       ├── lib/               # Utilities
│       ├── assets/            # Images, fonts
│       ├── package.json
│       └── app.json
│
├── packages/
│   ├── database/              # Database schemas
│   │   ├── schema.sql        # PostgreSQL schema
│   │   ├── types/            # Generated types
│   │   └── package.json
│   │
│   └── ui/                    # Shared UI components
│       ├── components/       # Universal components
│       ├── index.tsx         # Exports
│       └── package.json
│
├── docs/                      # Documentation
├── .github/                   # GitHub config
├── package.json              # Root package.json
└── turbo.json               # Turborepo config
```

## Data Flow

### Search Flow

```
User Input (Search Query)
    ↓
[Web/Mobile UI]
    ↓
[React Query Cache Check]
    ↓ (cache miss)
[API Request: GET /api/words/search?q=query]
    ↓
[Hono.js Route Handler]
    ↓
[Supabase Client]
    ↓
[PostgreSQL Full-Text Search]
    ↓
[Results with Ranking]
    ↓
[API Response: JSON]
    ↓
[React Query Cache Update]
    ↓
[UI Update with Results]
```

### Word Creation Flow

```
User Input (New Word)
    ↓
[Web/Mobile Form]
    ↓
[Validation (Zod Schema)]
    ↓
[API Request: POST /api/words]
    ↓
[Authentication Check]
    ↓
[Hono.js Route Handler]
    ↓
[Supabase Client]
    ↓
[PostgreSQL Insert]
    ↓
[Row Level Security Check]
    ↓
[Success Response]
    ↓
[Cache Invalidation]
    ↓
[UI Update]
```

## Database Schema

### Entity Relationship

```
┌─────────────┐
│  languages  │
├─────────────┤
│ id (PK)     │
│ code        │
│ name        │
│ native_name │
└─────────────┘

┌──────────────────┐
│      words       │
├──────────────────┤
│ id (PK)          │
│ tai_khamyang_word│
│ english_word     │
│ assamese_word    │
│ pronunciation    │
│ part_of_speech   │
│ example_sentence │
│ audio_url        │
│ created_at       │
│ updated_at       │
│ created_by (FK)  │───┐
└──────────────────┘   │
                       │
                       ▼
              ┌─────────────┐
              │ auth.users  │
              │ (Supabase)  │
              └─────────────┘
```

## Security Architecture

### Authentication
- Supabase Auth (JWT tokens)
- Email/password authentication
- Social login (future)

### Authorization
- Row Level Security (RLS) policies
- Public read access
- Authenticated write access
- Owner-only update/delete

### API Security
- CORS configuration
- Rate limiting
- Input validation (Zod)
- SQL injection prevention (parameterized queries)

## Performance Optimization

### Frontend
- Code splitting (Next.js automatic)
- Image optimization (Next.js Image)
- React Query caching
- Lazy loading components
- Service Worker (PWA)

### Backend
- Database indexes (full-text search)
- Connection pooling (Supabase)
- Response caching (future)
- CDN for static assets

### Mobile
- Offline-first architecture
- Local SQLite cache
- Optimistic UI updates
- Image caching

## Scalability Considerations

### Current Architecture
- Suitable for 1,000-10,000 users
- Supabase free tier: 500MB database, 2GB bandwidth
- API can handle ~100 requests/second

### Future Scaling
- Upgrade Supabase plan for more resources
- Add Redis for caching
- Implement CDN for API responses
- Database read replicas
- Horizontal API scaling

## Development Workflow

```
Developer
    ↓
[Local Development]
    ↓
[Git Commit]
    ↓
[Push to GitHub]
    ↓
[GitHub Actions CI]
    ├─ Lint
    ├─ Type Check
    ├─ Build
    └─ Tests
    ↓
[Pull Request Review]
    ↓
[Merge to Main]
    ↓
[Auto Deploy]
    ├─ Web → Vercel
    ├─ API → Railway
    └─ Mobile → EAS Build
```

## Monitoring & Observability

### Planned Implementation
- **Error Tracking**: Sentry
- **Analytics**: Plausible / Google Analytics
- **Logging**: Supabase Logs
- **Performance**: Web Vitals
- **Uptime**: UptimeRobot

## Future Architecture Enhancements

### Phase 1 (Current)
- Basic CRUD operations
- Simple search
- Single API server

### Phase 2 (Next 6 months)
- Caching layer (Redis)
- Advanced search (Elasticsearch)
- Real-time updates (Supabase Realtime)
- File storage (Supabase Storage)

### Phase 3 (Long-term)
- Microservices architecture
- GraphQL API
- Machine learning for translations
- Multi-region deployment

## Design Principles

1. **Universal First**: Code should work on web and mobile
2. **Type Safety**: TypeScript everywhere
3. **Performance**: Optimize for slow networks (India)
4. **Offline Support**: Work without internet
5. **Accessibility**: WCAG 2.1 AA compliance
6. **Scalability**: Design for growth
7. **Security**: Secure by default
8. **Maintainability**: Clean, documented code

## Technology Decisions

### Why Turborepo?
- Efficient monorepo management
- Fast builds with caching
- Easy to share code between apps

### Why Hono.js?
- Lightweight and fast
- TypeScript-first
- Edge-ready (future Cloudflare Workers)
- Simple API design

### Why Supabase?
- Free tier perfect for MVP
- PostgreSQL (real SQL)
- Built-in authentication
- Real-time capabilities
- Good for India (Singapore region)

### Why Expo?
- Single codebase for iOS/Android/Web
- Great developer experience
- Over-the-air updates
- Easy to deploy

### Why Next.js?
- Best React framework
- Excellent SEO
- Fast performance
- Great developer experience
- Easy deployment (Vercel)

## References

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Hono.js Documentation](https://hono.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Last Updated**: January 2024  
**Author**: Chenkham
