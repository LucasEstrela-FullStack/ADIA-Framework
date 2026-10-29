"use client"

import { MotionConfig, motion } from "motion/react"

import { cn } from "@/lib/utils"

// Opacidade dos 4 níveis de suporte (L1 a L4): a faixa some como a ajuda no fading.
const fadingLevels = ["opacity-100", "opacity-65", "opacity-40", "opacity-20"]

const easeOut = [0.22, 1, 0.36, 1] as const

interface FadingBarProps {
  className?: string
  /** Anima quando entra na tela em vez de ao montar. */
  inView?: boolean
}

export function FadingBar({ className, inView = false }: FadingBarProps) {
  return (
    <MotionConfig reducedMotion="user">
    <div aria-hidden className={cn("grid h-0.5 grid-cols-4 gap-1", className)}>
      {fadingLevels.map((opacity, index) => (
        <motion.span
          key={opacity}
          initial={{ scaleX: 0 }}
          {...(inView
            ? { whileInView: { scaleX: 1 }, viewport: { once: true } }
            : { animate: { scaleX: 1 } })}
          transition={{
            delay: (inView ? 0 : 0.3) + index * 0.12,
            duration: 0.6,
            ease: easeOut,
          }}
          className={cn("origin-left bg-primary", opacity)}
        />
      ))}
    </div>
    </MotionConfig>
  )
}
