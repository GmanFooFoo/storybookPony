# Installation Guide

This guide covers different ways to install and set up Storybook Pony for your project.

## Prerequisites

### System Requirements
- **Operating System**: macOS, Windows, or Linux
- **Node.js**: Version 18.0.0 or higher
- **Package Manager**: pnpm (recommended), npm, or yarn
- **Git**: Latest version
- **Database**: PostgreSQL 14+ (for self-hosted)

### Development Tools
- **IDE**: VS Code (recommended) with following extensions:
  - TypeScript and JavaScript
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
- **Browser**: Chrome, Firefox, or Safari (latest versions)

## Installation Methods

### 1. Create New Project

```bash
# Using pnpm (recommended)
pnpm create storybook-pony-app my-design-system

# Using npm
npx create-storybook-pony-app my-design-system

# Using yarn
yarn create storybook-pony-app my-design-system
```

### 2. Add to Existing Project

```bash
# Using pnpm (recommended)
pnpm add -D storybook-pony

# Using npm
npm install --save-dev storybook-pony

# Using yarn
yarn add -D storybook-pony
```

## Setup Options

### 1. Automatic Setup

Run the initialization wizard:
```bash
pnpm storybook-pony init
```

This will:
- Create necessary configuration files
- Set up database connections
- Configure GitHub integration
- Initialize default settings

### 2. Manual Setup

1. Create configuration file:
```bash
touch .storybook-pony.json
```

2. Add basic configuration:
```json
{
  "name": "My Design System",
  "version": "1.0.0",
  "description": "My organization's design system",
  "repository": {
    "type": "github",
    "url": "https://github.com/username/repository"
  },
  "tokens": {
    "sources": ["src/**/*.{ts,tsx,css}"],
    "exclude": ["**/node_modules/**"]
  },
  "components": {
    "sources": ["src/components/**/*.{ts,tsx}"],
    "exclude": ["**/*.test.*", "**/*.stories.*"]
  },
  "documentation": {
    "output": "docs",
    "baseUrl": "/docs"
  }
}
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure environment:
```env
# Required
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Optional
NODE_ENV=development
PORT=3000
ANALYZE_TIMEOUT=300000
LOG_LEVEL=info
```

## Database Setup

### 1. Local PostgreSQL

1. Install PostgreSQL:
```bash
# macOS
brew install postgresql@14
brew services start postgresql@14

# Ubuntu
sudo apt update
sudo apt install postgresql-14
```

2. Create database:
```bash
createdb storybook_pony
```

3. Run migrations:
```bash
pnpm storybook-pony db:migrate
```

### 2. Cloud Database (Production)

1. Create a database on your preferred provider:
   - Supabase (recommended)
   - Railway
   - Vercel Postgres
   - AWS RDS

2. Update environment variables:
```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

3. Run migrations:
```bash
pnpm storybook-pony db:migrate
```

## Project Structure

After installation, your project should look like this:

```
my-design-system/
├── .env
├── .env.example
├── .eslintrc.json
├── .gitignore
├── .storybook-pony.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── styles/
│   └── types/
├── prisma/
│   └── schema.prisma
└── public/
```

## Verification

1. Check installation:
```bash
pnpm storybook-pony --version
```

2. Verify configuration:
```bash
pnpm storybook-pony config:verify
```

3. Test database connection:
```bash
pnpm storybook-pony db:test
```

## Common Issues

### 1. Installation Fails
- Clear package manager cache
- Check Node.js version
- Verify network connection
- Check disk space

### 2. Database Connection Fails
- Verify database credentials
- Check network access
- Ensure database exists
- Check SSL requirements

### 3. GitHub Integration Fails
- Verify OAuth credentials
- Check callback URLs
- Ensure proper permissions
- Verify repository access

## Next Steps

1. [Quick Start Guide](./quick-start.md)
2. [GitHub Setup](./guides/github-setup.md)
3. [Configuration Guide](./config/env.md)

## Support

If you encounter any issues during installation:

1. Check our [Troubleshooting Guide](./troubleshooting/common-issues.md)
2. Search [GitHub Issues](https://github.com/GmanFooFoo/storybookPony/issues)
3. Join our [Discord Community](https://discord.gg/storybookpony)
4. Contact [Support](mailto:support@storybookpony.dev)
``` 