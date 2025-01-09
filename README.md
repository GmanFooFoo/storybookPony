# Storybook Pony

**Automating Design System Documentation from Code**

## Overview

Storybook Pony is a tool that automatically generates and manages design system documentation by analyzing codebases. This helps development teams maintain visual consistency across projects and improve collaboration between designers and developers.

## Quick Start

1. **Prerequisites**
   - Node.js 18+
   - PostgreSQL (via Supabase)
   - GitHub Account

2. **Setup**
   ```bash
   # Clone and install
   git clone https://github.com/your-username/storybookPony.git
   cd storybookPony
   npm install

   # Configure environment
   cp .env.example .env
   # Edit .env with your credentials

   # Start development
   npm run dev
   ```

3. **Configure GitHub OAuth**
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create new OAuth app
   - Set callback URL: `http://localhost:3000/api/auth/callback/github`
   - Add credentials to `.env`

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth routes
│   ├── (dashboard)/         # Protected dashboard
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/              # Shared components
└── lib/                     # Utilities
```

## Features

- **Repository Access**
  - GitHub OAuth integration
  - Single branch analysis
  - Secure authentication

- **Code Analysis**
  - Extract design tokens
  - Analyze Tailwind configs
  - Identify components

- **Design System Tools**
  - Modern web interface
  - System definition
  - Import/Export

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS, Shadcn UI
- **Backend:** Next.js API Routes, Prisma ORM, Supabase
- **Auth:** NextAuth.js with GitHub provider
- **Tools:** ESLint, Prettier, Jest, Zod

## Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Contributing

Contributions welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

## License

MIT License - See [LICENSE](LICENSE) file for details
