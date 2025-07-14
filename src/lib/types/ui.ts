import { ReactNode } from 'react';

// Base types for all UI components
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface VariantProps<T extends string> {
  variant?: T;
}

export interface SizeProps<T extends string> {
  size?: T;
}

// Common variant types
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export type InputVariant = 'default' | 'error' | 'success';
export type InputSize = 'sm' | 'md' | 'lg';

export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Form types
export interface FormFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Modal types
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  data?: any;
}

// Async operations
export interface AsyncState<T = any> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// API response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

// Pagination types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPreviousNext?: boolean;
  showFirstLast?: boolean;
}

export interface PaginatedData<T> {
  items: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Theme types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    muted: string;
    accent: string;
    destructive: string;
  };
  fonts: {
    sans: string[];
    serif: string[];
    mono: string[];
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Animation types
export interface AnimationProps {
  duration?: number;
  delay?: number;
  easing?: string;
}

// Accessibility types
export interface A11yProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  role?: string;
}

// Event handler types
export type MouseEventHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type KeyboardEventHandler = (event: React.KeyboardEvent<HTMLElement>) => void;
export type FormEventHandler = (event: React.FormEvent<HTMLFormElement>) => void;
export type ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

// Utility types
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Component state types
export interface ComponentState {
  isHovered: boolean;
  isFocused: boolean;
  isPressed: boolean;
  isDisabled: boolean;
} 