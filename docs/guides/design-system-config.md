# Design System Configuration Guide

This guide explains how to configure and manage your design system in Storybook Pony, including token definitions, component guidelines, and system rules.

## Overview

A design system in Storybook Pony consists of:
- Design tokens
- Component specifications
- Usage guidelines
- Documentation
- Version control

## Design System Setup

### 1. Creating a Design System

```typescript
interface DesignSystem {
  name: string;
  description: string;
  version: string;
  tokens: DesignToken[];
  components: ComponentSpec[];
  guidelines: Guideline[];
}
```

### 2. Basic Configuration

```typescript
{
  "name": "Your Design System",
  "description": "Design system for your organization",
  "version": "1.0.0",
  "metadata": {
    "organization": "Your Org",
    "maintainers": ["team@org.com"],
    "repository": "github.com/org/design-system"
  }
}
```

## Token Configuration

### 1. Color Tokens

```typescript
{
  "colors": {
    "primary": {
      "50": { value: "#f0f9ff" },
      "100": { value: "#e0f2fe" },
      // ... other shades
      "900": { value: "#0c4a6e" }
    },
    "semantic": {
      "success": { value: "{colors.green.500}" },
      "error": { value: "{colors.red.500}" },
      "warning": { value: "{colors.yellow.500}" }
    }
  }
}
```

### 2. Typography Tokens

```typescript
{
  "typography": {
    "fontFamilies": {
      "sans": { value: "Inter, system-ui, sans-serif" },
      "mono": { value: "JetBrains Mono, monospace" }
    },
    "fontSizes": {
      "xs": { value: "0.75rem" },
      "sm": { value: "0.875rem" },
      "base": { value: "1rem" }
    },
    "fontWeights": {
      "normal": { value: "400" },
      "medium": { value: "500" },
      "bold": { value: "700" }
    }
  }
}
```

### 3. Spacing and Layout

```typescript
{
  "spacing": {
    "0": { value: "0" },
    "1": { value: "0.25rem" },
    "2": { value: "0.5rem" }
  },
  "breakpoints": {
    "sm": { value: "640px" },
    "md": { value: "768px" },
    "lg": { value: "1024px" }
  }
}
```

## Component Configuration

### 1. Component Specifications

```typescript
{
  "components": {
    "Button": {
      "description": "Primary action button component",
      "props": {
        "variant": {
          "type": "string",
          "options": ["primary", "secondary", "ghost"],
          "default": "primary"
        },
        "size": {
          "type": "string",
          "options": ["sm", "md", "lg"],
          "default": "md"
        }
      },
      "tokens": {
        "background": "{colors.primary.500}",
        "text": "{colors.white}",
        "padding": "{spacing.4}"
      }
    }
  }
}
```

### 2. Component Guidelines

```typescript
{
  "guidelines": {
    "Button": {
      "usage": [
        "Use for primary actions in forms",
        "Limit one primary button per view",
        "Use ghost variant for secondary actions"
      ],
      "accessibility": [
        "Ensure 4.5:1 contrast ratio",
        "Include aria-label for icon-only buttons",
        "Support keyboard navigation"
      ]
    }
  }
}
```

## System Rules

### 1. Token Rules

```typescript
{
  "rules": {
    "colors": {
      "enforceContrast": true,
      "minContrast": 4.5,
      "allowedFormats": ["hex", "rgb"]
    },
    "spacing": {
      "enforceScale": true,
      "baseUnit": 4,
      "allowedUnits": ["rem", "px"]
    }
  }
}
```

### 2. Component Rules

```typescript
{
  "componentRules": {
    "enforceProps": true,
    "requireDescription": true,
    "requireExamples": true,
    "enforceNaming": {
      "pattern": "^[A-Z][a-zA-Z]+$",
      "prefix": ""
    }
  }
}
```

## Version Control

### 1. Version Configuration

```typescript
{
  "versioning": {
    "strategy": "semver",
    "changelog": true,
    "git": {
      "tagPrefix": "ds-",
      "commitConvention": "conventional"
    }
  }
}
```

### 2. Change Management

```typescript
{
  "changes": {
    "reviewRequired": true,
    "approvers": ["design-team", "dev-team"],
    "changeTypes": {
      "major": ["token.remove", "component.break"],
      "minor": ["token.add", "component.add"],
      "patch": ["token.modify", "doc.update"]
    }
  }
}
```

## Documentation

### 1. Documentation Settings

```typescript
{
  "documentation": {
    "format": "mdx",
    "auto": true,
    "sections": [
      "overview",
      "tokens",
      "components",
      "guidelines"
    ]
  }
}
```

### 2. Example Generation

```typescript
{
  "examples": {
    "generateStorybook": true,
    "includeCode": true,
    "platforms": ["web", "react-native"],
    "themes": ["light", "dark"]
  }
}
```

## Integration

### 1. Tool Integration

```typescript
{
  "integrations": {
    "figma": {
      "enabled": true,
      "syncTokens": true,
      "fileId": "your-figma-file-id"
    },
    "github": {
      "enabled": true,
      "repository": "org/design-system",
      "branch": "main"
    }
  }
}
```

### 2. Export Settings

```typescript
{
  "exports": {
    "formats": [
      "css",
      "scss",
      "ts",
      "json"
    ],
    "platforms": [
      "web",
      "mobile",
      "desktop"
    ]
  }
}
```

## Best Practices

1. **Token Organization**
   - Use semantic naming
   - Maintain consistent scales
   - Document token usage

2. **Component Structure**
   - Define clear prop interfaces
   - Include usage examples
   - Document accessibility

3. **Version Management**
   - Follow semantic versioning
   - Document breaking changes
   - Maintain changelog

## Next Steps

1. [Token Management](./token-management.md)
2. [Component Documentation](./component-docs.md)
3. [System Integration](./system-integration.md)
``` 