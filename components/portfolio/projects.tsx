"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Project = {
  title: string
  subtitle: string
  description: string
  tags: string[]
  href: string
  image: string
}

const projects: Project[] = [
  {
    title: "RUPER",
    subtitle: "Alimentos Balanceados · Malargüe",
    description:
      "Sitio para una veterinaria y distribuidora. Catálogo dinámico con filtros por tipo de animal, pedidos directos por WhatsApp y panel conectado a una base de datos.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind", "Supabase", "GSAP"],
    href: "https://web-ruper.vercel.app",
    image: "/projects/ruper.png",
  },
  {
    title: "AGUSTINA",
    subtitle: "Moda & Accesorios · San Rafael",
    description:
      "Tienda online de moda femenina con catálogo dinámico, carrito de compras, panel de administración y optimización automática de imágenes a WebP en la nube.",
    tags: ["JavaScript", "Cloudflare Workers", "Cloudflare R2", "WebP"],
    href: "https://agustinasr.vercel.app",
    image: "/projects/agustina.png",
  },
  {
    title: "Estudio Jurídico Pérez",
    subtitle: "Abogada Gimena Pérez · San Rafael",
    description:
      "Sitio profesional para un estudio jurídico, con páginas por área de práctica, animaciones de scroll y un diseño sobrio pensado para transmitir confianza.",
    tags: ["HTML5", "CSS3", "JavaScript", "GSAP", "Cloudflare Pages"],
    href: "https://gimenaperezabogada.com.ar",
    image: "/projects/estudio.png",
  },
]

function BrowserFrame({
  image,
  title,
  href,
}: {
  image: string
  title: string
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group/frame relative block rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {/* Glow */}
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover/frame:opacity-100"
      />
      <div className="overflow-hidden rounded-2xl ring-1 ring-foreground/10 shadow-2xl shadow-black/5 transition-transform duration-500 group-hover/frame:-translate-y-1.5">
        {/* Barra de navegador */}
        <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/60 px-4 py-2.5 backdrop-blur">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-yellow-400/80" />
          <span className="size-2.5 rounded-full bg-green-400/80" />
          <span className="ml-3 hidden truncate text-xs text-muted-foreground sm:block">
            {href.replace("https://", "")}
          </span>
        </div>
        {/* Captura */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={image}
            alt={`Captura del proyecto ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover/frame:scale-[1.04]"
          />
        </div>
      </div>
    </a>
  )
}

const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export function Projects() {
  return (
    <section id="proyectos" className="scroll-mt-20 border-t border-border/60">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.08 }}
          className="flex flex-col gap-2"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium tracking-widest text-muted-foreground uppercase"
          >
            Trabajo seleccionado
          </motion.span>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Proyectos
          </motion.h2>
        </motion.div>

        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ staggerChildren: 0.12, delayChildren: 0.05 }}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              {/* Imagen */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
                  show: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.6, ease: easeOut }}
                className={i % 2 === 1 ? "md:order-2" : undefined}
              >
                <BrowserFrame
                  image={project.image}
                  title={project.title}
                  href={project.href}
                />
              </motion.div>

              {/* Texto */}
              <div className={i % 2 === 1 ? "md:order-1" : undefined}>
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="flex items-baseline gap-3"
                >
                  <span className="font-heading text-sm font-medium text-muted-foreground tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </motion.div>

                <motion.h3
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="font-heading mt-4 text-2xl font-semibold tracking-tight"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="text-sm font-medium text-muted-foreground"
                >
                  {project.subtitle}
                </motion.p>

                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty"
                >
                  {project.description}
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="mt-5 flex flex-wrap gap-1.5"
                >
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="mt-6"
                >
                  <Button asChild>
                    <a href={project.href} target="_blank" rel="noreferrer">
                      Ver sitio
                      <ArrowUpRight />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
