'use client';
import { useStore } from '@/lib/store';
import { GananciasBarChart, GastosPieChart, CapitalLineChart } from '@/components/reportes/Charts';
import { exportExcel } from '@/lib/export';
import { Button } from '@/components/ui/Button';
import { fmt, monthKey } from '@/lib/utils';
import { Download } from 'lucide-react';

export default function ReportesPage() {
  const store = useStore();
  const mk = monthKey(0);

  const totalCup = [
    ...store.zelleCupOps.map(o => o.gananciaCup),
    ...store.mxnZelleOps.map(o => o.gananciaCup),
    ...store.alimentoOps.map(o => o.ganancia),
    ...store.zelleUsdOps.map(o => o.gananciaCupEquivalente),
  ].reduce((a, b) => a + b, 0);

  const monthCup = [
    ...store.zelleCupOps.filter(o => o.fecha.startsWith(mk)).map(o => o.gananciaCup),
    ...store.mxnZelleOps.filter(o => o.fecha.startsWith(mk)).map(o => o.gananciaCup),
    ...store.alimentoOps.filter(o => o.fecha.startsWith(mk)).map(o => o.ganancia),
    ...store.zelleUsdOps.filter(o => o.fecha.startsWith(mk)).map(o => o.gananciaCupEquivalente),
  ].reduce((a, b) => a + b, 0);

  const monthGastos = store.gastosMx.filter(g => g.fecha.startsWith(mk)).reduce((a, g) => a + g.montoMxn, 0);

  function doExport() {
    exportExcel({ zelleCupOps: store.zelleCupOps, mxnZelleOps: store.mxnZelleOps, zelleUsdOps: store.zelleUsdOps, alimentoOps: store.alimentoOps, gastosMx: store.gastosMx });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Reportes</h1>
          <p className="text-sm text-gray-500 mt-1">Análisis de rendimiento financiero</p>
        </div>
        <Button variant="secondary" size="sm" onClick={doExport}><Download size={14} className="mr-1.5" />Exportar Excel</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Ganancia total histórica</div>
          <div className="text-2xl font-bold text-green-400">{fmt(totalCup, 0)} CUP</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Ganancia este mes</div>
          <div className="text-2xl font-bold text-blue-400">{fmt(monthCup, 0)} CUP</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Gastos MX este mes</div>
          <div className="text-2xl font-bold text-red-400">${fmt(monthGastos, 0)} MXN</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GananciasBarChart />
        <GastosPieChart />
      </div>

      <CapitalLineChart />
    </div>
  );
}
