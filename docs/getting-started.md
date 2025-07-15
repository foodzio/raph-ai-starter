# Getting Started

This guide will help you set up the Raph AI Starter monorepo project on your local machine.

## Prerequisites

- **Node.js 18+** and npm
- **Git** for version control
- **PostgreSQL** database or **Supabase** account
- **Code editor** (VS Code recommended)

## Quick Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd raph-ai-starter

# Install all dependencies (root, frontend, backend)
npm run install:all
```

### 2. Environment Configuration

The project uses service-specific environment files:

```bash
# Copy environment templates
cp .env.example .env
cp frontend/.env.example frontend/.env  
cp backend/.env.example backend/.env
```

**Configure each environment file:**

#### Root `.env` (Shared Variables)
```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-at-least-32-chars"
```

#### Frontend `.env` (Public Variables)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-at-least-32-chars"
```

#### Backend `.env` (Server Variables)
```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI APIs
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
GROQ_API_KEY=your-groq-key

# Email (optional)
RESEND_API_KEY=re_your-resend-key
```

### 3. Database Setup

```bash
# Navigate to backend and run migrations
cd backend
npm run db:migrate

# Optional: Open Prisma Studio to view data
npm run db:studio
```

### 4. Start Development Servers

```bash
# From root directory - starts both frontend and backend
npm run dev

# Or start individually:
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:3001
```

## Development Workflow

### Frontend Development
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Storybook** for component development

```bash
cd frontend
npm run dev          # Development server
npm run storybook    # Component library
npm run test:e2e     # Playwright tests
```

### Backend Development
- **Node.js** with TypeScript
- **tRPC** for type-safe APIs
- **Prisma** with Supabase
- **AI integrations** (OpenAI, Anthropic, Groq)

```bash
cd backend
npm run dev          # Development server
npm run db:studio    # Database browser
```

## Project Structure

```
raph-ai-starter/
├── frontend/          # Next.js React application
│   ├── src/app/      # App Router pages
│   ├── src/components/ # Reusable components
│   ├── src/hooks/     # Custom React hooks
│   └── src/stories/   # Storybook stories
├── backend/           # Node.js API server
│   ├── src/lib/      # Core libraries
│   ├── src/app/api/  # API routes
│   └── prisma/       # Database schema
├── docs/             # Project documentation
└── package.json      # Monorepo configuration
```

## Common Commands

```bash
# Development
npm run dev                    # Start both services
npm run dev:frontend          # Frontend only
npm run dev:backend           # Backend only

# Building
npm run build                 # Build both services
npm run build:frontend        # Frontend production build
npm run build:backend         # Backend production build

# Database
npm run db:migrate            # Run Prisma migrations
npm run db:studio             # Open database browser
npm run db:reset              # Reset database

# Testing
npm run test:e2e              # Run Playwright tests
npm run test:e2e:ui           # Playwright with UI

# Dependencies
npm run install:all           # Install all dependencies
npm run clean                 # Clean node_modules and builds
```

## Next Steps

1. **Read the [Architecture Guide](./architecture.md)** to understand the system design
2. **Explore [Frontend Development](./frontend-guide.md)** for React/Next.js patterns
3. **Check [Backend Development](./backend-guide.md)** for API development
4. **Review [Environment Variables](./environment-variables.md)** for complete configuration
5. **See [Component Library](./component-library.md)** for UI development

## Getting Help

- Check [Troubleshooting](./troubleshooting.md) for common issues
- Review [FAQ](./faq.md) for frequently asked questions
- Open an issue for bugs or feature requests 