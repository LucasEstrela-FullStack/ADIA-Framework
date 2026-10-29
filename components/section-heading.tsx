import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  lead?: React.ReactNode
  className?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl space-y-3", className)}>
      <p className="text-sm font-semibold text-primary">{eyebrow}</p>
      <h2
        id={id}
        className="text-2xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {lead && (
        <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {lead}
        </p>
      )}
    </div>
  )
}
