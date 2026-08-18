'use client';
import { useStore } from '@/lib/store';
import { fmt, EXPENSE_LABELS, MONTH_NAMES, monthKey } from '@/lib/utils';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid } from 'recharts';

const COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316','#84cc16','#ec4899','#6366f1','#14b8a6','#a3e635'];

export function GananciasBarChart() {
  const { zelleCupOps, mxnZelleOps, zelleUsdOps, alimentoOps } = useStore();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const k = d.toISOString().slice(0, 10);
    const label = `${d.getDate()}/${d.getMonth() + 1}`;
    const cup = [...zelleCupOps, ...mxnZelleOps, ...alimentoOps].filter(o => o.fecha === k).reduce((a, o) => a + (o as { gananciaCup: number }).gananciaCup, 0) +
      zelleUsdOps.filter(o => o.fecha === k).reduce((a, o) => a + o.gananciaCupEquivalente, 0);
    return { label, cup };
  });

  return (
    <Card>
      <CardHeader><CardTitle>Ganancias 7 días (CUP)</CardTitle></CardHeader>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={days}>
          <XAxis dataKey="label" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: 8 }}
            formatter={(v) => [`${fmt(Number(v), 0)} CUP`, 'Ganancia']} labelStyle={{ color: '#9ca3af' }} />
          <Bar dataKey="cup" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function GastosPieChart() {
  const gastosMx = useStore(s => s.gastosMx);
  const mk = monthKey(0);
  const thisMonth = gastosMx.filter(g => g.fecha.startsWith(mk));
  const byCategory: Record<string, number> = {};
  thisMonth.forEach(g => { byCategory[g.categoria] = (byCategory[g.categoria] || 0) + g.montoMxn; });
  const data = Object.entries(byCategory).map(([k, v]) => ({ name: EXPENSE_LABELS[k] ?? k, value: v })).sort((a, b) => b.value - a.value);

  return (
    <Card>
      <CardHeader><CardTitle>Gastos por Categoría (mes actual)</CardTitle></CardHeader>
      {data.length === 0 ? <p className="text-gray-600 text-sm py-8 text-center">Sin gastos este mes</p> : (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={2}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: 8 }}
              formatter={(v) => [`$${fmt(Number(v), 0)} MXN`, '']} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#9ca3af' }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

export function CapitalLineChart() {
  const { zelleCupOps, mxnZelleOps, zelleUsdOps, alimentoOps } = useStore();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(); d.setMonth(d.getMonth() - (5 - i));
    const mk = d.toISOString().slice(0, 7);
    const label = MONTH_NAMES[d.getMonth()];
    const cup = [...zelleCupOps.filter(o => o.fecha.startsWith(mk)).map(o => o.gananciaCup),
      ...mxnZelleOps.filter(o => o.fecha.startsWith(mk)).map(o => o.gananciaCup),
      ...alimentoOps.filter(o => o.fecha.startsWith(mk)).map(o => o.ganancia),
      ...zelleUsdOps.filter(o => o.fecha.startsWith(mk)).map(o => o.gananciaCupEquivalente),
    ].reduce((a, b) => a + b, 0);
    return { label, cup };
  });

  return (
    <Card>
      <CardHeader><CardTitle>Tendencia 6 meses (CUP)</CardTitle></CardHeader>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={months}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="label" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: 8 }}
            formatter={(v) => [`${fmt(Number(v), 0)} CUP`, 'Ganancia']} labelStyle={{ color: '#9ca3af' }} />
          <Line type="monotone" dataKey="cup" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
