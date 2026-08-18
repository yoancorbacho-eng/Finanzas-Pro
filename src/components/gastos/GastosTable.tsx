'use client';
import { useStore } from '@/lib/store';
import { fmt, fmtDate, EXPENSE_LABELS, PAYMENT_LABELS } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Trash2 } from 'lucide-react';

export function GastosTable() {
  const { gastosMx, delGastoMx } = useStore();
  const sorted = [...gastosMx].sort((a, b) => b.fecha.localeCompare(a.fecha));

  if (sorted.length === 0) return <p className="text-gray-600 text-sm py-4 text-center">Sin gastos registrados</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-xs text-gray-500 border-b border-gray-800">
          <th className="pb-2 pr-3">Fecha</th><th className="pb-2 pr-3">Categoría</th><th className="pb-2 pr-3">Descripción</th>
          <th className="pb-2 pr-3">Monto</th><th className="pb-2 pr-3">Pago</th><th className="pb-2 pr-3">Tipo</th><th className="pb-2"></th>
        </tr></thead>
        <tbody>{sorted.map(g => (
          <tr key={g.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
            <td className="py-2 pr-3 text-gray-400">{fmtDate(g.fecha)}</td>
            <td className="py-2 pr-3"><Badge color="blue">{EXPENSE_LABELS[g.categoria] ?? g.categoria}</Badge></td>
            <td className="py-2 pr-3 text-gray-200">{g.descripcion}</td>
            <td className="py-2 pr-3 text-red-400 font-medium">-${fmt(g.montoMxn, 0)}</td>
            <td className="py-2 pr-3 text-gray-400">{PAYMENT_LABELS[g.metodoPago] ?? g.metodoPago}</td>
            <td className="py-2 pr-3"><Badge color={g.esFijo ? 'yellow' : 'gray'}>{g.esFijo ? 'Fijo' : 'Variable'}</Badge></td>
            <td className="py-2"><Button variant="ghost" size="sm" onClick={() => delGastoMx(g.id)}><Trash2 size={13} /></Button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
