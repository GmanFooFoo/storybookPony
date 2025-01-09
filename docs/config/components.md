# Component Rules Configuration

This guide explains how to configure component rules and analysis settings in Storybook Pony.

## Component Configuration File

### Basic Structure
```json
{
  "components": {
    "sources": ["src/components/**/*.{ts,tsx}"],
    "exclude": ["**/*.test.*", "**/*.stories.*"],
    "rules": {
      "naming": "kebab-case",
      "structure": "atomic",
      "documentation": "required"
    },
    "analysis": {
      "dependencies": true,
      "props": true,
      "usage": true,
      "accessibility": true
    }
  }
}
```

## Component Sources

### 1. File Patterns
```json
{
  "sources": {
    "patterns": {
      "components": ["src/components/**/*.{ts,tsx}"],
      "pages": ["src/app/**/*.{ts,tsx}"],
      "stories": ["src/**/*.stories.{ts,tsx}"]
    },
    "exclude": {
      "patterns": ["**/*.test.*", "**/*.spec.*"],
      "directories": ["node_modules", ".next", "dist"]
    }
  }
}
```

### 2. Component Detection
```typescript
interface ComponentDetection {
  patterns: {
    react: boolean;
    nextjs: boolean;
    storybook: boolean;
  };
  rules: {
    naming: string;
    exports: 'named' | 'default' | 'both';
    typescript: boolean;
  };
}

// Configuration
{
  "detection": {
    "patterns": {
      "react": true,
      "nextjs": true,
      "storybook": true
    },
    "rules": {
      "naming": "^[A-Z][a-zA-Z]+$",
      "exports": "named",
      "typescript": true
    }
  }
}
```

## Component Rules

### 1. Naming Conventions
```json
{
  "naming": {
    "components": {
      "pattern": "^[A-Z][a-zA-Z]+$",
      "message": "Component names must be PascalCase"
    },
    "files": {
      "pattern": "^[a-z-]+$",
      "message": "File names must be kebab-case"
    },
    "props": {
      "pattern": "^[a-z][a-zA-Z]+$",
      "message": "Prop names must be camelCase"
    }
  }
}
```

### 2. Structure Rules
```json
{
  "structure": {
    "atomic": {
      "atoms": "src/components/atoms",
      "molecules": "src/components/molecules",
      "organisms": "src/components/organisms",
      "templates": "src/components/templates"
    },
    "required": {
      "files": ["index.ts", "component.tsx", "types.ts"],
      "exports": ["component", "types"]
    },
    "optional": {
      "files": ["styles.ts", "utils.ts", "hooks.ts"],
      "exports": ["styles", "utils", "hooks"]
    }
  }
}
```

### 3. Documentation Rules
```json
{
  "documentation": {
    "required": {
      "component": [
        "description",
        "props",
        "examples"
      ],
      "props": [
        "description",
        "type",
        "default"
      ],
      "examples": [
        "basic",
        "variants"
      ]
    },
    "optional": {
      "component": [
        "changelog",
        "roadmap"
      ],
      "props": [
        "validation",
        "notes"
      ]
    }
  }
}
```

## Analysis Configuration

### 1. Dependency Analysis
```json
{
  "dependencies": {
    "analyze": {
      "internal": true,
      "external": true,
      "depth": 3
    },
    "graph": {
      "generate": true,
      "format": "mermaid",
      "output": "docs/dependencies"
    },
    "alerts": {
      "circular": "error",
      "unused": "warning",
      "deprecated": "error"
    }
  }
}
```

### 2. Props Analysis
```json
{
  "props": {
    "analyze": {
      "types": true,
      "defaults": true,
      "usage": true
    },
    "validation": {
      "required": true,
      "types": true,
      "values": true
    },
    "documentation": {
      "generate": true,
      "format": "markdown"
    }
  }
}
```

### 3. Usage Analysis
```json
{
  "usage": {
    "track": {
      "components": true,
      "props": true,
      "patterns": true
    },
    "metrics": {
      "frequency": true,
      "coverage": true,
      "consistency": true
    },
    "reporting": {
      "generate": true,
      "format": "html",
      "schedule": "weekly"
    }
  }
}
```

## Quality Rules

### 1. Code Quality
```json
{
  "quality": {
    "complexity": {
      "max": 20,
      "severity": "warning"
    },
    "size": {
      "maxLines": 300,
      "severity": "warning"
    },
    "dependencies": {
      "maxDirect": 10,
      "maxIndirect": 20,
      "severity": "error"
    }
  }
}
```

### 2. Accessibility Rules
```json
{
  "accessibility": {
    "analyze": {
      "aria": true,
      "roles": true,
      "contrast": true
    },
    "rules": {
      "aria-required": "error",
      "role-support": "error",
      "color-contrast": "warning"
    },
    "reporting": {
      "generate": true,
      "format": "html"
    }
  }
}
```

## Integration Rules

### 1. Design Token Integration
```json
{
  "tokens": {
    "enforce": true,
    "rules": {
      "colors": "error",
      "spacing": "warning",
      "typography": "error"
    },
    "exceptions": {
      "files": ["legacy/**"],
      "rules": ["spacing"]
    }
  }
}
```

### 2. Style Integration
```json
{
  "styles": {
    "framework": "tailwind",
    "rules": {
      "classNames": "error",
      "styled": "warning",
      "css": "error"
    },
    "conventions": {
      "utility": true,
      "components": true,
      "variants": true
    }
  }
}
```

## Validation Commands

### 1. Component Validation
```bash
# Validate all components
pnpm storybook-pony validate:components

# Validate specific component
pnpm storybook-pony validate:component Button

# Check component structure
pnpm storybook-pony check:structure
```

### 2. Rule Validation
```bash
# Validate rules configuration
pnpm storybook-pony validate:rules

# Test rule against components
pnpm storybook-pony test:rule naming

# List rule violations
pnpm storybook-pony list:violations
```

## Best Practices

### 1. Configuration
- Start with defaults
- Customize gradually
- Document exceptions
- Version control rules

### 2. Validation
- Automate checks
- Set appropriate severity
- Handle exceptions
- Monitor compliance

### 3. Integration
- Use with CI/CD
- Track changes
- Update documentation
- Train team

### 4. Maintenance
- Regular reviews
- Update rules
- Monitor effectiveness
- Gather feedback

## Next Steps

1. [Analysis Settings](./analysis.md)
2. [Component Development](../best-practices/components.md)
3. [Documentation Guide](../best-practices/documentation.md)
``` 