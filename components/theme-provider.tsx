"use client"

import { MotionConfig } from "motion/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Também centraliza o MotionConfig: todo motion do site respeita "reduzir movimento".
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  )
}
