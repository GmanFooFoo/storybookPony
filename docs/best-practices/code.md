# Code Organization Best Practices

This guide outlines the recommended practices for organizing your codebase when using Storybook Pony.

## Directory Structure

### Root Structure
```
my-design-system/
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # React components
│   ├── lib/          # Shared utilities
│   ├── styles/       # Global styles
│   └── types/        # TypeScript types
├── public/           # Static assets
├── prisma/          # Database schema
└── docs/            # Documentation
```

### Component Organization
```
src/components/
├── ui/              # Base UI components
│   ├── button/
│   │   ├── button.tsx
│   │   ├── button.test.tsx
│   │   └── button.stories.tsx
│   └── input/
│       ├── input.tsx
│       ├── input.test.tsx
│       └── input.stories.tsx
├── layout/          # Layout components
│   ├── header/
│   └── sidebar/
├── forms/           # Form components
│   ├── text-field/
│   └── select/
└── patterns/        # Common patterns
    ├── auth/
    └── dashboard/
```

## File Naming Conventions

### 1. Component Files
```typescript
// Component implementation
button.tsx

// Component tests
button.test.tsx
button.spec.tsx

// Component stories
button.stories.tsx

// Component types
button.types.ts

// Component styles
button.styles.ts
button.css
button.module.css
```

### 2. Utility Files
```typescript
// Hooks
use-auth.ts
use-form.ts

// Helpers
string-utils.ts
date-utils.ts

// Constants
constants.ts
config.ts

// Types
types.ts
interfaces.ts
```

## Component Structure

### 1. Basic Component
```typescript
// button.tsx
import { type ButtonProps } from './button.types';
import { buttonVariants } from './button.styles';

export function Button({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size })}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 2. Component with Subcomponents
```typescript
// card.tsx
import { type CardProps } from './card.types';
import { cardVariants } from './card.styles';

export function Card({ children, ...props }: CardProps) {
  return (
    <div className={cardVariants()} {...props}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card-body">{children}</div>;
};

Card.Footer = function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="card-footer">{children}</div>;
};
```

## Code Style

### 1. TypeScript Usage
```typescript
// Use interfaces for public APIs
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
}

// Use type for internal types
type ButtonSize = ButtonProps['size'];
type ButtonVariant = ButtonProps['variant'];

// Use enums sparingly, prefer unions
type Status = 'idle' | 'loading' | 'success' | 'error';

// Use generics when needed
function createContext<T>(): Context<T> {
  return {} as Context<T>;
}
```

### 2. React Patterns
```typescript
// Use function declarations for components
export function Button(props: ButtonProps) {
  return <button {...props} />;
}

// Use hooks for logic
function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  const toggle = useCallback(() => setState(s => !s), []);
  return [state, toggle] as const;
}

// Use composition over inheritance
function Dialog({ header, children, footer }: DialogProps) {
  return (
    <Card>
      {header && <Card.Header>{header}</Card.Header>}
      <Card.Body>{children}</Card.Body>
      {footer && <Card.Footer>{footer}</Card.Footer>}
    </Card>
  );
}
```

## State Management

### 1. Local State
```typescript
// Use useState for simple state
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}

// Use useReducer for complex state
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD':
      return [...state, action.todo];
    default:
      return state;
  }
}
```

### 2. Global State
```typescript
// Use context for shared state
const ThemeContext = createContext<Theme>('light');

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## Performance Optimization

### 1. Component Optimization
```typescript
// Use memo for expensive components
const ExpensiveComponent = memo(function ExpensiveComponent(props: Props) {
  return <div>{/* expensive render */}</div>;
});

// Use callbacks for handlers
function Form() {
  const handleSubmit = useCallback((data: FormData) => {
    // handle submit
  }, []);
  
  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

### 2. Data Fetching
```typescript
// Use SWR for data fetching
function UserProfile({ id }: { id: string }) {
  const { data, error } = useSWR(`/api/users/${id}`, fetcher);
  
  if (error) return <div>Error loading user</div>;
  if (!data) return <div>Loading...</div>;
  
  return <div>{data.name}</div>;
}
```

## Testing

### 1. Component Tests
```typescript
// button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### 2. Hook Tests
```typescript
// use-counter.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './use-counter';

describe('useCounter', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});
```

## Documentation

### 1. Component Documentation
```typescript
/**
 * Button component for triggering actions.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="medium">
 *   Click me
 * </Button>
 * ```
 */
export function Button({ variant = 'primary', size = 'medium' }: ButtonProps) {
  // ...
}

Button.displayName = 'Button';
```

### 2. Type Documentation
```typescript
/**
 * Props for the Button component.
 *
 * @property {string} variant - The visual style of the button
 * @property {string} size - The size of the button
 */
interface ButtonProps {
  /** The visual style of the button */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** The size of the button */
  size?: 'small' | 'medium' | 'large';
}
```

## Best Practices

### 1. Code Organization
- Keep files small and focused
- Group related files together
- Use clear naming conventions
- Maintain consistent structure

### 2. Component Design
- Make components reusable
- Keep components pure
- Use composition
- Handle errors gracefully

### 3. Performance
- Optimize renders
- Lazy load components
- Use proper memoization
- Profile regularly

### 4. Testing
- Write meaningful tests
- Test edge cases
- Use testing utilities
- Maintain test coverage

## Next Steps

1. [Token Management](./tokens.md)
2. [Component Development](./components.md)
3. [Documentation](./documentation.md)
``` 