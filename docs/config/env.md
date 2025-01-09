# Environment Configuration

This guide explains how to configure environment variables and settings for Storybook Pony.

## Required Environment Variables

### Authentication
```env
# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# NextAuth.js
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### Database
```env
# PostgreSQL Connection
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Optional: Connection Pool
DATABASE_POOL_SIZE=20
DATABASE_IDLE_TIMEOUT=10000
```

### Application
```env
# Node Environment
NODE_ENV=development # or production, test

# Server
PORT=3000
HOST=localhost

# API Base URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Optional Environment Variables

### Performance
```env
# Analysis
ANALYZE_TIMEOUT=300000
ANALYZE_BATCH_SIZE=100
ANALYZE_CONCURRENCY=4

# Caching
CACHE_TTL=3600
REDIS_URL=redis://localhost:6379
```

### Monitoring
```env
# Error Tracking
SENTRY_DSN=your_sentry_dsn
SENTRY_ENVIRONMENT=development

# Analytics
POSTHOG_KEY=your_posthog_key
POSTHOG_HOST=https://app.posthog.com
```

### Integration
```env
# Slack Notifications
SLACK_WEBHOOK_URL=your_slack_webhook_url
SLACK_CHANNEL=#design-system

# Email Notifications
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

## Environment Files

### Development
```env
# .env.development
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/storybook_pony_dev
```

### Production
```env
# .env.production
NODE_ENV=production
NEXTAUTH_URL=https://your-domain.com
DATABASE_URL=postgresql://user:password@production-host:5432/storybook_pony_prod
```

### Testing
```env
# .env.test
NODE_ENV=test
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/storybook_pony_test
```

## Configuration Validation

### 1. Environment Schema
```typescript
interface Environment {
  // Required
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
  DATABASE_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';

  // Optional
  PORT?: number;
  HOST?: string;
  ANALYZE_TIMEOUT?: number;
  CACHE_TTL?: number;
  SENTRY_DSN?: string;
  SLACK_WEBHOOK_URL?: string;
}
```

### 2. Validation Function
```typescript
function validateEnvironment(): Environment {
  const required = [
    'GITHUB_CLIENT_ID',
    'GITHUB_CLIENT_SECRET',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'DATABASE_URL',
    'NODE_ENV'
  ];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  return {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID!,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
    DATABASE_URL: process.env.DATABASE_URL!,
    NODE_ENV: process.env.NODE_ENV as Environment['NODE_ENV'],
    PORT: process.env.PORT ? parseInt(process.env.PORT) : undefined,
    // ... other variables
  };
}
```

## Environment Management

### 1. Local Development
```bash
# Copy example environment file
cp .env.example .env.local

# Generate NextAuth secret
openssl rand -base64 32

# Verify environment
pnpm storybook-pony config:verify
```

### 2. Production Deployment
```bash
# Encrypt sensitive values
pnpm storybook-pony secrets:encrypt

# Deploy with environment
pnpm storybook-pony deploy --env production

# Verify deployment
pnpm storybook-pony config:verify --env production
```

### 3. CI/CD Integration
```yaml
# GitHub Actions
env:
  GITHUB_CLIENT_ID: ${{ secrets.GITHUB_CLIENT_ID }}
  GITHUB_CLIENT_SECRET: ${{ secrets.GITHUB_CLIENT_SECRET }}
  NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
  DATABASE_URL: ${{ secrets.DATABASE_URL }}

steps:
  - name: Verify Environment
    run: pnpm storybook-pony config:verify
```

## Best Practices

### 1. Security
- Never commit `.env` files
- Use different values per environment
- Rotate secrets regularly
- Encrypt sensitive values

### 2. Organization
- Group related variables
- Use clear naming conventions
- Document all variables
- Validate on startup

### 3. Development
- Use `.env.local` for local overrides
- Set sensible defaults
- Handle missing values gracefully
- Log configuration issues

### 4. Deployment
- Use environment-specific files
- Validate before deployment
- Monitor for issues
- Back up configurations

## Troubleshooting

### Common Issues

1. **Missing Variables**
   ```bash
   # Check environment
   pnpm storybook-pony config:check
   
   # Show current values
   pnpm storybook-pony config:show
   ```

2. **Invalid Values**
   ```bash
   # Validate specific variable
   pnpm storybook-pony config:validate DATABASE_URL
   
   # Test database connection
   pnpm storybook-pony db:test
   ```

3. **Environment Mismatch**
   ```bash
   # Show environment
   pnpm storybook-pony config:env
   
   # Compare environments
   pnpm storybook-pony config:diff
   ```

## Next Steps

1. [Token Configuration](./tokens.md)
2. [Component Rules](./components.md)
3. [Analysis Settings](./analysis.md)
``` 