'use client';
import { useStore } from '@/lib/store';
import { daysUntil, fmt } from '@/lib/utils';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CreditCard, Home, Zap, Droplets } from 'lucide-react';

const FIXED_PAYMENTS = [
  { label: 'Renta', day: 20, amount: 3500, icon: Home, currency: 'MXN' },
  { label: 'Electricidad', day: 15, amount: null, icon: Zap, currency: 'MXN', bimonthly: true },
  { label: 'Bomba de agua', day: 15, amount: null, icon: Droplets, currency: 'MXN', bimonthly: true },
];

export function UpcomingPayments() {
  const tarjetas = useStore(s => s.tarjetas);

  const cards = tarjetas.map(t => ({
    label: t.nombre,
    day: t.diaPago,
    amount: t.pagoSinIntereses || null,
    icon: CreditCard,
    currency: 'MXN',
    estado: t.estado,
    saldo: t.saldoActual,
  }));

  const all = [
    ...FIXED_PAYMENTS.map(p => ({ ...p, daysLeft: daysUntil(p.day), type: 'fixed' as const })),
    ...cards.map(c => ({ ...c, daysLeft: daysUntil(c.day), type: 'card' as const })),
  ].sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <Card>
      <CardHeader><CardTitle>Próximos Pagos</CardTitle></CardHeader>
      <div className="space-y-2">
        {all.map((p, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <p.icon size={15} className="text-gray-400" />
              </div>
              <div>
                <div className="text-sm text-gray-200">{p.label}</div>
                <div className="text-xs text-gray-500">Día {p.day}{'bimonthly' in p && p.bimonthly ? ' (bimestral)' : ''}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {p.amount != null && <span className="text-sm text-gray-300">${fmt(p.amount, 0)}</span>}
              <Badge color={p.daysLeft <= 3 ? 'red' : p.daysLeft <= 7 ? 'yellow' : 'gray'}>
                {p.daysLeft === 0 ? 'Hoy' : `${p.daysLeft}d`}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
