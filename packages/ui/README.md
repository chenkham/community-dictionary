# UI Package

Shared UI components for Community Dictionary - works across Web and Mobile.

## Features

- **Universal Components**: Works on React Native and Web
- **Professional Design**: Commercial-grade UI components
- **Customizable**: Easy theming and styling
- **Accessible**: WCAG compliant components
- **Type-Safe**: Full TypeScript support

## Components

### Core Components
- `Button` - Primary, secondary, outline variants
- `Input` - Text input with validation
- `Card` - Content container
- `SearchBar` - Dictionary search input
- `WordCard` - Display word entries
- `LanguageSelector` - Switch between languages

### Layout Components
- `Container` - Responsive container
- `Stack` - Vertical/horizontal layout
- `Grid` - Responsive grid layout

## Usage

```tsx
import { Button, SearchBar, WordCard } from '@community-dictionary/ui';

function MyComponent() {
  return (
    <>
      <SearchBar onSearch={(query) => console.log(query)} />
      <WordCard 
        taiWord="ꤢꤢ꤬"
        englishWord="water"
        assameseWord="পানী"
      />
      <Button variant="primary">Search</Button>
    </>
  );
}
```

## Tech Stack

Choose one of:
- **Tamagui**: Universal UI kit with excellent performance
- **Gluestack UI**: Professional component library

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```
