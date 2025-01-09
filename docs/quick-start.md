# Quick Start Guide

This guide will help you get started with Storybook Pony in just a few minutes.

## Prerequisites

Before you begin, ensure you have:
- Node.js 18 or higher installed
- A GitHub account
- A repository with design tokens and components
- `pnpm` installed globally (`npm install -g pnpm`)

## Installation

1. Create a new project or navigate to your existing one:
```bash
# New project
pnpm create storybook-pony-app my-design-system
cd my-design-system

# Existing project
cd your-project
```

2. Install Storybook Pony:
```bash
pnpm add -D storybook-pony
```

3. Initialize the configuration:
```bash
pnpm storybook-pony init
```

## Configuration

1. Create a `.env` file in your project root:
```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your_database_url
```

2. Configure your design system settings in `.storybook-pony.json`:
```json
{
  "name": "My Design System",
  "version": "1.0.0",
  "tokens": {
    "sources": ["src/**/*.{ts,tsx,css}"],
    "exclude": ["**/node_modules/**"]
  },
  "components": {
    "sources": ["src/components/**/*.{ts,tsx}"],
    "exclude": ["**/*.test.*", "**/*.stories.*"]
  }
}
```

## GitHub Setup

1. Create a GitHub OAuth app:
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create a new OAuth app
   - Set homepage URL to `http://localhost:3000`
   - Set callback URL to `http://localhost:3000/api/auth/callback/github`
   - Copy Client ID and Client Secret to your `.env` file

2. Connect your repository:
```bash
pnpm storybook-pony connect
```

## First Run

1. Start the development server:
```bash
pnpm dev
```

2. Open `http://localhost:3000` in your browser

3. Sign in with GitHub

4. Start the initial analysis:
```bash
pnpm storybook-pony analyze
```

## Basic Usage

### View Documentation
- Open `http://localhost:3000/docs` to view your design system documentation
- Browse tokens, components, and their relationships
- Check usage statistics and insights

### Update Documentation
Documentation updates automatically when:
- You push changes to GitHub
- You run `pnpm storybook-pony analyze`
- A pull request is created or updated

### Share with Team
1. Deploy to production:
```bash
pnpm build
pnpm start
```

2. Share the URL with your team

## Next Steps

1. [Configure GitHub Integration](./guides/github-setup.md)
2. [Set Up CI/CD](./guides/ci-cd.md)
3. [Explore Advanced Features](./advanced/performance.md)

## Common Commands

```bash
# Start development server
pnpm dev

# Analyze repository
pnpm storybook-pony analyze

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test

# Update configuration
pnpm storybook-pony config

# View help
pnpm storybook-pony --help
```

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check GitHub credentials
   - Verify network connection
   - Ensure repository access

2. **Analysis Failed**
   - Check file paths in configuration
   - Verify file permissions
   - Check for syntax errors

3. **Build Failed**
   - Check dependencies
   - Verify Node.js version
   - Clear cache: `pnpm clean`

### Getting Help

- Check [Common Issues](./troubleshooting/common-issues.md)
- Join [Discord](https://discord.gg/storybookpony)
- Open an [Issue](https://github.com/GmanFooFoo/storybookPony/issues)

## Tips

1. **Performance**
   - Exclude test and story files
   - Use specific source paths
   - Enable caching

2. **Best Practices**
   - Commit `.storybook-pony.json`
   - Ignore `.env`
   - Use TypeScript
   - Add proper documentation

3. **Team Workflow**
   - Set up CI/CD
   - Use pull requests
   - Review changes
   - Keep documentation updated
``` 