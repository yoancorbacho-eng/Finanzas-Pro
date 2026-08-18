import * as XLSX from 'xlsx';
import { ZelleCupOp, MxnZelleOp, ZelleUsdOp, AlimentoOp, GastoMx } from '@/types';
import { fmtDate } from './utils';

export function exportExcel(data: { zelleCupOps: ZelleCupOp[]; mxnZelleOps: MxnZelleOp[]; zelleUsdOps: ZelleUsdOp[]; alimentoOps: AlimentoOp[]; gastosMx: GastoMx[] }) {
  const wb = XLSX.utils.book_new();
  if (data.zelleCupOps.length) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.zelleCupOps.map(o => ({ Fecha: fmtDate(o.fecha), Zelle: o.cantidadZelle, Compra: o.tasaCompra, Venta: o.tasaVenta, 'CUP Invertidos': o.cupInvertidos, 'CUP Recibidos': o.cupRecibidos, 'Ganancia CUP': o.gananciaCup, Notas: o.notas }))), 'Zelle-CUP');
  if (data.mxnZelleOps.length) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.mxnZelleOps.map(o => ({ Fecha: fmtDate(o.fecha), MXN: o.mxnComprados, 'Zelle Obtenidos': o.zelleObtenidos, 'Ganancia CUP': o.gananciaCup, 'Margen %': o.gananciaPorcentual.toFixed(2), Notas: o.notas }))), 'MXN-Zelle');
  if (data.zelleUsdOps.length) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.zelleUsdOps.map(o => ({ Fecha: fmtDate(o.fecha), USD: o.usdRecibidos, 'Zelle Ganancia': o.gananciaZelle, 'CUP Equiv': o.gananciaCupEquivalente, Notas: o.notas }))), 'Zelle-USD');
  if (data.alimentoOps.length) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.alimentoOps.map(o => ({ Fecha: fmtDate(o.fecha), Producto: o.producto, Ganancia: o.ganancia, 'Margen %': o.margen.toFixed(1), Stock: o.stockRestante, Notas: o.notas }))), 'Alimentos');
  if (data.gastosMx.length) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data.gastosMx.map(g => ({ Fecha: fmtDate(g.fecha), Categoría: g.categoria, Descripción: g.descripcion, 'Monto MXN': g.montoMxn, Pago: g.metodoPago, Fijo: g.esFijo ? 'Sí' : 'No' }))), 'Gastos MX');
  XLSX.writeFile(wb, `finanzas-pro-${today()}.xlsx`);
}

function today() { return new Date().toISOString().slice(0, 10); }

export function exportCSV(rows: Record<string, string|number>[], filename: string) {
  if (!rows.length) return;
  const h = Object.keys(rows[0]);
  const csv = [h.join(','), ...rows.map(r => h.map(k => JSON.stringify(String(r[k] ?? ''))).join(','))].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = filename; a.click();
}
