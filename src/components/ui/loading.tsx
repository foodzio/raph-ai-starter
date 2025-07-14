import * as React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
}) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900 dark:border-neutral-600 dark:border-t-neutral-100",
        sizeClasses[size],
        className
      )}
    />
  );
};

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  lines = 1,
}) => {
  return (
    <div className={cn("animate-pulse", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 bg-neutral-200 dark:bg-neutral-700 rounded",
            i < lines - 1 && "mb-2"
          )}
        />
      ))}
    </div>
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  className,
}) => {
  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
          <LoadingSpinner size="lg" />
        </div>
      )}
    </div>
  );
};

interface LoadingPageProps {
  message?: string;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-900">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">{message}</p>
    </div>
  );
}; 