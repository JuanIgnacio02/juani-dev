"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { GithubIcon, LinkedinIcon } from "@/components/os/brand-icons"

function MendozaClock() {
  const [time, setTime] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-AR", {
      timeZone: "America/Argentina/Mendoza",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ?? "--:--:--"}
    </span>
  )
}

/** Barra de menú superior del "sistema operativo". */
export function MenuBar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  return (
    <header className="fixed inset-x-0 top-0 z-[70] flex h-9 items-center justify-between border-b border-border/60 bg-background/75 px-4 font-mono text-[0.68rem] tracking-[0.14em] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <span aria-hidden className="text-primary">
          ✦
        </span>
        <span className="font-semibold text-foreground">juani.dev</span>
        <span className="hidden text-muted-foreground sm:inline">
          — Portfolio de Juan Ignacio Pérez
        </span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/JuanIgnacio02"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <GithubIcon className="size-3.5" />
        </a>
        <a
          href="https://www.linkedin.com/in/juan-ignacio-p%C3%A9rez-pe%C3%B1a-769bba3ab/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <LinkedinIcon className="size-3.5" />
        </a>
        <button
          aria-label="Cambiar tema"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          {mounted && resolvedTheme === "dark" ? (
            <Sun className="size-3.5" />
          ) : (
            <Moon className="size-3.5" />
          )}
        </button>
        <span className="hidden text-muted-foreground sm:inline">
          MDZ <MendozaClock />
        </span>
      </div>
    </header>
  )
}
