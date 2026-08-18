'use client';
import { useStore } from '@/lib/store';
import { fmt, fmtDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';

type OpType = 'zelleCup' | 'mxnZelle' | 'zelleUsd' | 'alimentos';

interface Props { type: OpType; }

export function OperacionesTable({ type }: Props) {
  const store = useStore();

  if (type === 'zelleCup') {
    const ops = store.zelleCupOps;
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-xs text-gray-500 border-b border-gray-800">
            <th className="pb-2 pr-3">Fecha</th><th className="pb-2 pr-3">Ƶ</th><th className="pb-2 pr-3">Compra</th>
            <th className="pb-2 pr-3">Venta</th><th className="pb-2 pr-3">Invertidos</th><th className="pb-2 pr-3">Recibidos</th>
            <th className="pb-2 pr-3">Ganancia</th><th className="pb-2">Notas</th><th className="pb-2"></th>
          </tr></thead>
          <tbody>{ops.map(o => (
            <tr key={o.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
              <td className="py-2 pr-3 text-gray-400">{fmtDate(o.fecha)}</td>
              <td className="py-2 pr-3">{o.cantidadZelle}</td>
              <td className="py-2 pr-3 text-gray-400">{o.tasaCompra}</td>
              <td className="py-2 pr-3 text-gray-400">{o.tasaVenta}</td>
              <td className="py-2 pr-3 text-gray-400">{fmt(o.cupInvertidos, 0)}</td>
              <td className="py-2 pr-3 text-gray-400">{fmt(o.cupRecibidos, 0)}</td>
              <td className="py-2 pr-3 text-green-400 font-medium">+{fmt(o.gananciaCup, 0)}</td>
              <td className="py-2 pr-3 text-gray-500 max-w-[120px] truncate">{o.notas}</td>
              <td className="py-2"><Button variant="ghost" size="sm" onClick={() => store.delZelleCupOp(o.id)}><Trash2 size={13} /></Button></td>
            </tr>
          ))}</tbody>
        </table>
        {ops.length === 0 && <p className="text-gray-600 text-sm py-4 text-center">Sin registros</p>}
      </div>
    );
  }

  if (type === 'mxnZelle') {
    const ops = store.mxnZelleOps;
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-xs text-gray-500 border-b border-gray-800">
            <th className="pb-2 pr-3">Fecha</th><th className="pb-2 pr-3">MXN</th><th className="pb-2 pr-3">Ƶ obtenidos</th>
            <th className="pb-2 pr-3">Ganancia CUP</th><th className="pb-2 pr-3">Margen</th><th className="pb-2">Notas</th><th className="pb-2"></th>
          </tr></thead>
          <tbody>{ops.map(o => (
            <tr key={o.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
              <td className="py-2 pr-3 text-gray-400">{fmtDate(o.fecha)}</td>
              <td className="py-2 pr-3">${fmt(o.mxnComprados, 0)}</td>
              <td className="py-2 pr-3">{fmt(o.zelleObtenidos, 2)} Ƶ</td>
              <td className="py-2 pr-3 text-green-400 font-medium">+{fmt(o.gananciaCup, 0)}</td>
              <td className="py-2 pr-3 text-gray-400">{fmt(o.gananciaPorcentual, 1)}%</td>
              <td className="py-2 pr-3 text-gray-500 max-w-[120px] truncate">{o.notas}</td>
              <td className="py-2"><Button variant="ghost" size="sm" onClick={() => store.delMxnZelleOp(o.id)}><Trash2 size={13} /></Button></td>
            </tr>
          ))}</tbody>
        </table>
        {ops.length === 0 && <p className="text-gray-600 text-sm py-4 text-center">Sin registros</p>}
      </div>
    );
  }

  if (type === 'zelleUsd') {
    const ops = store.zelleUsdOps;
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-xs text-gray-500 border-b border-gray-800">
            <th className="pb-2 pr-3">Fecha</th><th className="pb-2 pr-3">USD</th><th className="pb-2 pr-3">Ƶ Pagados</th>
            <th className="pb-2 pr-3">Ƶ Cobrados</th><th className="pb-2 pr-3">Gan. Ƶ</th><th className="pb-2 pr-3">Equiv CUP</th><th className="pb-2">Notas</th><th className="pb-2"></th>
          </tr></thead>
          <tbody>{ops.map(o => (
            <tr key={o.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
              <td className="py-2 pr-3 text-gray-400">{fmtDate(o.fecha)}</td>
              <td className="py-2 pr-3">${o.usdRecibidos}</td>
              <td className="py-2 pr-3 text-gray-400">{fmt(o.zellePagados, 2)}</td>
              <td className="py-2 pr-3 text-gray-400">{fmt(o.zelleCobrados, 2)}</td>
              <td className="py-2 pr-3 text-green-400 font-medium">+{fmt(o.gananciaZelle, 2)}</td>
              <td className="py-2 pr-3 text-green-400">{fmt(o.gananciaCupEquivalente, 0)}</td>
              <td className="py-2 pr-3 text-gray-500 max-w-[100px] truncate">{o.notas}</td>
              <td className="py-2"><Button variant="ghost" size="sm" onClick={() => store.delZelleUsdOp(o.id)}><Trash2 size={13} /></Button></td>
            </tr>
          ))}</tbody>
        </table>
        {ops.length === 0 && <p className="text-gray-600 text-sm py-4 text-center">Sin registros</p>}
      </div>
    );
  }

  const ops = store.alimentoOps;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-xs text-gray-500 border-b border-gray-800">
          <th className="pb-2 pr-3">Fecha</th><th className="pb-2 pr-3">Producto</th><th className="pb-2 pr-3">Comprado</th>
          <th className="pb-2 pr-3">Vendido</th><th className="pb-2 pr-3">Ganancia</th><th className="pb-2 pr-3">Margen</th><th className="pb-2 pr-3">Stock</th><th className="pb-2"></th>
        </tr></thead>
        <tbody>{ops.map(o => (
          <tr key={o.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
            <td className="py-2 pr-3 text-gray-400">{fmtDate(o.fecha)}</td>
            <td className="py-2 pr-3">{o.producto}</td>
            <td className="py-2 pr-3 text-gray-400">{o.cantidadComprada}</td>
            <td className="py-2 pr-3 text-gray-400">{o.cantidadVendida}</td>
            <td className="py-2 pr-3 text-green-400 font-medium">+{fmt(o.ganancia, 0)}</td>
            <td className="py-2 pr-3 text-gray-400">{fmt(o.margen, 1)}%</td>
            <td className="py-2 pr-3"><span className={o.stockRestante === 0 ? 'text-gray-600' : 'text-yellow-400'}>{o.stockRestante}</span></td>
            <td className="py-2"><Button variant="ghost" size="sm" onClick={() => store.delAlimentoOp(o.id)}><Trash2 size={13} /></Button></td>
          </tr>
        ))}</tbody>
      </table>
      {ops.length === 0 && <p className="text-gray-600 text-sm py-4 text-center">Sin registros</p>}
    </div>
  );
}
