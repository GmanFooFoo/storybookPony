# System Integration Guide

This guide explains how to integrate Storybook Pony with various external tools and services to create a comprehensive design system workflow.

## Overview

Storybook Pony integrates with:
- Design Tools (Figma, Sketch)
- Version Control (GitHub, GitLab)
- CI/CD Systems (GitHub Actions, Jenkins)
- Documentation (Storybook, MDX)
- Package Managers (npm, pnpm)

## Design Tool Integration

### 1. Figma Integration

```typescript
interface FigmaConfig {
  enabled: boolean;
  accessToken: string;
  fileId: string;
  syncOptions: {
    tokens: boolean;
    components: boolean;
    styles: boolean;
    autoSync: boolean;
  };
}

// Configuration
{
  "figma": {
    "enabled": true,
    "accessToken": process.env.FIGMA_ACCESS_TOKEN,
    "fileId": "your-design-file-id",
    "syncOptions": {
      "tokens": true,
      "components": true,
      "styles": true,
      "autoSync": true
    }
  }
}
```

### 2. Token Sync

```typescript
// Sync Figma variables to design tokens
POST /api/integrations/figma/sync
{
  "direction": "figma-to-tokens",
  "options": {
    "includeStyles": true,
    "includeComponents": true,
    "createMissingTokens": true
  }
}

// Response
{
  "synced": {
    "tokens": 42,
    "styles": 15,
    "components": 8
  },
  "created": 3,
  "updated": 12,
  "skipped": 1
}
```

## Version Control Integration

### 1. GitHub Integration

```typescript
interface GitHubConfig {
  repository: string;
  branch: string;
  workflow: {
    enabled: boolean;
    path: string;
    triggers: string[];
  };
  pr: {
    enabled: boolean;
    template: string;
    labels: string[];
  };
}

// Configuration
{
  "github": {
    "repository": "org/design-system",
    "branch": "main",
    "workflow": {
      "enabled": true,
      "path": ".github/workflows/design-system.yml",
      "triggers": ["push", "pull_request"]
    },
    "pr": {
      "enabled": true,
      "template": ".github/PULL_REQUEST_TEMPLATE.md",
      "labels": ["design-system", "automated"]
    }
  }
}
```

### 2. Automated Updates

```yaml
# .github/workflows/design-system.yml
name: Design System Update
on:
  push:
    branches: [main]
    paths:
      - 'design-system/**'
      - 'tokens/**'

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Update Design System
        uses: storybook-pony/github-action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          config: .storybook-pony.json
```

## CI/CD Integration

### 1. Build Pipeline

```typescript
interface CIConfig {
  provider: 'github' | 'gitlab' | 'jenkins';
  builds: {
    tokens: BuildConfig;
    documentation: BuildConfig;
    storybook: BuildConfig;
  };
  deployment: {
    environment: string;
    url: string;
    auth?: AuthConfig;
  };
}

// Configuration
{
  "ci": {
    "provider": "github",
    "builds": {
      "tokens": {
        "command": "pnpm build:tokens",
        "artifacts": ["dist/tokens"]
      },
      "documentation": {
        "command": "pnpm build:docs",
        "artifacts": ["docs/dist"]
      },
      "storybook": {
        "command": "pnpm build-storybook",
        "artifacts": ["storybook-static"]
      }
    },
    "deployment": {
      "environment": "production",
      "url": "https://design.example.com",
      "auth": {
        "type": "basic",
        "username": "DEPLOY_USER",
        "password": "DEPLOY_TOKEN"
      }
    }
  }
}
```

### 2. Automated Testing

```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - name: Install dependencies
      run: pnpm install
    - name: Run tests
      run: |
        pnpm test:tokens
        pnpm test:components
        pnpm test:visual
    - name: Upload test results
      uses: actions/upload-artifact@v3
      with:
        name: test-results
        path: coverage/
```

## Documentation Integration

### 1. Storybook Configuration

```typescript
interface StorybookConfig {
  enabled: boolean;
  version: string;
  addons: string[];
  features: {
    docs: boolean;
    controls: boolean;
    actions: boolean;
  };
  theme: ThemeConfig;
}

// Configuration
{
  "storybook": {
    "enabled": true,
    "version": "7.x",
    "addons": [
      "@storybook/addon-essentials",
      "@storybook/addon-a11y"
    ],
    "features": {
      "docs": true,
      "controls": true,
      "actions": true
    },
    "theme": {
      "base": "light",
      "brandTitle": "Design System",
      "brandUrl": "https://design.example.com"
    }
  }
}
```

### 2. MDX Documentation

```typescript
// Configure MDX documentation generation
{
  "documentation": {
    "format": "mdx",
    "output": "docs/dist",
    "templates": {
      "component": "templates/component.mdx",
      "token": "templates/token.mdx",
      "guide": "templates/guide.mdx"
    },
    "metadata": {
      "title": "Design System",
      "description": "Component documentation",
      "version": "1.0.0"
    }
  }
}
```

## Package Management

### 1. NPM Configuration

```typescript
interface PackageConfig {
  name: string;
  version: string;
  publishConfig: {
    registry: string;
    access: 'public' | 'restricted';
    tag: string;
  };
  exports: Record<string, string>;
}

// Configuration
{
  "package": {
    "name": "@org/design-system",
    "version": "1.0.0",
    "publishConfig": {
      "registry": "https://registry.npmjs.org/",
      "access": "public",
      "tag": "latest"
    },
    "exports": {
      "./tokens": "./dist/tokens/index.js",
      "./components": "./dist/components/index.js",
      "./styles": "./dist/styles/index.css"
    }
  }
}
```

### 2. Release Automation

```yaml
release:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        registry-url: 'https://registry.npmjs.org'
    - name: Install dependencies
      run: pnpm install
    - name: Build package
      run: pnpm build
    - name: Publish package
      run: pnpm publish
      env:
        NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Webhook Integration

### 1. Webhook Configuration

```typescript
interface WebhookConfig {
  endpoints: WebhookEndpoint[];
  security: {
    secret: string;
    signatureHeader: string;
  };
  retries: {
    count: number;
    delay: number;
  };
}

// Configuration
{
  "webhooks": {
    "endpoints": [
      {
        "url": "https://api.example.com/design-system/webhook",
        "events": ["token.updated", "component.created"],
        "headers": {
          "Authorization": "Bearer ${WEBHOOK_TOKEN}"
        }
      }
    ],
    "security": {
      "secret": process.env.WEBHOOK_SECRET,
      "signatureHeader": "X-Webhook-Signature"
    },
    "retries": {
      "count": 3,
      "delay": 1000
    }
  }
}
```

### 2. Event Handling

```typescript
// Webhook event handler
async function handleWebhookEvent(event: WebhookEvent) {
  switch (event.type) {
    case 'token.updated':
      await syncTokens(event.data);
      break;
    case 'component.created':
      await updateDocumentation(event.data);
      break;
  }
}
```

## Best Practices

1. **Security**
   - Use environment variables for secrets
   - Implement proper authentication
   - Validate webhook signatures
   - Rotate access tokens regularly

2. **Performance**
   - Implement caching strategies
   - Use incremental builds
   - Optimize asset delivery
   - Monitor API rate limits

3. **Maintenance**
   - Keep dependencies updated
   - Monitor integration health
   - Log important events
   - Set up alerts for failures

## Next Steps

1. [Automation Guide](./automation.md)
2. [API Reference](../api/README.md)
3. [Troubleshooting](../support/troubleshooting.md)
``` 