import Link from "next/link"
import { ArrowDownIcon } from "lucide-react"

import { HeroLevels } from "@/components/hero-levels"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Entrada em CSS (tw-animate-css): o texto aparece mesmo sem JavaScript.
const enter =
  "animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 motion-reduce:animate-none"

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="space-y-6">
          <Badge
            variant="secondary"
            className={cn(enter, "h-auto py-0.5 text-left whitespace-normal")}
          >
            ADIA-Framework · Faculdade de Tecnologia SENAI MT · 2026
          </Badge>

          <h1
            id="hero-title"
            className={`${enter} text-3xl font-semibold tracking-tight text-balance delay-100 sm:text-5xl lg:text-6xl`}
          >
            Acerto assistido não prova domínio autônomo.
          </h1>

          <p
            className={`${enter} max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground delay-200`}
          >
            Um tutor de IA que mede o acerto do aluno com e sem ajuda. A ajuda
            só diminui quando ele mostra que resolve sozinho.
          </p>

          <div className={`${enter} flex flex-wrap gap-3 delay-300`}>
            <Link href="#solucao" className={cn(buttonVariants({ size: "lg" }))}>
              Conhecer a solução
            </Link>
            <Link
              href="#pesquisa"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-foreground/25 hover:border-foreground/40"
              )}
            >
              Sobre a pesquisa
              <ArrowDownIcon aria-hidden />
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroLevels />
        </div>
      </div>
    </section>
  )
}
