export type FoodCategory = 'arroz' | 'aceite' | 'pollo' | 'carne' | 'huevo' | 'leche' | 'dulces' | 'aseo' | 'otros';

export type ExpenseCategory =
  | 'despensa' | 'alimentos' | 'renta' | 'electricidad' | 'bomba_agua'
  | 'novia' | 'gato' | 'hogar' | 'transporte' | 'salud'
  | 'entretenimiento' | 'compras_grandes' | 'otros';

export type PaymentMethod = 'efectivo' | 'debito' | 'bancoppel' | 'nu' | 'mercado_pago' | 'otro';

export type CardName = 'BanCoppel' | 'NU' | 'Mercado Pago';

export interface ZelleCupOp {
  id: string; fecha: string; cantidadZelle: number; tasaCompra: number;
  tasaVenta: number; cupInvertidos: number; cupRecibidos: number;
  gananciaCup: number; notas: string; createdAt: string;
}

export interface MxnZelleOp {
  id: string; fecha: string; mxnComprados: number; tasaCupPorMxn: number;
  tasaMxnPorZelle: number; tasaVentaZelleCup: number; cupInvertidos: number;
  zelleObtenidos: number; cupRecibidos: number; gananciaCup: number;
  gananciaPorcentual: number; notas: string; createdAt: string;
}

export interface ZelleUsdOp {
  id: string; fecha: string; usdRecibidos: number; zellePagados: number;
  tasaProveedor: number; zelleCobrados: number; tasaCliente: number;
  gananciaZelle: number; gananciaCupEquivalente: number; tasaZelleCup: number;
  notas: string; createdAt: string;
}

export interface AlimentoOp {
  id: string; fecha: string; producto: string; categoria: FoodCategory;
  cantidadComprada: number; costoTotalCup: number; costoUnitario: number;
  cantidadVendida: number; precioVentaUnitario: number; ingresoTotal: number;
  ganancia: number; margen: number; stockRestante: number;
  notas: string; createdAt: string;
}

export interface GastoMx {
  id: string; fecha: string; categoria: ExpenseCategory; descripcion: string;
  montoMxn: number; metodoPago: PaymentMethod; esFijo: boolean;
  notas: string; createdAt: string;
}

export interface Tarjeta {
  id: string; nombre: CardName; diaPago: number; saldoActual: number;
  pagoMinimo: number; pagoSinIntereses: number; estado: 'pendiente' | 'pagado';
  notas: string; updatedAt: string;
}

export interface Tasas {
  zelleCompra: number; zelleVenta: number; cupPorMxn: number;
  mxnPorZelle: number; tasaProveedor: number; tasaCliente: number; updatedAt: string;
}
