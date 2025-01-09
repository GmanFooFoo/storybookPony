# Storybook Pony

**Automating Design System Documentation from Code**

## Overview

Storybook Pony is an advanced design system documentation automation tool that bridges the gap between code and design documentation. It automatically analyzes your codebase to extract, document, and maintain design system information, ensuring your documentation stays synchronized with your actual implementation.

### Key Features

- **Automated Analysis**
  - Real-time code scanning and analysis
  - Design token extraction and validation
  - Component pattern recognition
  - Usage tracking and statistics

- **Documentation Generation**
  - Automated documentation from code
  - Interactive component previews
  - Token visualization and usage examples
  - Relationship mapping between components

- **GitHub Integration**
  - OAuth-based authentication
  - Repository access and analysis
  - Automated updates via webhooks
  - PR checks and documentation updates

- **Design System Management**
  - Token management and validation
  - Component organization and categorization
  - Version control and change tracking
  - Team collaboration tools

### Benefits

- **For Developers**
  - Reduced documentation overhead
  - Automated consistency checks
  - Clear component usage guidelines
  - Integration with existing workflows

- **For Designers**
  - Live design token documentation
  - Component usage insights
  - Implementation status tracking
  - Design-to-code validation

- **For Teams**
  - Single source of truth
  - Improved collaboration
  - Automated maintenance
  - Quality assurance tools

## Documentation

Comprehensive documentation is available in the `/docs` directory:

### Getting Started
- [Introduction](docs/introduction.md) - Overview and core concepts
- [Quick Start Guide](docs/quick-start.md) - Get up and running quickly
- [Installation Guide](docs/installation.md) - Detailed installation steps

### Configuration Guides
- [GitHub Setup](docs/guides/github-setup.md) - Configure GitHub integration
- [Token Configuration](docs/config/tokens.md) - Set up design tokens
- [Component Rules](docs/config/components.md) - Configure component guidelines
- [Analysis Settings](docs/config/analysis.md) - Configure analysis behavior

### Best Practices
- [Token Management](docs/best-practices/tokens.md) - Token organization and usage
- [Component Development](docs/best-practices/components.md) - Component creation guidelines
- [Documentation](docs/best-practices/documentation.md) - Documentation maintenance

### Advanced Topics
- [Performance Guide](docs/advanced/performance.md) - Optimization techniques
- [Security Best Practices](docs/advanced/security.md) - Security guidelines
- [Custom Integrations](docs/advanced/integrations.md) - Extend functionality

For API documentation and additional resources, visit our [Documentation Portal](https://docs.storybookpony.dev).

## Quick Start

1. **Prerequisites**
   - Node.js 18+
   - PostgreSQL (via Supabase)
   - GitHub Account
   - pnpm (recommended) or npm

2. **Setup**
   ```bash
   # Clone and install
   git clone https://github.com/GmanFooFoo/storybookPony.git
   cd storybookPony
   pnpm install

   # Configure environment
   cp .env.example .env
   # Edit .env with your credentials

   # Initialize database
   pnpm prisma generate
   pnpm prisma db push

   # Start development
   pnpm dev
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
│   ├── (auth)/              # Auth routes & components
│   │   └── auth/            # Authentication pages
│   ├── (dashboard)/         # Protected dashboard routes
│   ├── api/                 # API routes
│   │   └── auth/           # NextAuth configuration
│   └── layout.tsx           # Root layout
├── components/              # Shared components
│   ├── common/             # Common UI components
│   ├── providers/          # React context providers
│   ├── ui/                 # Shadcn UI components
│   └── layout/             # Layout components
├── lib/                     # Utilities
│   ├── auth/               # Auth utilities
│   ├── db.ts               # Database client
│   └── utils.ts            # Helper functions
├── hooks/                   # Custom React hooks
├── services/               # External service integrations
├── styles/                 # Global styles
├── tests/                  # Test utilities
├── types/                  # TypeScript types
└── utils/                  # Utility functions
```

## Features

- **Authentication**
  - NextAuth.js integration with GitHub
  - Protected routes and API endpoints
  - Session management

- **Database Schema**
  - User management
  - Design system storage
  - Token management
  - Component tracking

- **Design System Tools**
  - Modern web interface with Shadcn UI
  - System definition and management
  - Token type support:
    - Colors
    - Typography
    - Spacing
    - Shadows
    - Borders
    - Breakpoints
    - Z-indices

## Tech Stack

- **Frontend:** 
  - Next.js 14 with App Router
  - React 18
  - TypeScript 5
  - Tailwind CSS 3
  - Shadcn UI
  - Radix UI Primitives

- **Backend:** 
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL (Supabase)
  - NextAuth.js 4

- **Development Tools:**
  - ESLint & Prettier
  - Jest & React Testing Library
  - TypeDoc
  - Husky & lint-staged
  - pnpm

## Development

```bash
# Start development server
pnpm dev

# Run tests
pnpm test
pnpm test:watch

# Type checking
pnpm type-check

# Linting
pnpm lint
pnpm lint:fix

# Format code
pnpm format

# Generate Prisma client
pnpm prisma:generate

# Database management
pnpm prisma:push    # Push schema changes
pnpm prisma:studio  # Database GUI

# Documentation
pnpm docs           # Generate docs
pnpm docs:watch     # Watch mode
```

## Contributing

When submitting pull requests, please:

1. Create a descriptive branch name (e.g., `feature/new-component`, `fix/button-styles`)
2. Follow the pull request template
3. Ensure all checks pass
4. Request review from maintainers

For more detailed contribution guidelines, see our documentation.

## License

GPL-3.0 License - See [LICENSE](LICENSE) file for details
