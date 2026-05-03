# Tai Khamyang Hub

A digital platform dedicated to preserving the language, sacred manuscripts, Buddhist heritage, and living culture of the **Tai Khamyang** community of Northeast India.

The Tai Khamyang are a small Theravada Buddhist community with approximately 7,000 people and fewer than 15 fluent speakers of their native language. This project exists to document, teach, and celebrate their heritage before it is lost.

---

## What This Project Does

- **Trilingual Dictionary** — Search and browse words across Tai Khamyang, English, and Assamese
- **Cultural Archive** — Sacred manuscripts, Buddhist chants, festivals, and traditions
- **Language Learning** — Categorised phrases, greetings, numbers, and daily expressions
- **Community Directory** — Villages, monasteries, and settlement history across Assam and Arunachal Pradesh
- **Photo Gallery** — Visual documentation of cultural life, dress, and ceremonies
- **Cuisine** — Traditional Tai Khamyang dishes and cooking methods
- **News & Events** — Community updates, government recognition, and festival coverage
- **Resources** — Curated external links to Wikipedia, Sahapedia, language archives, and academic papers

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Web** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling** | Tailwind CSS with CSS custom properties |
| **API** | Hono.js on Node.js |
| **Database** | Supabase (PostgreSQL) |
| **Monorepo** | Turborepo + npm workspaces |
| **Icons** | Lucide React |
| **Data Fetching** | TanStack Query |

## Quick Start

```bash
git clone https://github.com/chenkham/community-dictionary.git
cd community-dictionary
npm install
```

See [SETUP.md](SETUP.md) for full environment configuration and running instructions.

## Documentation

| Document | Description |
|----------|-------------|
| [SETUP.md](SETUP.md) | Installation, environment variables, and running the project |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute code, words, or content |
| [PROJECT.md](PROJECT.md) | Detailed overview of what this project contains and why |

## Project Structure

```
community-dictionary/
├── apps/
│   ├── api/             # Hono.js REST API
│   └── web/             # Next.js web application
│       ├── app/         # Pages (App Router)
│       ├── components/  # Reusable UI components
│       └── lib/         # API helpers and content data layer
├── packages/
│   ├── database/        # Supabase schemas
│   └── ui/              # Shared UI package
├── README.md
├── SETUP.md
├── CONTRIBUTING.md
└── PROJECT.md
```

## Contributing

Contributions of any kind are welcome — code, word entries, translations, photos, corrections, or cultural knowledge. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Support This Project

This is a non-commercial, community-driven effort to preserve a critically endangered language and culture. If you find this work meaningful, please consider supporting it:

- **Star** this repository to increase visibility
- **Share** it with anyone interested in language preservation, Tai communities, or Northeast Indian heritage
- **Donate** to help cover hosting, domain, and development costs:

  [![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-support-yellow?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://buymeacoffee.com/chenkham)

  **UPI:** `chenkham@upi`

  Every contribution, however small, directly supports the preservation of Tai Khamyang heritage.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Author

**Chenkham** — [@chenkham](https://github.com/chenkham)

Built for the Tai Khamyang community. Preserving what matters.
