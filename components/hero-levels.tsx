"use client"

import { useEffect, useRef, useState } from "react"
import { RotateCcwIcon } from "lucide-react"
import { useInView, useReducedMotion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

// L4 no topo: o teto desce visualmente conforme a ajuda é reduzida.
const levels = [
  {
    id: 4,
    name: "Exemplo resolvido",
    hint: "Mostra um problema parecido já resolvido, nunca a resposta",
  },
  { id: 3, name: "Procedural", hint: "Indica a estratégia e o primeiro passo" },
  { id: 2, name: "Conceitual", hint: "Explica os conceitos envolvidos" },
  {
    id: 1,
    name: "Metacognitivo",
    hint: "Pergunta o que o aluno já sabe e pede o objetivo da questão",
  },
] as const

const MAX_CEILING = 4

// Roda uma vez ao entrar na tela e para em L1. Com movimento reduzido, só roda pelo botão.
export function HeroLevels() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const [ceiling, setCeiling] = useState(MAX_CEILING)
  const [replayed, setReplayed] = useState(false)
  const playing = (inView && !reduceMotion) || replayed

  useEffect(() => {
    if (!playing || ceiling <= 1) return
    const timer = setTimeout(
      () => setCeiling((current) => current - 1),
      ceiling === MAX_CEILING ? 900 : 1500
    )
    return () => clearTimeout(timer)
  }, [playing, ceiling])

  function replay() {
    setCeiling(MAX_CEILING)
    setReplayed(true)
  }

  const running = playing && ceiling > 1

  return (
      <Card ref={ref} className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Teto de ajuda da IA</CardTitle>
          <CardDescription>
            Cada nível é um tipo de dica. O teto é a dica mais forte que o
            tutor pode dar agora, e desce conforme o aluno resolve sozinho.
          </CardDescription>
          <CardAction>
            <Badge variant="outline" className="tabular-nums">
              Teto: L{ceiling}
            </Badge>
          </CardAction>
        </CardHeader>

        <CardContent>
          <ol className="space-y-2">
            {levels.map((level) => {
              const available = level.id <= ceiling
              const isCeiling = level.id === ceiling
              return (
                <li
                  key={level.id}
                  aria-current={isCeiling ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors duration-400 motion-reduce:transition-none",
                    available
                      ? "border-primary/30 bg-primary/5"
                      : "border-dashed bg-muted/40"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-md text-xs font-semibold transition-colors duration-400 motion-reduce:transition-none",
                      available
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    L{level.id}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-sm font-medium",
                        !available &&
                          "text-muted-foreground line-through decoration-muted-foreground/50"
                      )}
                    >
                      {level.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {level.hint}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {isCeiling ? "teto" : available ? "disponível" : "acima do teto"}
                  </span>
                </li>
              )
            })}
          </ol>
        </CardContent>

        <CardFooter className="justify-between gap-3">
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {ceiling === 1
              ? "Resta só a pergunta metacognitiva. Se o acerto sem ajuda cair abaixo de 40% e o gap ficar em até 25 pontos, o teto sobe de novo."
              : "O teto desce quando o acerto sem ajuda chega a 80%, o gap fica em até 25 pontos e a confiança difere do acerto em até 20 pontos."}
          </p>
          <Button
            variant="ghost"
            size="sm"
            focusableWhenDisabled
            disabled={running}
            className="data-disabled:pointer-events-none data-disabled:opacity-50"
            onClick={replay}
          >
            <RotateCcwIcon aria-hidden />
            {playing ? "Repetir" : "Animar"}
          </Button>
        </CardFooter>
      </Card>
  )
}
