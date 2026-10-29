import Link from "next/link"
import { cacheLife } from "next/cache"

import { FadingBar } from "@/components/fading-bar"
import { Logo } from "@/components/logo"
import { Separator } from "@/components/ui/separator"
import { navItems } from "@/lib/navigation"

const IDEA_YEAR = 2026

const team = [
  "Lucas Abreu Estrela",
  "Kauã Marques Almeida",
  "Adriano Vedana Vargas",
  "Guilherme Athyde Miguéis Alves",
] as const

const projectFacts = [
  { term: "Local e ano", detail: `Cuiabá-MT, ${IDEA_YEAR}` },
  { term: "Status", detail: "Protótipo em desenvolvimento" },
] as const

// Revalida 1x por dia: o ano vira sozinho sem novo deploy.
async function CopyrightYears() {
  "use cache"
  cacheLife("days")
  const year = new Date().getFullYear()
  return year > IDEA_YEAR ? `${IDEA_YEAR}–${year}` : `${IDEA_YEAR}`
}

const linkClass =
  "rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-muted/40">
      <FadingBar inView />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-8 lg:grid-cols-[1.6fr_1fr_1.2fr_1fr]">
        <div className="max-w-sm space-y-4">
          <Link
            href="/"
            className="inline-block rounded-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <Logo />
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Pesquisa sobre como a ajuda de tutores de IA pode diminuir aos
            poucos, até o aluno resolver os problemas sozinho.
          </p>
          <blockquote className="border-l-2 border-primary pl-3 text-sm font-medium text-foreground">
            “Acerto assistido não prova domínio autônomo.”
          </blockquote>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="mb-3 text-sm font-semibold">Nesta página</h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-sm font-semibold">Equipe</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {team.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold">Projeto</h2>
          <dl className="space-y-2 text-sm">
            {projectFacts.map((fact) => (
              <div key={fact.term}>
                <dt className="text-xs font-medium text-foreground">{fact.term}</dt>
                <dd className="text-muted-foreground">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Separator />
        <div className="flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYears /> ADIA-Framework
          </p>
          <p>Aprendizado inteligente. Pessoas em evolução.</p>
        </div>
      </div>
    </footer>
  )
}
