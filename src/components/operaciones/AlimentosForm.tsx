'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { calcAlimento } from '@/lib/calc';
import { today, fmt, FOOD_LABELS } from '@/lib/utils';
import { Input, Select, Textarea, FormField } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FoodCategory } from '@/types';

interface Props { onDone: () => void; }

export function AlimentosForm({ onDone }: Props) {
  const addAlimentoOp = useStore(s => s.addAlimentoOp);
  const [form, setForm] = useState({
    fecha: today(), producto: '', categoria: 'arroz' as FoodCategory,
    cantidadComprada: '', costoTotalCup: '', cantidadVendida: '', precioVentaUnitario: '', notas: '',
  });

  const cComp = parseFloat(form.cantidadComprada) || 0;
  const costo = parseFloat(form.costoTotalCup) || 0;
  const cVend = parseFloat(form.cantidadVendida) || 0;
  const pventa = parseFloat(form.precioVentaUnitario) || 0;
  const calc = calcAlimento(cComp, costo, cVend, pventa);

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.producto || !cComp || !costo) return;
    addAlimentoOp({ fecha: form.fecha, producto: form.producto, categoria: form.categoria, cantidadComprada: cComp, costoTotalCup: costo, cantidadVendida: cVend, precioVentaUnitario: pventa, ...calc, notas: form.notas });
    onDone();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Fecha"><Input type="date" value={form.fecha} onChange={e => set('fecha', e.target.value)} /></FormField>
        <FormField label="Categoría">
          <Select value={form.categoria} onChange={e => set('categoria', e.target.value)}>
            {Object.entries(FOOD_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </Select>
        </FormField>
        <FormField label="Producto"><Input placeholder="Ej: Arroz" value={form.producto} onChange={e => set('producto', e.target.value)} /></FormField>
        <FormField label="Cant. Comprada"><Input type="number" step="any" value={form.cantidadComprada} onChange={e => set('cantidadComprada', e.target.value)} /></FormField>
        <FormField label="Costo Total (CUP)"><Input type="number" step="any" value={form.costoTotalCup} onChange={e => set('costoTotalCup', e.target.value)} /></FormField>
        <FormField label="Cant. Vendida"><Input type="number" step="any" value={form.cantidadVendida} onChange={e => set('cantidadVendida', e.target.value)} /></FormField>
        <FormField label="Precio Venta Unitario (CUP)"><Input type="number" step="any" value={form.precioVentaUnitario} onChange={e => set('precioVentaUnitario', e.target.value)} /></FormField>
      </div>
      <FormField label="Notas"><Textarea rows={2} value={form.notas} onChange={e => set('notas', e.target.value)} /></FormField>
      {cComp > 0 && costo > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-3 text-sm space-y-1">
          <div className="text-xs text-gray-500 mb-2">Cálculo automático</div>
          <div className="flex justify-between"><span className="text-gray-400">Costo unitario:</span><span>{fmt(calc.costoUnitario, 0)} CUP</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Ingreso total:</span><span>{fmt(calc.ingresoTotal, 0)} CUP</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Stock restante:</span><span>{calc.stockRestante}</span></div>
          <div className="flex justify-between font-semibold"><span className="text-gray-400">Ganancia:</span><span className="text-green-400">+{fmt(calc.ganancia, 0)} CUP ({fmt(calc.margen, 1)}%)</span></div>
        </div>
      )}
      <div className="flex gap-2 pt-1">
        <Button type="submit">Registrar</Button>
        <Button type="button" variant="secondary" onClick={onDone}>Cancelar</Button>
      </div>
    </form>
  );
}
