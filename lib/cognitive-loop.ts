// Regra de decisão do CognitiveLoop (artigo CognitiveLoop/ADIA, seção 3.4).

export type Decision = "reduzir" | "explicar" | "elevar" | "manter" | "insuficiente"

export interface CycleInput {
  /** Acerto com ajuda (A), de 0 a 1. `null` quando não há itens assistidos válidos. */
  assisted: number | null
  /** Acerto sem ajuda (I), de 0 a 1. `null` quando não há itens independentes válidos. */
  independent: number | null
  /** Confiança média declarada nos itens sem IA (C), de 0 a 1. */
  confidence: number
}

export interface CycleResult {
  decision: Decision
  /** G = A − I. `null` sem dados suficientes. */
  gap: number | null
  /** B = C − I. `null` sem dados suficientes. */
  bias: number | null
  /** Regra auxiliar: B > 0,25 pede justificativa, sem mudar o teto. */
  askJustification: boolean
}

// Arredonda para os limiares não falharem por erro de ponto flutuante (0,80 − 0,55 ≠ 0,25).
const round = (value: number) => Math.round(value * 1e6) / 1e6

export function decide({ assisted, independent, confidence }: CycleInput): CycleResult {
  if (assisted === null || independent === null) {
    return { decision: "insuficiente", gap: null, bias: null, askJustification: false }
  }
  const gap = round(assisted - independent)
  const bias = round(confidence - independent)
  const askJustification = bias > 0.25

  let decision: Decision = "manter"
  if (independent >= 0.8 && gap <= 0.25 && Math.abs(bias) <= 0.2) decision = "reduzir"
  else if (gap > 0.25) decision = "explicar"
  else if (independent < 0.4 && gap <= 0.25) decision = "elevar"

  return { decision, gap, bias, askJustification }
}

/** Teto do próximo ciclo, de 1 (L1) a 4 (L4). Reduzir a ajuda baixa o teto. */
export function nextCeiling(ceiling: number, decision: Decision) {
  if (decision === "reduzir") return Math.max(1, ceiling - 1)
  if (decision === "elevar") return Math.min(4, ceiling + 1)
  return ceiling
}

// Tabela 5 do artigo: cenários hipotéticos para inspecionar a regra, não dados de alunos.
// A confiança vem de C = I + B.
export const scenarios = [
  { id: "S1", note: "Domínio alto no teste sem IA", input: { assisted: 0.9, independent: 0.85, confidence: 0.9 } },
  { id: "S2", note: "Gap alto; também pede justificativa", input: { assisted: 0.8, independent: 0.3, confidence: 0.6 } },
  { id: "S3", note: "Baixa proficiência nas duas condições", input: { assisted: 0.3, independent: 0.2, confidence: 0.3 } },
  { id: "S4", note: "Regra auxiliar de confiança", input: { assisted: 0.6, independent: 0.6, confidence: 0.9 } },
  { id: "S5", note: "Gap negativo; verificar instrumentos", input: { assisted: 0.45, independent: 0.7, confidence: 0.6 } },
  { id: "S6", note: "Sem itens independentes válidos", input: { assisted: 0.9, independent: null, confidence: 0.5 } },
] as const satisfies readonly { id: string; note: string; input: CycleInput }[]
