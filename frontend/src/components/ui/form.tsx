"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Button } from "./button";

interface FormFieldConfig {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  validation?: (value: string) => string | null;
}

interface FormProps {
  fields: FormFieldConfig[];
  onSubmit: (data: Record<string, string>) => Promise<void> | void;
  submitLabel?: string;
  className?: string;
  isLoading?: boolean;
}

export const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  submitLabel = "Submit",
  className,
  isLoading = false,
}) => {
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleInputChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      const value = values[field.name] || "";
      
      // Required field validation
      if (field.required && !value.trim()) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }
      
      // Custom validation
      if (field.validation && value) {
        const validationError = field.validation(value);
        if (validationError) {
          newErrors[field.name] = validationError;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
    >
      {fields.map((field) => (
        <Input
          key={field.name}
          type={field.type || "text"}
          label={field.label}
          placeholder={field.placeholder}
          value={values[field.name] || ""}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          error={errors[field.name]}
          required={field.required}
        />
      ))}
      
      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full"
      >
        {isSubmitting || isLoading ? "Loading..." : submitLabel}
      </Button>
    </form>
  );
};

// Common validation functions
export const validationRules = {
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : "Please enter a valid email address";
  },
  
  password: (value: string) => {
    if (value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return null;
  },
  
  confirmPassword: (password: string) => (value: string) => {
    return value === password ? null : "Passwords do not match";
  },
  
  required: (fieldName: string) => (value: string) => {
    return value.trim() ? null : `${fieldName} is required`;
  },
}; 