# Raph AI Starter - Monorepo

A modern full-stack starter template with separate frontend and backend architectures, built with cutting-edge technologies for rapid AI application development.

## 🏗️ Architecture Overview

This project follows a **monorepo structure** with clearly separated frontend and backend concerns:

```
raph-ai-starter/
├── frontend/          # Next.js frontend application
├── backend/           # Node.js backend services
├── .env.example       # Environment variables template
├── package.json       # Root workspace configuration
├── README.md          # This file
└── docs/              # Project documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database or Supabase account
- Environment variables configured

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd raph-ai-starter

# Install root dependencies
npm install

# Copy environment template
cp .env.example .env.local
# Edit .env.local with your actual values
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Set up database
npm run db:migrate

# Start backend development server
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

### 4. Access Applications

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Storybook**: http://localhost:6006 (run `npm run storybook` in frontend)

## 🎯 Tech Stack

### Frontend (`/frontend`)
- **Framework**: Next.js 15.1.0 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS + shadcn/ui + Headless UI
- **State**: React Query + tRPC client
- **Auth**: NextAuth.js integration
- **Development**: Storybook for component development

### Backend (`/backend`) 
- **Runtime**: Node.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM + Supabase
- **API**: tRPC for type-safe APIs
- **Auth**: NextAuth.js + Supabase Auth
- **Jobs**: Inngest for background processing
- **AI**: OpenAI, Anthropic, Groq integrations
- **Email**: Resend for transactional emails
- **Storage**: Supabase Storage + AWS S3

## 📁 Project Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── app/           # Next.js app router
│   ├── components/    # React components
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Frontend utilities
├── .storybook/        # Storybook configuration
├── tailwind.config.ts # Styling configuration
└── package.json       # Frontend dependencies
```

### Backend Structure
```
backend/
├── src/
│   ├── app/api/       # API route handlers
│   └── lib/           # Backend services & utilities
├── prisma/            # Database schema
├── inngest.config.ts  # Background jobs config
└── package.json       # Backend dependencies
```

## 🔧 Environment Configuration

Create a `.env.local` file in the root with these variables:

```bash
# Database (Supabase)
DATABASE_URL="postgresql://postgres.PROJECT_REF:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.PROJECT_REF:[PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-at-least-32-chars"

# Email
RESEND_API_KEY="re_123456789"
EMAIL_FROM="noreply@example.com"

# AI Services
OPENAI_API_KEY="sk-your-openai-api-key"
ANTHROPIC_API_KEY="sk-ant-your-anthropic-api-key"
GROQ_API_KEY="your-groq-api-key"

# Background Jobs
INNGEST_EVENT_KEY="your-inngest-event-key"

# Storage (optional - if not using Supabase Storage)
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"
AWS_REGION="us-west-2"
BUCKET_NAME="your-bucket-name"
```

## 🚀 Development

### Running Both Services

From the root directory:

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm run dev

# Terminal 3: Storybook (optional)
cd frontend && npm run storybook
```

### Available Scripts

**Root Level:**
- `npm run dev:frontend` - Start frontend development
- `npm run dev:backend` - Start backend development
- `npm run build` - Build both frontend and backend
- `npm run lint` - Lint both projects

**Frontend (`/frontend`):**
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run storybook` - Start component development environment

**Backend (`/backend`):**
- `npm run dev` - Start Node.js development server
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 🎨 Features

### 🔐 Authentication
- **Multiple Auth Methods**: Email/password, OAuth providers
- **Session Management**: Secure session handling with NextAuth.js
- **Supabase Integration**: Direct Supabase auth for real-time features
- **Protected Routes**: Automatic route protection

### 🗄️ Database & API
- **Type-Safe APIs**: End-to-end type safety with tRPC
- **Database ORM**: Prisma with PostgreSQL/Supabase
- **Real-time**: Supabase real-time subscriptions
- **Migrations**: Automated database schema management

### 🎨 UI & Styling
- **Modern Components**: shadcn/ui + Headless UI for accessibility
- **Dark Mode**: Built-in dark/light theme switching
- **Responsive Design**: Mobile-first responsive layouts
- **Component Library**: Storybook for component development

### 🤖 AI Integration
- **Multiple Providers**: OpenAI, Anthropic, Groq support
- **Type-Safe**: Fully typed AI client integrations
- **Background Processing**: Queue AI tasks with Inngest

### 📧 Communication
- **Email Templates**: React-based email templates
- **Transactional Email**: Reliable delivery with Resend
- **Real-time**: WebSocket support via Supabase

### 🚀 Performance
- **Optimized Builds**: Next.js optimizations + code splitting
- **Image Optimization**: Automatic image optimization
- **Caching**: Smart caching strategies
- **Background Jobs**: Async processing with Inngest

## 📚 Documentation

- [Frontend Documentation](./frontend/README.md) - Next.js frontend setup and development
- [Backend Documentation](./backend/README.md) - Backend API and services
- [Supabase Setup Guide](./SUPABASE_SETUP.md) - Complete Supabase integration guide

## 🛠️ Development Tips

1. **Monorepo Workflow**: Each service has its own dependencies and can be developed independently
2. **Type Safety**: Changes to backend API types automatically flow to frontend
3. **Component Development**: Use Storybook for isolated component development
4. **Database Changes**: Always create migrations for schema changes
5. **Environment Variables**: Keep sensitive variables out of version control

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the .next folder
```

### Backend Deployment (Railway/Render/Heroku)
```bash
cd backend  
npm run build
# Deploy with your preferred platform
```

### Full-Stack Deployment
- **Vercel**: Deploy frontend directly, API routes included
- **Docker**: Use provided Dockerfiles for containerization
- **Monorepo**: Some platforms support monorepo deployments

## 🔒 Security

- **Input Validation**: Zod schemas for all API inputs
- **Authentication**: Secure session management
- **Environment Variables**: Proper secret management
- **CORS**: Configured for secure cross-origin requests
- **Headers**: Security headers configured in Next.js

## 📊 Monitoring

- **Error Handling**: Comprehensive error boundaries
- **Logging**: Structured logging throughout
- **Health Checks**: API health check endpoints
- **Performance**: Built-in Next.js analytics support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes in the appropriate frontend/backend directory
4. Ensure tests pass and types check
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern React, Next.js, and Node.js best practices
- Inspired by T3 Stack and other modern full-stack templates
- Uses industry-standard tools and patterns for scalability
