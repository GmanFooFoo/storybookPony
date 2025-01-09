# API Reference

This documentation provides detailed information about Storybook Pony's API endpoints, authentication, and usage.

## Authentication

All API requests require authentication using either:
- API Key (recommended for automation)
- OAuth token (recommended for user-based access)

### API Key Authentication

```bash
curl -X GET "https://api.storybookpony.com/v1/design-systems" \
  -H "Authorization: Bearer your-api-key"
```

### OAuth Authentication

```bash
curl -X GET "https://api.storybookpony.com/v1/design-systems" \
  -H "Authorization: Bearer your-oauth-token"
```

## API Versioning

Current stable version: `v1`

```bash
https://api.storybookpony.com/v1/
```

## Rate Limiting

- 100 requests per minute for authenticated requests
- 10 requests per minute for unauthenticated requests

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704821400
```

## Common Parameters

### Pagination

```typescript
interface PaginationParams {
  page?: number;      // Default: 1
  limit?: number;     // Default: 20, Max: 100
  cursor?: string;    // For cursor-based pagination
}
```

### Filtering

```typescript
interface FilterParams {
  search?: string;    // Search term
  status?: string;    // Resource status
  type?: string;      // Resource type
  tags?: string[];    // Resource tags
}
```

### Sorting

```typescript
interface SortParams {
  sort_by?: string;   // Field to sort by
  order?: 'asc' | 'desc'; // Sort order
}
```

## API Endpoints

### Design Systems

- [Design Systems](./design-systems.md)
  - List design systems
  - Create design system
  - Get design system
  - Update design system
  - Delete design system

### Tokens

- [Tokens](./tokens.md)
  - List tokens
  - Create token
  - Get token
  - Update token
  - Delete token
  - Bulk update tokens

### Components

- [Components](./components.md)
  - List components
  - Create component
  - Get component
  - Update component
  - Delete component
  - Get component usage

### Analysis

- [Analysis](./analysis.md)
  - Start analysis
  - Get analysis status
  - Get analysis results
  - Cancel analysis
  - List analyses

### Repositories

- [Repositories](./repositories.md)
  - List repositories
  - Connect repository
  - Get repository
  - Update repository
  - Remove repository

### Webhooks

- [Webhooks](./webhooks.md)
  - List webhooks
  - Create webhook
  - Get webhook
  - Update webhook
  - Delete webhook

## Error Handling

### Error Format

```typescript
interface APIError {
  code: string;           // Error code
  message: string;        // Human-readable message
  details?: unknown;      // Additional error details
  documentation_url?: string; // Link to relevant docs
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `unauthorized` | Missing or invalid authentication |
| `forbidden` | Insufficient permissions |
| `not_found` | Resource not found |
| `validation_error` | Invalid request parameters |
| `rate_limit_exceeded` | Too many requests |
| `internal_error` | Server error |

### Error Example

```json
{
  "code": "validation_error",
  "message": "Invalid token format",
  "details": {
    "field": "value",
    "error": "Must be a valid color hex code"
  },
  "documentation_url": "https://docs.storybookpony.com/api/errors#validation_error"
}
```

## Webhooks

### Event Types

```typescript
type WebhookEvent =
  | 'design_system.updated'
  | 'token.created'
  | 'token.updated'
  | 'token.deleted'
  | 'component.created'
  | 'component.updated'
  | 'component.deleted'
  | 'analysis.completed'
  | 'analysis.failed';
```

### Event Payload

```typescript
interface WebhookPayload {
  event: WebhookEvent;
  design_system_id: string;
  data: unknown;
  timestamp: string;
  signature: string;
}
```

## SDKs and Libraries

- [TypeScript/JavaScript](./sdks/typescript.md)
- [Python](./sdks/python.md)
- [Ruby](./sdks/ruby.md)
- [Java](./sdks/java.md)
- [Go](./sdks/go.md)

## Best Practices

1. **Authentication**
   - Use API keys for automation
   - Rotate keys regularly
   - Use scoped tokens

2. **Rate Limiting**
   - Implement exponential backoff
   - Cache responses
   - Use bulk operations

3. **Error Handling**
   - Handle all error codes
   - Implement retries
   - Log errors properly

## Support

- [API Status](https://status.storybookpony.com)
- [Developer Forum](https://forum.storybookpony.com)
- [GitHub Issues](https://github.com/storybookpony/issues)
``` 