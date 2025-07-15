# Frontend - Raph AI Starter

This is the frontend application built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Technology Stack

- **Framework**: Next.js 15.1.0 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with dark mode support
- **Components**: shadcn/ui + Headless UI for accessibility
- **Icons**: Lucide React + Hero Icons
- **Animations**: Framer Motion
- **State Management**: React Query + tRPC
- **Authentication**: NextAuth.js
- **Database Client**: Supabase
- **Forms**: React Hook Form with Zod validation
- **Notifications**: React Toastify
- **Development**: Storybook for component development

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── auth/           # Authentication pages
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── examples/      # Example components
│   │   └── theme/         # Theme-related components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and configurations
│   │   ├── trpc/         # tRPC client configuration
│   │   ├── types/        # TypeScript type definitions
│   │   └── utils.ts      # Utility functions
│   └── stories/          # Storybook stories
├── .storybook/           # Storybook configuration
├── screenshots/          # Component screenshots
├── components.json       # shadcn/ui configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── next.config.ts        # Next.js configuration
├── postcss.config.mjs    # PostCSS configuration
└── package.json          # Dependencies and scripts
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- Environment variables configured (see `.env.example` in root)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

## 🎨 Component Development

### UI Components

All UI components are built with:
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Radix UI** primitives for accessibility
- **Forwarded refs** for proper DOM access
- **Variant props** using class-variance-authority

Example:
```typescript
import { Button } from '@/components/ui/button';

function MyComponent() {
  return (
    <Button variant="primary" size="lg">
      Click me
    </Button>
  );
}
```

### Storybook

Use Storybook for component development and documentation:

```bash
npm run storybook
```

Visit `http://localhost:6006` to view component stories.

## 🎯 Key Features

### Authentication
- Supabase Auth integration
- NextAuth.js for session management
- Custom `useSupabaseAuth` hook
- Protected routes and layouts

### Forms
- Type-safe form components
- Built-in validation with Zod
- Error handling and loading states
- Accessibility features

### Theming
- Dark/light mode support
- Consistent design tokens
- CSS custom properties
- Responsive design

### Performance
- Optimized bundle splitting
- Image optimization
- Modern formats (WebP, AVIF)
- Code splitting and lazy loading

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
```

### Tailwind CSS

Customization is available in `tailwind.config.ts`. The configuration includes:
- Custom color palette
- Dark mode variants
- Custom animations
- Extended breakpoints

### TypeScript

Type definitions are organized in:
- `src/lib/types/ui.ts` - UI component types
- Component-specific interfaces within each component file
- Strict TypeScript configuration for better DX

## 📚 Best Practices

1. **Component Structure**: Use functional components with TypeScript interfaces
2. **Styling**: Prefer Tailwind utilities over custom CSS
3. **State Management**: Use React Query for server state, React state for local state
4. **Error Handling**: Implement proper error boundaries and loading states
5. **Accessibility**: Include ARIA labels and keyboard navigation
6. **Performance**: Use Next.js Image component and dynamic imports

## 🚀 Deployment

The frontend is configured for deployment on Vercel, Netlify, or any static hosting service:

```bash
npm run build
```

The build output will be in the `.next` directory, optimized for production.

## 🛠️ Development Tips

- Use the browser dev tools React extension
- Leverage Storybook for isolated component development
- Utilize TypeScript strict mode for better error catching
- Follow the established component patterns for consistency

## 📦 Dependencies

### Core
- React 19.0.0 - Latest React with concurrent features
- Next.js 15.1.0 - Full-stack React framework
- TypeScript 5.x - Type safety and developer experience

### UI & Styling
- Tailwind CSS - Utility-first CSS framework
- shadcn/ui - High-quality component library
- Headless UI - Accessible UI components
- Lucide React - Beautiful icons

### State & Data
- React Query - Server state management
- tRPC - End-to-end type safety
- Zod - TypeScript-first schema validation

### Development
- Storybook - Component development environment
- ESLint - Code linting
- Prettier - Code formatting 