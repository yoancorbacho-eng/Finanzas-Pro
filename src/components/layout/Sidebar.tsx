'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ArrowLeftRight, ShoppingCart, CreditCard, Bell, BarChart2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/operaciones', label: 'Operaciones', icon: ArrowLeftRight },
  { href: '/gastos', label: 'Gastos MX', icon: ShoppingCart },
  { href: '/tarjetas', label: 'Tarjetas', icon: CreditCard },
  { href: '/recordatorios', label: 'Recordatorios', icon: Bell },
  { href: '/reportes', label: 'Reportes', icon: BarChart2 },
];

interface SidebarProps { open: boolean; onClose: () => void; }

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={onClose} />}
      <aside className={cn(
        'fixed top-0 left-0 h-full w-60 bg-gray-900 border-r border-gray-800 z-40 flex flex-col transition-transform duration-200',
        'md:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full',
      )}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-800">
          <div>
            <div className="text-lg font-bold text-white">Finanzas Pro</div>
            <div className="text-xs text-gray-500">Panel de control</div>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-300"><X size={18} /></button>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                pathname === href
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800',
              )}
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-gray-800 text-xs text-gray-600">v1.0.0</div>
      </aside>
    </>
  );
}
