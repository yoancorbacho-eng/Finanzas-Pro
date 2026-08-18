'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { GastoForm } from '@/components/gastos/GastoForm';
import { GastosTable } from '@/components/gastos/GastosTable';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { fmt, monthKey } from '@/lib/utils';
import { Plus } from 'lucide-react';

export default function GastosPage() {
  const [open, setOpen] = useState(false);
  const gastosMx = useStore(s => s.gastosMx);
  const mk = monthKey(0);
  const totalMes = gastosMx.filter(g => g.fecha.startsWith(mk)).reduce((a, g) => a + g.montoMxn, 0);
  const totalFijos = gastosMx.filter(g => g.esFijo).reduce((a, g) => a + g.montoMxn, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Gastos MX</h1>
          <p className="text-sm text-gray-500 mt-1">Gastos personales en México</p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus size={14} className="mr-1" />Nuevo gasto</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Total este mes</div>
          <div className="text-2xl font-bold text-red-400">${fmt(totalMes, 0)} MXN</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Gastos fijos (histórico)</div>
          <div className="text-2xl font-bold text-yellow-400">${fmt(totalFijos, 0)} MXN</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Total registros</div>
          <div className="text-2xl font-bold text-gray-200">{gastosMx.length}</div>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Historial de Gastos</CardTitle></CardHeader>
        <GastosTable />
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Registrar Gasto" size="lg">
        <GastoForm onDone={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
