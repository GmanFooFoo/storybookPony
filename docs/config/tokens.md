# Token Configuration

This guide explains how to configure and manage design tokens in Storybook Pony.

## Token Configuration File

### Basic Structure
```json
{
  "tokens": {
    "sources": ["src/**/*.{ts,tsx,css}"],
    "exclude": ["**/node_modules/**"],
    "output": {
      "format": ["css", "js", "json"],
      "directory": "src/styles/tokens"
    },
    "categories": {
      "colors": {
        "pattern": "color|bg|border|fill|stroke",
        "format": "color"
      },
      "spacing": {
        "pattern": "space|gap|margin|padding",
        "format": "spacing"
      }
    }
  }
}
```

### Source Configuration
```json
{
  "sources": {
    "files": ["src/**/*.{ts,tsx,css}"],
    "exclude": ["**/node_modules/**", "**/*.test.*"],
    "include": {
      "css": true,
      "typescript": true,
      "javascript": false
    },
    "patterns": {
      "css": ["var\\(--([^)]+)\\)"],
      "typescript": ["tokens\\.([^\\s.]+)"]
    }
  }
}
```

## Token Categories

### 1. Color Tokens
```typescript
interface ColorToken {
  value: string;
  type: 'color';
  format: 'hex' | 'rgb' | 'hsl';
  alpha?: number;
  description?: string;
}

// Configuration
{
  "colors": {
    "primary": {
      "value": "#0066CC",
      "type": "color",
      "format": "hex"
    },
    "secondary": {
      "value": "rgb(100, 100, 100)",
      "type": "color",
      "format": "rgb"
    }
  }
}
```

### 2. Typography Tokens
```typescript
interface TypographyToken {
  value: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
    letterSpacing?: string;
  };
  type: 'typography';
}

// Configuration
{
  "typography": {
    "heading1": {
      "value": {
        "fontFamily": "Inter, sans-serif",
        "fontSize": "2.5rem",
        "fontWeight": 700,
        "lineHeight": "1.2"
      },
      "type": "typography"
    }
  }
}
```

### 3. Spacing Tokens
```typescript
interface SpacingToken {
  value: string;
  type: 'spacing';
  scale?: number;
}

// Configuration
{
  "spacing": {
    "small": {
      "value": "0.5rem",
      "type": "spacing",
      "scale": 1
    },
    "medium": {
      "value": "1rem",
      "type": "spacing",
      "scale": 2
    }
  }
}
```

## Token Formats

### 1. CSS Variables
```css
:root {
  --color-primary: #0066CC;
  --color-secondary: rgb(100, 100, 100);
  --typography-heading1-font-family: Inter, sans-serif;
  --typography-heading1-font-size: 2.5rem;
  --spacing-small: 0.5rem;
}
```

### 2. JavaScript/TypeScript
```typescript
export const tokens = {
  colors: {
    primary: '#0066CC',
    secondary: 'rgb(100, 100, 100)'
  },
  typography: {
    heading1: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '2.5rem'
    }
  },
  spacing: {
    small: '0.5rem'
  }
} as const;
```

### 3. JSON
```json
{
  "tokens": {
    "colors": {
      "primary": "#0066CC",
      "secondary": "rgb(100, 100, 100)"
    },
    "typography": {
      "heading1": {
        "fontFamily": "Inter, sans-serif",
        "fontSize": "2.5rem"
      }
    },
    "spacing": {
      "small": "0.5rem"
    }
  }
}
```

## Token Validation

### 1. Schema Validation
```typescript
interface TokenValidation {
  rules: ValidationRule[];
  severity: 'error' | 'warning';
  exclude?: string[];
}

// Configuration
{
  "validation": {
    "rules": [
      {
        "type": "color",
        "pattern": "^#[0-9A-Fa-f]{6}$",
        "message": "Colors must be 6-digit hex codes"
      },
      {
        "type": "spacing",
        "pattern": "^[0-9]+(rem|px)$",
        "message": "Spacing must use rem or px units"
      }
    ],
    "severity": "error",
    "exclude": ["legacy/**"]
  }
}
```

### 2. Custom Validation
```typescript
function validateToken(token: Token): ValidationResult {
  switch (token.type) {
    case 'color':
      return validateColor(token);
    case 'typography':
      return validateTypography(token);
    case 'spacing':
      return validateSpacing(token);
    default:
      return { valid: true };
  }
}
```

## Token Generation

### 1. Build Configuration
```json
{
  "build": {
    "formats": ["css", "js", "json"],
    "prefix": "sp",
    "clean": true,
    "minify": true,
    "sourceMaps": true
  }
}
```

### 2. Output Configuration
```json
{
  "output": {
    "css": {
      "file": "tokens.css",
      "format": "css-variables"
    },
    "js": {
      "file": "tokens.js",
      "format": "esm"
    },
    "json": {
      "file": "tokens.json",
      "format": "json"
    }
  }
}
```

## Token Usage

### 1. CSS Usage
```css
.button {
  background-color: var(--sp-color-primary);
  padding: var(--sp-spacing-small);
  font-family: var(--sp-typography-heading1-font-family);
}
```

### 2. TypeScript Usage
```typescript
import { tokens } from '@/styles/tokens';

const Button = styled.button`
  background-color: ${tokens.colors.primary};
  padding: ${tokens.spacing.small};
  font-family: ${tokens.typography.heading1.fontFamily};
`;
```

## Best Practices

### 1. Organization
- Use semantic naming
- Group related tokens
- Maintain hierarchy
- Document usage

### 2. Validation
- Define strict rules
- Validate on build
- Check references
- Monitor changes

### 3. Generation
- Use consistent formats
- Include source maps
- Optimize output
- Version tokens

### 4. Maintenance
- Regular audits
- Track usage
- Plan migrations
- Document changes

## Next Steps

1. [Component Rules](./components.md)
2. [Analysis Settings](./analysis.md)
3. [Token Management Best Practices](../best-practices/tokens.md)
``` 