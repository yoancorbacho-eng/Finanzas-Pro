import { v4 as uuid } from 'uuid';
import { ZelleCupOp, MxnZelleOp, ZelleUsdOp, AlimentoOp, GastoMx } from '@/types';

function ago(n: number) { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); }
const now = () => new Date().toISOString();

export const SEED_ZELLE_CUP: ZelleCupOp[] = [
  { id: uuid(), fecha: ago(0), cantidadZelle: 50, tasaCompra: 620, tasaVenta: 660, cupInvertidos: 31000, cupRecibidos: 33000, gananciaCup: 2000, notas: 'Cliente habitual', createdAt: now() },
  { id: uuid(), fecha: ago(1), cantidadZelle: 30, tasaCompra: 618, tasaVenta: 658, cupInvertidos: 18540, cupRecibidos: 19740, gananciaCup: 1200, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(2), cantidadZelle: 80, tasaCompra: 620, tasaVenta: 660, cupInvertidos: 49600, cupRecibidos: 52800, gananciaCup: 3200, notas: 'Operación grande', createdAt: now() },
  { id: uuid(), fecha: ago(4), cantidadZelle: 25, tasaCompra: 615, tasaVenta: 655, cupInvertidos: 15375, cupRecibidos: 16375, gananciaCup: 1000, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(6), cantidadZelle: 100, tasaCompra: 620, tasaVenta: 660, cupInvertidos: 62000, cupRecibidos: 66000, gananciaCup: 4000, notas: 'Lote grande', createdAt: now() },
  { id: uuid(), fecha: ago(9), cantidadZelle: 45, tasaCompra: 622, tasaVenta: 662, cupInvertidos: 27990, cupRecibidos: 29790, gananciaCup: 1800, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(12), cantidadZelle: 60, tasaCompra: 620, tasaVenta: 660, cupInvertidos: 37200, cupRecibidos: 39600, gananciaCup: 2400, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(15), cantidadZelle: 35, tasaCompra: 625, tasaVenta: 665, cupInvertidos: 21875, cupRecibidos: 23275, gananciaCup: 1400, notas: '', createdAt: now() },
];

export const SEED_MXN_ZELLE: MxnZelleOp[] = [
  { id: uuid(), fecha: ago(1), mxnComprados: 1800, tasaCupPorMxn: 32, tasaMxnPorZelle: 18, tasaVentaZelleCup: 660, cupInvertidos: 57600, zelleObtenidos: 100, cupRecibidos: 66000, gananciaCup: 8400, gananciaPorcentual: 14.58, notas: '100 Zelle vendidos', createdAt: now() },
  { id: uuid(), fecha: ago(3), mxnComprados: 900, tasaCupPorMxn: 32, tasaMxnPorZelle: 18, tasaVentaZelleCup: 658, cupInvertidos: 28800, zelleObtenidos: 50, cupRecibidos: 32900, gananciaCup: 4100, gananciaPorcentual: 14.24, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(8), mxnComprados: 2700, tasaCupPorMxn: 31, tasaMxnPorZelle: 18, tasaVentaZelleCup: 660, cupInvertidos: 83700, zelleObtenidos: 150, cupRecibidos: 99000, gananciaCup: 15300, gananciaPorcentual: 18.28, notas: 'Mejor tasa MXN', createdAt: now() },
  { id: uuid(), fecha: ago(14), mxnComprados: 1260, tasaCupPorMxn: 32, tasaMxnPorZelle: 18, tasaVentaZelleCup: 660, cupInvertidos: 40320, zelleObtenidos: 70, cupRecibidos: 46200, gananciaCup: 5880, gananciaPorcentual: 14.58, notas: '', createdAt: now() },
];

export const SEED_ZELLE_USD: ZelleUsdOp[] = [
  { id: uuid(), fecha: ago(0), usdRecibidos: 100, zellePagados: 105, tasaProveedor: 1.05, zelleCobrados: 115, tasaCliente: 1.15, gananciaZelle: 10, gananciaCupEquivalente: 6600, tasaZelleCup: 660, notas: 'Proveedor Andrés', createdAt: now() },
  { id: uuid(), fecha: ago(2), usdRecibidos: 50, zellePagados: 52.5, tasaProveedor: 1.05, zelleCobrados: 57.5, tasaCliente: 1.15, gananciaZelle: 5, gananciaCupEquivalente: 3300, tasaZelleCup: 660, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(5), usdRecibidos: 200, zellePagados: 210, tasaProveedor: 1.05, zelleCobrados: 230, tasaCliente: 1.15, gananciaZelle: 20, gananciaCupEquivalente: 13200, tasaZelleCup: 660, notas: 'Operación grande', createdAt: now() },
  { id: uuid(), fecha: ago(10), usdRecibidos: 75, zellePagados: 78.75, tasaProveedor: 1.05, zelleCobrados: 86.25, tasaCliente: 1.15, gananciaZelle: 7.5, gananciaCupEquivalente: 4950, tasaZelleCup: 660, notas: '', createdAt: now() },
];

export const SEED_ALIMENTOS: AlimentoOp[] = [
  { id: uuid(), fecha: ago(1), producto: 'Arroz', categoria: 'arroz', cantidadComprada: 100, costoTotalCup: 8000, costoUnitario: 80, cantidadVendida: 80, precioVentaUnitario: 120, ingresoTotal: 9600, ganancia: 3200, margen: 33.3, stockRestante: 20, notas: '100 lb', createdAt: now() },
  { id: uuid(), fecha: ago(2), producto: 'Aceite', categoria: 'aceite', cantidadComprada: 24, costoTotalCup: 9600, costoUnitario: 400, cantidadVendida: 20, precioVentaUnitario: 580, ingresoTotal: 11600, ganancia: 3600, margen: 31.0, stockRestante: 4, notas: '24 L', createdAt: now() },
  { id: uuid(), fecha: ago(3), producto: 'Huevo', categoria: 'huevo', cantidadComprada: 30, costoTotalCup: 6000, costoUnitario: 200, cantidadVendida: 30, precioVentaUnitario: 280, ingresoTotal: 8400, ganancia: 2400, margen: 28.6, stockRestante: 0, notas: '30 cartones', createdAt: now() },
  { id: uuid(), fecha: ago(4), producto: 'Pollo', categoria: 'pollo', cantidadComprada: 20, costoTotalCup: 16000, costoUnitario: 800, cantidadVendida: 18, precioVentaUnitario: 1100, ingresoTotal: 19800, ganancia: 4400, margen: 22.2, stockRestante: 2, notas: 'kg', createdAt: now() },
  { id: uuid(), fecha: ago(5), producto: 'Leche', categoria: 'leche', cantidadComprada: 50, costoTotalCup: 7500, costoUnitario: 150, cantidadVendida: 45, precioVentaUnitario: 220, ingresoTotal: 9900, ganancia: 2850, margen: 28.8, stockRestante: 5, notas: 'litros', createdAt: now() },
  { id: uuid(), fecha: ago(7), producto: 'Carne', categoria: 'carne', cantidadComprada: 15, costoTotalCup: 18000, costoUnitario: 1200, cantidadVendida: 15, precioVentaUnitario: 1600, ingresoTotal: 24000, ganancia: 6000, margen: 25.0, stockRestante: 0, notas: 'kg res', createdAt: now() },
];

export const SEED_GASTOS: GastoMx[] = [
  { id: uuid(), fecha: ago(0), categoria: 'alimentos', descripcion: 'Restaurante tacos', montoMxn: 280, metodoPago: 'debito', esFijo: false, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(1), categoria: 'transporte', descripcion: 'Uber', montoMxn: 95, metodoPago: 'mercado_pago', esFijo: false, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(2), categoria: 'despensa', descripcion: 'Walmart semanal', montoMxn: 850, metodoPago: 'debito', esFijo: false, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(3), categoria: 'gato', descripcion: 'Whiskas y arena', montoMxn: 180, metodoPago: 'efectivo', esFijo: false, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(5), categoria: 'renta', descripcion: 'Renta mensual', montoMxn: 3500, metodoPago: 'efectivo', esFijo: true, notas: 'Pago día 20', createdAt: now() },
  { id: uuid(), fecha: ago(6), categoria: 'entretenimiento', descripcion: 'Netflix + Spotify', montoMxn: 299, metodoPago: 'bancoppel', esFijo: true, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(7), categoria: 'salud', descripcion: 'Farmacia', montoMxn: 320, metodoPago: 'efectivo', esFijo: false, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(8), categoria: 'novia', descripcion: 'Cena especial', montoMxn: 650, metodoPago: 'nu', esFijo: false, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(9), categoria: 'hogar', descripcion: 'Gas', montoMxn: 240, metodoPago: 'efectivo', esFijo: false, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(10), categoria: 'transporte', descripcion: 'Metro semana', montoMxn: 120, metodoPago: 'efectivo', esFijo: false, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(11), categoria: 'alimentos', descripcion: 'Cocina económica', montoMxn: 85, metodoPago: 'efectivo', esFijo: false, notas: '', createdAt: now() },
  { id: uuid(), fecha: ago(12), categoria: 'compras_grandes', descripcion: 'Audífonos', montoMxn: 1200, metodoPago: 'bancoppel', esFijo: false, notas: '', createdAt: now() },
];
