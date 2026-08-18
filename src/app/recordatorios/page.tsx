'use client';
import { useStore } from '@/lib/store';
import { fmt, daysUntil } from '@/lib/utils';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Home, CreditCard, Zap, Droplets, Bell } from 'lucide-react';

const FIXED = [
  { label: 'Renta', description: 'Pago mensual', day: 20, amount: 3500, icon: Home, currency: 'MXN', recurring: 'Mensual' },
  { label: 'Electricidad', description: 'Factura bimestral', day: 15, amount: null, icon: Zap, currency: 'MXN', recurring: 'Bimestral' },
  { label: 'Bomba de agua', description: 'Factura bimestral', day: 15, amount: null, icon: Droplets, currency: 'MXN', recurring: 'Bimestral' },
];

export default function RecordatoriosPage() {
  const tarjetas = useStore(s => s.tarjetas);

  const allPayments = [
    ...FIXED.map(p => ({ ...p, type: 'fixed' as const, daysLeft: daysUntil(p.day) })),
    ...tarjetas.map(t => ({
      label: t.nombre, description: `Tarjeta de crédito — Día ${t.diaPago}`,
      day: t.diaPago, amount: t.pagoSinIntereses || t.saldoActual || null,
      icon: CreditCard, currency: 'MXN', recurring: 'Mensual',
      type: 'card' as const, daysLeft: daysUntil(t.diaPago), estado: t.estado,
    })),
  ].sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Recordatorios</h1>
        <p className="text-sm text-gray-500 mt-1">Pagos fijos y vencimientos de tarjetas</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Próximos vencimientos</CardTitle></CardHeader>
        <div className="space-y-3">
          {allPayments.map((p, i) => {
            const urgency = p.daysLeft === 0 ? 'red' : p.daysLeft <= 3 ? 'red' : p.daysLeft <= 7 ? 'yellow' : 'green';
            return (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-800/40 rounded-xl border border-gray-800">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${urgency === 'red' ? 'bg-red-900/40' : urgency === 'yellow' ? 'bg-yellow-900/40' : 'bg-green-900/40'}`}>
                  <p.icon size={18} className={urgency === 'red' ? 'text-red-400' : urgency === 'yellow' ? 'text-yellow-400' : 'text-green-400'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-200">{p.label}</div>
                  <div className="text-xs text-gray-500">{p.description} · {p.recurring}</div>
                </div>
                <div className="text-right shrink-0">
                  {p.amount != null && <div className="text-sm font-semibold text-gray-200">${fmt(p.amount, 0)} {p.currency}</div>}
                  <Badge color={urgency}>{p.daysLeft === 0 ? 'Hoy' : `En ${p.daysLeft} días`}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle><div className="flex items-center gap-2"><Bell size={14} />Notas</div></CardTitle></CardHeader>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>• Electricidad y bomba de agua son <strong className="text-gray-300">bimestrales</strong> — verifica si el mes actual corresponde.</li>
          <li>• Paga BanCoppel el día 16, NU el día 24, Mercado Pago el día 1.</li>
          <li>• Renta el día 20 — $3,500 MXN en efectivo.</li>
        </ul>
      </Card>
    </div>
  );
}
