'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { calcZelleCup } from '@/lib/calc';
import { today, fmt } from '@/lib/utils';
import { Input, Textarea, FormField } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Props { onDone: () => void; }

export function ZelleCupForm({ onDone }: Props) {
  const { tasas, addZelleCupOp } = useStore();
  const [form, setForm] = useState({
    fecha: today(), cantidadZelle: '', tasaCompra: String(tasas.zelleCompra),
    tasaVenta: String(tasas.zelleVenta), notas: '',
  });

  const zelle = parseFloat(form.cantidadZelle) || 0;
  const compra = parseFloat(form.tasaCompra) || 0;
  const venta = parseFloat(form.tasaVenta) || 0;
  const calc = calcZelleCup(zelle, compra, venta);

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!zelle || !compra || !venta) return;
    addZelleCupOp({ fecha: form.fecha, cantidadZelle: zelle, tasaCompra: compra, tasaVenta: venta, ...calc, notas: form.notas });
    onDone();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Fecha"><Input type="date" value={form.fecha} onChange={e => set('fecha', e.target.value)} /></FormField>
        <FormField label="Cantidad Zelle (Ƶ)"><Input type="number" step="any" placeholder="100" value={form.cantidadZelle} onChange={e => set('cantidadZelle', e.target.value)} /></FormField>
        <FormField label="Tasa Compra (CUP/Ƶ)"><Input type="number" step="any" value={form.tasaCompra} onChange={e => set('tasaCompra', e.target.value)} /></FormField>
        <FormField label="Tasa Venta (CUP/Ƶ)"><Input type="number" step="any" value={form.tasaVenta} onChange={e => set('tasaVenta', e.target.value)} /></FormField>
      </div>
      <FormField label="Notas"><Textarea rows={2} value={form.notas} onChange={e => set('notas', e.target.value)} /></FormField>
      {zelle > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-3 text-sm space-y-1">
          <div className="text-xs text-gray-500 mb-2">Cálculo automático</div>
          <div className="flex justify-between"><span className="text-gray-400">CUP Invertidos:</span><span>{fmt(calc.cupInvertidos, 0)} CUP</span></div>
          <div className="flex justify-between"><span className="text-gray-400">CUP Recibidos:</span><span>{fmt(calc.cupRecibidos, 0)} CUP</span></div>
          <div className="flex justify-between font-semibold"><span className="text-gray-400">Ganancia:</span><span className="text-green-400">+{fmt(calc.gananciaCup, 0)} CUP</span></div>
        </div>
      )}
      <div className="flex gap-2 pt-1">
        <Button type="submit">Registrar</Button>
        <Button type="button" variant="secondary" onClick={onDone}>Cancelar</Button>
      </div>
    </form>
  );
}
