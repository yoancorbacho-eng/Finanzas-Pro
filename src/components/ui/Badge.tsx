'use client';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BadgeProps { children: ReactNode; color?: 'green' | 'yellow' | 'red' | 'blue' | 'gray' | 'purple'; }

export function Badge({ children, color = 'gray' }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
      color === 'green' && 'bg-green-900/50 text-green-400',
      color === 'yellow' && 'bg-yellow-900/50 text-yellow-400',
      color === 'red' && 'bg-red-900/50 text-red-400',
      color === 'blue' && 'bg-blue-900/50 text-blue-400',
      color === 'gray' && 'bg-gray-800 text-gray-400',
      color === 'purple' && 'bg-purple-900/50 text-purple-400',
    )}>
      {children}
    </span>
  );
}
