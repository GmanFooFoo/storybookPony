# Token Management Guide

This guide explains how to manage design tokens in Storybook Pony, including creation, organization, validation, and usage tracking.

## Overview

Design tokens are the atomic elements of your design system, representing:
- Colors
- Typography
- Spacing
- Shadows
- Borders
- Breakpoints
- Z-indices

## Token Structure

### Basic Token Format

```typescript
interface DesignToken {
  name: string;
  value: string | number;
  type: TokenType;
  description?: string;
  category?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

enum TokenType {
  COLOR = 'color',
  TYPOGRAPHY = 'typography',
  SPACING = 'spacing',
  SHADOW = 'shadow',
  BORDER = 'border',
  BREAKPOINT = 'breakpoint',
  Z_INDEX = 'z-index'
}
```

## Token Creation

### 1. Manual Token Creation

```typescript
// Via Dashboard UI
const colorToken = {
  name: "primary-500",
  value: "#0066CC",
  type: "color",
  description: "Primary brand color",
  category: "brand.primary",
  tags: ["brand", "interactive"]
};

// Via API
POST /api/tokens
Content-Type: application/json
{
  "designSystemId": "ds_123",
  "token": colorToken
}
```

### 2. Bulk Token Import

```typescript
// Style Dictionary format
{
  "color": {
    "brand": {
      "primary": {
        "value": "#0066CC",
        "type": "color"
      }
    }
  }
}

// W3C Design Tokens format
{
  "primary-color": {
    "$value": "#0066CC",
    "$type": "color"
  }
}
```

## Token Organization

### 1. Naming Conventions

```typescript
{
  "naming": {
    "pattern": "{category}-{scale}-{variant}",
    "separator": "-",
    "categories": [
      "color",
      "spacing",
      "typography"
    ],
    "scales": [
      "50",
      "100",
      "200",
      // ...
      "900"
    ]
  }
}
```

### 2. Grouping and Categories

```typescript
{
  "categories": {
    "color": {
      "brand": ["primary", "secondary"],
      "semantic": ["success", "error", "warning"],
      "neutral": ["gray", "white", "black"]
    },
    "typography": {
      "family": ["sans", "mono"],
      "size": ["xs", "sm", "base", "lg", "xl"],
      "weight": ["normal", "medium", "bold"]
    }
  }
}
```

## Token Validation

### 1. Value Validation

```typescript
{
  "validation": {
    "color": {
      "formats": ["hex", "rgb", "hsl"],
      "required": ["value", "name", "description"],
      "contrast": {
        "minimum": 4.5,
        "against": ["#FFFFFF", "#000000"]
      }
    },
    "spacing": {
      "units": ["px", "rem", "em"],
      "scale": {
        "base": 4,
        "allowMultiples": true
      }
    }
  }
}
```

### 2. Relationship Validation

```typescript
{
  "relationships": {
    "requiresBase": ["color", "spacing"],
    "aliases": {
      "enabled": true,
      "maxDepth": 3
    },
    "dependencies": {
      "track": true,
      "enforce": true
    }
  }
}
```

## Token Usage

### 1. Usage Tracking

```typescript
interface TokenUsage {
  tokenId: string;
  locations: {
    file: string;
    line: number;
    component?: string;
    property?: string;
  }[];
  count: number;
  lastUsed: Date;
  components: string[];
}
```

### 2. Usage Analysis

```typescript
// Get token usage statistics
GET /api/tokens/usage
?designSystemId=ds_123
&timeframe=30d
&groupBy=component

// Response
{
  "tokens": {
    "primary-500": {
      "totalUsage": 145,
      "uniqueComponents": 12,
      "topComponents": [
        { "name": "Button", "count": 45 },
        { "name": "Header", "count": 23 }
      ]
    }
  }
}
```

## Token Updates

### 1. Value Updates

```typescript
// Update token value
PATCH /api/tokens/:tokenId
{
  "value": "#0077FF",
  "updateDependents": true,
  "createChangeLog": true
}

// Response includes impact analysis
{
  "updated": true,
  "impactedComponents": [
    { "name": "Button", "severity": "high" },
    { "name": "Link", "severity": "medium" }
  ]
}
```

### 2. Bulk Updates

```typescript
// Bulk update tokens
POST /api/tokens/bulk-update
{
  "updates": [
    {
      "tokenId": "token_1",
      "value": "#0077FF"
    },
    {
      "tokenId": "token_2",
      "value": "#00AAFF"
    }
  ],
  "options": {
    "updateDependents": true,
    "createChangeLog": true,
    "validateConstraints": true
  }
}
```

## Token Export

### 1. Export Formats

```typescript
// Export configuration
{
  "formats": {
    "css": {
      "enabled": true,
      "prefix": "--ds",
      "format": "kebab-case"
    },
    "scss": {
      "enabled": true,
      "prefix": "$",
      "format": "kebab-case"
    },
    "ts": {
      "enabled": true,
      "format": "camelCase",
      "constPrefix": "DS_"
    }
  }
}
```

### 2. Platform-Specific Exports

```typescript
// Platform configuration
{
  "platforms": {
    "web": {
      "formats": ["css", "scss", "ts"],
      "transformers": ["rem-to-px"]
    },
    "ios": {
      "formats": ["swift"],
      "transformers": ["pt-to-px"]
    },
    "android": {
      "formats": ["xml"],
      "transformers": ["dp-to-px"]
    }
  }
}
```

## Token Documentation

### 1. Documentation Generation

```typescript
{
  "documentation": {
    "format": "mdx",
    "sections": [
      "overview",
      "usage",
      "examples"
    ],
    "include": {
      "preview": true,
      "code": true,
      "usage": true
    }
  }
}
```

### 2. Examples and Previews

```typescript
{
  "examples": {
    "showCase": {
      "colors": "swatches",
      "typography": "text-samples",
      "spacing": "grid"
    },
    "code": {
      "languages": ["tsx", "scss", "swift"],
      "frameworks": ["react", "vue", "angular"]
    }
  }
}
```

## Best Practices

1. **Naming and Organization**
   - Use consistent naming patterns
   - Group related tokens
   - Document relationships

2. **Value Management**
   - Use relative units when possible
   - Maintain consistent scales
   - Document decisions

3. **Usage and Maintenance**
   - Track token usage
   - Review unused tokens
   - Plan deprecation

## Next Steps

1. [Component Documentation](./component-docs.md)
2. [System Integration](./system-integration.md)
3. [Automation Guide](./automation.md)
``` 