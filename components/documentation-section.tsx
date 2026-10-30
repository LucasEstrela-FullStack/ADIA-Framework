import {
  ExternalLinkIcon,
  GitBranchIcon,
  type LucideIcon,
  MonitorIcon,
} from "lucide-react"

import { SectionHeading } from "@/components/section-heading"

interface Repository {
  icon: LucideIcon
  name: string
  href: string
  body: string
  stack: string
}

const repositories: Repository[] = [
  {
    icon: MonitorIcon,
    name: "ADIA-Framework",
    href: "https://github.com/LucasEstrela-FullStack/ADIA-Framework",
    body: "Este portal: apresenta a pesquisa, o CognitiveLoop e as métricas.",
    stack: "Next.js, TypeScript, Tailwind CSS",
  },
  {
    icon: GitBranchIcon,
    name: "ADIA-Framework-IA",
    href: "https://github.com/LucasEstrela-FullStack/ADIA-Framework-IA",
    body: "O motor do tutor: regra do CognitiveLoop, dicas L1 a L4, guardrail e banco de problemas.",
    stack: "Python, FastAPI, SQLite, Ollama, RAG",
  },
]

// Todas as fontes citadas no site. DOIs conferidos na Crossref em 2026-10-30.
const references = [
  {
    cite: "BASTANI, H. et al. Proceedings of the National Academy of Sciences, 2025.",
    title: "Generative AI without guardrails can harm learning: evidence from high school mathematics",
    href: "https://doi.org/10.1073/pnas.2422633122",
  },
  {
    cite: "BRIER, G. W. Monthly Weather Review, 1950.",
    title: "Verification of forecasts expressed in terms of probability",
    href: "https://doi.org/10.1175/1520-0493(1950)078%3C0001:VOFEIT%3E2.0.CO;2",
  },
  {
    cite: "CHI, M. T. H.; WYLIE, R. Educational Psychologist, 2014.",
    title: "The ICAP framework: linking cognitive engagement to active learning outcomes",
    href: "https://doi.org/10.1080/00461520.2014.965823",
  },
  {
    cite: "COHN, C. et al. Proceedings of the AAAI Conference on Artificial Intelligence, 2026.",
    title: "A theory of adaptive scaffolding for LLM-based pedagogical agents",
    href: "https://doi.org/10.1609/aaai.v40i3.37154",
  },
  {
    cite: "FAN, Y. et al. British Journal of Educational Technology, 2025.",
    title: "Beware of metacognitive laziness",
    href: "https://doi.org/10.1111/bjet.13544",
  },
  {
    cite: "FERNANDES, D. et al. Computers in Human Behavior, 2026.",
    title: "AI makes you smarter but none the wiser",
    href: "https://doi.org/10.1016/j.chb.2025.108779",
  },
  {
    cite: "HEFTER, M. H. Trends in Neuroscience and Education, 2026.",
    title: "The illusion of outsourcing learning: a learner-centered perspective on AI in education",
    href: "https://doi.org/10.1016/j.tine.2026.100302",
  },
  {
    cite: "KOEDINGER, K. R.; ALEVEN, V. Educational Psychology Review, 2007.",
    title: "Exploring the assistance dilemma in experiments with cognitive tutors",
    href: "https://doi.org/10.1007/s10648-007-9049-0",
  },
  {
    cite: "KOZACHEK, D.; JANSON, A. Lecture Notes in Computer Science (DESRIST), 2026.",
    title: "Orchestrating scaffolding AI agents: design principles for mechanism-specific learner support",
    href: "https://doi.org/10.1007/978-3-032-28313-9_11",
  },
  {
    cite: "LEE, H.-P. et al. Proceedings of the CHI Conference on Human Factors in Computing Systems, 2025.",
    title: "The impact of generative AI on critical thinking",
    href: "https://doi.org/10.1145/3706598.3713778",
  },
  {
    cite: "LI, X. et al. Computers & Education, 2026.",
    title: "FLoRA: an advanced AI-powered engine to facilitate hybrid human-AI regulated learning",
    href: "https://doi.org/10.1016/j.compedu.2025.105527",
  },
  {
    cite: "PAGE, M. J. et al. BMJ, 2021.",
    title: "The PRISMA 2020 statement: an updated guideline for reporting systematic reviews",
    href: "https://doi.org/10.1136/bmj.n71",
  },
  {
    cite: "PARDOS, Z. A.; BHANDARI, S. PLOS ONE, 2024.",
    title: "ChatGPT-generated help produces learning gains equivalent to human tutor-authored help on mathematics skills",
    href: "https://doi.org/10.1371/journal.pone.0304013",
  },
  {
    cite: "PETERSEN, K.; VAKKALANKA, S.; KUZNIARZ, L. Information and Software Technology, 2015.",
    title: "Guidelines for conducting systematic mapping studies in software engineering: an update",
    href: "https://doi.org/10.1016/j.infsof.2015.03.007",
  },
  {
    cite: "RISKO, E. F.; GILBERT, S. J. Trends in Cognitive Sciences, 2016.",
    title: "Cognitive offloading",
    href: "https://doi.org/10.1016/j.tics.2016.07.002",
  },
  {
    cite: "SWELLER, J. Cognitive Science, 1988.",
    title: "Cognitive load during problem solving: effects on learning",
    href: "https://doi.org/10.1207/s15516709cog1202_4",
  },
  {
    cite: "WOOD, D.; BRUNER, J. S.; ROSS, G. Journal of Child Psychology and Psychiatry, 1976.",
    title: "The role of tutoring in problem solving",
    href: "https://doi.org/10.1111/j.1469-7610.1976.tb00381.x",
  },
] as const

const linkFocus =
  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"

export function DocumentationSection() {
  return (
    <section
      id="documentacao"
      aria-labelledby="documentacao-title"
      className="border-t bg-muted/30"
    >
      <div className="mx-auto w-full max-w-6xl space-y-14 px-4 py-16 sm:px-6 md:py-24">
        <SectionHeading
          id="documentacao-title"
          eyebrow="Documentação"
          title="Código e fontes da pesquisa"
          lead="O projeto tem dois repositórios: este portal e o motor do tutor. Abaixo estão todas as fontes citadas no site."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold tracking-tight">
                Repositórios
              </h3>
              <ul className="space-y-3">
                {repositories.map((repo) => (
                  <li key={repo.name}>
                    <a
                      href={repo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex gap-4 rounded-xl border bg-card p-5 transition-colors hover:bg-muted/60 ${linkFocus}`}
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <repo.icon aria-hidden className="size-4" />
                      </span>
                      <span className="min-w-0 space-y-1">
                        <span className="flex items-center gap-2 font-mono text-sm font-semibold">
                          {repo.name}
                          <ExternalLinkIcon aria-hidden className="size-3.5 text-muted-foreground" />
                        </span>
                        <span className="block text-sm leading-relaxed text-muted-foreground">
                          {repo.body}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {repo.stack}
                        </span>
                        <span className="sr-only"> (GitHub, abre em nova aba)</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">
              Referências
            </h3>
            <ol className="divide-y rounded-xl border bg-card">
              {references.map((ref) => (
                <li key={ref.href}>
                  <a
                    href={ref.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group block p-4 transition-colors hover:bg-muted/60 ${linkFocus}`}
                  >
                    <span className="flex items-start justify-between gap-3 text-xs text-muted-foreground">
                      {ref.cite}
                      <ExternalLinkIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                    </span>
                    <span className="mt-1 block text-sm font-medium" lang="en">
                      {ref.title}
                    </span>
                    <span className="sr-only"> (DOI, abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
