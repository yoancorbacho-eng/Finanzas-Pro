export function calcZelleCup(zelle: number, compra: number, venta: number) {
  return {
    cupInvertidos: zelle * compra,
    cupRecibidos: zelle * venta,
    gananciaCup: zelle * (venta - compra),
  };
}

export function calcMxnZelle(mxn: number, cupMxn: number, mxnZelle: number, ventaCup: number) {
  const cupInvertidos = mxn * cupMxn;
  const zelleObtenidos = mxn / mxnZelle;
  const cupRecibidos = zelleObtenidos * ventaCup;
  const gananciaCup = cupRecibidos - cupInvertidos;
  return { cupInvertidos, zelleObtenidos, cupRecibidos, gananciaCup, gananciaPorcentual: cupInvertidos > 0 ? (gananciaCup / cupInvertidos) * 100 : 0 };
}

export function calcZelleUsd(usd: number, prov: number, cli: number, zelleCup: number) {
  const zellePagados = usd * prov;
  const zelleCobrados = usd * cli;
  const gananciaZelle = zelleCobrados - zellePagados;
  return { zellePagados, zelleCobrados, gananciaZelle, gananciaCupEquivalente: gananciaZelle * zelleCup };
}

export function calcAlimento(cComp: number, costo: number, cVend: number, pventa: number) {
  const costoUnitario = cComp > 0 ? costo / cComp : 0;
  const ingresoTotal = cVend * pventa;
  const ganancia = ingresoTotal - cVend * costoUnitario;
  return { costoUnitario, ingresoTotal, ganancia, margen: ingresoTotal > 0 ? (ganancia / ingresoTotal) * 100 : 0, stockRestante: cComp - cVend };
}
