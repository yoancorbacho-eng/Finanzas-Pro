'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input, FormField } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
export function TasasConfig() {
  const { tasas, updateTasas } = useStore();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ ...tasas });

  function save() { updateTasas(form); setEdit(false); }

  if (!edit) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tasas Actuales</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setEdit(true)}>Editar</Button>
          </div>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {[
            { label: 'Compra Ƶ', value: `${tasas.zelleCompra} CUP` },
            { label: 'Venta Ƶ', value: `${tasas.zelleVenta} CUP` },
            { label: 'CUP/MXN', value: `${tasas.cupPorMxn}` },
            { label: 'MXN/Ƶ', value: `${tasas.mxnPorZelle}` },
            { label: 'Proveedor Ƶ/USD', value: `${tasas.tasaProveedor}` },
            { label: 'Cliente Ƶ/USD', value: `${tasas.tasaCliente}` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-800/50 rounded-lg p-2">
              <div className="text-xs text-gray-500">{label}</div>
              <div className="text-gray-200 font-medium">{value}</div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader><CardTitle>Editar Tasas</CardTitle></CardHeader>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {([
          ['zelleCompra', 'Compra Ƶ (CUP)'],
          ['zelleVenta', 'Venta Ƶ (CUP)'],
          ['cupPorMxn', 'CUP/MXN'],
          ['mxnPorZelle', 'MXN/Ƶ'],
          ['tasaProveedor', 'Proveedor Ƶ/USD'],
          ['tasaCliente', 'Cliente Ƶ/USD'],
        ] as [keyof typeof form, string][]).map(([key, label]) => (
          <FormField key={key} label={label}>
            <Input type="number" step="any" value={form[key] as number}
              onChange={e => setForm(f => ({ ...f, [key]: parseFloat(e.target.value) || 0 }))} />
          </FormField>
        ))}
      </div>
      <div className="flex gap-2">
        <Button onClick={save}>Guardar</Button>
        <Button variant="secondary" onClick={() => setEdit(false)}>Cancelar</Button>
      </div>
    </Card>
  );
}
