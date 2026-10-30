import {
  BrainCircuitIcon,
  DatabaseIcon,
  FlaskConicalIcon,
  type LucideIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { CeilingChart } from "@/components/ceiling-chart"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// Ciclo de seis etapas do artigo CognitiveLoop/ADIA (seção 3.2).
const protocol = [
  {
    title: "Linha de base sem IA",
    body: "O aluno resolve itens sozinho e diz, em cada um, o quanto confia na resposta.",
    measures: "acerto e confiança iniciais",
  },
  {
    title: "Prática assistida",
    body: "O tutor libera dicas até o teto do ciclo. Cada pedido de dica fica registrado.",
    measures: "Dose de Suporte Solicitada (DSS)",
  },
  {
    title: "Desafio independente",
    body: "Itens equivalentes aos da prática, mas não idênticos, para não confundir memória com domínio.",
    measures: "Taxa de Acerto Independente (TAI), gap e viés",
  },
  {
    title: "Regulação",
    body: "A regra do CognitiveLoop define o teto de ajuda do próximo ciclo. Sem itens válidos, nada muda.",
    measures: "decisão registrada com o motivo",
  },
  {
    title: "Transferência STEAM",
    body: "Um problema novo, de preferência num projeto STEAM, em que o aluno justifica as escolhas.",
    measures: "Taxa de Transferência (TT)",
  },
  {
    title: "Retenção após 7 dias",
    body: "Nova avaliação sem ajuda, comparável à imediata, para ver o que ficou.",
    measures: "retenção (ΔRET)",
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
  { icon: ShieldCheckIcon, name: "Guardrail", role: "Filtra a resposta pronta (em validação)" },
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
    cite: "Hefter, 2026; Lee et al., 2025",
  },
  {
    name: "Tutores inteligentes e guardrails",
    concept: "Dicas graduais L1 a L4, nunca a resposta.",
    cite: "Wood, Bruner e Ross, 1976; Pardos e Bhandari, 2024",
  },
  {
    name: "Orquestração do suporte",
    concept: "Princípios de design para agentes de IA que apoiam o aprendiz.",
    cite: "Kozachek e Janson, 2026; Li et al., 2026",
  },
] as const

const tabs = [
  { value: "condicoes", label: "Condições" },
  { value: "ciclo", label: "Ciclo" },
  { value: "prototipo", label: "Protótipo" },
  { value: "fundamentos", label: "Fundamentos" },
] as const

export function ResearchSection() {
  return (
    <section
      id="pesquisa"
      aria-labelledby="pesquisa-title"
      className="border-t bg-muted/30"
    >
      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-16 sm:px-6 md:py-24">
        <SectionHeading
          id="pesquisa-title"
          eyebrow="A pesquisa"
          title="Três jeitos de dosar a ajuda da IA, medidos com os mesmos testes"
          lead="O objetivo é avaliar se ajustar a ajuda pela diferença entre o acerto com e sem a IA melhora a autonomia, a autorregulação e a transferência do conhecimento para atividades novas."
        />
        <p className="-mt-4 max-w-2xl leading-relaxed text-pretty text-muted-foreground">
          O estudo está em preparação. Ele replica o método de pesquisas já
          publicadas, que comparam grupos com IA sem limites e com IA que só dá
          pistas (Bastani et al., 2025), e acrescenta desafios STEAM para medir
          se o aluno aplica o que aprendeu em problemas novos.
        </p>

        {/* keepMounted: o conteúdo das abas fechadas continua no HTML, para busca e sem JavaScript. */}
        <Tabs defaultValue="condicoes" className="gap-6">
          <TabsList className="grid w-full grid-cols-2 group-data-horizontal/tabs:h-auto sm:inline-flex sm:w-fit">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="h-8 px-3">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="condicoes" keepMounted className="space-y-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold tracking-tight">
                As três condições
              </h3>
              <p className="text-sm text-muted-foreground">
                Avaliação futura · amostra definida por cálculo amostral
              </p>
            </div>
            <ul className="grid gap-4 md:grid-cols-3">
              {conditions.map((condition, index) => (
                <Reveal
                  as="li"
                  index={index}
                  key={condition.letter}
                  className={cn(
                    "flex gap-3 rounded-xl border bg-card p-5",
                    condition.highlight && "border-primary/50 ring-1 ring-primary/20",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-md font-mono text-sm font-semibold",
                      condition.highlight
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {condition.letter}
                  </span>
                  <div className="space-y-1">
                    <h4 className="font-semibold">
                      <span className="sr-only">Condição {condition.letter}: </span>
                      {condition.name}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {condition.rule}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <div className="rounded-xl border bg-card p-5">
              <CeilingChart conditions={conditions} />
            </div>
          </TabsContent>

          <TabsContent value="ciclo" keepMounted className="space-y-5">
            <h3 className="text-lg font-semibold tracking-tight">
              O ciclo, em seis etapas
            </h3>
            <ol className="relative ml-3 grid gap-6 border-l pl-6 md:grid-cols-2 md:gap-x-10">
              {protocol.map((step, index) => (
                <Reveal as="li" index={index} key={step.title} className="relative">
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
                </Reveal>
              ))}
            </ol>
          </TabsContent>

          <TabsContent value="prototipo" keepMounted>
            <div className="max-w-3xl space-y-4 rounded-xl border bg-card p-6">
              <div className="flex items-center gap-2">
                <FlaskConicalIcon aria-hidden className="size-4 text-primary" />
                <h3 className="font-semibold">O protótipo roda localmente</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Modelos de linguagem abertos rodam num servidor isolado, sem
                depender de serviços externos. As tecnologias abaixo estão
                previstas ou em protótipo.
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
          </TabsContent>

          <TabsContent value="fundamentos" keepMounted className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight">
              Em que a pesquisa se apoia
            </h3>
            <dl className="max-w-3xl divide-y rounded-xl border bg-card">
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
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
