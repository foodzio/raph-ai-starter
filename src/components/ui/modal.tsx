"use client";

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className,
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={cn(
                  'w-full transform overflow-hidden rounded-lg bg-white dark:bg-neutral-900 p-6 text-left align-middle shadow-xl transition-all',
                  sizeClasses[size],
                  className
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  {title && (
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-neutral-900 dark:text-neutral-100"
                    >
                      {title}
                    </DialogTitle>
                  )}
                  <button
                    type="button"
                    className="rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-5 w-5 text-neutral-500" />
                  </button>
                </div>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}; 