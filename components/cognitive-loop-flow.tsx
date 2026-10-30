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

import { cn } from "@/lib/utils"

interface Step {
  icon: LucideIcon
  title: string
  body: string
}

// Etapas 2 a 4 do ciclo do artigo CognitiveLoop/ADIA (seção 3.2).
const steps: Step[] = [
  {
    icon: MessageCircleQuestionIcon,
    title: "Prática assistida",
    body: "O tutor dá pistas só até o teto atual (L1 a L4), nunca a resposta. Daqui sai o acerto com ajuda (A).",
  },
  {
    icon: PencilLineIcon,
    title: "Desafio independente",
    body: "Itens equivalentes, sem a IA. O aluno diz o quanto confia em cada resposta. Daqui saem o acerto sem ajuda (I) e a confiança (C).",
  },
  {
    icon: ScaleIcon,
    title: "Comparação",
    body: "Gap: G = A − I. Viés: B = C − I. Sem itens válidos, não há comparação.",
  },
]

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
          <p className="text-sm leading-relaxed text-foreground/75">
            A regra escolhe, em ordem de prioridade, entre reduzir a ajuda,
            pedir explicação, elevar a ajuda ou manter. Teste no simulador
            abaixo.
          </p>
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
