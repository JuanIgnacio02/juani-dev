"use client"

import * as React from "react"
import { Mail, Phone, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Reveal } from "@/components/portfolio/reveal"
import { ctaHover, linkUnderline } from "@/components/portfolio/anim"

export function Contact() {
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
    <section id="contacto" className="scroll-mt-20 border-t border-border/60">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <Reveal direction="right" className="flex flex-col gap-2">
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Hablemos
            </span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              Contacto
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
              ¿Tenés un proyecto en mente o querés colaborar? Escribime y te
              respondo en menos de 24 horas.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="mailto:juaniperez1243@icloud.com"
                className="group/link inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground"
              >
                <Mail className="size-4 transition-transform duration-200 group-hover/link:-translate-y-0.5" />
                <span className={linkUnderline}>juaniperez1243@icloud.com</span>
              </a>
              <a
                href="https://wa.me/542604002520"
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground"
              >
                <Phone className="size-4 transition-transform duration-200 group-hover/link:-translate-y-0.5" />
                <span className={linkUnderline}>+54 260 400 2520</span>
              </a>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  Nombre
                </label>
                <Input id="name" name="name" placeholder="Tu nombre" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="vos@email.com"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium">
                Mensaje
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Contame sobre tu proyecto…"
                className="min-h-32"
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className={`group/cta w-fit ${ctaHover}`}
            >
              {sent ? "¡Gracias!" : "Enviar mensaje"}
              <Send className="transition-transform duration-200 group-hover/cta:translate-x-0.5" />
            </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
