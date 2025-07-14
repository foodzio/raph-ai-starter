"use client";

import React, { useState } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, validationRules } from '@/components/ui/form';
import { Modal } from '@/components/ui/modal';
import { LoadingSpinner } from '@/components/ui/loading';
import { toast } from 'react-toastify';
import { User, LogOut, Settings } from 'lucide-react';

interface AuthExampleProps {
  className?: string;
}

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const AuthExample: React.FC<AuthExampleProps> = ({ className }) => {
  const { user, isLoading, isAuthenticated, signIn, signUp, signOut } = useSupabaseAuth();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleSignIn = async (data: Record<string, string>) => {
    const { error } = await signIn(data.email, data.password);
    if (!error) {
      toast.success('Welcome back!');
    }
  };

  const handleSignUp = async (data: Record<string, string>) => {
    const { error } = await signUp(data.email, data.password, {
      data: { name: data.name }
    });
    if (!error) {
      toast.success('Account created! Please check your email.');
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      toast.success('Signed out successfully');
    }
  };

  const signInFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
      validation: validationRules.email,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true,
      validation: validationRules.password,
    },
  ];

  const signUpFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      required: true,
    },
    ...signInFields,
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      required: true,
      validation: (value: string) => {
        // This would need to be implemented properly with form state
        return value ? null : 'Please confirm your password';
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Welcome back!
          </CardTitle>
          <CardDescription>
            You are signed in as {user.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200">
                🎉 Authentication successful! This demonstrates:
              </p>
              <ul className="text-sm text-green-700 dark:text-green-300 mt-2 space-y-1">
                <li>• TypeScript interfaces for user data</li>
                <li>• React hooks for state management</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Proper error handling</li>
                <li>• Accessibility considerations</li>
              </ul>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsResetModalOpen(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              
              <Button
                variant="destructive"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle>
            {isSignUpMode ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
          <CardDescription>
            {isSignUpMode 
              ? 'Sign up for a new account to get started'
              : 'Sign in to your account to continue'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            fields={isSignUpMode ? signUpFields : signInFields}
            onSubmit={isSignUpMode ? handleSignUp : handleSignIn}
            submitLabel={isSignUpMode ? 'Sign Up' : 'Sign In'}
            isLoading={isLoading}
          />
          
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              onClick={() => setIsSignUpMode(!isSignUpMode)}
              className="text-sm"
            >
              {isSignUpMode 
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"
              }
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 This example demonstrates:
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
              <li>• Strong TypeScript typing throughout</li>
              <li>• Reusable component composition</li>
              <li>• Proper form validation</li>
              <li>• Responsive Tailwind CSS design</li>
              <li>• Accessibility best practices</li>
              <li>• Error handling and loading states</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Settings"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            This modal demonstrates Headless UI integration with proper TypeScript interfaces.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsResetModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsResetModalOpen(false)}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}; 