# Contributing to Community Dictionary

Thank you for your interest in contributing to the Community Dictionary project! This document provides guidelines for contributing.

## How to Contribute

### Reporting Issues

- Use the GitHub issue tracker
- Check if the issue already exists
- Provide detailed information:
  - Steps to reproduce
  - Expected behavior
  - Actual behavior
  - Screenshots if applicable

### Suggesting Features

- Open an issue with the "feature request" label
- Describe the feature and its benefits
- Explain how it would work

### Code Contributions

1. **Fork the repository**
   ```bash
   git clone https://github.com/chenkham/community-dictionary.git
   cd community-dictionary
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the code style
   - Write clear commit messages
   - Add tests if applicable

4. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

## Commit Message Guidelines

We follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add search functionality to mobile app
fix: resolve word display issue on iOS
docs: update API documentation
```

## Code Style

- Use TypeScript for type safety
- Follow the existing code structure
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

## Adding Dictionary Words

### For Contributors

If you want to add words to the dictionary:

1. Prepare a CSV file with the format:
   ```csv
   tai_khamyang_word,english_word,assamese_word,pronunciation
   ```

2. Submit via:
   - Pull request with the CSV file in `data/words/`
   - Or create an issue with the words

### Quality Guidelines

- Ensure accurate translations
- Provide pronunciation when possible
- Include example sentences
- Specify part of speech (noun, verb, etc.)

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env
   cp apps/mobile/.env.example apps/mobile/.env
   ```

3. Start development:
   ```bash
   npm run dev
   ```

## Project Structure

```
community-dictionary/
├── apps/
│   ├── api/          # Backend API
│   ├── mobile/       # Mobile app
│   └── web/          # Web app
├── packages/
│   ├── database/     # Database schemas
│   └── ui/           # Shared components
└── docs/             # Documentation
```

## Questions?

- Open an issue for questions
- Join our community discussions
- Contact: [@chenkham](https://github.com/chenkham)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn

Thank you for contributing! 🙏
