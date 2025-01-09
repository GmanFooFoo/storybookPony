# Contributing to Storybook Pony

Thank you for your interest in contributing to Storybook Pony! This document provides guidelines and instructions for contributing to the project.

## Development Workflow

### Branch Structure
- `main`: Protected branch for stable releases
- `template`: Development branch for new features and documentation

### Getting Started
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/storybookPony.git
   cd storybookPony
   ```
3. Create a new branch from `template`:
   ```bash
   git checkout template
   git checkout -b feature/your-feature-name
   ```

### Making Changes
1. Make your changes in your feature branch
2. Test your changes locally:
   ```bash
   pnpm test
   pnpm lint
   ```
3. Commit your changes:
   ```bash
   git add .
   git commit -m "type: description of changes"
   ```
   
   Commit types:
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes
   - `refactor`: Code refactoring
   - `test`: Adding or updating tests
   - `chore`: Maintenance tasks

### Submitting Changes
1. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Create a pull request to merge into the `template` branch
3. After review and approval, changes will be merged
4. Periodically, `template` will be merged into `main` through a pull request

### Branch Protection
- The `main` branch requires pull request reviews
- Status checks must pass before merging
- Direct pushes to `main` are restricted

## Development Setup

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL (via Supabase)
- GitHub account

### Installation
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Configure environment variables (see [Environment Setup](docs/config/env.md))
4. Initialize database:
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

### Running Locally
```bash
# Development server
pnpm dev

# Run tests
pnpm test

# Lint code
pnpm lint
```

## Documentation

### Updating Docs
1. Documentation is in the `/docs` directory
2. Follow the existing structure and formatting
3. Update relevant sections:
   - User guides in `/docs/guides`
   - Configuration in `/docs/config`
   - Best practices in `/docs/best-practices`

### Documentation Standards
- Use clear, concise language
- Include code examples where relevant
- Keep formatting consistent
- Update table of contents when adding new sections

## Getting Help
- Create an issue for bugs or feature requests
- Join our [Discord community](https://discord.gg/storybookpony)
- Check existing documentation and issues first

## Code of Conduct
Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## License
By contributing, you agree that your contributions will be licensed under the GPL-3.0 License. 