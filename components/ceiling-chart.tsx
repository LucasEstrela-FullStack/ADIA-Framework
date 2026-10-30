"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { useReducedMotion } from "motion/react"

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface CeilingChartProps {
  conditions: { letter: "A" | "B" | "C"; name: string; ceiling: number[] }[]
}

// Cor e traço distintos: as linhas se sobrepõem e não podem depender só da cor.
const strokes = {
  A: { color: "var(--muted-foreground)", dash: "6 4" },
  B: { color: "var(--primary)", dash: undefined },
  C: { color: "var(--foreground)", dash: "2 3" },
} as const

export function CeilingChart({ conditions }: CeilingChartProps) {
  const reduceMotion = useReducedMotion()

  const config = Object.fromEntries(
    conditions.map((condition) => [
      condition.letter,
      { label: `${condition.letter} · ${condition.name}`, color: strokes[condition.letter].color },
    ]),
  ) satisfies ChartConfig

  const data = conditions[0].ceiling.map((_, index) => ({
    cycle: index + 1,
    ...Object.fromEntries(
      conditions.map((condition) => [condition.letter, condition.ceiling[index]]),
    ),
  }))

  return (
    <figure className="space-y-2">
      <ChartContainer config={config} className="aspect-auto h-64 w-full">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }} accessibilityLayer>
          <CartesianGrid vertical={false} strokeDasharray="2 3" />
          <XAxis
            dataKey="cycle"
            tickLine={false}
            axisLine={false}
            tickFormatter={(cycle) => `Ciclo ${cycle}`}
          />
          <YAxis
            domain={[1, 4]}
            ticks={[1, 2, 3, 4]}
            tickLine={false}
            axisLine={false}
            width={28}
            tickFormatter={(level) => `L${level}`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                // O rótulo padrão usaria o nome da primeira série; o ciclo vem do ponto.
                labelFormatter={(_, payload) => `Ciclo ${payload[0]?.payload.cycle}`}
              />
}
          />
          <ChartLegend content={<ChartLegendContent className="flex-wrap" />} />
          {conditions.map((condition) => (
            <Line
              key={condition.letter}
              dataKey={condition.letter}
              type="stepAfter"
              stroke={`var(--color-${condition.letter})`}
              strokeWidth={condition.letter === "B" ? 2.5 : 2}
              strokeDasharray={strokes[condition.letter].dash}
              dot={false}
              isAnimationActive={!reduceMotion}
            />
          ))}
        </LineChart>
      </ChartContainer>
      <figcaption className="text-xs text-muted-foreground">
        Teto de ajuda por ciclo: L4 é a ajuda máxima, L1 a mínima. Ilustração
        do comportamento de cada regra, não dado do experimento.
        <span className="sr-only">
          {conditions
            .map((c) => ` Condição ${c.letter}: ${c.ceiling.map((l) => `L${l}`).join(", ")}.`)
            .join("")}
        </span>
      </figcaption>
    </figure>
  )
}
