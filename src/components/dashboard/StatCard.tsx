'use client';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon?: ReactNode;
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'default';
}

export function StatCard({ label, value, sub, icon, color = 'default' }: StatCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</div>
          <div className={cn('text-2xl font-bold',
            color === 'green' && 'text-green-400',
            color === 'blue' && 'text-blue-400',
            color === 'yellow' && 'text-yellow-400',
            color === 'red' && 'text-red-400',
            color === 'default' && 'text-gray-100',
          )}>{value}</div>
          {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
        </div>
        {icon && <div className="text-gray-700 mt-1">{icon}</div>}
      </div>
    </div>
  );
}
