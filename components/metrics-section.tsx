import { TriangleAlertIcon } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

const hypotheses = [
  {
    code: "H1",
    body: "Regular a ajuda pelo acerto sem IA pode elevar a TAI em relação ao suporte constante.",
  },
  {
    code: "H2",
    body: "A mesma regulação pode favorecer a transferência para problemas novos.",
  },
  {
    code: "H3",
    body: "Pedir a confiança em cada item pode revelar desvios metacognitivos úteis ao professor.",
  },
] as const

interface Indicator {
  code: string
  name: string
  formula: string
  range: string
  /** Quando o indicador não pode ser calculado ou exige cuidado. */
  exception: string
}

// Tabela 3 do artigo CognitiveLoop/ADIA (2026/2).
const indicators: Indicator[] = [
  {
    code: "TAI",
    name: "Taxa de Acerto Independente",
    formula: "acertos sem IA ÷ itens válidos",
    range: "0 a 1",
    exception: "Indefinida sem itens válidos.",
  },
  {
    code: "TT",
    name: "Taxa de Transferência",
    formula: "acertos em itens novos ÷ itens válidos",
    range: "0 a 1",
    exception: "O projeto STEAM tem rubrica própria e é relatado à parte.",
  },
  {
    code: "IIC",
    name: "Índice de Independência Cognitiva",
    formula: "TAI ÷ acerto com ajuda",
    range: "pode passar de 1",
    exception: "Sem acerto com ajuda, é indefinido, não zero.",
  },
  {
    code: "B · BS",
    name: "Viés e escore de Brier",
    formula: "média(c − o) · média((c − o)²)",
    range: "B de −1 a 1 · BS de 0 a 1",
    exception: "c é a confiança no item (0 a 1); o vale 1 no acerto e 0 no erro.",
  },
  {
    code: "DSS",
    name: "Dose de Suporte Solicitada",
    formula: "pedidos de dica ÷ itens com ajuda",
    range: "pode passar de 1",
    exception: "Sem pedidos, vale 0 e o nível médio das dicas fica indefinido.",
  },
  {
    code: "ΔRET",
    name: "Retenção",
    formula: "TAI após 7 dias − TAI imediata",
    range: "−1 a 1",
    exception: "Continua definida mesmo com TAI imediata igual a zero.",
  },
]

export function MetricsSection() {
  return (
    <section id="metricas" aria-labelledby="metricas-title">
      <div className="mx-auto w-full max-w-6xl space-y-14 px-4 py-16 sm:px-6 md:py-24">
        <SectionHeading
          id="metricas-title"
          eyebrow="As métricas"
          title="Seis indicadores para separar o que o aluno faz com ajuda do que faz sozinho"
          lead="Nenhum deles foi medido ainda. São indicadores propostos, cada um com regra para os casos em que não dá para calcular."
        />

        <div className="space-y-5">
          <h3 className="text-lg font-semibold tracking-tight">
            O que o estudo vai testar
          </h3>
          <ul className="grid gap-4 md:grid-cols-3">
            {hypotheses.map((hypothesis, index) => (
              <Reveal
                as="li"
                index={index}
                key={hypothesis.code}
                className="flex gap-3 rounded-xl border bg-card p-5"
              >
                <span className="font-mono text-sm font-semibold text-primary">
                  {hypothesis.code}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {hypothesis.body}
                </p>
              </Reveal>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            Desfecho principal: TAI no pós-teste. Secundários: TT, viés, Brier,
            DSS e ΔRET.
          </p>
        </div>

        <div className="space-y-5">
          <h3 className="text-lg font-semibold tracking-tight">
            Como cada indicador é calculado
          </h3>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {indicators.map((indicator, index) => (
              <Reveal
                as="li"
                index={index}
                key={indicator.code}
                className="flex flex-col gap-3 rounded-xl border bg-card p-5"
              >
                <div>
                  <p className="font-mono text-xs font-semibold text-primary">
                    {indicator.code}
                  </p>
                  <h4 className="font-semibold">{indicator.name}</h4>
                </div>
                <p className="rounded-md bg-muted px-3 py-2 font-mono text-sm">
                  {indicator.formula}
                </p>
                <dl className="mt-auto space-y-1 text-xs text-muted-foreground">
                  <div className="flex gap-1">
                    <dt className="font-medium text-foreground">Escala:</dt>
                    <dd>{indicator.range}</dd>
                  </div>
                  <div className="flex gap-1">
                    <dt className="font-medium text-foreground">Exceção:</dt>
                    <dd>{indicator.exception}</dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 rounded-xl border border-amber-500/40 bg-amber-500/5 p-5">
          <TriangleAlertIcon
            aria-hidden
            className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400"
          />
          <div className="space-y-1">
            <p className="font-semibold">Nenhum indicador é lido sozinho</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Um aluno que acerta 20% com e sem IA tem IIC igual a 1 sem
              dominar o conteúdo. Por isso o IIC aparece sempre junto da TAI e
              do número de itens. Com 4 itens, um único acerto muda a taxa em 25
              pontos. Com 20 itens, muda 5. Por isso as decisões exigem itens
              suficientes em cada ciclo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
