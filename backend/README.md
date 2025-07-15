# Backend - Raph AI Starter

This is the backend service handling API routes, database operations, authentication, and business logic.

## 🚀 Technology Stack

- **Runtime**: Node.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js + Supabase Auth
- **API**: tRPC for type-safe APIs
- **Background Jobs**: Inngest for reliable job processing
- **File Storage**: Supabase Storage + AWS S3
- **Email**: Resend for transactional emails
- **AI Services**: OpenAI, Anthropic, Groq APIs
- **Validation**: Zod schemas
- **Database Client**: Supabase + Prisma

## 📁 Project Structure

```
backend/
├── src/
│   ├── app/
│   │   └── api/            # API route handlers
│   │       ├── auth/       # Authentication endpoints
│   │       ├── trpc/       # tRPC router
│   │       ├── upload/     # File upload endpoints
│   │       ├── transcribe/ # AI transcription
│   │       └── inngest/    # Background job handlers
│   ├── lib/
│   │   ├── api/           # tRPC routers and procedures
│   │   ├── auth/          # Authentication configuration
│   │   ├── email/         # Email templates and sending
│   │   ├── supabase/      # Supabase utilities
│   │   ├── trpc/          # tRPC server configuration
│   │   ├── zod/           # Validation schemas
│   │   ├── aiClient.ts    # AI service integrations
│   │   ├── db.ts          # Database client
│   │   ├── inngest.ts     # Background job configuration
│   │   ├── storage.ts     # File storage utilities
│   │   └── types.ts       # Shared type definitions
│   └── index.ts           # Server entry point
├── prisma/
│   └── schema.prisma      # Database schema
├── inngest.config.ts      # Inngest configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or Supabase)
- Environment variables configured

### Installation

```bash
# Install dependencies
npm install

# Set up database
npm run db:migrate

# Generate Prisma client
npm run db:generate

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset database and run migrations

## 🗄️ Database

### Schema

The database schema is defined in `prisma/schema.prisma` and includes:

- **Users** - User accounts and profiles
- **Accounts** - OAuth account connections
- **Sessions** - User sessions
- **Allowlist** - Email allowlist for registration
- **VerificationTokens** - Email verification tokens

### Migrations

```bash
# Create a new migration
npm run db:migrate

# Reset database (development only)
npm run db:reset

# View database in browser
npm run db:studio
```

## 🔐 Authentication

### NextAuth.js Configuration

The authentication system supports:
- Email/password authentication
- OAuth providers (easily extensible)
- Session management
- Role-based access control

Configuration in `src/lib/auth/index.ts`:

```typescript
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      // Email configuration
    }),
  ],
  // Additional configuration...
};
```

### Supabase Auth

Direct Supabase authentication utilities in `src/lib/supabase/auth.ts`:

```typescript
import { getCurrentSession, signOut } from '@/lib/supabase/auth';

const { data: { user, session } } = await getCurrentSession();
```

## 🚀 API Development

### tRPC Routers

API endpoints are defined using tRPC for end-to-end type safety:

```typescript
// src/lib/api/routers/user.ts
export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });
    }),
});
```

### Adding New Endpoints

1. Create router in `src/lib/api/routers/`
2. Add to main router in `src/lib/api/root.ts`
3. Define Zod schemas in `src/lib/zod/`

## 🤖 AI Integration

### Supported Providers

- **OpenAI** - GPT models, embeddings, transcription
- **Anthropic** - Claude models
- **Groq** - Fast inference
- **Google AI** - Gemini models

### Usage

```typescript
import { generateChatCompletion } from '@/lib/aiClient';

const response = await generateChatCompletion({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }],
});
```

## 📧 Email System

### Transactional Emails

Using Resend for reliable email delivery:

```typescript
import { sendEmail } from '@/lib/email/sendEmail';

await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  template: 'WelcomeEmail',
  data: { name: 'John' },
});
```

### Email Templates

React-based email templates in `src/lib/email/templates/`:

```typescript
export const WelcomeEmail: React.FC<{ name: string }> = ({ name }) => (
  <div>
    <h1>Welcome, {name}!</h1>
    {/* Email content */}
  </div>
);
```

## 📁 File Storage

### Supabase Storage

```typescript
import { uploadFile, getPublicUrl } from '@/lib/supabase/storage';

const { data, error } = await uploadFile({
  bucket: 'uploads',
  path: 'documents/file.pdf',
  file: fileObject,
});
```

### AWS S3 (Alternative)

Configuration in `src/lib/storage.ts` for S3 integration.

## ⚡ Background Jobs

### Inngest Integration

Reliable background job processing:

```typescript
// src/lib/inngest.ts
export const processDocument = inngest.createFunction(
  { id: "process-document" },
  { event: "document.uploaded" },
  async ({ event, step }) => {
    // Job processing logic
  }
);
```

## 🔧 Configuration

### Environment Variables

Required environment variables:

```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Authentication
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# Email
RESEND_API_KEY="..."
EMAIL_FROM="noreply@example.com"

# AI Services
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
GROQ_API_KEY="..."

# Storage
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_REGION="us-west-2"
BUCKET_NAME="..."

# Background Jobs
INNGEST_EVENT_KEY="..."
```

## 📊 Monitoring & Logging

### Error Handling

Proper error handling throughout the application:

```typescript
try {
  // Operation
} catch (error) {
  console.error('Operation failed:', error);
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Operation failed',
  });
}
```

### Health Checks

Health check endpoint available at `/health`:

```bash
curl http://localhost:3001/health
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Docker Deployment

Create a Dockerfile:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start"]
```

## 🛠️ Development

### Adding New Features

1. **Database Changes**: Update `prisma/schema.prisma` and migrate
2. **API Endpoints**: Create tRPC routers with proper validation
3. **Background Jobs**: Define Inngest functions for async operations
4. **Types**: Update TypeScript definitions in `src/lib/types.ts`

### Testing

```bash
# Run type checking
npx tsc --noEmit

# Run database migrations (development)
npm run db:migrate
```

## 📦 Key Dependencies

### Core
- **@prisma/client** - Database ORM
- **@trpc/server** - Type-safe API framework
- **next-auth** - Authentication library
- **@supabase/supabase-js** - Supabase client

### AI & Processing
- **openai** - OpenAI API client
- **@google/generative-ai** - Google AI integration
- **groq-sdk** - Groq API client

### Utilities
- **zod** - Schema validation
- **inngest** - Background job processing
- **resend** - Email delivery
- **@aws-sdk/client-s3** - AWS S3 integration

## 🔒 Security

- Input validation with Zod schemas
- Authentication middleware for protected routes
- Environment variable validation
- Proper error handling without data leaks
- SQL injection protection via Prisma 