import { Reveal, RevealGroup, RevealItem } from "@/components/portfolio/reveal"

const stats = [
  { value: "3+", label: "Proyectos en producción" },
  { value: "100%", label: "Responsive y accesible" },
  { value: "24h", label: "Tiempo de respuesta" },
]

export function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-20 border-t border-border/60">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <Reveal direction="right">
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Sobre mí
            </span>
            <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Diseño y código, en partes iguales.
            </h2>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal direction="left" delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                Soy un desarrollador full-stack de Mendoza, Argentina. Me apasiona
                construir productos web que se sientan rápidos, claros y bien
                resueltos —desde la primera línea de diseño hasta el deploy.
              </p>
            </Reveal>
            <Reveal direction="left" delay={0.18}>
              <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                Trabajo principalmente con React, Next.js y TypeScript, y disfruto
                cuidando los detalles: las animaciones, la performance y la
                experiencia de quien usa lo que construyo.
              </p>
            </Reveal>

            <RevealGroup
              stagger={0.12}
              delayChildren={0.2}
              className="mt-2 grid grid-cols-3 gap-4 border-t border-border/60 pt-6"
            >
              {stats.map((stat) => (
                <RevealItem key={stat.label}>
                  <div className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-muted-foreground text-pretty">
                    {stat.label}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
