'use client';
import { useStore } from '@/lib/store';
import { TarjetaCard } from '@/components/tarjetas/TarjetaCard';
import { fmt } from '@/lib/utils';

export default function TarjetasPage() {
  const tarjetas = useStore(s => s.tarjetas);
  const totalSaldo = tarjetas.reduce((a, t) => a + t.saldoActual, 0);
  const pendientes = tarjetas.filter(t => t.estado === 'pendiente' && t.saldoActual > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Tarjetas de Crédito</h1>
        <p className="text-sm text-gray-500 mt-1">BanCoppel · NU · Mercado Pago</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Deuda total</div>
          <div className="text-2xl font-bold text-red-400">${fmt(totalSaldo, 0)} MXN</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Tarjetas pendientes</div>
          <div className="text-2xl font-bold text-yellow-400">{pendientes.length} / {tarjetas.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tarjetas.map(t => <TarjetaCard key={t.id} tarjeta={t} />)}
      </div>
    </div>
  );
}
