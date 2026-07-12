"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowUpRight, Mail, Phone, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

/* ——— README.txt ——— */

export function ReadmeApp({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-2xl font-medium tracking-tight text-balance sm:text-3xl">
        Bienvenido a mi escritorio{" "}
        <span aria-hidden className="text-primary">
          ✦
        </span>
      </h1>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Soy <strong className="text-foreground">Juani</strong>, desarrollador
        full-stack de Mendoza. Esto no es una página: es mi escritorio. Abrí los
        íconos o el dock para explorar, y arrastrá las ventanas a donde quieras.
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        <Button size="sm" onClick={() => onOpen("proyectos")}>
          Ver proyectos
        </Button>
        <Button size="sm" variant="outline" onClick={() => onOpen("contacto")}>
          Contacto
        </Button>
      </div>
      <p className="border-t border-border/60 pt-3 font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase">
        Tip: las ventanas se arrastran desde la barra de título
      </p>
    </div>
  )
}

/* ——— sobre-mi.md ——— */

const stats = [
  { value: "3+", label: "proyectos en producción" },
  { value: "100%", label: "responsive y accesible" },
  { value: "24h", label: "tiempo de respuesta" },
]

export function AboutApp() {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-mono text-[0.65rem] tracking-[0.16em] text-primary uppercase">
        # Sobre mí
      </p>
      <h2 className="font-heading text-xl leading-snug font-medium tracking-tight sm:text-2xl">
        Diseño y código,{" "}
        <em className="font-light text-primary italic">en partes iguales.</em>
      </h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Soy un desarrollador full-stack de Mendoza, Argentina. Me apasiona
        construir productos web que se sientan rápidos, claros y bien resueltos
        —desde la primera línea de diseño hasta el deploy.
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Trabajo principalmente con React, Next.js y TypeScript, y disfruto
        cuidando los detalles: las animaciones, la performance y la experiencia
        de quien usa lo que construyo.
      </p>
      <div className="mt-1 grid grid-cols-3 gap-3 border-t border-border/60 pt-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-heading text-xl font-light text-primary sm:text-2xl">
              {stat.value}
            </div>
            <div className="mt-0.5 font-mono text-[0.58rem] leading-snug tracking-[0.12em] text-muted-foreground uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ——— proyectos/ ——— */

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
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "GSAP",
    ],
    href: "https://web-ruper.vercel.app",
    image: "/projects/ruper.jpg",
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

export function ProjectsApp() {
  return (
    <div className="flex flex-col gap-8">
      {projects.map((project, i) => (
        <article
          key={project.title}
          className="flex flex-col gap-3 border-b border-border/60 pb-8 last:border-b-0 last:pb-0"
        >
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group/shot relative block overflow-hidden rounded-lg ring-1 ring-foreground/10"
          >
            <div className="relative aspect-[16/9] bg-muted">
              <Image
                src={project.image}
                alt={`Captura del proyecto ${project.title}`}
                fill
                sizes="(max-width: 768px) 92vw, 640px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover/shot:scale-[1.03]"
              />
            </div>
            <span className="absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-full bg-background/80 opacity-0 backdrop-blur transition-opacity duration-300 group-hover/shot:opacity-100">
              <ArrowUpRight className="size-3.5" />
            </span>
          </a>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[0.65rem] text-primary tabular-nums">
              0{i + 1}
            </span>
            <h3 className="font-heading text-lg font-medium tracking-tight">
              {project.title}
            </h3>
            <span className="hidden font-mono text-[0.6rem] tracking-[0.12em] text-muted-foreground uppercase sm:inline">
              {project.subtitle}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[0.6rem] tracking-[0.12em] text-muted-foreground uppercase before:mr-1 before:text-primary/60 before:content-['✦']"
              >
                {tag}
              </span>
            ))}
          </div>
          <Button asChild size="sm" className="mt-1 w-fit">
            <a href={project.href} target="_blank" rel="noreferrer">
              Abrir sitio
              <ArrowUpRight />
            </a>
          </Button>
        </article>
      ))}
    </div>
  )
}

/* ——— stack.json ——— */

const stack: Record<string, string[]> = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "GSAP",
    "Motion",
  ],
  backend: ["Node.js", "Supabase", "PostgreSQL", "Cloudflare Workers"],
  infra: ["Vercel", "Cloudflare Pages", "Cloudflare R2", "Git"],
  diseno: ["Figma", "Sistemas de diseño", "Animación de interfaces"],
}

export function StackApp() {
  const entries = Object.entries(stack)
  return (
    <pre className="overflow-x-auto font-mono text-xs leading-[1.9] whitespace-pre">
      <span className="text-muted-foreground">{"{"}</span>
      {"\n"}
      {entries.map(([key, values], gi) => (
        <React.Fragment key={key}>
          {"  "}
          <span className="text-primary">&quot;{key}&quot;</span>
          <span className="text-muted-foreground">: [</span>
          {"\n"}
          {values.map((value, i) => (
            <React.Fragment key={value}>
              {"    "}
              <span className="text-foreground">&quot;{value}&quot;</span>
              <span className="text-muted-foreground">
                {i < values.length - 1 ? "," : ""}
              </span>
              {"\n"}
            </React.Fragment>
          ))}
          {"  "}
          <span className="text-muted-foreground">
            ]{gi < entries.length - 1 ? "," : ""}
          </span>
          {"\n"}
        </React.Fragment>
      ))}
      <span className="text-muted-foreground">{"}"}</span>
    </pre>
  )
}

/* ——— contacto.sh ——— */

export function ContactApp() {
  const [sent, setSent] = React.useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get("name") ?? "")
    const email = String(data.get("email") ?? "")
    const message = String(data.get("message") ?? "")

    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    const subject = encodeURIComponent(`Contacto desde el portfolio — ${name}`)
    window.location.href = `mailto:juaniperez1243@icloud.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="font-mono text-[0.7rem] leading-relaxed tracking-wide text-muted-foreground">
        <span className="text-primary">$</span> ./contactar-a-juani.sh
        <br />
        Respondo en menos de 24 horas.
      </p>

      <div className="flex flex-col gap-2">
        <a
          href="mailto:juaniperez1243@icloud.com"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        >
          <Mail className="size-3.5 text-primary" />
          juaniperez1243@icloud.com
        </a>
        <a
          href="https://wa.me/542604002520"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        >
          <Phone className="size-3.5 text-primary" />
          +54 260 400 2520
        </a>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border-t border-border/60 pt-4"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="os-name"
              className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase"
            >
              Nombre
            </label>
            <Input id="os-name" name="name" placeholder="Tu nombre" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="os-email"
              className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase"
            >
              Email
            </label>
            <Input
              id="os-email"
              name="email"
              type="email"
              placeholder="vos@email.com"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="os-message"
            className="font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase"
          >
            Mensaje
          </label>
          <Textarea
            id="os-message"
            name="message"
            placeholder="Contame sobre tu proyecto…"
            className="min-h-24"
            required
          />
        </div>
        <Button type="submit" size="sm" className="w-fit">
          {sent ? "¡Gracias!" : "Enviar"}
          <Send />
        </Button>
      </form>
    </div>
  )
}
