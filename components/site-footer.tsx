import Link from "next/link"
import { cacheLife } from "next/cache"

import { FadingBar } from "@/components/fading-bar"
import { Logo } from "@/components/logo"
import { Separator } from "@/components/ui/separator"
import { navItems } from "@/lib/navigation"
import { cn } from "@/lib/utils"

const IDEA_YEAR = 2026

const team = [
  "Lucas Abreu Estrela",
  "Kauã Marques Almeida",
  "Adriano Vedana Vargas",
  "Guilherme Athayde Miguéis Alves",
] as const

const projectFacts = [
  {
    term: "Instituição",
    detail: "UNISENAI Cuiabá, Centro Universitário SENAI Mato Grosso",
  },
  { term: "Professor Orientador", detail: "Prof. Paulo Guilherme Paes da Silva" },
  { term: "Local e ano", detail: `Cuiabá-MT, ${IDEA_YEAR}` },
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

// Sublinhado: link dentro de frase precisa se distinguir do texto sem depender da cor.
const licenseLinkClass = "text-xs underline underline-offset-2"

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-muted/40">
      <FadingBar inView />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-8 lg:grid-cols-[1.3fr_0.7fr_1fr_1.5fr]">
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
          <h2 className="mb-3 text-sm font-semibold">Autores</h2>
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
          <div className="space-y-1">
            <p>
              © <CopyrightYears /> ADIA-Framework. Todos os direitos sobre o
              nome e a marca reservados aos autores.
            </p>
            <p>
              Código sob{" "}
              <a
                href="https://www.gnu.org/licenses/agpl-3.0.html"
                target="_blank"
                rel="noopener noreferrer license"
                className={cn(linkClass, licenseLinkClass)}
              >
                AGPL-3.0<span className="sr-only"> (abre em nova aba)</span>
              </a>
              . Textos e figuras sob{" "}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br"
                target="_blank"
                rel="noopener noreferrer license"
                className={cn(linkClass, licenseLinkClass)}
              >
                CC BY-NC-SA 4.0<span className="sr-only"> (abre em nova aba)</span>
              </a>
              .
            </p>
          </div>
          <p>Aprendizado inteligente. Pessoas em evolução.</p>
        </div>
      </div>
    </footer>
  )
}
