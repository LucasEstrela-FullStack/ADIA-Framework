"use client"

import { motion } from "motion/react"

import { easeOut } from "@/lib/motion"

// Ilustração qualitativa: as alturas (em %) não são dados da pesquisa.
const assisted = { label: "Acerto com ajuda", sub: "na prática com IA", height: 88 }
const independent = { label: "Acerto sem ajuda", sub: "na avaliação", height: 38 }
const bars = [assisted, independent]

export function GapIllustration() {
  return (
    <figure className="rounded-xl border bg-card p-5 sm:p-6">
      {/* Um único gatilho no container: barras e colchete animam juntos. */}
      <motion.div
        aria-hidden
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.6 }}
        className="relative flex h-64 items-end justify-center gap-10 border-b pb-px sm:gap-16"
      >
        {bars.map((bar, index) => (
          <div key={bar.label} className="flex h-full w-28 items-end sm:w-32">
            <motion.div
              variants={{
                hidden: { height: 0 },
                shown: {
                  height: `${bar.height}%`,
                  transition: { delay: index * 0.25, duration: 0.8, ease: easeOut },
                },
              }}
              className={
                bar === assisted
                  ? "w-full rounded-t-md bg-primary"
                  : "w-full rounded-t-md bg-primary/35"
              }
            />
          </div>
        ))}

        <motion.span
          variants={{
            hidden: { opacity: 0 },
            shown: { opacity: 1, transition: { delay: 1.1, duration: 0.4 } },
          }}
          style={{
            top: `${100 - assisted.height}%`,
            bottom: `${independent.height}%`,
          }}
          className="absolute left-1/2 w-3.5 -translate-x-1/2 border-y-2 border-l-2 border-dashed border-destructive/70"
        />
      </motion.div>

      <div aria-hidden className="mt-3 flex justify-center gap-10 text-center sm:gap-16">
        {bars.map((bar) => (
          <div key={bar.label} className="w-28 sm:w-32">
            <p className="text-sm font-medium">{bar.label}</p>
            <p className="text-xs text-muted-foreground">{bar.sub}</p>
          </div>
        ))}
      </div>

      <figcaption className="mt-5 space-y-1 border-t pt-4 text-sm">
        <p className="sr-only">
          Acerto com ajuda, na prática com IA: barra alta. Acerto sem ajuda, na
          avaliação: barra bem mais baixa.
        </p>
        <p>
          <span className="font-semibold text-destructive">Gap:</span> a
          diferença entre o acerto com ajuda e o acerto sem ajuda.
        </p>
        <p className="text-xs text-muted-foreground">
          Ilustração do padrão descrito por Bastani et al. (2025). As alturas
          não são dados da pesquisa.
        </p>
      </figcaption>
    </figure>
  )
}
