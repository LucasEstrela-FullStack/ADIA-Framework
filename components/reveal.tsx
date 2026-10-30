"use client"

import { motion } from "motion/react"

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
