

export function Financiamento(vp: number, p: number, t: number) {
  const pc = t / 100
  const totalAPrazo = vp * Math.pow(1 + pc, p)
  const valorParcela = totalAPrazo / p
  return {
    totalAPrazo,
    valorParcela
  }
}