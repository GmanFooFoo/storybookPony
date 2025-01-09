# Repository Analysis Guide

This guide explains how to configure and use Storybook Pony's repository analysis features to extract design system information from your codebase.

## Overview

Repository analysis in Storybook Pony involves:
1. Scanning repository files
2. Extracting design tokens
3. Identifying components
4. Analyzing relationships
5. Generating documentation

## Configuration

### Analysis Settings

1. **Repository Selection**
   ```typescript
   {
     owner: string;          // GitHub username or organization
     repo: string;           // Repository name
     branch: string;         // Branch to analyze
     includePaths?: string[]; // Paths to include (glob patterns)
     excludePaths?: string[]; // Paths to exclude (glob patterns)
   }
   ```

2. **File Type Configuration**
   ```typescript
   {
     typescript: boolean;    // Analyze TypeScript/TSX files
     javascript: boolean;    // Analyze JavaScript/JSX files
     css: boolean;          // Analyze CSS files
     tailwind: boolean;     // Analyze Tailwind configuration
     storybook: boolean;    // Analyze Storybook files
   }
   ```

### Analysis Rules

1. **Token Detection**
   - Color values (hex, rgb, hsl)
   - Typography (font families, sizes)
   - Spacing units
   - Breakpoints
   - Shadows
   - Z-indices

2. **Component Detection**
   - React components
   - Styled components
   - CSS modules
   - Tailwind classes

## Running Analysis

### Manual Analysis

1. Select repository in dashboard
2. Configure analysis settings
3. Start analysis:
   ```bash
   POST /api/analysis/start
   {
     "repositoryId": "string",
     "configuration": AnalysisConfig
   }
   ```

### Automated Analysis

1. **GitHub Action Integration**
   ```yaml
   name: Design System Analysis
   on:
     push:
       branches: [main, develop]
     pull_request:
       types: [opened, synchronize]

   jobs:
     analyze:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Run Storybook Pony Analysis
           uses: storybook-pony/github-action@v1
           with:
             api-key: ${{ secrets.PONY_API_KEY }}
   ```

2. **Webhook Integration**
   ```typescript
   // Configure webhook in dashboard
   {
     url: "https://api.your-domain.com/webhooks/github",
     events: ["push", "pull_request"],
     secret: "your-webhook-secret"
   }
   ```

## Analysis Results

### Token Extraction

```typescript
interface DesignToken {
  type: TokenType;
  name: string;
  value: string;
  source: {
    file: string;
    line: number;
    context: string;
  };
  usage: {
    count: number;
    locations: string[];
  };
}
```

### Component Analysis

```typescript
interface ComponentAnalysis {
  name: string;
  type: "function" | "class" | "styled";
  props: PropDefinition[];
  dependencies: string[];
  usage: ComponentUsage;
  tokens: TokenReference[];
}
```

## Viewing Results

1. **Dashboard Views**
   - Token inventory
   - Component library
   - Usage statistics
   - Consistency report

2. **Export Options**
   - JSON/TypeScript
   - Documentation (MD/MDX)
   - Design tokens (CSS/SCSS)

## Best Practices

1. **Repository Structure**
   - Organize components consistently
   - Use clear naming conventions
   - Maintain documentation

2. **Token Management**
   - Use design token constants
   - Avoid hard-coded values
   - Document token usage

3. **Component Development**
   - Follow component patterns
   - Document props and usage
   - Include examples

## Troubleshooting

### Common Issues

1. **Analysis Timeout**
   - Reduce analysis scope
   - Exclude unnecessary files
   - Increase timeout settings

2. **Token Detection Issues**
   - Review token patterns
   - Check file inclusion
   - Verify token format

3. **Component Analysis Failures**
   - Check component structure
   - Verify export patterns
   - Review dependencies

## API Reference

### Analysis Endpoints

```typescript
// Start analysis
POST /api/analysis/start
Content-Type: application/json
{
  "repositoryId": string,
  "configuration": AnalysisConfig
}

// Get analysis status
GET /api/analysis/:analysisId/status

// Get analysis results
GET /api/analysis/:analysisId/results

// Cancel analysis
POST /api/analysis/:analysisId/cancel
```

### WebSocket Events

```typescript
// Connect to analysis updates
const ws = new WebSocket('ws://api.domain/analysis/:analysisId');

// Event types
type AnalysisEvent =
  | { type: 'progress'; data: ProgressData }
  | { type: 'complete'; data: ResultData }
  | { type: 'error'; data: ErrorData };
```

## Next Steps

1. [Design System Configuration](./design-system-config.md)
2. [Token Management](./token-management.md)
3. [Component Documentation](./component-docs.md)
``` 