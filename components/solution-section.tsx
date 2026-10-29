import { CognitiveLoopFlow } from "@/components/cognitive-loop-flow"
import { SectionHeading } from "@/components/section-heading"

export function SolutionSection() {
  return (
    <section id="solucao" aria-labelledby="solucao-title">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-16 sm:px-6 md:py-24">
        <SectionHeading
          id="solucao-title"
          eyebrow="A solução"
          title="O CognitiveLoop, o ciclo do ADIA-Framework"
          lead="O tutor mede o acerto do aluno com e sem ajuda. Ao fim de cada ciclo, compara os dois e decide quanta ajuda ele pode receber no próximo."
        />
        <CognitiveLoopFlow />
      </div>
    </section>
  )
}
