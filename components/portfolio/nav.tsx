"use client"

import * as React from "react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

const links = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#stack", label: "Stack" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
]

export function Nav() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <a href="#" className="font-heading text-sm font-semibold tracking-tight">
          juani<span className="text-muted-foreground">.dev</span>
        </a>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 sm:flex">
            {links.map((link) => (
              <Button key={link.href} asChild variant="ghost" size="sm">
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Cambiar tema"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {mounted && resolvedTheme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}
