'use client';
import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { SEED_ZELLE_CUP, SEED_MXN_ZELLE, SEED_ZELLE_USD, SEED_ALIMENTOS, SEED_GASTOS } from '@/data/seed';
import { StatCard } from '@/components/dashboard/StatCard';
import { UpcomingPayments } from '@/components/dashboard/UpcomingPayments';
import { CurrencySummary } from '@/components/dashboard/CurrencySummary';
import { RecentOperations } from '@/components/dashboard/RecentOperations';
import { fmt, monthKey, today } from '@/lib/utils';
import { TrendingUp, ShoppingCart, DollarSign, Activity } from 'lucide-react';

export default function DashboardPage() {
  const { seeded, loadSeed, zelleCupOps, mxnZelleOps, zelleUsdOps, alimentoOps, gastosMx } = useStore();

  useEffect(() => {
    if (!seeded) {
      loadSeed({ zelleCupOps: SEED_ZELLE_CUP, mxnZelleOps: SEED_MXN_ZELLE, zelleUsdOps: SEED_ZELLE_USD, alimentoOps: SEED_ALIMENTOS, gastosMx: SEED_GASTOS });
    }
  }, [seeded, loadSeed]);

  const todayKey = today();
  const mk = monthKey(0);

  const todayCup = [
    ...zelleCupOps.filter(o => o.fecha === todayKey).map(o => o.gananciaCup),
    ...mxnZelleOps.filter(o => o.fecha === todayKey).map(o => o.gananciaCup),
    ...alimentoOps.filter(o => o.fecha === todayKey).map(o => o.ganancia),
    ...zelleUsdOps.filter(o => o.fecha === todayKey).map(o => o.gananciaCupEquivalente),
  ].reduce((a, b) => a + b, 0);

  const monthCup = [
    ...zelleCupOps.filter(o => o.fecha.startsWith(mk)).map(o => o.gananciaCup),
    ...mxnZelleOps.filter(o => o.fecha.startsWith(mk)).map(o => o.gananciaCup),
    ...alimentoOps.filter(o => o.fecha.startsWith(mk)).map(o => o.ganancia),
    ...zelleUsdOps.filter(o => o.fecha.startsWith(mk)).map(o => o.gananciaCupEquivalente),
  ].reduce((a, b) => a + b, 0);

  const monthExpenses = gastosMx.filter(g => g.fecha.startsWith(mk)).reduce((a, g) => a + g.montoMxn, 0);
  const totalOps = zelleCupOps.length + mxnZelleOps.length + zelleUsdOps.length + alimentoOps.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Resumen financiero</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Ganancia hoy" value={`${fmt(todayCup, 0)} CUP`} icon={<TrendingUp size={22} />} color="green" />
        <StatCard label="Ganancia mes" value={`${fmt(monthCup, 0)} CUP`} icon={<Activity size={22} />} color="blue" />
        <StatCard label="Gastos MX mes" value={`$${fmt(monthExpenses, 0)}`} sub="MXN" icon={<ShoppingCart size={22} />} color="red" />
        <StatCard label="Total operaciones" value={String(totalOps)} icon={<DollarSign size={22} />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CurrencySummary />
        <UpcomingPayments />
      </div>

      <RecentOperations />
    </div>
  );
}
