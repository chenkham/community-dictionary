# Contributing

Thank you for your interest in this project. Contributions are welcome in many forms — code, word entries, cultural knowledge, photos, translations, corrections, or documentation.

---

## Ways to Contribute

### Add Words or Phrases

The most valuable contribution is language data. You can submit new Tai Khamyang words by:

1. Opening a GitHub issue with the word, its English and Assamese translations, and pronunciation
2. Submitting a CSV file via pull request with the format:
   ```csv
   tai_khamyang_word,english_word,assamese_word,pronunciation
   ```
3. Using the in-app "Contribute Word" form (submissions are reviewed before publishing)

Please ensure translations are accurate. Include pronunciation and part of speech where possible.

### Report Issues

Use the [GitHub issue tracker](https://github.com/chenkham/community-dictionary/issues). Include:

- Steps to reproduce
- Expected vs actual behaviour
- Screenshots if relevant

### Submit Code

1. Fork the repository
2. Create a branch from `main`:
   ```bash
   git checkout -b fix/description
   ```
3. Make your changes following the existing code style
4. Test locally:
   ```bash
   npm run build
   ```
5. Commit using conventional format:
   ```
   feat: add audio playback to learn page
   fix: resolve search bar focus issue
   docs: update setup instructions
   ```
6. Push and open a pull request against `main`

### Contribute Photos or Cultural Content

If you have photos of Tai Khamyang culture, festivals, monasteries, or village life, please reach out via GitHub issues. Images can be hosted via Google Drive or cloud links.

---

## Code Guidelines

- **TypeScript** throughout — no `any` types unless unavoidable
- **Tailwind CSS** for styling — use CSS variables defined in `globals.css`
- **Existing patterns** — follow the component and page structure already in place
- **No hardcoded strings** for content data — use `lib/content.ts` or the API layer
- Keep functions focused and files under 200 lines where practical

## Project Setup

See [SETUP.md](SETUP.md) for installation and environment configuration.

## Code of Conduct

- Be respectful and welcoming
- Give constructive feedback
- Credit cultural knowledge to its source
- Prioritise accuracy over speed

## Questions

Open a GitHub issue or reach out to [@chenkham](https://github.com/chenkham).
