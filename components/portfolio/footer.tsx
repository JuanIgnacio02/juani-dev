import { linkUnderline } from "@/components/portfolio/anim"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
        <p>© {year} Juani Pérez · Mendoza, Argentina</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/JuanIgnacio02"
            target="_blank"
            rel="noreferrer"
            className={`${linkUnderline} transition-colors hover:text-foreground`}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/juan-ignacio-p%C3%A9rez-pe%C3%B1a-769bba3ab/"
            target="_blank"
            rel="noreferrer"
            className={`${linkUnderline} transition-colors hover:text-foreground`}
          >
            LinkedIn
          </a>
          <a
            href="mailto:juaniperez1243@icloud.com"
            className={`${linkUnderline} transition-colors hover:text-foreground`}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
