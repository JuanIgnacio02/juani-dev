import { Reveal, RevealGroup, RevealItem } from "@/components/portfolio/reveal"

type Group = {
  title: string
  items: string[]
}

const groups: Group[] = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "GSAP"],
  },
  {
    title: "Backend & Datos",
    items: ["Node.js", "Supabase", "PostgreSQL", "Cloudflare Workers", "REST APIs"],
  },
  {
    title: "Herramientas & Deploy",
    items: ["Git", "Vercel", "Cloudflare Pages", "Cloudinary", "Figma"],
  },
]

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 border-t border-border/60">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
        <Reveal>
          <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Herramientas
          </span>
          <h2 className="font-heading mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Stack & tecnologías
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {groups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.1} direction="up">
              <h3 className="font-heading text-sm font-medium text-muted-foreground">
                {group.title}
              </h3>
              <RevealGroup
                stagger={0.06}
                delayChildren={gi * 0.1}
                className="mt-4 flex flex-col gap-2.5"
              >
                {group.items.map((item) => (
                  <RevealItem
                    key={item}
                    className="group flex items-center gap-2.5 text-sm"
                  >
                    <span className="size-1.5 rounded-full bg-primary/40 transition-colors group-hover:bg-primary" />
                    <span className="text-foreground/90 transition-colors group-hover:text-foreground">
                      {item}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
