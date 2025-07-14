# Supabase Setup Guide

This starter template is configured to use Supabase as the default database and backend service. Follow this guide to set up your Supabase project.

## Quick Start

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the database to be ready

2. **Get Your Environment Variables**
   - Go to Project Settings > API
   - Copy your Project URL and anon/public key
   - Go to Project Settings > Database
   - Copy your database URL

3. **Update Your Environment Variables**
   Create a `.env.local` file with the following:

```bash
# Supabase Database Configuration
DATABASE_URL="postgresql://postgres.PROJECT_REF:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.PROJECT_REF:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres"

# Supabase API Configuration  
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

4. **Set Up Database Schema**
   ```bash
   npx prisma migrate dev --name init
   ```

## Environment Variables Explained

### Database URLs
- **DATABASE_URL**: Connection pooled URL for production (uses pgbouncer)
- **DIRECT_URL**: Direct connection URL for migrations and admin tasks

### Supabase API Keys
- **NEXT_PUBLIC_SUPABASE_URL**: Your project's API URL (safe to expose to client)
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Anonymous/public key (safe to expose to client)
- **SUPABASE_SERVICE_ROLE_KEY**: Server-side key with elevated permissions (keep secret)

## Features Included

This template includes utilities for all major Supabase features:

### 🗄️ Database (Prisma + PostgreSQL)
- Optimized Prisma schema for Supabase
- Connection pooling and health checks
- Snake case table names following Supabase conventions

### 🔐 Authentication
- NextAuth.js integration with Prisma adapter
- Supabase Auth utilities for direct authentication
- Session management and user profiles

### 📁 Storage
- File upload utilities
- Public and private file access
- Signed URLs for secure downloads
- File management (list, delete, etc.)

### ⚡ Real-time
- Table change subscriptions
- Presence tracking (who's online)
- Broadcast messaging
- Channel management

## Available Utilities

Import these utilities in your components:

```typescript
// Database
import { prisma, ensureDbConnection } from '@/lib/db'

// Supabase client
import { supabase } from '@/lib/supabase'

// Storage utilities
import { uploadFile, getPublicUrl, deleteFile } from '@/lib/supabase/storage'

// Auth utilities  
import { getCurrentSession, signOut } from '@/lib/supabase/auth'

// Real-time utilities
import { subscribeToTable, subscribeToPresence } from '@/lib/supabase/realtime'
```

## Database Setup

### 1. Push Schema to Supabase
```bash
npx prisma migrate dev --name init
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. (Optional) Enable Row Level Security
In your Supabase dashboard, go to Authentication > Policies to set up RLS policies for your tables.

### 4. (Optional) Set up Storage Buckets
In your Supabase dashboard, go to Storage to create buckets for file uploads.

## Common Use Cases

### File Upload Example
```typescript
import { uploadFile } from '@/lib/supabase/storage'

const handleFileUpload = async (file: File) => {
  const { data, error } = await uploadFile({
    bucket: 'uploads',
    path: `${Date.now()}-${file.name}`,
    file,
  })
  
  if (error) {
    console.error('Upload failed:', error)
    return
  }
  
  console.log('File uploaded:', data.path)
}
```

### Real-time Subscription Example
```typescript
import { subscribeToTable } from '@/lib/supabase/realtime'

useEffect(() => {
  const channel = subscribeToTable({
    table: 'messages',
    event: 'INSERT'
  }, (payload) => {
    console.log('New message:', payload.new)
  })
  
  return () => {
    channel.unsubscribe()
  }
}, [])
```

### Authentication Example
```typescript
import { getCurrentSession, signOut } from '@/lib/supabase/auth'

const { data: { user, session } } = await getCurrentSession()

if (user) {
  console.log('User is logged in:', user.email)
} else {
  console.log('User is not logged in')
}
```

## Migration from Other Databases

If you're migrating from another database:

1. Update your `DATABASE_URL` to point to Supabase
2. Run `npx prisma migrate reset` to reset migrations
3. Run `npx prisma migrate dev --name supabase_init` to create new migration
4. Update any database-specific code to use Supabase features

## Next Steps

- Set up Row Level Security policies in Supabase dashboard
- Configure email templates for authentication
- Set up file storage buckets
- Enable real-time features on tables that need them
- Consider using Supabase Edge Functions for serverless backend logic

## Troubleshooting

### Connection Issues
- Ensure your DATABASE_URL has the correct password
- Check that your Supabase project is active
- Verify network access to Supabase

### Type Issues
- Run `npx prisma generate` after schema changes
- Restart your TypeScript server in VS Code

### Migration Issues
- Use `DIRECT_URL` for migrations, `DATABASE_URL` for queries
- Ensure your database user has the required permissions

For more help, check the [Supabase documentation](https://supabase.com/docs) or the [Prisma documentation](https://www.prisma.io/docs). 