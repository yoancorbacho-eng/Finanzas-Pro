'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import { ZelleCupOp, MxnZelleOp, ZelleUsdOp, AlimentoOp, GastoMx, Tarjeta, Tasas } from '@/types';

const DEFAULT_TASAS: Tasas = {
  zelleCompra: 620, zelleVenta: 660, cupPorMxn: 32,
  mxnPorZelle: 18, tasaProveedor: 1.05, tasaCliente: 1.15,
  updatedAt: new Date().toISOString(),
};

const DEFAULT_TARJETAS: Tarjeta[] = [
  { id: uuid(), nombre: 'BanCoppel', diaPago: 16, saldoActual: 0, pagoMinimo: 0, pagoSinIntereses: 0, estado: 'pendiente', notas: '', updatedAt: new Date().toISOString() },
  { id: uuid(), nombre: 'NU', diaPago: 24, saldoActual: 0, pagoMinimo: 0, pagoSinIntereses: 0, estado: 'pendiente', notas: '', updatedAt: new Date().toISOString() },
  { id: uuid(), nombre: 'Mercado Pago', diaPago: 1, saldoActual: 0, pagoMinimo: 0, pagoSinIntereses: 0, estado: 'pendiente', notas: '', updatedAt: new Date().toISOString() },
];

interface Store {
  zelleCupOps: ZelleCupOp[];
  mxnZelleOps: MxnZelleOp[];
  zelleUsdOps: ZelleUsdOp[];
  alimentoOps: AlimentoOp[];
  gastosMx: GastoMx[];
  tarjetas: Tarjeta[];
  tasas: Tasas;
  seeded: boolean;

  addZelleCupOp: (op: Omit<ZelleCupOp, 'id'|'createdAt'>) => void;
  delZelleCupOp: (id: string) => void;
  addMxnZelleOp: (op: Omit<MxnZelleOp, 'id'|'createdAt'>) => void;
  delMxnZelleOp: (id: string) => void;
  addZelleUsdOp: (op: Omit<ZelleUsdOp, 'id'|'createdAt'>) => void;
  delZelleUsdOp: (id: string) => void;
  addAlimentoOp: (op: Omit<AlimentoOp, 'id'|'createdAt'>) => void;
  delAlimentoOp: (id: string) => void;
  addGastoMx: (g: Omit<GastoMx, 'id'|'createdAt'>) => void;
  delGastoMx: (id: string) => void;
  updateTarjeta: (id: string, p: Partial<Tarjeta>) => void;
  updateTasas: (p: Partial<Tasas>) => void;
  loadSeed: (data: Partial<Pick<Store,'zelleCupOps'|'mxnZelleOps'|'zelleUsdOps'|'alimentoOps'|'gastosMx'>>) => void;
}

export const useStore = create<Store>()(persist(
  (set) => ({
    zelleCupOps: [], mxnZelleOps: [], zelleUsdOps: [], alimentoOps: [],
    gastosMx: [], tarjetas: DEFAULT_TARJETAS, tasas: DEFAULT_TASAS, seeded: false,

    addZelleCupOp: (op) => set(s => ({ zelleCupOps: [{ ...op, id: uuid(), createdAt: new Date().toISOString() }, ...s.zelleCupOps] })),
    delZelleCupOp: (id) => set(s => ({ zelleCupOps: s.zelleCupOps.filter(o => o.id !== id) })),

    addMxnZelleOp: (op) => set(s => ({ mxnZelleOps: [{ ...op, id: uuid(), createdAt: new Date().toISOString() }, ...s.mxnZelleOps] })),
    delMxnZelleOp: (id) => set(s => ({ mxnZelleOps: s.mxnZelleOps.filter(o => o.id !== id) })),

    addZelleUsdOp: (op) => set(s => ({ zelleUsdOps: [{ ...op, id: uuid(), createdAt: new Date().toISOString() }, ...s.zelleUsdOps] })),
    delZelleUsdOp: (id) => set(s => ({ zelleUsdOps: s.zelleUsdOps.filter(o => o.id !== id) })),

    addAlimentoOp: (op) => set(s => ({ alimentoOps: [{ ...op, id: uuid(), createdAt: new Date().toISOString() }, ...s.alimentoOps] })),
    delAlimentoOp: (id) => set(s => ({ alimentoOps: s.alimentoOps.filter(o => o.id !== id) })),

    addGastoMx: (g) => set(s => ({ gastosMx: [{ ...g, id: uuid(), createdAt: new Date().toISOString() }, ...s.gastosMx] })),
    delGastoMx: (id) => set(s => ({ gastosMx: s.gastosMx.filter(g => g.id !== id) })),

    updateTarjeta: (id, p) => set(s => ({ tarjetas: s.tarjetas.map(t => t.id === id ? { ...t, ...p, updatedAt: new Date().toISOString() } : t) })),
    updateTasas: (p) => set(s => ({ tasas: { ...s.tasas, ...p, updatedAt: new Date().toISOString() } })),

    loadSeed: (data) => set(s => ({ ...s, ...data, seeded: true })),
  }),
  { name: 'finanzas-pro-v1', storage: createJSONStorage(() => localStorage) }
));
