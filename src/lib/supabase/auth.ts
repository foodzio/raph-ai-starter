import { supabase } from '../supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthUser extends User {
  role?: string;
  profile?: {
    name?: string;
    avatar_url?: string;
  };
}

/**
 * Get the current user session
 */
export async function getCurrentSession(): Promise<{
  data: { session: Session | null; user: AuthUser | null };
  error: any;
}> {
  try {
    const { data, error } = await supabase.auth.getSession();
    return {
      data: {
        session: data.session,
        user: data.session?.user as AuthUser || null,
      },
      error,
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return {
      data: { session: null, user: null },
      error,
    };
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    return { success: true, error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error };
  }
}

/**
 * Sign in with email and password
 */
export async function signInWithPassword(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error signing in:', error);
    return { data: null, error };
  }
}

/**
 * Sign up with email and password
 */
export async function signUpWithPassword(email: string, password: string, options?: {
  data?: Record<string, any>;
  redirectTo?: string;
}) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options,
    });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error signing up:', error);
    return { data: null, error };
  }
}

/**
 * Reset password for email
 */
export async function resetPassword(email: string, redirectTo?: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo || `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      throw error;
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { success: false, error };
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback: (event: string, session: Session | null) => void) {
  return supabase.auth.onAuthStateChange(callback);
} 