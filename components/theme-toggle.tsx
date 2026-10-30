"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Os dois ícones vêm do CSS (classe .dark), então servidor e cliente renderizam igual.
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={cn("size-11 md:size-9", className)}
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          />
        }
      >
        <SunIcon aria-hidden className="dark:hidden" />
        <MoonIcon aria-hidden className="hidden dark:block" />
        <span className="sr-only">Alternar tema claro e escuro</span>
      </TooltipTrigger>
      <TooltipContent side="bottom">Tema claro ou escuro</TooltipContent>
    </Tooltip>
  )
}
