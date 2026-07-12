"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Braces,
  FileText,
  Folder,
  ScrollText,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Window } from "@/components/os/window"
import { MenuBar } from "@/components/os/menu-bar"
import { Boot } from "@/components/os/boot"
import {
  ReadmeApp,
  AboutApp,
  ProjectsApp,
  StackApp,
  ContactApp,
} from "@/components/os/apps"

type AppId = "readme" | "sobre-mi" | "proyectos" | "stack" | "contacto"

type AppConfig = {
  id: AppId
  file: string
  label: string
  icon: LucideIcon
  widthClass: string
  position: { left: string; top: string }
}

const apps: AppConfig[] = [
  {
    id: "readme",
    file: "README.txt",
    label: "readme",
    icon: ScrollText,
    widthClass: "w-[min(92vw,30rem)]",
    position: { left: "max(1.5rem, calc(50% - 24rem))", top: "5.5rem" },
  },
  {
    id: "sobre-mi",
    file: "sobre-mi.md",
    label: "sobre mí",
    icon: FileText,
    widthClass: "w-[min(92vw,29rem)]",
    position: { left: "max(2rem, calc(50% - 8rem))", top: "8rem" },
  },
  {
    id: "proyectos",
    file: "proyectos/",
    label: "proyectos",
    icon: Folder,
    widthClass: "w-[min(92vw,42rem)]",
    position: { left: "max(1.5rem, calc(50% - 14rem))", top: "4.5rem" },
  },
  {
    id: "stack",
    file: "stack.json",
    label: "stack",
    icon: Braces,
    widthClass: "w-[min(92vw,26rem)]",
    position: { left: "max(2rem, calc(50% + 4rem))", top: "10rem" },
  },
  {
    id: "contacto",
    file: "contacto.sh",
    label: "contacto",
    icon: TerminalSquare,
    widthClass: "w-[min(92vw,30rem)]",
    position: { left: "max(1.5rem, calc(50% - 4rem))", top: "6.5rem" },
  },
]

function AppContent({
  id,
  openApp,
}: {
  id: AppId
  openApp: (id: AppId) => void
}) {
  switch (id) {
    case "readme":
      return <ReadmeApp onOpen={(target) => openApp(target as AppId)} />
    case "sobre-mi":
      return <AboutApp />
    case "proyectos":
      return <ProjectsApp />
    case "stack":
      return <StackApp />
    case "contacto":
      return <ContactApp />
  }
}

export function Desktop() {
  const desktopRef = React.useRef<HTMLDivElement>(null)
  const zCounter = React.useRef(10)
  const [open, setOpen] = React.useState<AppId[]>(["readme"])
  const [minimized, setMinimized] = React.useState<AppId[]>([])
  const [zMap, setZMap] = React.useState<Record<string, number>>({ readme: 10 })

  const focus = React.useCallback((id: AppId) => {
    zCounter.current += 1
    setZMap((prev) => ({ ...prev, [id]: zCounter.current }))
  }, [])

  const openApp = React.useCallback(
    (id: AppId) => {
      setOpen((prev) => (prev.includes(id) ? prev : [...prev, id]))
      setMinimized((prev) => prev.filter((appId) => appId !== id))
      focus(id)
    },
    [focus]
  )

  const closeApp = React.useCallback((id: AppId) => {
    setOpen((prev) => prev.filter((appId) => appId !== id))
    setMinimized((prev) => prev.filter((appId) => appId !== id))
  }, [])

  const minimizeApp = React.useCallback((id: AppId) => {
    setMinimized((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const visible = open.filter((id) => !minimized.includes(id))
  const topZ = Math.max(...visible.map((id) => zMap[id] ?? 0), 0)
  const topId = visible.find((id) => (zMap[id] ?? 0) === topZ)

  /* Esc cierra la ventana enfocada */
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && topId) closeApp(topId)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [topId, closeApp])

  return (
    <div className="relative h-dvh overflow-hidden">
      <Boot />
      <MenuBar />

      {/* ——— Wallpaper ——— */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 -top-48 flex justify-center">
          <div className="h-[38rem] w-[54rem] rounded-full bg-gradient-to-tr from-primary/[0.16] via-primary/[0.05] to-transparent blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)] bg-[size:72px_72px] opacity-[0.13]" />
        <p className="absolute right-4 -bottom-10 font-heading text-[11rem] leading-none font-light tracking-tight text-foreground/[0.045] italic select-none sm:text-[15rem]">
          Juani
        </p>
      </div>

      {/* ——— Área del escritorio (constraints de drag) ——— */}
      <div ref={desktopRef} className="absolute inset-x-0 top-9 bottom-0">
        {/* Íconos (solo desktop) */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.07, delayChildren: 0.3 }}
          className="absolute top-6 left-5 hidden flex-col gap-5 md:flex"
        >
          {apps.map((app) => (
            <motion.button
              key={app.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              onClick={() => openApp(app.id)}
              className="group flex w-20 flex-col items-center gap-1.5 rounded-lg p-2 outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <span className="flex size-12 items-center justify-center rounded-xl border border-border/70 bg-card/80 shadow-lg shadow-black/20 backdrop-blur transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-primary/10">
                <app.icon className="size-5 text-primary" strokeWidth={1.5} />
              </span>
              <span className="font-mono text-[0.62rem] tracking-[0.1em] text-muted-foreground transition-colors group-hover:text-foreground">
                {app.file}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Ventanas */}
        <AnimatePresence>
          {visible.map((id) => {
            const app = apps.find((a) => a.id === id)!
            return (
              <Window
                key={id}
                title={app.file}
                z={zMap[id] ?? 10}
                focused={id === topId}
                widthClass={app.widthClass}
                position={app.position}
                constraintsRef={desktopRef}
                onClose={() => closeApp(id)}
                onMinimize={() => minimizeApp(id)}
                onFocus={() => focus(id)}
              >
                <AppContent id={id} openApp={openApp} />
              </Window>
            )
          })}
        </AnimatePresence>
      </div>

      {/* ——— Dock ——— */}
      <motion.nav
        aria-label="Aplicaciones"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.5 }}
        className="fixed bottom-4 left-1/2 z-[75] flex -translate-x-1/2 items-end gap-1.5 rounded-2xl border border-border/70 bg-background/70 px-3 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl"
      >
        {apps.map((app) => {
          const isOpen = open.includes(app.id)
          const isMinimized = minimized.includes(app.id)
          return (
            <button
              key={app.id}
              onClick={() =>
                !isOpen || isMinimized ? openApp(app.id) : focus(app.id)
              }
              aria-label={app.label}
              className="group relative flex flex-col items-center"
            >
              <span className="pointer-events-none absolute -top-9 rounded-md border border-border/70 bg-popover px-2 py-1 font-mono text-[0.6rem] tracking-[0.1em] whitespace-nowrap text-popover-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {app.file}
              </span>
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-xl border transition-all duration-200 group-hover:-translate-y-1.5 group-hover:scale-110 group-active:scale-95",
                  isOpen && !isMinimized
                    ? "border-primary/40 bg-card"
                    : "border-border/70 bg-card/70"
                )}
              >
                <app.icon className="size-5 text-primary" strokeWidth={1.5} />
              </span>
              <span
                className={cn(
                  "mt-1 size-1 rounded-full bg-primary transition-opacity",
                  isOpen
                    ? isMinimized
                      ? "opacity-40"
                      : "opacity-100"
                    : "opacity-0"
                )}
              />
            </button>
          )
        })}
      </motion.nav>
    </div>
  )
}
