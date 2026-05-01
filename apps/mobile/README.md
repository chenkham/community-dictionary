# Community Dictionary Mobile

Expo React Native application for iOS and Android.

## Features

- **Cross-Platform**: Single codebase for iOS and Android
- **Native Performance**: Built with React Native
- **Expo Router**: File-based routing
- **Offline First**: Works without internet connection
- **Modern UI**: Shared components from `@community-dictionary/ui`

## Tech Stack

- **Framework**: Expo SDK 50+
- **Navigation**: Expo Router
- **UI Components**: Tamagui / Gluestack UI
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Local Storage**: Expo SQLite

## Development

```bash
# Start Expo dev server
npm run dev

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## Environment Variables

Create a `.env` file:

```env
EXPO_PUBLIC_API_URL=http://localhost:3001
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
apps/mobile/
├── app/                  # Expo Router pages
│   ├── (tabs)/          # Tab navigation
│   ├── _layout.tsx
│   └── index.tsx
├── components/          # React Native components
├── lib/                 # Utilities
└── assets/              # Images, fonts, etc.
```

## Build

```bash
# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```
