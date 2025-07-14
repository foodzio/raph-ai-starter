"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'react-toastify';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthActions {
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, options?: { data?: Record<string, any> }) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

interface UseSupabaseAuthReturn extends AuthState, AuthActions {}

export const useSupabaseAuth = (): UseSupabaseAuthReturn => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setState({
          user: session?.user ?? null,
          session: session,
          isLoading: false,
          isAuthenticated: !!session,
        });
      } catch (error) {
        console.error('Error getting initial session:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState({
          user: session?.user ?? null,
          session: session,
          isLoading: false,
          isAuthenticated: !!session,
        });

        // Handle auth events
        switch (event) {
          case 'SIGNED_IN':
            toast.success('Successfully signed in!');
            break;
          case 'SIGNED_OUT':
            toast.info('Signed out successfully');
            break;
          case 'TOKEN_REFRESHED':
            console.log('Token refreshed');
            break;
          case 'USER_UPDATED':
            toast.success('Profile updated successfully');
            break;
          case 'PASSWORD_RECOVERY':
            toast.info('Password recovery email sent');
            break;
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  const signUp = async (email: string, password: string, options?: { data?: Record<string, any> }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options,
      });
      
      if (error) {
        toast.error(error.message);
        return { error };
      }
      
      toast.success('Check your email for the confirmation link');
      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) {
        toast.error(error.message);
        return { error };
      }
      
      toast.success('Password reset email sent');
      return { error: null };
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
}; 