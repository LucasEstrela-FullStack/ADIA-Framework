import Link from "next/link"
import {
  ArrowRightIcon,
  BrainIcon,
  ExternalLinkIcon,
  GaugeIcon,
  type LucideIcon,
  SparklesIcon,
} from "lucide-react"

import { GapIllustration } from "@/components/gap-illustration"
import { SectionHeading } from "@/components/section-heading"

interface Effect {
  icon: LucideIcon
  term: string
  english: string
  body: string
  cite: string
}

const effects: Effect[] = [
  {
    icon: SparklesIcon,
    term: "Terceirização cognitiva",
    english: "cognitive offloading",
    body: "O aluno passa para a ferramenta o raciocínio que deveria fazer e recebe a resposta pronta.",
    cite: "Risko e Gilbert, 2016; Hefter, 2026",
  },
  {
    icon: BrainIcon,
    term: "Preguiça metacognitiva",
    english: "metacognitive laziness",
    body: "Com a IA respondendo, o aluno tende a planejar e monitorar menos o próprio aprendizado.",
    cite: "Fan et al., 2025",
  },
  {
    icon: GaugeIcon,
    term: "Superconfiança",
    english: "overconfidence",
    body: "Quem usou a IA sem limites não percebeu que foi pior na prova. Com IA, as pessoas também superestimam o próprio desempenho.",
    cite: "Bastani et al., 2025; Fernandes et al., 2026",
  },
]

// DOIs conferidos na Crossref em 2026-10-29.
const sources = [
  {
    label: "Bastani et al., 2025 · PNAS",
    title: "Generative AI without guardrails can harm learning: evidence from high school mathematics",
    href: "https://doi.org/10.1073/pnas.2422633122",
  },
  {
    label: "Hefter, 2026 · Trends in Neuroscience and Education",
    title: "The illusion of outsourcing learning: a learner-centered perspective on AI in education",
    href: "https://doi.org/10.1016/j.tine.2026.100302",
  },
  {
    label: "Fan et al., 2025 · British Journal of Educational Technology",
    title: "Beware of metacognitive laziness",
    href: "https://doi.org/10.1111/bjet.13544",
  },
  {
    label: "Fernandes et al., 2026 · Computers in Human Behavior",
    title: "AI makes you smarter but none the wiser",
    href: "https://doi.org/10.1016/j.chb.2025.108779",
  },
  {
    label: "Risko e Gilbert, 2016 · Trends in Cognitive Sciences",
    title: "Cognitive offloading",
    href: "https://doi.org/10.1016/j.tics.2016.07.002",
  },
  {
    label: "Pardos e Bhandari, 2024 · PLOS ONE",
    title: "ChatGPT-generated help produces learning gains equivalent to human tutor-authored help on mathematics skills",
    href: "https://doi.org/10.1371/journal.pone.0304013",
  },
  {
    label: "Koedinger e Aleven, 2007 · Educational Psychology Review",
    title: "Exploring the assistance dilemma in experiments with cognitive tutors",
    href: "https://doi.org/10.1007/s10648-007-9049-0",
  },
] as const

export function ChallengeSection() {
  return (
    <section
      id="desafio"
      aria-labelledby="desafio-title"
      className="border-t bg-muted/30"
    >
      <div className="mx-auto w-full max-w-6xl space-y-14 px-4 py-16 sm:px-6 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="space-y-6">
            <SectionHeading
              id="desafio-title"
              eyebrow="O desafio"
              title="Com IA sem limites, o aluno vai melhor no exercício e pior na prova."
              lead="Cresce a procura por ferramentas de IA generativa em ambientes educacionais no Brasil. Elas explicam, dão pistas e entregam respostas. O problema aparece quando a ajuda é irrestrita."
            />
            <p className="max-w-2xl leading-relaxed text-pretty text-muted-foreground">
              Num estudo com quase mil alunos do ensino médio, o acesso livre ao
              GPT-4 melhorou as notas na prática em 48% e reduziu em 17% as
              notas na prova feita sem a ferramenta (Bastani et al., 2025).
              Desempenho com apoio da IA não equivale a aprendizagem que
              permanece sem ela (Hefter, 2026).
            </p>
          </div>

          <GapIllustration />
        </div>

        <div className="space-y-5">
          <h3 className="text-lg font-semibold tracking-tight">
            O que acontece com o aluno
          </h3>
          <ul className="grid gap-4 md:grid-cols-3">
            {effects.map((effect) => (
              <li
                key={effect.term}
                className="flex flex-col gap-3 rounded-xl border bg-card p-5"
              >
                <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <effect.icon aria-hidden className="size-4" />
                </span>
                <div>
                  <h4 className="font-semibold">{effect.term}</h4>
                  <p className="text-xs text-muted-foreground italic" lang="en">
                    {effect.english}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {effect.body}
                </p>
                <p className="mt-auto text-xs text-muted-foreground">
                  ({effect.cite})
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 rounded-xl border bg-card p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary">A pergunta da pesquisa</p>
            <h3 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
              Como usar a ajuda da IA sem tirar do aluno o trabalho de pensar?
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              No mesmo estudo, uma versão do tutor que guiava com pistas e não
              entregava a resposta evitou a queda na prova (Bastani et al.,
              2025). Dicas geradas por IA também já rendem ganhos comparáveis
              aos de dicas escritas por tutores humanos (Pardos e Bhandari,
              2024). Falta decidir quanto ajudar e quando parar, o chamado
              dilema da assistência (Koedinger e Aleven, 2007).
            </p>
            <Link
              href="#solucao"
              className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Ver a solução proposta
              <ArrowRightIcon aria-hidden className="size-4" />
            </Link>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Fontes</p>
            <ul className="space-y-2">
              {sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border p-3 transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    <span className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      {source.label}
                      <ExternalLinkIcon aria-hidden className="size-3.5 shrink-0" />
                    </span>
                    <span className="mt-1 block text-sm font-medium" lang="en">
                      {source.title}
                    </span>
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
