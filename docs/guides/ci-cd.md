# CI/CD Setup Guide

This guide explains how to set up continuous integration and deployment pipelines for your design system using Storybook Pony.

## Overview

The CI/CD pipeline includes:
- Code validation
- Token validation
- Component testing
- Documentation generation
- Automated deployment

## GitHub Actions Setup

### 1. Basic Workflow

```yaml
# .github/workflows/design-system.yml
name: Design System CI/CD

on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize]

jobs:
  validate:
    name: Validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Run validations
        run: |
          pnpm lint
          pnpm type-check
          pnpm test
          
  analyze:
    name: Analyze Design System
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Analyze tokens
        uses: storybook-pony/analyze-action@v1
        with:
          type: tokens
          config: .storybook-pony.json
          
      - name: Analyze components
        uses: storybook-pony/analyze-action@v1
        with:
          type: components
          config: .storybook-pony.json
          
  build:
    name: Build
    needs: analyze
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build tokens
        run: pnpm build:tokens
        
      - name: Build components
        run: pnpm build:components
        
      - name: Build documentation
        run: pnpm build:docs
        
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
          
  deploy:
    name: Deploy
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: dist
          
      - name: Deploy to staging
        uses: storybook-pony/deploy-action@v1
        with:
          environment: staging
          token: ${{ secrets.DEPLOY_TOKEN }}
```

### 2. Environment Configuration

```yaml
# .github/workflows/environments.yml
name: Environments

on:
  workflow_dispatch:
  workflow_call:

jobs:
  setup-environments:
    runs-on: ubuntu-latest
    steps:
      - name: Configure staging
        uses: storybook-pony/env-action@v1
        with:
          environment: staging
          url: https://design-staging.example.com
          variables: |
            NODE_ENV=production
            API_URL=https://api-staging.example.com
            
      - name: Configure production
        uses: storybook-pony/env-action@v1
        with:
          environment: production
          url: https://design.example.com
          variables: |
            NODE_ENV=production
            API_URL=https://api.example.com
```

## Deployment Configuration

### 1. Staging Environment

```typescript
interface StagingConfig {
  url: string;
  auth: {
    type: 'basic' | 'token';
    credentials: string;
  };
  features: {
    autoDeployment: boolean;
    previewBuilds: boolean;
  };
}

// Configuration
{
  "staging": {
    "url": "https://design-staging.example.com",
    "auth": {
      "type": "token",
      "credentials": process.env.STAGING_DEPLOY_TOKEN
    },
    "features": {
      "autoDeployment": true,
      "previewBuilds": true
    }
  }
}
```

### 2. Production Environment

```typescript
interface ProductionConfig {
  url: string;
  auth: {
    type: 'basic' | 'token';
    credentials: string;
  };
  features: {
    autoDeployment: boolean;
    requireApproval: boolean;
    rollback: boolean;
  };
}

// Configuration
{
  "production": {
    "url": "https://design.example.com",
    "auth": {
      "type": "token",
      "credentials": process.env.PROD_DEPLOY_TOKEN
    },
    "features": {
      "autoDeployment": false,
      "requireApproval": true,
      "rollback": true
    }
  }
}
```

## Testing Strategy

### 1. Unit Tests

```typescript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### 2. Visual Testing

```typescript
// chromatic.config.js
module.exports = {
  projectToken: process.env.CHROMATIC_PROJECT_TOKEN,
  buildScriptName: 'build-storybook',
  storybookBuildDir: 'storybook-static',
  onlyChanged: true,
  externals: [
    'src/**/*.{css,scss}'
  ]
};
```

## Monitoring

### 1. Health Checks

```typescript
interface HealthCheck {
  endpoint: string;
  interval: number;
  timeout: number;
  conditions: {
    status: number[];
    responseTime: number;
  };
}

// Configuration
{
  "monitoring": {
    "health": {
      "endpoint": "/api/health",
      "interval": 60,
      "timeout": 5000,
      "conditions": {
        "status": [200],
        "responseTime": 1000
      }
    }
  }
}
```

### 2. Alerts

```typescript
interface AlertConfig {
  channels: AlertChannel[];
  rules: AlertRule[];
  notifications: NotificationConfig;
}

// Configuration
{
  "alerts": {
    "channels": [
      {
        "type": "slack",
        "webhook": process.env.SLACK_WEBHOOK_URL,
        "channel": "#design-system-alerts"
      },
      {
        "type": "email",
        "recipients": ["team@example.com"]
      }
    ],
    "rules": [
      {
        "name": "High Error Rate",
        "condition": "error_rate > 5%",
        "window": "5m",
        "severity": "critical"
      }
    ]
  }
}
```

## Best Practices

1. **Pipeline Design**
   - Keep pipelines modular
   - Use caching effectively
   - Implement proper testing
   - Enable automated rollbacks

2. **Security**
   - Secure secrets management
   - Implement access controls
   - Regular security scans
   - Audit deployments

3. **Monitoring**
   - Set up proper logging
   - Configure alerts
   - Monitor performance
   - Track deployments

## Next Steps

1. [Monitoring Guide](./monitoring.md)
2. [Security Guide](./security.md)
3. [Performance Optimization](./performance.md)
``` 