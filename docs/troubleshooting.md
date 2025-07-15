# Troubleshooting Guide

This guide covers common issues and their solutions when working with the Raph AI Starter monorepo.

## Installation Issues

### Node.js Version Conflicts

**Problem:** `npm install` fails with Node.js version errors

**Solution:**
```bash
# Check Node.js version (requires 18+)
node --version

# If using nvm, switch to correct version
nvm use 18
# or
nvm install 18 && nvm use 18

# Clean and reinstall
npm run clean
npm run install:all
```

### Package Installation Failures

**Problem:** Dependencies fail to install in monorepo

**Solution:**
```bash
# Clear all caches and node_modules
npm run clean
rm -rf package-lock.json frontend/package-lock.json backend/package-lock.json

# Install with verbose logging
npm run install:all --verbose

# If specific service fails, install individually
cd frontend && npm install
cd ../backend && npm install
```

## Environment Configuration

### NextAuth Secret Issues

**Problem:** `NEXTAUTH_SECRET` missing or invalid

**Symptoms:**
- Authentication doesn't work
- "NEXTAUTH_SECRET not found" error
- Session creation fails

**Solution:**
```bash
# Generate a secure secret
openssl rand -base64 32

# Add to BOTH root .env AND frontend/.env
NEXTAUTH_SECRET="generated-secret-here"
```

### Supabase Connection Issues

**Problem:** Cannot connect to Supabase database

**Symptoms:**
- "Connection refused" errors
- Prisma migration failures
- Database queries timeout

**Solution:**
1. **Check Environment Variables:**
   ```bash
   # Verify in backend/.env
   DATABASE_URL="postgresql://postgres.PROJECT_REF:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
   DIRECT_URL="postgresql://postgres.PROJECT_REF:[PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres"
   ```

2. **Verify Supabase Project:**
   - Check project is active in Supabase dashboard
   - Verify database password is correct
   - Ensure IP restrictions allow your location

3. **Test Connection:**
   ```bash
   cd backend
   npx prisma db push --preview-feature
   ```

### AI API Key Issues

**Problem:** AI features not working

**Symptoms:**
- "Invalid API key" errors
- AI requests timing out
- 401/403 authentication errors

**Solution:**
1. **Verify API Key Format:**
   ```bash
   # OpenAI keys start with 'sk-'
   OPENAI_API_KEY=sk-your-key-here
   
   # Anthropic keys start with 'sk-ant-'
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

2. **Check API Key Validity:**
   ```bash
   # Test OpenAI key
   curl -H "Authorization: Bearer $OPENAI_API_KEY" \
        https://api.openai.com/v1/models
   ```

3. **Verify Billing:**
   - Check API usage limits
   - Ensure billing is set up
   - Verify credit balance

## Development Server Issues

### Port Conflicts

**Problem:** "Port already in use" errors

**Solution:**
```bash
# Find processes using ports
lsof -ti:3000  # Frontend port
lsof -ti:3001  # Backend port

# Kill processes
kill -9 $(lsof -ti:3000)
kill -9 $(lsof -ti:3001)

# Or use different ports
PORT=3002 npm run dev:frontend
```

### Hot Reload Not Working

**Problem:** Changes not reflecting in browser

**Solution:**
1. **Frontend (Next.js):**
   ```bash
   # Clear Next.js cache
   rm -rf frontend/.next
   cd frontend && npm run dev
   ```

2. **Backend (Node.js):**
   ```bash
   # Restart with clean slate
   cd backend
   rm -rf dist
   npm run dev
   ```

### TypeScript Errors

**Problem:** TypeScript compilation errors

**Solution:**
```bash
# Generate Prisma types
cd backend && npm run db:generate

# Clear TypeScript cache
rm -rf frontend/.tsbuildinfo backend/.tsbuildinfo

# Restart TypeScript server in VS Code
# Command Palette > "TypeScript: Restart TS Server"
```

## Database Issues

### Prisma Migration Failures

**Problem:** Database migrations fail

**Symptoms:**
- "Migration failed" errors
- Database schema out of sync
- Cannot run `db:migrate`

**Solution:**
```bash
cd backend

# Reset database (CAUTION: Loses data)
npm run db:reset

# Or push schema without migration
npx prisma db push

# Generate client after schema changes
npm run db:generate
```

### Database Connection Pool Issues

**Problem:** "Too many connections" errors

**Solution:**
```bash
# Use connection pooling URL (pgbouncer)
DATABASE_URL="postgresql://...?pgbouncer=true&connection_limit=1"

# Reduce connection limits in Prisma
# Add to schema.prisma:
# datasource db {
#   provider = "postgresql"
#   url = env("DATABASE_URL")
#   directUrl = env("DIRECT_URL")
# }
```

## Build Issues

### Frontend Build Failures

**Problem:** `npm run build:frontend` fails

**Solution:**
```bash
cd frontend

# Clear cache and rebuild
rm -rf .next
npm run build

# Check for TypeScript errors
npm run lint

# If module resolution issues
rm -rf node_modules package-lock.json
npm install
```

### Backend Build Failures

**Problem:** Backend TypeScript compilation fails

**Solution:**
```bash
cd backend

# Clean build directory
rm -rf dist

# Generate Prisma client
npm run db:generate

# Build with verbose output
npm run build --verbose
```

## Runtime Errors

### Authentication Errors

**Problem:** Users cannot sign in/out

**Symptoms:**
- Redirect loops
- Session not persisting
- "Callback URL mismatch" errors

**Solution:**
1. **Check NextAuth Configuration:**
   ```bash
   # Verify URLs match
   NEXTAUTH_URL="http://localhost:3000"  # Must match current domain
   ```

2. **Clear Browser Data:**
   - Clear cookies and localStorage
   - Try incognito/private browsing

3. **Check Database:**
   ```bash
   cd backend
   npm run db:studio
   # Verify user and session tables exist
   ```

### tRPC Connection Issues

**Problem:** Frontend cannot connect to backend API

**Symptoms:**
- "Network Error" in browser console
- tRPC procedures timing out
- CORS errors

**Solution:**
1. **Verify Backend is Running:**
   ```bash
   # Check backend server
   curl http://localhost:3001/api/trpc/health
   ```

2. **Check CORS Configuration:**
   ```typescript
   // In backend tRPC setup, ensure CORS is configured
   // for frontend domain
   ```

3. **Verify API Routes:**
   ```bash
   # Check tRPC endpoint
   curl http://localhost:3001/api/trpc
   ```

## Performance Issues

### Slow Database Queries

**Problem:** Database operations are slow

**Solution:**
```bash
# Enable query logging
# Add to backend/src/lib/db.ts:
# log: ['query', 'info', 'warn', 'error']

# Use Prisma Studio to analyze queries
cd backend && npm run db:studio

# Check Supabase dashboard for slow queries
```

### Large Bundle Sizes

**Problem:** Frontend bundle too large

**Solution:**
```bash
cd frontend

# Analyze bundle
npm run build
npx @next/bundle-analyzer

# Common fixes:
# - Use dynamic imports for large components
# - Optimize images with next/image
# - Remove unused dependencies
```

## Testing Issues

### Playwright Test Failures

**Problem:** E2E tests failing

**Solution:**
```bash
cd frontend

# Install browser dependencies
npx playwright install

# Run tests with debug
npm run test:e2e -- --debug

# Update test snapshots if needed
npx playwright test --update-snapshots
```

### Storybook Issues

**Problem:** Storybook won't start or stories not loading

**Solution:**
```bash
cd frontend

# Clear Storybook cache
rm -rf .storybook-cache storybook-static

# Rebuild Storybook
npm run build-storybook
npm run storybook
```

## Deployment Issues

### Vercel Deployment Failures

**Problem:** Frontend deployment fails on Vercel

**Solution:**
1. **Check Build Command:**
   ```bash
   # In frontend package.json
   "scripts": {
     "build": "next build"
   }
   ```

2. **Environment Variables:**
   - Add all required env vars in Vercel dashboard
   - Ensure `NEXT_PUBLIC_*` variables are set

3. **Build Logs:**
   - Check Vercel build logs for specific errors
   - Verify Node.js version in project settings

### Backend Deployment Issues

**Problem:** Backend deployment fails

**Solution:**
1. **Check Start Command:**
   ```bash
   # In backend package.json
   "scripts": {
     "start": "node dist/index.js",
     "build": "prisma generate && tsc"
   }
   ```

2. **Database Migrations:**
   ```bash
   # Run migrations in deployment
   npm run db:migrate
   ```

## Getting Additional Help

### Debugging Steps

1. **Check Console Logs:**
   - Browser DevTools console
   - Server logs in terminal
   - Network tab for API calls

2. **Enable Verbose Logging:**
   ```bash
   # Frontend
   DEBUG=* npm run dev

   # Backend
   LOG_LEVEL=debug npm run dev
   ```

3. **Isolate the Issue:**
   - Test with minimal reproduction
   - Check if issue occurs in fresh installation
   - Try different browsers/environments

### Community Resources

- **GitHub Issues:** Check existing issues and create new ones
- **Discord/Slack:** Join project community channels
- **Documentation:** Review all docs in `/docs` folder
- **Stack Overflow:** Search for similar issues with relevant tags

### Creating Bug Reports

When reporting issues, include:

1. **Environment Information:**
   ```bash
   node --version
   npm --version
   # OS version
   ```

2. **Steps to Reproduce:**
   - Exact commands run
   - Expected vs actual behavior
   - Error messages (full stack traces)

3. **Configuration:**
   - Relevant environment variables (redacted)
   - Package versions
   - Any custom configurations

4. **Logs:**
   - Console output
   - Server logs
   - Browser DevTools errors 