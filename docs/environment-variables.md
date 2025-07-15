# Environment Variables

This guide covers all environment variables needed to configure the Raph AI Starter monorepo.

## Environment File Structure

The project uses service-specific environment files for better organization and security:

```
├── .env                    # Root - shared variables
├── frontend/.env          # Frontend - public variables
└── backend/.env           # Backend - sensitive server variables
```

## Root Environment Variables (`.env`)

Shared variables used by both frontend and backend services.

### Authentication
```bash
# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"                    # Required
NEXTAUTH_SECRET="your-secret-key-at-least-32-chars"     # Required - Generate with: openssl rand -base64 32
```

## Frontend Environment Variables (`frontend/.env`)

Variables accessible to the client-side React application.

### Supabase Public Configuration
```bash
# Supabase Client Configuration (Safe for client-side)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co        # Required
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anonymous-key       # Required
```

### Shared Authentication (duplicated from root)
```bash
# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-at-least-32-chars"
```

**⚠️ Security Note:** Only `NEXT_PUBLIC_*` variables are exposed to the browser. Never put sensitive keys here.

## Backend Environment Variables (`backend/.env`)

Server-only variables containing sensitive API keys and configurations.

### Database Configuration
```bash
# Supabase Database URLs
DATABASE_URL="postgresql://postgres.PROJECT_REF:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.PROJECT_REF:[PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres"

# Supabase Service Role Key (Server-only, highly sensitive)
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### AI Service API Keys
```bash
# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key                           # Required for AI features

# Anthropic Claude API
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key                 # Optional

# Groq Fast Inference API
GROQ_API_KEY=your-groq-api-key                                  # Optional

# Google Generative AI (Gemini)
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key            # Optional

# Perplexity API
PERPLEXITY_API_KEY=pplx-your-perplexity-api-key                # Optional
```

### Email Service Configuration
```bash
# Resend Email API (Recommended)
RESEND_API_KEY=re_your-resend-api-key                          # Required for email features
EMAIL_FROM="noreply@yourdomain.com"                            # Sender email address

# Alternative: SMTP Configuration
EMAIL_SERVER_HOST="smtp.resend.com"                            # SMTP host
EMAIL_SERVER_PORT="465"                                        # SMTP port
EMAIL_SERVER_USER="resend"                                     # SMTP username
EMAIL_SERVER_PASSWORD="your-resend-api-key"                    # SMTP password

# AWS SES (Alternative email service)
SES_FROM_EMAIL="your-email@yourdomain.com"                     # SES sender email
```

### File Storage Configuration
```bash
# AWS S3 Configuration (Optional - Supabase Storage is default)
AWS_ACCESS_KEY_ID=your-aws-access-key-id                       # AWS access key
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key               # AWS secret key
AWS_REGION=us-west-2                                           # AWS region
BUCKET_NAME=your-s3-bucket-name                                # S3 bucket name
```

### Background Jobs
```bash
# Inngest Configuration
INNGEST_EVENT_KEY=your-inngest-event-key                       # Required for background jobs
INNGEST_SIGNING_KEY=your-inngest-signing-key                   # Required for Inngest Cloud
```

### External APIs
```bash
# Additional Services
PROXYCURL_API_KEY=your-proxycurl-api-key                       # LinkedIn data scraping
```

### Legacy/Development
```bash
# Legacy Database (if migrating from another system)
IDEATION_DATABASE_URL=postgresql://user:password@host/database  # Legacy DB connection
```

## Environment Setup Guide

### 1. Copy Templates
```bash
# Copy environment templates
cp .env.example .env
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### 2. Generate Secrets
```bash
# Generate NextAuth secret
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Configure Supabase

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note your project URL and keys

2. **Get Configuration Values**
   ```bash
   # From Supabase Dashboard > Settings > API
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...  # anon/public key
   SUPABASE_SERVICE_ROLE_KEY=eyJ...      # service_role key (sensitive!)
   ```

3. **Get Database URLs**
   ```bash
   # From Supabase Dashboard > Settings > Database
   # Connection string with connection pooling (recommended)
   DATABASE_URL=postgresql://postgres.PROJECT_REF:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
   
   # Direct connection (for migrations)
   DIRECT_URL=postgresql://postgres.PROJECT_REF:[PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres
   ```

### 4. Configure AI Services

#### OpenAI (Required)
1. Visit [platform.openai.com](https://platform.openai.com)
2. Create API key: Dashboard > API keys > Create new secret key
3. Add to backend `.env`: `OPENAI_API_KEY=sk-...`

#### Anthropic Claude (Optional)
1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Generate API key
3. Add: `ANTHROPIC_API_KEY=sk-ant-...`

#### Groq (Optional)
1. Visit [console.groq.com](https://console.groq.com)
2. Generate API key
3. Add: `GROQ_API_KEY=...`

### 5. Configure Email Service

#### Resend (Recommended)
1. Visit [resend.com](https://resend.com)
2. Create API key
3. Add: `RESEND_API_KEY=re_...`
4. Verify your domain for production

## Environment Validation

The application validates required environment variables on startup. Check the console for any missing variables.

### Validation Checklist

**Frontend Required:**
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `NEXTAUTH_URL`
- ✅ `NEXTAUTH_SECRET`

**Backend Required:**
- ✅ `DATABASE_URL`
- ✅ `DIRECT_URL`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `OPENAI_API_KEY` (for AI features)
- ✅ `NEXTAUTH_SECRET`

**Backend Optional:**
- 🔸 `RESEND_API_KEY` (email features)
- 🔸 `ANTHROPIC_API_KEY` (Claude AI)
- 🔸 `GROQ_API_KEY` (fast inference)
- 🔸 `INNGEST_EVENT_KEY` (background jobs)

## Security Best Practices

### 1. **Environment File Security**
- Never commit `.env` files to version control
- Use different keys for development/staging/production
- Rotate keys regularly
- Use least-privilege access for API keys

### 2. **Variable Naming Convention**
- `NEXT_PUBLIC_*` - Safe for client-side (frontend only)
- All others - Server-side only (backend only)
- Use descriptive names with service prefixes

### 3. **Production Deployment**
- Use platform-specific environment variable management
- Vercel: Environment Variables dashboard
- Railway: Variables tab in deployment settings
- Never expose backend `.env` to frontend deployments

## Troubleshooting

### Common Issues

1. **"NEXTAUTH_SECRET not found"**
   - Generate secret: `openssl rand -base64 32`
   - Add to both root `.env` and frontend `.env`

2. **"Cannot connect to database"**
   - Check `DATABASE_URL` format
   - Verify Supabase project is active
   - Ensure password is URL-encoded

3. **"Supabase client error"**
   - Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Check if keys match your Supabase project

4. **"AI API calls failing"**
   - Verify API key format (OpenAI starts with `sk-`)
   - Check API key permissions and billing
   - Ensure keys are in backend `.env`, not frontend

### Environment Loading Order

1. **Frontend**: `frontend/.env` → root `.env` → system environment
2. **Backend**: `backend/.env` → root `.env` → system environment
3. **Precedence**: System environment > local `.env` > `.env.example`

For more help, see [Troubleshooting Guide](./troubleshooting.md). 