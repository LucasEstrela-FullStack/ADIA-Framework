import Image from "next/image"

const alt = "ADIA-Framework, início"

// O wordmark do logo é preto; no tema escuro troca pela versão clara.
// shortcut: o navegador baixa as duas versões (~13 KB extra); evitar exigiria saber o tema no servidor.
export function Logo({ eager = false }: { eager?: boolean }) {
  const fetchPriority = eager ? "high" : undefined

  return (
    <>
      <Image
        src="/img/adia-logo.png"
        alt={alt}
        width={128}
        height={44}
        fetchPriority={fetchPriority}
        className="h-11 w-auto dark:hidden"
      />
      <Image
        src="/img/adia-logo-dark.png"
        alt={alt}
        width={128}
        height={44}
        fetchPriority={fetchPriority}
        className="hidden h-11 w-auto dark:block"
      />
    </>
  )
}
