'use client';
import { useStore } from '@/lib/store';
import { fmt, fmtDate } from '@/lib/utils';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function RecentOperations() {
  const { zelleCupOps, mxnZelleOps, zelleUsdOps, alimentoOps } = useStore();

  const all = [
    ...zelleCupOps.map(o => ({ fecha: o.fecha, type: 'Zelle/CUP', detail: `${o.cantidadZelle} Ƶ`, ganancia: o.gananciaCup, unit: 'CUP', color: 'green' as const })),
    ...mxnZelleOps.map(o => ({ fecha: o.fecha, type: 'MXN→Ƶ', detail: `${o.mxnComprados} MXN`, ganancia: o.gananciaCup, unit: 'CUP', color: 'blue' as const })),
    ...zelleUsdOps.map(o => ({ fecha: o.fecha, type: 'Ƶ/USD', detail: `${o.usdRecibidos} USD`, ganancia: o.gananciaZelle, unit: 'Ƶ', color: 'yellow' as const })),
    ...alimentoOps.map(o => ({ fecha: o.fecha, type: 'Alimentos', detail: o.producto, ganancia: o.ganancia, unit: 'CUP', color: 'purple' as const })),
  ].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 8);

  return (
    <Card>
      <CardHeader><CardTitle>Operaciones Recientes</CardTitle></CardHeader>
      {all.length === 0 ? (
        <p className="text-sm text-gray-600 py-2">Sin operaciones aún</p>
      ) : (
        <div className="space-y-1">
          {all.map((op, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
              <div className="flex items-center gap-3">
                <Badge color={op.color}>{op.type}</Badge>
                <div>
                  <div className="text-sm text-gray-300">{op.detail}</div>
                  <div className="text-xs text-gray-600">{fmtDate(op.fecha)}</div>
                </div>
              </div>
              <div className="text-sm font-medium text-green-400">+{fmt(op.ganancia, 0)} {op.unit}</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
