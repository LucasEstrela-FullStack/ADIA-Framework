"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#desafio", label: "Desafio" },
  { href: "#solucao", label: "Solução" },
  { href: "#pesquisa", label: "Pesquisa" },
  { href: "#metricas", label: "Métricas" },
  { href: "#documentacao", label: "Documentação" },
] as const

// Opacidade dos 4 níveis de suporte (L1 a L4): a faixa some como a ajuda no fading.
const fadingLevels = ["opacity-100", "opacity-65", "opacity-40", "opacity-20"]

const easeOut = [0.22, 1, 0.36, 1] as const

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const pendingHref = useRef<string | null>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8))

  // O Sheet trava o scroll enquanto aberto; só rola até a seção depois que ele fecha.
  function scrollToPending(open: boolean) {
    const href = pendingHref.current
    if (open || !href) return
    pendingHref.current = null
    history.pushState(null, "", href)
    document.querySelector(href)?.scrollIntoView()
  }

  return (
    <MotionConfig reducedMotion="user">
      <header
        className={cn(
          "sticky top-0 z-40 backdrop-blur transition-[background-color,box-shadow] duration-300",
          scrolled
            ? "bg-background/90 shadow-sm"
            : "bg-background/70 supports-[backdrop-filter]:bg-background/60"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <Link
            href="/"
            className="shrink-0 rounded-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <Image
              src="/img/adia-logo.png"
              alt="ADIA-Framework, início"
              width={128}
              height={44}
              loading="eager"
              className="h-11 w-auto"
            />
          </Link>

          <nav aria-label="Principal" className="-mr-2 hidden md:block">
            <ul className="flex gap-1" onMouseLeave={() => setHovered(null)}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onPointerEnter={(event) =>
                      event.pointerType === "mouse" && setHovered(item.href)
                    }
                    className="relative isolate inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <AnimatePresence>
                      {hovered === item.href && (
                        <motion.span
                          layoutId="nav-hover"
                          aria-hidden
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 40,
                          }}
                          className="absolute inset-0 -z-10 rounded-lg bg-muted"
                        />
                      )}
                    </AnimatePresence>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Sheet
            open={menuOpen}
            onOpenChange={setMenuOpen}
            onOpenChangeComplete={scrollToPending}
          >
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="size-11 md:hidden" />
              }
            >
              <MenuIcon />
              <span className="sr-only">Abrir menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              finalFocus={false}
              className="p-6 motion-reduce:data-ending-style:translate-x-0 motion-reduce:data-starting-style:translate-x-0"
            >
              <SheetTitle>Nesta página</SheetTitle>
              <nav aria-label="Principal">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ x: 16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.04 + index * 0.03,
                        duration: 0.25,
                        ease: easeOut,
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={(event) => {
                          event.preventDefault()
                          pendingHref.current = item.href
                          setMenuOpen(false)
                        }}
                        className="block rounded-md px-3 py-3 text-base font-medium hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div aria-hidden className="grid h-0.5 grid-cols-4 gap-1">
          {fadingLevels.map((opacity, index) => (
            <motion.span
              key={opacity}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.3 + index * 0.12,
                duration: 0.6,
                ease: easeOut,
              }}
              className={cn("origin-left bg-primary", opacity)}
            />
          ))}
        </div>
      </header>
    </MotionConfig>
  )
}
