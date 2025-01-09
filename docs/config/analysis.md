# Analysis Settings Configuration

This guide explains how to configure analysis settings for design system scanning and monitoring.

## Analysis Configuration File

### Basic Structure
```json
{
  "analysis": {
    "schedule": "daily",
    "scope": {
      "tokens": true,
      "components": true,
      "patterns": true,
      "usage": true
    },
    "output": {
      "format": ["json", "html", "markdown"],
      "directory": "docs/analysis"
    }
  }
}
```

## Scanning Configuration

### 1. Repository Scanning
```json
{
  "scanning": {
    "repositories": {
      "include": ["main-app", "design-system"],
      "exclude": ["legacy-app"],
      "depth": 3
    },
    "branches": {
      "main": true,
      "develop": true,
      "feature/*": false
    },
    "history": {
      "enabled": true,
      "depth": 30,
      "interval": "daily"
    }
  }
}
```

### 2. File Analysis
```json
{
  "files": {
    "patterns": {
      "components": ["**/*.tsx", "**/*.jsx"],
      "styles": ["**/*.css", "**/*.scss"],
      "tokens": ["**/tokens/**/*.{js,ts,json}"]
    },
    "ignore": {
      "patterns": ["**/*.test.*", "**/*.spec.*"],
      "directories": ["node_modules", ".next", "dist"]
    },
    "parsing": {
      "typescript": true,
      "javascript": true,
      "css": true
    }
  }
}
```

## Analysis Types

### 1. Token Analysis
```json
{
  "tokens": {
    "extraction": {
      "sources": ["css", "typescript", "javascript"],
      "patterns": {
        "css": ["var\\(--([^)]+)\\)"],
        "typescript": ["tokens\\.([^\\s.]+)"]
      }
    },
    "validation": {
      "schema": true,
      "values": true,
      "usage": true
    },
    "reporting": {
      "unused": true,
      "duplicates": true,
      "inconsistencies": true
    }
  }
}
```

### 2. Component Analysis
```json
{
  "components": {
    "detection": {
      "patterns": ["React\\.Component", "function\\s+[A-Z]"],
      "exports": ["default", "named"],
      "frameworks": ["react", "next"]
    },
    "analysis": {
      "props": true,
      "state": true,
      "effects": true,
      "performance": true
    },
    "relationships": {
      "dependencies": true,
      "composition": true,
      "inheritance": true
    }
  }
}
```

### 3. Pattern Analysis
```json
{
  "patterns": {
    "detection": {
      "minimum_usage": 3,
      "similarity_threshold": 0.8,
      "scope": ["components", "layouts"]
    },
    "classification": {
      "atomic": true,
      "functional": true,
      "structural": true
    },
    "documentation": {
      "generate": true,
      "format": "markdown",
      "examples": true
    }
  }
}
```

## Performance Settings

### 1. Analysis Performance
```json
{
  "performance": {
    "concurrency": {
      "files": 10,
      "analysis": 4,
      "reporting": 2
    },
    "batching": {
      "size": 100,
      "timeout": 30000
    },
    "caching": {
      "enabled": true,
      "ttl": 3600,
      "storage": "redis"
    }
  }
}
```

### 2. Resource Limits
```json
{
  "limits": {
    "memory": {
      "max": "4GB",
      "warning": "3GB"
    },
    "cpu": {
      "max_usage": 0.8,
      "warning": 0.7
    },
    "time": {
      "timeout": 300000,
      "warning": 240000
    }
  }
}
```

## Reporting Configuration

### 1. Report Generation
```json
{
  "reporting": {
    "formats": {
      "json": {
        "enabled": true,
        "pretty": true
      },
      "html": {
        "enabled": true,
        "template": "default"
      },
      "markdown": {
        "enabled": true,
        "sections": ["summary", "details"]
      }
    },
    "scheduling": {
      "frequency": "daily",
      "time": "00:00",
      "timezone": "UTC"
    }
  }
}
```

### 2. Notifications
```json
{
  "notifications": {
    "channels": {
      "slack": {
        "enabled": true,
        "webhook": "WEBHOOK_URL",
        "channel": "#design-system"
      },
      "email": {
        "enabled": true,
        "recipients": ["team@example.com"],
        "format": "html"
      }
    },
    "triggers": {
      "completion": true,
      "errors": true,
      "warnings": true,
      "changes": true
    }
  }
}
```

## Integration Settings

### 1. CI/CD Integration
```json
{
  "ci": {
    "triggers": {
      "push": ["main", "develop"],
      "pull_request": true,
      "schedule": "0 0 * * *"
    },
    "actions": {
      "analyze": true,
      "validate": true,
      "report": true
    },
    "artifacts": {
      "save": true,
      "expiry": "30d"
    }
  }
}
```

### 2. Tool Integration
```json
{
  "integrations": {
    "github": {
      "enabled": true,
      "comments": true,
      "checks": true
    },
    "jira": {
      "enabled": true,
      "project": "DESIGN",
      "create_issues": true
    },
    "figma": {
      "enabled": true,
      "sync": true,
      "tokens": true
    }
  }
}
```

## Analysis Commands

### 1. Running Analysis
```bash
# Full analysis
pnpm storybook-pony analyze

# Specific analysis
pnpm storybook-pony analyze:tokens
pnpm storybook-pony analyze:components
pnpm storybook-pony analyze:patterns

# Custom analysis
pnpm storybook-pony analyze --scope tokens,components
```

### 2. Managing Analysis
```bash
# View status
pnpm storybook-pony analysis:status

# Cancel analysis
pnpm storybook-pony analysis:cancel

# Clear cache
pnpm storybook-pony analysis:clear-cache
```

## Best Practices

### 1. Configuration
- Start small
- Increase gradually
- Monitor performance
- Adjust thresholds

### 2. Performance
- Use caching
- Batch operations
- Set limits
- Monitor resources

### 3. Integration
- Automate analysis
- Configure notifications
- Save artifacts
- Track changes

### 4. Maintenance
- Regular cleanup
- Update settings
- Monitor effectiveness
- Gather feedback

## Next Steps

1. [Token Management](../best-practices/tokens.md)
2. [Component Development](../best-practices/components.md)
3. [Performance Guide](../advanced/performance.md)
``` 