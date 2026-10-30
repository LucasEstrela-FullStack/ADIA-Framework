"use client"

import { motion } from "motion/react"
import { useId } from "react"

import { easeOut } from "@/lib/motion"

interface RevealProps {
  children: React.ReactNode
  /** Posição na sequência: cada item entra um pouco depois do anterior. */
  index?: number
  as?: "div" | "li"
  className?: string
}

// Só desloca, sem esconder: o texto aparece mesmo sem JavaScript.
export function Reveal({ children, index = 0, as = "div", className }: RevealProps) {
  const Component = as === "li" ? motion.li : motion.div
  return (
    <Component
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: easeOut }}
      className={className}
    >
      {children}
    </Component>
  )
}

interface DrawPathProps {
  d: string
  /** Largura e altura do viewBox do SVG. */
  width: number
  height: number
  className?: string
}

// Revela a linha do teto da esquerda para a direita quando entra na tela.
// Recorte em vez de pathLength: o tracejado do pathLength quebra com non-scaling-stroke.
export function DrawPath({ d, width, height, className }: DrawPathProps) {
  const clipId = useId()
  return (
    <motion.g
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.8 }}
    >
      <clipPath id={clipId}>
        <motion.rect
          x={0}
          y={-4}
          height={height + 8}
          variants={{ hidden: { width: 0 }, shown: { width } }}
          transition={{ duration: 1.2, ease: easeOut }}
        />
      </clipPath>
      <path
        d={d}
        fill="none"
        strokeWidth={2}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        clipPath={`url(#${clipId})`}
        className={className}
      />
    </motion.g>
  )
}
