"use client"

import * as React from "react"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react"
import { ArrowDown, Mail } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ctaHover, ctaHoverSoft } from "@/components/portfolio/anim"

function GithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

const easeOut = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  // Parallax muy sutil: el fondo se mueve más lento que el contenido al scrollear.
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 45])
  const bgFade = useTransform(scrollYProgress, [0, 1], [1, 0.2])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Glow de fondo (parallax + respiración lenta) */}
      <motion.div
        aria-hidden
        style={{ y: glowY, opacity: bgFade }}
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.06, 1] }}
          transition={{
            opacity: { duration: 1.4, ease: "easeOut" },
            scale: { duration: 11, repeat: Infinity, ease: "easeInOut" },
          }}
          className="h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-primary/25 via-primary/5 to-transparent blur-3xl"
        />
      </motion.div>
      {/* Grid sutil (parallax) */}
      <motion.div
        aria-hidden
        style={{ y: gridY, opacity: bgFade }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.15] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 py-28 md:py-40"
      >
        <motion.div variants={item}>
          <Badge variant="secondary" className="h-6 px-3">
            <span className="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-emerald-500" />
            Disponible para proyectos
          </Badge>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl"
        >
          Hola, soy Juani.
          <br />
          <span className="text-muted-foreground">
            Construyo productos web modernos.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty"
        >
          Desarrollador full-stack especializado en React, Next.js y diseño de
          interfaces. Convierto ideas en experiencias rápidas, accesibles y
          cuidadas hasta el último detalle.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap items-center gap-2 pt-2"
        >
          <Button asChild size="lg" className={`group/cta ${ctaHover}`}>
            <a href="#proyectos">
              Ver proyectos
              <ArrowDown className="transition-transform duration-200 group-hover/cta:translate-y-0.5" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className={`group/cta ${ctaHoverSoft}`}
          >
            <a href="#contacto">
              <Mail className="transition-transform duration-200 group-hover/cta:-translate-y-0.5" />
              Contactame
            </a>
          </Button>
          <div className="ml-1 flex items-center gap-1">
            <Button
              asChild
              variant="ghost"
              size="icon-lg"
              aria-label="GitHub"
              className="transition-transform duration-200 hover:scale-110"
            >
              <a
                href="https://github.com/JuanIgnacio02"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon-lg"
              aria-label="LinkedIn"
              className="transition-transform duration-200 hover:scale-110"
            >
              <a
                href="https://www.linkedin.com/in/juan-ignacio-p%C3%A9rez-pe%C3%B1a-769bba3ab/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinIcon className="size-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
