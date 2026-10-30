"use client"

import { useId, useState } from "react"
import { ArrowRightIcon, InfoIcon, MessageSquareWarningIcon } from "lucide-react"
import { motion } from "motion/react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  type Decision,
  decide,
  nextCeiling,
  scenarios,
} from "@/lib/cognitive-loop"
import { easeOut } from "@/lib/motion"
import { cn } from "@/lib/utils"

const decisionText: Record<Decision, { label: string; effect: string }> = {
  reduzir: { label: "Reduzir ajuda", effect: "O teto desce um nível." },
  explicar: {
    label: "Pedir explicação",
    effect: "O teto se mantém e o aluno explica o conceito antes da próxima dica.",
  },
  elevar: { label: "Elevar ajuda", effect: "O teto sobe um nível." },
  manter: { label: "Manter", effect: "Nada muda no próximo ciclo." },
  insuficiente: {
    label: "Dados insuficientes",
    effect: "O teto não muda até haver nova observação.",
  },
}

// Ordem de prioridade da regra principal; a primeira condição verdadeira vale.
const rules: { decision: Decision; when: string }[] = [
  { decision: "reduzir", when: "Sem ajuda ≥ 80%, gap ≤ 25 pontos e |viés| ≤ 20 pontos" },
  { decision: "explicar", when: "Gap > 25 pontos" },
  { decision: "elevar", when: "Sem ajuda < 40% e gap ≤ 25 pontos" },
  { decision: "manter", when: "Qualquer outro caso" },
]

const scenarioItems = scenarios.map((scenario) => ({
  value: scenario.id,
  label: `${scenario.id} · ${scenario.note}`,
}))

const percent = new Intl.NumberFormat("pt-BR", { style: "percent" })
const points = new Intl.NumberFormat("pt-BR", { signDisplay: "exceptZero" })
const formatPoints = (value: number) => `${points.format(Math.round(value * 100))} pontos`
// O Slider da UI não repassa o genérico: o valor chega como número ou lista.
const first = (value: number | readonly number[]) =>
  typeof value === "number" ? value : value[0]

interface SimulatorState {
  assisted: number
  independent: number
  confidence: number
  /** Desafio independente sem itens válidos (nI = 0). */
  missing: boolean
  ceiling: number
}

function fromScenario(id: string, ceiling: number): SimulatorState {
  const { input } = scenarios.find((scenario) => scenario.id === id) ?? scenarios[0]
  return {
    assisted: input.assisted,
    independent: input.independent ?? 0.5,
    confidence: input.confidence,
    missing: input.independent === null,
    ceiling,
  }
}

export function CognitiveLoopSimulator() {
  const id = useId()
  const [scenarioId, setScenarioId] = useState<string | null>("S1")
  const [state, setState] = useState(() => fromScenario("S1", 3))

  const result = decide({
    assisted: state.assisted,
    independent: state.missing ? null : state.independent,
    confidence: state.confidence,
  })
  const next = nextCeiling(state.ceiling, result.decision)
  const text = decisionText[result.decision]

  function update(patch: Partial<SimulatorState>) {
    setScenarioId(null)
    setState((current) => ({ ...current, ...patch }))
  }

  const sliders = [
    { key: "assisted", label: "Acerto com ajuda (A)" },
    { key: "independent", label: "Acerto sem ajuda (I)" },
    { key: "confidence", label: "Confiança média declarada (C)" },
  ] as const

  return (
    <div className="grid gap-8 rounded-xl border bg-card p-5 sm:p-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label id={`${id}-scenario`}>Cenário do artigo</Label>
          <Select
            items={scenarioItems}
            value={scenarioId}
            onValueChange={(value) => {
              if (!value) return
              setScenarioId(value)
              setState((current) => fromScenario(value, current.ceiling))
            }}
          >
            <SelectTrigger aria-labelledby={`${id}-scenario`} className="w-full">
              <SelectValue placeholder="Valores ajustados à mão" />
            </SelectTrigger>
            <SelectContent>
              {scenarioItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Exemplos hipotéticos da Tabela 5, não dados de alunos.
          </p>
        </div>

        {sliders.map((slider) => {
          const disabled = slider.key === "independent" && state.missing
          return (
            <div key={slider.key} className="space-y-3">
              <div className="flex items-baseline justify-between gap-3">
                <Label id={`${id}-${slider.key}`}>{slider.label}</Label>
                <span className="font-mono text-sm tabular-nums">
                  {disabled ? "—" : percent.format(state[slider.key])}
                </span>
              </div>
              <Slider
                aria-labelledby={`${id}-${slider.key}`}
                value={[state[slider.key]]}
                onValueChange={(value) => update({ [slider.key]: first(value) })}
                min={0}
                max={1}
                step={0.05}
                format={{ style: "percent" }}
                locale="pt-BR"
                disabled={disabled}
              />
            </div>
          )
        })}

        <Label className="flex items-center gap-3 text-sm font-normal">
          <Switch
            checked={state.missing}
            onCheckedChange={(missing) => update({ missing })}
          />
          Desafio independente sem itens válidos
        </Label>

        <div className="space-y-3">
          <div className="flex items-baseline justify-between gap-3">
            <Label id={`${id}-ceiling`}>Teto atual de ajuda</Label>
            <span className="font-mono text-sm">L{state.ceiling}</span>
          </div>
          <Slider
            aria-labelledby={`${id}-ceiling`}
            value={[state.ceiling]}
            onValueChange={(value) =>
              setState((current) => ({ ...current, ceiling: first(value) }))
            }
            min={1}
            max={4}
            step={1}
          />
          <p className="flex justify-between text-xs text-muted-foreground">
            <span>L1 menos ajuda</span>
            <span>L4 mais ajuda</span>
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div
          role="status"
          className="space-y-3 rounded-lg border border-primary/30 bg-primary/5 p-4"
        >
          <motion.div
            key={`${result.decision}-${next}`}
            initial={{ y: 6 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="flex flex-wrap items-center gap-3"
          >
            <Badge>{text.label}</Badge>
            <span className="flex items-center gap-2 font-mono text-lg font-semibold">
              L{state.ceiling}
              <ArrowRightIcon aria-label="para" className="size-4 text-primary" />
              L{next}
            </span>
          </motion.div>
          <p className="text-sm text-foreground/75">{text.effect}</p>
          {result.gap !== null && result.bias !== null && (
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-foreground/75">Gap (A − I)</dt>
                <dd className="font-mono tabular-nums">{formatPoints(result.gap)}</dd>
              </div>
              <div>
                <dt className="text-xs text-foreground/75">Viés (C − I)</dt>
                <dd className="font-mono tabular-nums">{formatPoints(result.bias)}</dd>
              </div>
            </dl>
          )}
        </div>

        {result.askJustification && (
          <Alert>
            <MessageSquareWarningIcon aria-hidden />
            <AlertTitle>Regra auxiliar: viés acima de 25 pontos</AlertTitle>
            <AlertDescription>
              O aluno confia mais do que acerta. O tutor pede uma justificativa,
              sem mudar o teto por causa disso.
            </AlertDescription>
          </Alert>
        )}
        {result.gap !== null && result.gap < 0 && (
          <Alert>
            <InfoIcon aria-hidden />
            <AlertTitle>Gap negativo</AlertTitle>
            <AlertDescription>
              Acertar mais sem ajuda pode indicar itens de dificuldade diferente.
              Vale verificar os instrumentos.
            </AlertDescription>
          </Alert>
        )}

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-8">#</TableHead>
              <TableHead>Decisão</TableHead>
              <TableHead>Quando</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule, index) => {
              const active = rule.decision === result.decision
              return (
                <TableRow
                  key={rule.decision}
                  data-state={active ? "selected" : undefined}
                  aria-current={active || undefined}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell className={cn("font-medium", active && "text-primary")}>
                    {decisionText[rule.decision].label}
                    {active && <span className="sr-only"> (aplicada)</span>}
                  </TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">
                    {rule.when}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <p className="text-xs text-muted-foreground">
          Sem itens válidos com ou sem ajuda, a regra não decide. A primeira
          linha verdadeira vale.
        </p>
      </div>
    </div>
  )
}
