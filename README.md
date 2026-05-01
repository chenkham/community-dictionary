# Community Dictionary

A professional multilingual dictionary application for **Tai Khamyang**, **English**, and **Assamese** languages. Built with modern web technologies and designed for both web and mobile platforms.

## 🌟 Features

- **Trilingual Support**: Seamlessly translate between Tai Khamyang, English, and Assamese
- **Universal Codebase**: Single codebase for Web, Android, and iOS
- **Professional UI**: Commercial-grade interface with modern design
- **Real-time Search**: Fast and efficient word lookup
- **Offline Support**: Access dictionary without internet connection
- **Community Driven**: Built for and by the community

## 🏗️ Project Structure

```
my-community-app/
├── apps/
│   ├── api/          # Backend API (Hono.js)
│   ├── mobile/       # Expo React Native App
│   └── web/          # Next.js Web Application
├── packages/
│   ├── database/     # Supabase schemas & migrations
│   └── ui/           # Shared UI components (Tamagui/Gluestack)
└── package.json      # Root workspace configuration
```

## 🛠️ Tech Stack

### Core Technologies
- **Language**: TypeScript (Strict mode for type safety)
- **Monorepo**: Turborepo for efficient builds
- **Package Manager**: npm workspaces

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **API Framework**: Hono.js (Lightweight & Fast)
- **ORM**: Drizzle ORM or Prisma

### Frontend
- **Mobile/Web**: Expo (React Native) + Expo Router
- **Web Framework**: Next.js 14+ (App Router)
- **UI Library**: Tamagui or Gluestack UI
- **Styling**: NativeWind / Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chenkham/community-dictionary.git
cd community-dictionary
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy example env files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/mobile/.env.example apps/mobile/.env
```

4. Configure Supabase:
   - Create a project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key to `.env` files
   - Run database migrations (instructions in `packages/database/README.md`)

### Development

Run all apps in development mode:
```bash
npm run dev
```

Run specific app:
```bash
# API only
cd apps/api && npm run dev

# Web only
cd apps/web && npm run dev

# Mobile only
cd apps/mobile && npm run dev
```

## 📊 Database Schema

The dictionary uses a PostgreSQL database with the following main structure:

### Words Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| tai_khamyang_word | TEXT | Word in Tai Khamyang |
| english_word | TEXT | English translation |
| assamese_word | TEXT | Assamese translation |
| pronunciation | TEXT | Phonetic pronunciation |
| part_of_speech | TEXT | Noun, Verb, Adjective, etc. |
| example_sentence | TEXT | Usage example |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Adding Words to Dictionary

#### Method 1: Bulk Upload (CSV)
1. Create an Excel/CSV file with headers:
   - `tai_khamyang_word`
   - `english_word`
   - `assamese_word`
   - `pronunciation` (optional)
   - `part_of_speech` (optional)
   - `example_sentence` (optional)

2. Export as `.csv`

3. Upload via Supabase Dashboard:
   - Go to Table Editor
   - Select `words` table
   - Click "Insert" → "Import data from CSV"

#### Method 2: Manual Entry
Use the Supabase Dashboard to add words one by one through the table editor interface.

#### Method 3: API (Coming Soon)
Use the REST API endpoints to programmatically add words.

## 📱 Platform Support

- ✅ Web (Desktop & Mobile browsers)
- ✅ Android (via Expo)
- ✅ iOS (via Expo)

## 🤝 Contributing

Contributions are welcome! This is a community-driven project.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Roadmap

### Phase 1: Foundation ✅
- [x] Project structure setup
- [x] Monorepo configuration
- [x] Documentation

### Phase 2: Database & Backend (Current)
- [ ] Supabase project setup
- [ ] Database schema design
- [ ] API endpoints (Hono.js)
- [ ] Authentication system
- [ ] Data validation

### Phase 3: Frontend Development
- [ ] Shared UI component library
- [ ] Web application (Next.js)
- [ ] Mobile application (Expo)
- [ ] Search functionality
- [ ] Offline support

### Phase 4: Enhancement
- [ ] Audio pronunciations
- [ ] User contributions
- [ ] Admin dashboard
- [ ] Analytics

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Chenkham**

- GitHub: [@chenkham](https://github.com/chenkham)

## 🙏 Acknowledgments

- Tai Khamyang community for language support
- Open source contributors
- Supabase for the amazing backend platform

---

**Note**: This project is actively under development. Star ⭐ the repository to stay updated!
