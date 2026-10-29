import Image from "next/image"

const alt = "ADIA-Framework, início"

// O wordmark do logo é preto; no tema escuro troca pela versão clara.
export function Logo({ eager = false }: { eager?: boolean }) {
  const loading = eager ? "eager" : "lazy"

  return (
    <>
      <Image
        src="/img/adia-logo.png"
        alt={alt}
        width={128}
        height={44}
        loading={loading}
        className="h-11 w-auto dark:hidden"
      />
      <Image
        src="/img/adia-logo-dark.png"
        alt={alt}
        width={128}
        height={44}
        loading={loading}
        className="hidden h-11 w-auto dark:block"
      />
    </>
  )
}
