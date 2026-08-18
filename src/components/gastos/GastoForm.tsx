'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { today, EXPENSE_LABELS, PAYMENT_LABELS } from '@/lib/utils';
import { Input, Select, Textarea, FormField } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ExpenseCategory, PaymentMethod } from '@/types';

interface Props { onDone: () => void; }

export function GastoForm({ onDone }: Props) {
  const addGastoMx = useStore(s => s.addGastoMx);
  const [form, setForm] = useState({
    fecha: today(), categoria: 'alimentos' as ExpenseCategory, descripcion: '',
    montoMxn: '', metodoPago: 'efectivo' as PaymentMethod, esFijo: false, notas: '',
  });

  function set(k: string, v: string | boolean) { setForm(f => ({ ...f, [k]: v })); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const monto = parseFloat(form.montoMxn);
    if (!monto || !form.descripcion) return;
    addGastoMx({ fecha: form.fecha, categoria: form.categoria, descripcion: form.descripcion, montoMxn: monto, metodoPago: form.metodoPago, esFijo: form.esFijo, notas: form.notas });
    onDone();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Fecha"><Input type="date" value={form.fecha} onChange={e => set('fecha', e.target.value)} /></FormField>
        <FormField label="Categoría">
          <Select value={form.categoria} onChange={e => set('categoria', e.target.value)}>
            {Object.entries(EXPENSE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </Select>
        </FormField>
        <FormField label="Descripción"><Input placeholder="Descripción del gasto" value={form.descripcion} onChange={e => set('descripcion', e.target.value)} /></FormField>
        <FormField label="Monto (MXN)"><Input type="number" step="any" placeholder="0.00" value={form.montoMxn} onChange={e => set('montoMxn', e.target.value)} /></FormField>
        <FormField label="Método de pago">
          <Select value={form.metodoPago} onChange={e => set('metodoPago', e.target.value)}>
            {Object.entries(PAYMENT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </Select>
        </FormField>
        <FormField label="Tipo">
          <Select value={form.esFijo ? 'fijo' : 'variable'} onChange={e => set('esFijo', e.target.value === 'fijo')}>
            <option value="variable">Variable</option>
            <option value="fijo">Fijo</option>
          </Select>
        </FormField>
      </div>
      <FormField label="Notas"><Textarea rows={2} value={form.notas} onChange={e => set('notas', e.target.value)} /></FormField>
      <div className="flex gap-2 pt-1">
        <Button type="submit">Registrar</Button>
        <Button type="button" variant="secondary" onClick={onDone}>Cancelar</Button>
      </div>
    </form>
  );
}
