'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { calcZelleUsd } from '@/lib/calc';
import { today, fmt } from '@/lib/utils';
import { Input, Textarea, FormField } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Props { onDone: () => void; }

export function ZelleUsdForm({ onDone }: Props) {
  const { tasas, addZelleUsdOp } = useStore();
  const [form, setForm] = useState({
    fecha: today(), usdRecibidos: '', tasaProveedor: String(tasas.tasaProveedor),
    tasaCliente: String(tasas.tasaCliente), tasaZelleCup: String(tasas.zelleVenta), notas: '',
  });

  const usd = parseFloat(form.usdRecibidos) || 0;
  const prov = parseFloat(form.tasaProveedor) || 0;
  const cli = parseFloat(form.tasaCliente) || 0;
  const zelleCup = parseFloat(form.tasaZelleCup) || 0;
  const calc = calcZelleUsd(usd, prov, cli, zelleCup);

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!usd) return;
    addZelleUsdOp({ fecha: form.fecha, usdRecibidos: usd, tasaProveedor: prov, tasaCliente: cli, tasaZelleCup: zelleCup, ...calc, notas: form.notas });
    onDone();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Fecha"><Input type="date" value={form.fecha} onChange={e => set('fecha', e.target.value)} /></FormField>
        <FormField label="USD Recibidos"><Input type="number" step="any" placeholder="100" value={form.usdRecibidos} onChange={e => set('usdRecibidos', e.target.value)} /></FormField>
        <FormField label="Tasa Proveedor (Ƶ/USD)"><Input type="number" step="0.01" value={form.tasaProveedor} onChange={e => set('tasaProveedor', e.target.value)} /></FormField>
        <FormField label="Tasa Cliente (Ƶ/USD)"><Input type="number" step="0.01" value={form.tasaCliente} onChange={e => set('tasaCliente', e.target.value)} /></FormField>
        <FormField label="Tasa Ƶ/CUP"><Input type="number" step="any" value={form.tasaZelleCup} onChange={e => set('tasaZelleCup', e.target.value)} /></FormField>
      </div>
      <FormField label="Notas"><Textarea rows={2} value={form.notas} onChange={e => set('notas', e.target.value)} /></FormField>
      {usd > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-3 text-sm space-y-1">
          <div className="text-xs text-gray-500 mb-2">Cálculo automático</div>
          <div className="flex justify-between"><span className="text-gray-400">Zelle Pagados:</span><span>{fmt(calc.zellePagados, 2)} Ƶ</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Zelle Cobrados:</span><span>{fmt(calc.zelleCobrados, 2)} Ƶ</span></div>
          <div className="flex justify-between font-semibold"><span className="text-gray-400">Ganancia Ƶ:</span><span className="text-green-400">+{fmt(calc.gananciaZelle, 2)} Ƶ</span></div>
          <div className="flex justify-between font-semibold"><span className="text-gray-400">Equiv CUP:</span><span className="text-green-400">+{fmt(calc.gananciaCupEquivalente, 0)} CUP</span></div>
        </div>
      )}
      <div className="flex gap-2 pt-1">
        <Button type="submit">Registrar</Button>
        <Button type="button" variant="secondary" onClick={onDone}>Cancelar</Button>
      </div>
    </form>
  );
}
