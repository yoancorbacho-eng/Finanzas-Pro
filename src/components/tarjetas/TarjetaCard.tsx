'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { fmt, daysUntil } from '@/lib/utils';
import { Tarjeta } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, FormField } from '@/components/ui/Input';
import { CreditCard } from 'lucide-react';

interface Props { tarjeta: Tarjeta; }

export function TarjetaCard({ tarjeta: t }: Props) {
  const updateTarjeta = useStore(s => s.updateTarjeta);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ saldoActual: String(t.saldoActual), pagoMinimo: String(t.pagoMinimo), pagoSinIntereses: String(t.pagoSinIntereses), notas: t.notas });

  const days = daysUntil(t.diaPago);
  const urgency = days <= 2 ? 'red' : days <= 5 ? 'yellow' : 'green';

  function save() {
    updateTarjeta(t.id, { saldoActual: parseFloat(form.saldoActual) || 0, pagoMinimo: parseFloat(form.pagoMinimo) || 0, pagoSinIntereses: parseFloat(form.pagoSinIntereses) || 0, notas: form.notas });
    setEditing(false);
  }

  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center"><CreditCard size={18} className="text-blue-400" /></div>
          <div>
            <div className="font-semibold text-gray-200">{t.nombre}</div>
            <div className="text-xs text-gray-500">Día de pago: {t.diaPago}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge color={urgency}>{days === 0 ? 'Hoy' : `${days}d`}</Badge>
          <Badge color={t.estado === 'pagado' ? 'green' : 'yellow'}>{t.estado === 'pagado' ? 'Pagado' : 'Pendiente'}</Badge>
        </div>
      </div>

      {!editing ? (
        <>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: 'Saldo', value: `$${fmt(t.saldoActual, 0)}` },
              { label: 'Pago mínimo', value: `$${fmt(t.pagoMinimo, 0)}` },
              { label: 'Sin intereses', value: `$${fmt(t.pagoSinIntereses, 0)}` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-800/50 rounded-lg p-2 text-center">
                <div className="text-xs text-gray-500">{label}</div>
                <div className="text-sm font-semibold text-gray-200">{value}</div>
              </div>
            ))}
          </div>
          {t.notas && <p className="text-xs text-gray-500 mb-3">{t.notas}</p>}
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => setEditing(true)}>Editar</Button>
            <Button size="sm" variant={t.estado === 'pagado' ? 'secondary' : 'primary'} onClick={() => updateTarjeta(t.id, { estado: t.estado === 'pagado' ? 'pendiente' : 'pagado' })}>
              {t.estado === 'pagado' ? 'Marcar pendiente' : 'Marcar pagado'}
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <FormField label="Saldo actual"><Input type="number" step="any" value={form.saldoActual} onChange={e => setForm(f => ({ ...f, saldoActual: e.target.value }))} /></FormField>
            <FormField label="Pago mínimo"><Input type="number" step="any" value={form.pagoMinimo} onChange={e => setForm(f => ({ ...f, pagoMinimo: e.target.value }))} /></FormField>
            <FormField label="Sin intereses"><Input type="number" step="any" value={form.pagoSinIntereses} onChange={e => setForm(f => ({ ...f, pagoSinIntereses: e.target.value }))} /></FormField>
          </div>
          <FormField label="Notas"><Input value={form.notas} onChange={e => setForm(f => ({ ...f, notas: e.target.value }))} /></FormField>
          <div className="flex gap-2">
            <Button size="sm" onClick={save}>Guardar</Button>
            <Button size="sm" variant="secondary" onClick={() => setEditing(false)}>Cancelar</Button>
          </div>
        </div>
      )}
    </Card>
  );
}
