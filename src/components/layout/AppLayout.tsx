'use client';
import { ReactNode, useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function AppLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="md:pl-60">
        <header className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-gray-950/90 backdrop-blur border-b border-gray-800 md:hidden">
          <button onClick={() => setOpen(true)} className="text-gray-400 hover:text-gray-200"><Menu size={20} /></button>
          <span className="font-semibold text-gray-100">Finanzas Pro</span>
        </header>
        <main className="p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
