'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { TasasConfig } from '@/components/operaciones/TasasConfig';
import { ZelleCupForm } from '@/components/operaciones/ZelleCupForm';
import { MxnZelleForm } from '@/components/operaciones/MxnZelleForm';
import { ZelleUsdForm } from '@/components/operaciones/ZelleUsdForm';
import { AlimentosForm } from '@/components/operaciones/AlimentosForm';
import { OperacionesTable } from '@/components/operaciones/OperacionesTable';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { exportExcel } from '@/lib/export';
import { Plus, Download } from 'lucide-react';
import { fmt } from '@/lib/utils';

type Tab = 'zelleCup' | 'mxnZelle' | 'zelleUsd' | 'alimentos';
type FormType = Tab | null;

const TABS: { key: Tab; label: string }[] = [
  { key: 'zelleCup', label: 'Ƶ/CUP' },
  { key: 'mxnZelle', label: 'MXN→Ƶ' },
  { key: 'zelleUsd', label: 'Ƶ/USD' },
  { key: 'alimentos', label: 'Alimentos' },
];

const FORM_TITLES: Record<Tab, string> = {
  zelleCup: 'Nueva operación Zelle/CUP',
  mxnZelle: 'Nueva operación MXN→Zelle',
  zelleUsd: 'Nueva operación Zelle/USD',
  alimentos: 'Nuevo registro de alimentos',
};

export default function OperacionesPage() {
  const [tab, setTab] = useState<Tab>('zelleCup');
  const [formOpen, setFormOpen] = useState<FormType>(null);
  const store = useStore();

  const totals: Record<Tab, { label: string; value: string }> = {
    zelleCup: { label: 'Ganancia total', value: `${fmt(store.zelleCupOps.reduce((a, o) => a + o.gananciaCup, 0), 0)} CUP` },
    mxnZelle: { label: 'Ganancia total', value: `${fmt(store.mxnZelleOps.reduce((a, o) => a + o.gananciaCup, 0), 0)} CUP` },
    zelleUsd: { label: 'Ganancia total Ƶ', value: `${fmt(store.zelleUsdOps.reduce((a, o) => a + o.gananciaZelle, 0), 2)} Ƶ` },
    alimentos: { label: 'Ganancia total', value: `${fmt(store.alimentoOps.reduce((a, o) => a + o.ganancia, 0), 0)} CUP` },
  };

  function doExport() {
    exportExcel({ zelleCupOps: store.zelleCupOps, mxnZelleOps: store.mxnZelleOps, zelleUsdOps: store.zelleUsdOps, alimentoOps: store.alimentoOps, gastosMx: store.gastosMx });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Operaciones</h1>
          <p className="text-sm text-gray-500 mt-1">Gestión de operaciones financieras</p>
        </div>
        <Button variant="secondary" size="sm" onClick={doExport}><Download size={14} className="mr-1.5" />Excel</Button>
      </div>

      <TasasConfig />

      <div className="flex gap-2 border-b border-gray-800 pb-0">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === t.key ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{TABS.find(t => t.key === tab)?.label}</CardTitle>
              <div className="text-xs text-gray-500 mt-0.5">{totals[tab].label}: <span className="text-green-400">{totals[tab].value}</span></div>
            </div>
            <Button size="sm" onClick={() => setFormOpen(tab)}><Plus size={14} className="mr-1" />Nuevo</Button>
          </div>
        </CardHeader>
        <OperacionesTable type={tab} />
      </Card>

      <Modal open={formOpen !== null} onClose={() => setFormOpen(null)} title={formOpen ? FORM_TITLES[formOpen] : ''} size="lg">
        {formOpen === 'zelleCup' && <ZelleCupForm onDone={() => setFormOpen(null)} />}
        {formOpen === 'mxnZelle' && <MxnZelleForm onDone={() => setFormOpen(null)} />}
        {formOpen === 'zelleUsd' && <ZelleUsdForm onDone={() => setFormOpen(null)} />}
        {formOpen === 'alimentos' && <AlimentosForm onDone={() => setFormOpen(null)} />}
      </Modal>
    </div>
  );
}
