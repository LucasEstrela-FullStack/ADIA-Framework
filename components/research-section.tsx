import {
  BrainCircuitIcon,
  DatabaseIcon,
  FlaskConicalIcon,
  type LucideIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

interface Condition {
  letter: "A" | "B" | "C"
  name: string
  rule: string
  /** Teto de ajuda em cada ciclo, de 1 (L1) a 4 (L4). Ilustrativo. */
  ceiling: number[]
  highlight?: boolean
}

const conditions: Condition[] = [
  {
    letter: "A",
    name: "Suporte Constante",
    rule: "A IA ajuda sem limite. O teto fica em L4 o tempo todo.",
    ceiling: [4, 4, 4, 4, 4, 4],
  },
  {
    letter: "B",
    name: "ADIA Adaptativo",
    rule: "O CognitiveLoop move o teto conforme o acerto sem ajuda: desce, se mantém ou sobe.",
    ceiling: [4, 3, 2, 3, 2, 1],
    highlight: true,
  },
  {
    letter: "C",
    name: "Fading Fixo",
    rule: "O teto desce num cronograma fixo, sem olhar o desempenho do aluno.",
    ceiling: [4, 4, 3, 3, 2, 1],
  },
]

const protocol = [
  {
    title: "Ciclos de prática",
    body: "Cada aluno pratica na sua condição. O sistema registra o acerto com e sem ajuda, a confiança declarada e quantas dicas ele pede.",
    measures: "viés metacognitivo (confiança menos acerto) e Dose de Suporte Solicitada (DSS)",
  },
  {
    title: "Teste sem IA",
    body: "O aluno resolve sozinho, sem acesso ao tutor.",
    measures: "Taxa de Acerto Independente (TAI)",
  },
  {
    title: "Desafio STEAM",
    body: "Problemas novos e interdisciplinares, diferentes dos praticados, para ver se o conhecimento se transfere.",
    measures: "Taxa de Transferência (TT)",
  },
  {
    title: "Pós-teste após 7 dias",
    body: "O mesmo tipo de avaliação, uma semana depois, para medir o que ficou.",
    measures: "retenção do aprendizado",
  },
] as const

interface StackItem {
  icon: LucideIcon
  name: string
  role: string
}

const stack: StackItem[] = [
  { icon: BrainCircuitIcon, name: "Ollama", role: "LLM local, de código aberto" },
  { icon: SearchIcon, name: "RAG com bge-m3", role: "Busca as dicas no banco de problemas" },
  { icon: ShieldCheckIcon, name: "Guardrail", role: "Bloqueia a entrega da resposta pronta" },
  { icon: ServerIcon, name: "FastAPI", role: "Executa o CognitiveLoop" },
  { icon: DatabaseIcon, name: "SQLite", role: "Guarda acertos, confiança e dicas" },
]

// Pilares do catálogo de fontes (Quadro 02); os links ficam na seção Documentação.
const pillars = [
  {
    name: "Desvanecimento adaptativo",
    concept: "Regular o teto de dicas pelo acerto sem ajuda.",
    cite: "Bastani et al., 2025; Cohn et al., 2026",
  },
  {
    name: "Offloading e metacognição",
    concept: "Evitar que o aluno terceirize o raciocínio e calibrar a confiança.",
    cite: "Hefter, 2026; Pinto et al., 2025",
  },
  {
    name: "Tutores inteligentes e guardrails",
    concept: "Dicas graduais L1 a L4, nunca a resposta.",
    cite: "Pardos e Bhandari, 2024; Medeiros et al., 2026",
  },
  {
    name: "Orquestração do suporte",
    concept: "Princípios de design para agentes de IA que apoiam o aprendiz.",
    cite: "Kozachek e Janson, 2026; Li et al., 2026",
  },
] as const

// Geometria do mini-gráfico do teto (viewBox 120 × 48).
const chart = { width: 120, height: 48, pad: 4 }

function ceilingPath(ceiling: number[]) {
  const step = (chart.width - chart.pad * 2) / ceiling.length
  const y = (level: number) =>
    chart.pad + ((4 - level) / 3) * (chart.height - chart.pad * 2)
  return ceiling
    .map((level, index) => {
      const x = chart.pad + index * step
      return `${index === 0 ? "M" : "L"}${x} ${y(level)} H${x + step}`
    })
    .join(" ")
}

function CeilingChart({ condition }: { condition: Condition }) {
  const levels = condition.ceiling.map((level) => `L${level}`).join(", ")
  return (
    <figure className="space-y-1.5">
      <svg
        viewBox={`0 0 ${chart.width} ${chart.height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Ilustração, não dado do experimento. Teto de ajuda por ciclo na condição ${condition.letter}: ${levels}.`}
        className="h-16 w-full overflow-visible"
      >
        {[1, 2, 3, 4].map((level) => {
          const y =
            chart.pad + ((4 - level) / 3) * (chart.height - chart.pad * 2)
          return (
            <line
              key={level}
              x1={chart.pad}
              x2={chart.width - chart.pad}
              y1={y}
              y2={y}
              className="stroke-border"
              strokeDasharray="2 3"
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
        <path
          d={ceilingPath(condition.ceiling)}
          fill="none"
          strokeWidth={2}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className={cn(
            condition.highlight ? "stroke-primary" : "stroke-muted-foreground",
          )}
        />
      </svg>
      <figcaption className="flex justify-between text-[11px] text-muted-foreground">
        <span>Teto: L4 mais ajuda, L1 menos</span>
        <span>ciclos →</span>
      </figcaption>
    </figure>
  )
}

export function ResearchSection() {
  return (
    <section
      id="pesquisa"
      aria-labelledby="pesquisa-title"
      className="border-t bg-muted/30"
    >
      <div className="mx-auto w-full max-w-6xl space-y-14 px-4 py-16 sm:px-6 md:py-24">
        <SectionHeading
          id="pesquisa-title"
          eyebrow="A pesquisa"
          title="Três jeitos de dosar a ajuda da IA, medidos com os mesmos testes"
          lead="O objetivo é avaliar se ajustar a ajuda pela diferença entre o acerto com e sem a IA melhora a autonomia, a autorregulação e a transferência do conhecimento para atividades novas."
        />
        <p className="-mt-8 max-w-2xl leading-relaxed text-pretty text-muted-foreground">
          O estudo está em preparação. Ele replica o método de pesquisas já
          publicadas, que comparam grupos com IA sem limites e com IA que só dá
          pistas (Bastani et al., 2025), e acrescenta desafios STEAM para medir
          se o aluno aplica o que aprendeu em problemas novos.
        </p>

        <div className="space-y-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold tracking-tight">
              As três condições
            </h3>
            <p className="text-sm text-muted-foreground">
              Desenho previsto: 30 estudantes por condição · Cuiabá-MT
            </p>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {conditions.map((condition) => (
              <li
                key={condition.letter}
                className={cn(
                  "flex flex-col gap-4 rounded-xl border bg-card p-5",
                  condition.highlight && "border-primary/50 ring-1 ring-primary/20",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-9 items-center justify-center rounded-md font-mono text-sm font-semibold",
                      condition.highlight
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {condition.letter}
                  </span>
                  <h4 className="font-semibold">
                    <span className="sr-only">Condição {condition.letter}: </span>
                    {condition.name}
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {condition.rule}
                </p>
                <div className="mt-auto">
                  <CeilingChart condition={condition} />
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">
            Os gráficos ilustram o comportamento de cada regra. Não são dados
            do experimento.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold tracking-tight">
              O protocolo, em ordem
            </h3>
            <ol className="relative ml-3 space-y-6 border-l pl-6">
              {protocol.map((step, index) => (
                <li key={step.title} className="relative">
                  <span
                    aria-hidden
                    className="absolute top-0.5 -left-[37px] flex size-6 items-center justify-center rounded-full border bg-background font-mono text-[11px] font-medium text-muted-foreground"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                  <p className="mt-2 text-xs font-medium text-primary">
                    Mede: {step.measures}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-8">
            <div className="space-y-4 rounded-xl border bg-card p-6">
              <div className="flex items-center gap-2">
                <FlaskConicalIcon aria-hidden className="size-4 text-primary" />
                <h3 className="font-semibold">O protótipo roda localmente</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Modelos de linguagem abertos rodam num servidor isolado, sem
                depender de serviços externos.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {stack.map((item) => (
                  <li key={item.name} className="flex gap-3">
                    <item.icon
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold tracking-tight">
                Em que a pesquisa se apoia
              </h3>
              <dl className="divide-y rounded-xl border bg-card">
                {pillars.map((pillar) => (
                  <div key={pillar.name} className="grid gap-1 p-4 sm:grid-cols-[11rem_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold">{pillar.name}</dt>
                    <dd className="space-y-1">
                      <p className="text-sm text-muted-foreground">{pillar.concept}</p>
                      <p className="text-xs text-muted-foreground">({pillar.cite})</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
