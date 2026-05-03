# Project Overview

This document explains what this project contains, why it exists, and how it is organised.

---

## Why This Exists

The Tai Khamyang are one of six Tai groups that migrated from Mong-Mao (modern Yunnan, China) to Northeast India centuries ago. Today they number approximately 7,000 people across Upper Assam and parts of Arunachal Pradesh. Their language — a member of the Southwestern Tai family, related to Thai, Shan, and Khamti — is critically endangered, with fewer than 15 fluent speakers remaining.

This project is an attempt to document and preserve their language, culture, and heritage in a digital format that is accessible, searchable, and expandable by the community itself.

## What This Project Contains

### Trilingual Dictionary

The core of the application. A searchable database of Tai Khamyang words with English and Assamese translations, phonetic pronunciations, and audio where available. Users can search, browse, favourite words, and contribute new entries.

### Cultural Pages

- **About** — History, etymology, religion, language classification, and an interactive timeline of Tai Khamyang history
- **Manuscripts** — Documentation of sacred texts written in Lik Tai script on palm leaves, bark, and handmade paper, preserved in monasteries
- **Chants** — Buddhist recitations and their significance in community worship
- **Festivals** — Annual celebrations including Poi Sangken (water festival), Maikung-Sungphai, and Buddhist observances
- **Traditions** — Stilt houses (Chang Ghor), handloom weaving, dietary customs, and Theravada Buddhist practices
- **Community** — Profiles of villages, notable community members, and elder knowledge

### Language Learning

A dedicated section with categorised phrases across greetings, numbers, daily life, family, food, nature, and religion. Includes a rotating "Phrase of the Day" feature.

### Village Directory

A listing of Tai Khamyang settlements grouped by state, with district, monastery name, and population information. Settlements span Jorhat, Sivasagar, Tinsukia, and Golaghat in Assam, and Namsai in Arunachal Pradesh.

### Cuisine

Traditional dishes categorised by type — rice preparations, fish dishes, vegetable dishes, and festival foods. Documents cooking methods and ingredients specific to Tai Khamyang food culture.

### Photo Gallery

A visual archive of cultural life, festivals, dress, and monasteries. Designed to accept images from Google Drive, cloud storage, or direct uploads.

### News & Events

Community updates, language preservation initiatives, government recognition, and festival coverage. Each item links to its original source.

### Resources

Curated external links organised by category — Wikipedia articles, Sahapedia entries, language archives (ELAR, Endangered Languages Project), government portals, and academic papers.

## How Content Is Managed

All content flows through a centralised data layer at `apps/web/lib/content.ts`. This file defines TypeScript interfaces for every content type (words, news, gallery items, timeline events, villages, phrases, dishes) and provides async functions to fetch them.

Currently the data is static JSON embedded in the file. The architecture is designed so that these functions can be swapped to fetch from:

- **Database** (Supabase, MongoDB, PostgreSQL)
- **Google Sheets or Drive** (via JSON API endpoints)
- **CMS** (Sanity, Strapi, Contentful)
- **Cloud storage** (Firebase, Supabase Storage)
- **External APIs**

No frontend code needs to change — only the data-fetching functions.

## How the Web App Is Built

The web application uses Next.js 14 with the App Router. Pages are a mix of server components (for static and data-fetched content) and client components (for interactivity like search, filtering, and animations).

Styling uses Tailwind CSS with CSS custom properties defined in `globals.css`. The design supports light and dark modes via CSS variables. The layout is responsive and fills the full screen on laptops and desktops.

Key architectural decisions:

- **No page-level API calls for cultural content** — all content pages use the centralised data layer, keeping them fast and independent of the API server
- **Dictionary data comes from the API** — words are fetched from the Hono.js backend, which connects to Supabase
- **Client components are minimal** — only used where browser APIs or user interaction require it (search, favourites, animations)
- **PWA support** — service worker registration and web manifest for installability

## Monorepo Structure

The project uses npm workspaces managed by Turborepo:

- `apps/api` — Hono.js REST API with Supabase integration
- `apps/web` — Next.js web application (the primary user-facing app)
- `packages/database` — Shared database schemas
- `packages/ui` — Shared UI components package

## Who This Is For

- Members of the Tai Khamyang community who want to learn or preserve their language
- Researchers and linguists studying Southwestern Tai languages
- Anyone interested in the cultural heritage of Northeast India's Tai communities
- Developers who want to contribute to language preservation efforts
