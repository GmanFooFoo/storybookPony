# Component Documentation Guide

This guide explains how to document, manage, and maintain components in your design system using Storybook Pony.

## Overview

Component documentation in Storybook Pony includes:
- Component specifications
- Props and variants
- Usage examples
- Accessibility guidelines
- Visual regression tests
- Integration patterns

## Component Structure

### 1. Basic Component Documentation

```typescript
interface ComponentDoc {
  name: string;
  description: string;
  category: string;
  status: 'draft' | 'beta' | 'stable' | 'deprecated';
  version: string;
  maintainers: string[];
  tags: string[];
}
```

### 2. Component Metadata

```typescript
{
  "Button": {
    "metadata": {
      "createdAt": "2024-01-09",
      "lastUpdated": "2024-01-09",
      "version": "1.0.0",
      "status": "stable",
      "maintainers": ["@design-team"],
      "reviewers": ["@dev-team"]
    }
  }
}
```

## Documentation Sections

### 1. Overview Section

```mdx
---
title: Button
description: Primary action button component
category: Actions
status: stable
---

# Button Component

A versatile button component that supports multiple variants and sizes.

## Key Features
- Multiple variants (primary, secondary, ghost)
- Configurable sizes
- Icon support
- Loading states
- Keyboard navigation
```

### 2. Props Documentation

```typescript
interface ButtonProps {
  /** The button's visual style */
  variant: 'primary' | 'secondary' | 'ghost';
  
  /** The button's size */
  size: 'sm' | 'md' | 'lg';
  
  /** Optional icon to display */
  icon?: ReactNode;
  
  /** Loading state */
  isLoading?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
}
```

### 3. Usage Examples

```tsx
// Basic usage
<Button variant="primary" size="md">
  Click me
</Button>

// With icon
<Button
  variant="secondary"
  size="sm"
  icon={<IconSearch />}
>
  Search
</Button>

// Loading state
<Button
  variant="primary"
  size="lg"
  isLoading
>
  Processing...
</Button>
```

## Visual Documentation

### 1. Component Preview

```typescript
{
  "preview": {
    "viewports": ["mobile", "tablet", "desktop"],
    "themes": ["light", "dark"],
    "states": ["default", "hover", "active", "disabled"],
    "backgrounds": ["light", "dark", "custom"]
  }
}
```

### 2. Visual States

```typescript
{
  "states": {
    "default": {
      "screenshot": "button-default.png",
      "description": "Default state"
    },
    "hover": {
      "screenshot": "button-hover.png",
      "description": "Mouse hover state"
    },
    "pressed": {
      "screenshot": "button-pressed.png",
      "description": "Mouse pressed state"
    }
  }
}
```

## Accessibility

### 1. ARIA Documentation

```typescript
{
  "accessibility": {
    "role": "button",
    "aria": {
      "aria-label": "Required for icon-only buttons",
      "aria-pressed": "For toggle buttons",
      "aria-disabled": "For disabled state"
    },
    "keyboard": {
      "Enter": "Activates the button",
      "Space": "Activates the button"
    }
  }
}
```

### 2. Accessibility Guidelines

```markdown
## Accessibility Checklist

1. Color Contrast
   - [ ] 4.5:1 minimum contrast ratio
   - [ ] Visible focus indicator

2. Keyboard Navigation
   - [ ] Focusable with Tab key
   - [ ] Activatable with Enter/Space

3. Screen Readers
   - [ ] Meaningful button text
   - [ ] ARIA labels for icon buttons
```

## Testing Documentation

### 1. Test Cases

```typescript
{
  "tests": {
    "unit": [
      "Renders with default props",
      "Handles click events",
      "Shows loading state",
      "Disables when required"
    ],
    "integration": [
      "Works with form submission",
      "Integrates with modal dialogs",
      "Functions in navigation"
    ],
    "accessibility": [
      "Meets WCAG 2.1 requirements",
      "Works with screen readers",
      "Supports keyboard navigation"
    ]
  }
}
```

### 2. Test Examples

```typescript
describe('Button', () => {
  it('handles clicks', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClickMock).toHaveBeenCalled();
  });
});
```

## Design Tokens

### 1. Token Usage

```typescript
{
  "tokens": {
    "colors": {
      "background": "colors.primary.500",
      "text": "colors.white",
      "hover": "colors.primary.600"
    },
    "spacing": {
      "padding": {
        "sm": "spacing.2",
        "md": "spacing.3",
        "lg": "spacing.4"
      }
    },
    "typography": {
      "fontSize": "typography.sm",
      "fontWeight": "typography.medium"
    }
  }
}
```

### 2. Token Documentation

```markdown
## Design Tokens

### Colors
- Background: `$primary-500`
- Text: `$white`
- Hover: `$primary-600`

### Spacing
- Small: `$spacing-2`
- Medium: `$spacing-3`
- Large: `$spacing-4`

### Typography
- Font Size: `$font-size-sm`
- Font Weight: `$font-weight-medium`
```

## Version History

### 1. Changelog

```typescript
{
  "changelog": [
    {
      "version": "1.1.0",
      "date": "2024-01-09",
      "changes": [
        "Added loading state",
        "Improved accessibility",
        "Fixed hover state bug"
      ],
      "breaking": false
    }
  ]
}
```

### 2. Migration Guide

```markdown
## Migration Guide

### Upgrading to v1.1.0
1. Update prop types to include loading state
2. Add aria-busy attribute when loading
3. Update styles for new hover state
```

## Best Practices

1. **Documentation Quality**
   - Keep documentation up to date
   - Include real-world examples
   - Document edge cases
   - Provide accessibility guidelines

2. **Component Usage**
   - Follow component guidelines
   - Use proper prop types
   - Handle all states
   - Test thoroughly

3. **Maintenance**
   - Review regularly
   - Update examples
   - Track usage
   - Gather feedback

## Next Steps

1. [System Integration](./system-integration.md)
2. [Automation Guide](./automation.md)
3. [Testing Guide](./testing.md)
``` 