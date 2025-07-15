# Project Architecture

This document outlines the architecture and design decisions for the Raph AI Starter monorepo.

## Overview

The Raph AI Starter is organized as a **monorepo** with separated frontend and backend services, designed for full-stack TypeScript development with AI integrations.

## Monorepo Structure

```
raph-ai-starter/
├── frontend/              # Next.js React Application
│   ├── src/
│   │   ├── app/          # Next.js App Router
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Frontend utilities
│   │   └── stories/      # Storybook stories
│   ├── package.json      # Frontend dependencies
│   ├── next.config.ts    # Next.js configuration
│   ├── tailwind.config.ts # Tailwind CSS setup
│   └── playwright.config.ts # E2E testing
├── backend/               # Node.js API Server
│   ├── src/
│   │   ├── app/api/      # API routes
│   │   └── lib/          # Backend utilities
│   ├── prisma/           # Database schema
│   ├── package.json      # Backend dependencies
│   └── inngest.config.ts # Background jobs
├── docs/                 # Project documentation
├── package.json          # Monorepo configuration
└── .env.example          # Environment template
```

## Technology Stack

### Frontend Stack
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality component library
- **Headless UI** - Unstyled, accessible UI components
- **Framer Motion** - Animation library
- **Storybook** - Component development environment
- **Playwright** - End-to-end testing

### Backend Stack
- **Node.js** - JavaScript runtime
- **TypeScript 5** - Type-safe server development
- **tRPC** - End-to-end typesafe APIs
- **Prisma** - Next-generation ORM
- **Supabase** - PostgreSQL database with real-time features
- **NextAuth.js** - Authentication library
- **Inngest** - Reliable background job processing

### AI & Services
- **OpenAI** - GPT models and completions
- **Anthropic** - Claude AI models
- **Groq** - Fast inference API
- **Google Generative AI** - Gemini models
- **Resend** - Email delivery service
- **AWS S3** - File storage (optional)

## Design Principles

### 1. **Type Safety First**
- End-to-end TypeScript from database to UI
- tRPC for type-safe API communication
- Prisma for type-safe database operations
- Zod for runtime validation

### 2. **Separation of Concerns**
- Clear separation between frontend and backend
- Service-specific dependencies and configurations
- Environment variable isolation by service

### 3. **Developer Experience**
- Hot reload in development
- Comprehensive tooling (ESLint, Prettier, TypeScript)
- Component-driven development with Storybook
- Automated testing with Playwright

### 4. **Scalability**
- Modular architecture for easy feature addition
- Background job processing with Inngest
- Database migrations with Prisma
- CDN-ready static asset handling

## Data Flow Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (Next.js)     │    │   (Node.js)     │    │  (Supabase)     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • React Pages   │◄──►│ • tRPC API      │◄──►│ • PostgreSQL    │
│ • Components    │    │ • Auth Routes   │    │ • Real-time     │
│ • Hooks         │    │ • AI Services   │    │ • File Storage  │
│ • Client State  │    │ • Background    │    │ • Row Level     │
│                 │    │   Jobs          │    │   Security      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Authentication Flow

1. **User Access** - User visits protected route
2. **NextAuth Check** - NextAuth.js validates session
3. **Database Lookup** - User data fetched from Supabase
4. **Authorization** - Role-based access control
5. **API Access** - tRPC procedures use authenticated context

## API Architecture

### tRPC Procedures
- **Public Procedures** - No authentication required
- **Protected Procedures** - Require valid user session
- **Admin Procedures** - Require admin role

### Route Organization
```
backend/src/app/api/
├── auth/[...nextauth]/    # NextAuth.js routes
├── trpc/[trpc]/          # tRPC endpoint
├── transcribe/           # AI transcription
├── upload/               # File upload
└── inngest/              # Background jobs
```

## Database Design

### Prisma Schema Features
- **User Management** - Authentication and profiles
- **Supabase Optimized** - Snake_case table mappings
- **Type Generation** - Automatic TypeScript types
- **Migrations** - Version-controlled schema changes

### Supabase Integration
- **Real-time Subscriptions** - Live data updates
- **Row Level Security** - Database-level authorization
- **File Storage** - Integrated file management
- **Auth Integration** - Seamless with NextAuth.js

## Background Jobs

### Inngest Workflows
- **AI Processing** - Long-running AI operations
- **Email Delivery** - Asynchronous email sending
- **Data Synchronization** - Batch processing tasks
- **Cleanup Operations** - Scheduled maintenance

## Security Considerations

### Environment Isolation
- **Frontend** - Only public variables exposed
- **Backend** - Sensitive keys server-side only
- **Development** - Local environment files

### Authentication Security
- **Session Management** - Secure JWT handling
- **CSRF Protection** - Built-in NextAuth.js protection
- **Rate Limiting** - API abuse prevention
- **Input Validation** - Zod schema validation

## Deployment Architecture

### Production Setup
- **Frontend** - Vercel/Netlify static deployment
- **Backend** - Railway/Render containerized deployment
- **Database** - Supabase managed PostgreSQL
- **CDN** - Static asset optimization

### Environment Strategy
- **Development** - Local with Docker optional
- **Staging** - Preview deployments
- **Production** - Scalable cloud infrastructure

## Performance Optimizations

### Frontend
- **Next.js Optimizations** - Automatic code splitting
- **Image Optimization** - Built-in Next.js features
- **Static Generation** - ISR for dynamic content
- **Bundle Analysis** - Webpack bundle analyzer

### Backend
- **Connection Pooling** - Prisma connection management
- **Query Optimization** - Efficient database queries
- **Caching Strategy** - Redis for session storage
- **Background Processing** - Non-blocking operations

## Monitoring & Observability

### Error Tracking
- **Frontend** - Browser error collection
- **Backend** - Server error logging
- **Database** - Query performance monitoring
- **AI Services** - API usage tracking

### Performance Monitoring
- **Core Web Vitals** - Frontend performance metrics
- **API Response Times** - Backend performance
- **Database Queries** - Slow query identification
- **Background Jobs** - Task completion tracking 