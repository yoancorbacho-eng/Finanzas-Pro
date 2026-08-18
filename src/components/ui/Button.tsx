'use client';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
}

export function Button({ children, variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-colors disabled:opacity-50',
        size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm',
        variant === 'primary' && 'bg-blue-600 hover:bg-blue-700 text-white',
        variant === 'secondary' && 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700',
        variant === 'danger' && 'bg-red-600 hover:bg-red-700 text-white',
        variant === 'ghost' && 'text-gray-400 hover:text-gray-200 hover:bg-gray-800',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
