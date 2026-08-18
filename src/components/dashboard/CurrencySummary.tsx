'use client';
import { useStore } from '@/lib/store';
import { fmt } from '@/lib/utils';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';

export function CurrencySummary() {
  const { zelleCupOps, mxnZelleOps, zelleUsdOps, alimentoOps, gastosMx, tasas } = useStore();

  const totalCup = [...zelleCupOps.map(o => o.gananciaCup), ...mxnZelleOps.map(o => o.gananciaCup), ...alimentoOps.map(o => o.ganancia)].reduce((a, b) => a + b, 0);
  const totalMxnGasto = gastosMx.reduce((a, g) => a + g.montoMxn, 0);
  const totalZelle = zelleUsdOps.reduce((a, o) => a + o.gananciaZelle, 0);
  const totalUsd = zelleUsdOps.reduce((a, o) => a + o.usdRecibidos, 0);

  const items = [
    { label: 'CUP (Ganancia)', value: `${fmt(totalCup, 0)} CUP`, color: 'text-green-400' },
    { label: 'MXN (Gastos)', value: `$${fmt(totalMxnGasto, 0)} MXN`, color: 'text-red-400' },
    { label: 'Zelle (Ganancia)', value: `${fmt(totalZelle, 2)} Ƶ`, color: 'text-blue-400' },
    { label: 'USD (Procesados)', value: `$${fmt(totalUsd, 0)} USD`, color: 'text-yellow-400' },
  ];

  return (
    <Card>
      <CardHeader><CardTitle>Resumen por Moneda</CardTitle></CardHeader>
      <div className="grid grid-cols-2 gap-3">
        {items.map(({ label, value, color }) => (
          <div key={label} className="bg-gray-800/50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div className={`text-lg font-bold ${color}`}>{value}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-800 text-xs text-gray-600">
        Tasas: {tasas.zelleCompra}/{tasas.zelleVenta} CUP/Ƶ · {tasas.cupPorMxn} CUP/MXN
      </div>
    </Card>
  );
}
