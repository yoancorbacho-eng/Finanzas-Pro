import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function fmt(v: number, d = 2) {
  return new Intl.NumberFormat('es-MX', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
}

export function fmtDate(s: string) {
  const [y, m, d] = s.split('-'); return `${d}/${m}/${y}`;
}

export function today() { return new Date().toISOString().slice(0, 10); }

export function daysUntil(day: number) {
  const now = new Date();
  const t = new Date(now.getFullYear(), now.getMonth(), day);
  if (t < now) t.setMonth(t.getMonth() + 1);
  return Math.ceil((t.getTime() - now.getTime()) / 86400000);
}

export function monthKey(offset = 0) {
  const d = new Date(); d.setMonth(d.getMonth() + offset);
  return d.toISOString().slice(0, 7);
}

export function dayKey(offset = 0) {
  const d = new Date(); d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export const FOOD_LABELS: Record<string, string> = {
  arroz: 'Arroz', aceite: 'Aceite', pollo: 'Pollo', carne: 'Carne',
  huevo: 'Huevo', leche: 'Leche', dulces: 'Dulces', aseo: 'Aseo', otros: 'Otros',
};

export const EXPENSE_LABELS: Record<string, string> = {
  despensa: 'Despensa', alimentos: 'Alimentos', renta: 'Renta',
  electricidad: 'Electricidad', bomba_agua: 'Bomba de agua', novia: 'Novia',
  gato: 'Gato', hogar: 'Hogar', transporte: 'Transporte', salud: 'Salud',
  entretenimiento: 'Entretenimiento', compras_grandes: 'Compras grandes', otros: 'Otros',
};

export const PAYMENT_LABELS: Record<string, string> = {
  efectivo: 'Efectivo', debito: 'Débito', bancoppel: 'BanCoppel',
  nu: 'NU', mercado_pago: 'Mercado Pago', otro: 'Otro',
};

export const MONTH_NAMES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
