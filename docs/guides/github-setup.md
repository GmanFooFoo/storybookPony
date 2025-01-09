# GitHub Integration Setup Guide

This guide will walk you through the process of setting up GitHub integration for Storybook Pony. This integration enables repository access, authentication, and design system analysis features.

## Prerequisites

Before you begin, ensure you have:
- A GitHub account
- Admin access to the repositories you want to analyze
- Access to your GitHub organization settings (if setting up for an organization)

## Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on "OAuth Apps" in the sidebar
3. Click "New OAuth App"
4. Fill in the application details:
   ```
   Application name: Storybook Pony (or your preferred name)
   Homepage URL: http://localhost:3000 (development) or your production URL
   Application description: Design System Documentation and Analysis Tool
   Authorization callback URL: http://localhost:3000/api/auth/callback/github
   ```
5. Click "Register application"
6. After registration, you'll see your Client ID
7. Click "Generate a new client secret"
8. Save both the Client ID and Client Secret securely

## Step 2: Configure Environment Variables

1. Copy the `.env.example` file to `.env` if you haven't already:
   ```bash
   cp .env.example .env
   ```

2. Update your `.env` file with the GitHub credentials:
   ```env
   GITHUB_CLIENT_ID=your_client_id_here
   GITHUB_CLIENT_SECRET=your_client_secret_here
   ```

## Step 3: Configure Repository Access

### Personal Repositories

By default, the OAuth app will have access to your public repositories. To access private repositories:

1. Go to [GitHub Settings > Applications](https://github.com/settings/applications)
2. Find your OAuth app
3. Click "Configure"
4. Under "Repository access", select:
   - All repositories (recommended)
   - Or select specific repositories

### Organization Repositories

If you want to use Storybook Pony with organization repositories:

1. Go to your organization's settings
2. Navigate to "OAuth App Access"
3. Click "Configure" next to your OAuth app
4. Grant access to required repositories
5. Ensure organization members have appropriate permissions

## Step 4: Required Permissions

The OAuth app requires these permissions:

- `repo`: Full repository access (for private repos)
- `read:user`: Read user profile data
- `read:org`: Read organization data (if using with organizations)

These are configured automatically during the OAuth flow.

## Step 5: Testing the Integration

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Visit http://localhost:3000
3. Click "Sign in with GitHub"
4. Authorize the application
5. You should be redirected back to the application
6. Verify repository access in the dashboard

## Troubleshooting

### Common Issues

1. **Callback URL Mismatch**
   - Error: `redirect_uri_mismatch` or `The redirect_uri MUST match the registered callback URL`
   - Ensure the callback URL in GitHub matches exactly with your environment
   - Development: `http://localhost:3000/api/auth/callback/github`
   - Production: `https://your-domain.com/api/auth/callback/github`
   - Check for trailing slashes and protocol (http vs https)

2. **Repository Access Issues**
   - Error: `Resource not accessible by integration` or `Not Found`
   - Check repository permissions in GitHub settings
   - Verify OAuth app installation settings
   - Ensure user has required roles in organization
   - For private repositories, confirm the `repo` scope is granted
   - Check if repository was archived or transferred

3. **Authentication Errors**
   - Error: `Bad credentials` or `401 Unauthorized`
   - Verify environment variables are set correctly
   - Check for typos in Client ID and Secret
   - Ensure NEXTAUTH_SECRET is set and matches format
   - Confirm NEXTAUTH_URL matches your domain
   - Try regenerating the client secret

4. **Rate Limiting Issues**
   - Error: `API rate limit exceeded`
   - Check rate limit status in GitHub settings
   - Implement request caching if not already done
   - Consider using GitHub Apps instead of OAuth for higher limits
   - Add rate limit headers monitoring

5. **Session Issues**
   - Error: `Session not found` or `Invalid session`
   - Clear browser cookies and try again
   - Check session expiration settings
   - Verify database connection for session storage
   - Confirm NextAuth.js configuration

6. **Scope Permission Issues**
   - Error: `Requires authentication` or `Insufficient scope`
   - Ensure all required scopes are requested:
     ```typescript
     scope: 'repo read:user read:org'
     ```
   - Check if user denied any permissions during OAuth flow
   - Try revoking and re-authorizing the application

7. **Organization Access Issues**
   - Error: `Organization application access request failed`
   - Ensure organization allows third-party OAuth apps
   - Check if OAuth app access was approved by org admin
   - Verify user is a member of the organization
   - Review organization security settings

### Error Codes and Solutions

| Error Code | Description | Solution |
|------------|-------------|----------|
| `401` | Unauthorized | Check credentials and token validity |
| `403` | Forbidden | Verify permissions and scopes |
| `404` | Not Found | Check repository existence and access |
| `422` | Validation Failed | Review request parameters |
| `429` | Too Many Requests | Implement rate limiting handling |

### Debug Mode

Enable debug mode for detailed logs:

1. Add to `.env`:
   ```env
   DEBUG=true
   NEXTAUTH_DEBUG=true
   ```

2. Check browser console and server logs for:
   - OAuth flow events
   - API request/response details
   - Session management
   - Token validation

### Getting Help

If you encounter issues:

1. Check the application logs:
   ```bash
   pnpm dev
   # Look for [auth], [github], and [error] prefixes
   ```

2. Verify all environment variables:
   ```bash
   pnpm check-env # Custom script to validate env
   ```

3. Review GitHub OAuth app settings
4. Open an issue in our repository with:
   - Error messages and codes
   - Environment details (OS, Node version)
   - Steps to reproduce
   - Relevant logs (sanitized)

## Security Considerations

1. Never commit `.env` file with secrets
2. Regularly rotate GitHub client secrets
3. Limit repository access to what's necessary
4. Review authorized applications periodically
5. Use environment-specific OAuth apps (development/production)

## Next Steps

After setting up GitHub integration:

1. Configure repository analysis settings
2. Set up automated scanning
3. Define design system extraction rules
4. Configure token tracking
5. Set up component documentation

For more details, see:
- [Repository Analysis Guide](./repository-analysis.md)
- [Design System Configuration](./design-system-config.md)
- [Token Management](./token-management.md) 