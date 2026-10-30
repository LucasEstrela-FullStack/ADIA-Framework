"use client"

import {
  ArrowDownIcon,
  ArrowRightIcon,
  RepeatIcon,
  type LucideIcon,
  MessageCircleQuestionIcon,
  PencilLineIcon,
  ScaleIcon,
} from "lucide-react"
import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Step {
  icon: LucideIcon
  title: string
  body: string
}

const steps: Step[] = [
  {
    icon: PencilLineIcon,
    title: "Etapa independente",
    body: "O aluno resolve problemas sem a IA. Daqui sai o acerto sem ajuda (independente).",
  },
  {
    icon: MessageCircleQuestionIcon,
    title: "Etapa assistida",
    body: "O tutor dá pistas só até o teto atual (L1 a L4), nunca a resposta. Daqui sai o acerto com ajuda (assistido).",
  },
  {
    icon: ScaleIcon,
    title: "Fim do ciclo: comparação",
    body: "Gap: acerto com ajuda menos acerto sem ajuda. Viés: confiança declarada menos acerto sem ajuda.",
  },
]

// Limiares do dossiê (0,8 / 0,25 / 0,2 / 0,4) escritos em % e pontos percentuais.
const decisions = [
  {
    label: "Fading",
    effect: "Teto desce um nível",
    when: "Sem ajuda ≥ 80%, gap ≤ 25 pontos e |viés| ≤ 20 pontos",
    highlight: true,
  },
  {
    label: "Onloading",
    effect: "Teto se mantém e o aluno explica antes da dica",
    when: "Gap > 25 pontos",
  },
  {
    label: "Escalonar",
    effect: "Teto sobe um nível",
    when: "Sem ajuda < 40% e gap ≤ 25 pontos",
  },
  {
    label: "Manter",
    effect: "Nada muda",
    when: "Qualquer outro caso",
  },
] as const

// Só desloca, sem esconder: o texto aparece mesmo sem JavaScript.
const reveal = {
  initial: { y: 12 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.4 },
} as const

export function CognitiveLoopFlow() {
  return (
    <ol className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
      {steps.map((step, index) => (
        <FlowItem key={step.title} index={index}>
          <div className="flex h-full flex-col gap-3 rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                <step.icon aria-hidden className="size-4" />
              </span>
              <span className="text-xs font-medium text-muted-foreground tabular-nums">
                Passo {index + 1}
              </span>
            </div>
            <h3 className="text-sm font-semibold">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </div>
        </FlowItem>
      ))}

      <FlowItem index={steps.length} last>
        <div className="flex h-full flex-col gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold">
              Passo 4 · O teto se ajusta
            </h3>
            <span className="flex items-center gap-1 text-xs text-foreground/75">
              <RepeatIcon aria-hidden className="size-3.5" />
              volta ao passo 1
            </span>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {decisions.map((decision) => (
              <li
                key={decision.label}
                className="space-y-1 rounded-lg border bg-background p-3"
              >
                <Badge
                  variant={"highlight" in decision ? "default" : "outline"}
                >
                  {decision.label}
                </Badge>
                <p className="text-sm font-medium">{decision.effect}</p>
                <p className="text-xs text-muted-foreground">
                  {decision.when}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </FlowItem>
    </ol>
  )
}

interface FlowItemProps {
  index: number
  last?: boolean
  children: React.ReactNode
}

// Cada passo vira um <li>; a seta entre passos é decorativa e fica fora da leitura.
// No desktop, passos 1 a 3 ficam numa linha e o passo 4 ocupa a linha de baixo.
function FlowItem({ index, last = false, children }: FlowItemProps) {
  const beforeLast = index === steps.length - 1
  return (
    <>
      <motion.li
        {...reveal}
        transition={{ delay: index * 0.12, duration: 0.4 }}
        className={cn("min-w-0", last && "lg:col-span-full")}
      >
        {children}
      </motion.li>
      {!last && (
        <motion.li
          aria-hidden
          {...reveal}
          transition={{ delay: index * 0.12 + 0.06, duration: 0.4 }}
          className={cn(
            "flex items-center justify-center text-primary/60",
            beforeLast && "lg:col-span-full"
          )}
        >
          <ArrowDownIcon className={cn("size-4", !beforeLast && "lg:hidden")} />
          {!beforeLast && <ArrowRightIcon className="hidden size-4 lg:block" />}
        </motion.li>
      )}
    </>
  )
}
