'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { calcMxnZelle } from '@/lib/calc';
import { today, fmt } from '@/lib/utils';
import { Input, Textarea, FormField } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Props { onDone: () => void; }

export function MxnZelleForm({ onDone }: Props) {
  const { tasas, addMxnZelleOp } = useStore();
  const [form, setForm] = useState({
    fecha: today(), mxnComprados: '', tasaCupPorMxn: String(tasas.cupPorMxn),
    tasaMxnPorZelle: String(tasas.mxnPorZelle), tasaVentaZelleCup: String(tasas.zelleVenta), notas: '',
  });

  const mxn = parseFloat(form.mxnComprados) || 0;
  const cupMxn = parseFloat(form.tasaCupPorMxn) || 0;
  const mxnZelle = parseFloat(form.tasaMxnPorZelle) || 0;
  const ventaCup = parseFloat(form.tasaVentaZelleCup) || 0;
  const calc = calcMxnZelle(mxn, cupMxn, mxnZelle, ventaCup);

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!mxn) return;
    addMxnZelleOp({ fecha: form.fecha, mxnComprados: mxn, tasaCupPorMxn: cupMxn, tasaMxnPorZelle: mxnZelle, tasaVentaZelleCup: ventaCup, ...calc, notas: form.notas });
    onDone();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Fecha"><Input type="date" value={form.fecha} onChange={e => set('fecha', e.target.value)} /></FormField>
        <FormField label="MXN Comprados"><Input type="number" step="any" placeholder="1800" value={form.mxnComprados} onChange={e => set('mxnComprados', e.target.value)} /></FormField>
        <FormField label="CUP/MXN"><Input type="number" step="any" value={form.tasaCupPorMxn} onChange={e => set('tasaCupPorMxn', e.target.value)} /></FormField>
        <FormField label="MXN/Zelle"><Input type="number" step="any" value={form.tasaMxnPorZelle} onChange={e => set('tasaMxnPorZelle', e.target.value)} /></FormField>
        <FormField label="Venta CUP/Ƶ"><Input type="number" step="any" value={form.tasaVentaZelleCup} onChange={e => set('tasaVentaZelleCup', e.target.value)} /></FormField>
      </div>
      <FormField label="Notas"><Textarea rows={2} value={form.notas} onChange={e => set('notas', e.target.value)} /></FormField>
      {mxn > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-3 text-sm space-y-1">
          <div className="text-xs text-gray-500 mb-2">Cálculo automático</div>
          <div className="flex justify-between"><span className="text-gray-400">Zelle Obtenidos:</span><span>{fmt(calc.zelleObtenidos, 2)} Ƶ</span></div>
          <div className="flex justify-between"><span className="text-gray-400">CUP Invertidos:</span><span>{fmt(calc.cupInvertidos, 0)} CUP</span></div>
          <div className="flex justify-between"><span className="text-gray-400">CUP Recibidos:</span><span>{fmt(calc.cupRecibidos, 0)} CUP</span></div>
          <div className="flex justify-between font-semibold"><span className="text-gray-400">Ganancia:</span><span className="text-green-400">+{fmt(calc.gananciaCup, 0)} CUP ({fmt(calc.gananciaPorcentual, 1)}%)</span></div>
        </div>
      )}
      <div className="flex gap-2 pt-1">
        <Button type="submit">Registrar</Button>
        <Button type="button" variant="secondary" onClick={onDone}>Cancelar</Button>
      </div>
    </form>
  );
}
