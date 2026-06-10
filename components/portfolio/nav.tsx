"use client"

import * as React from "react"
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { linkUnderline } from "@/components/portfolio/anim"

const links = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#stack", label: "Stack" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
]

export function Nav() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const { scrollY } = useScroll()

  React.useEffect(() => setMounted(true), [])
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8))

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border/70 bg-background/80 shadow-sm shadow-black/5"
          : "border-border/40 bg-background/50"
      )}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <a
          href="#"
          className="font-heading text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          juani<span className="text-muted-foreground">.dev</span>
        </a>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 sm:flex">
            {links.map((link) => (
              <Button key={link.href} asChild variant="ghost" size="sm">
                <a href={link.href}>
                  <span className={linkUnderline}>{link.label}</span>
                </a>
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
