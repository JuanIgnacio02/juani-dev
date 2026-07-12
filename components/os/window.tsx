"use client"

import * as React from "react"
import { motion, useDragControls } from "motion/react"

import { cn } from "@/lib/utils"

type WindowProps = {
  title: string
  z: number
  focused: boolean
  widthClass: string
  position: { left: string; top: string }
  constraintsRef: React.RefObject<HTMLDivElement | null>
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  children: React.ReactNode
}

/**
 * Ventana estilo OS: arrastrable desde la barra de título, apilable.
 * Semáforo funcional: rojo cierra, amarillo minimiza al dock, verde
 * maximiza (también con doble click en la barra de título).
 */
export function Window({
  title,
  z,
  focused,
  widthClass,
  position,
  constraintsRef,
  onClose,
  onMinimize,
  onFocus,
  children,
}: WindowProps) {
  const controls = useDragControls()
  const [mobile, setMobile] = React.useState(false)
  const [maximized, setMaximized] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const fullscreen = mobile || maximized
  const draggable = !fullscreen

  return (
    <motion.div
      role="dialog"
      aria-label={title}
      layout
      initial={{ opacity: 0, scale: 0.92, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 10 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      drag={draggable}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.06}
      dragConstraints={constraintsRef}
      onPointerDownCapture={onFocus}
      style={
        fullscreen
          ? { zIndex: z }
          : { zIndex: z, left: position.left, top: position.top }
      }
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border bg-card/95 shadow-2xl shadow-black/40 backdrop-blur-xl will-change-transform",
        focused
          ? "border-primary/25 ring-1 ring-primary/15"
          : "border-border/70",
        fullscreen
          ? "fixed inset-x-3 top-12 bottom-24 sm:inset-x-8 sm:bottom-22"
          : `absolute max-h-[calc(100dvh-7.5rem)] ${widthClass}`
      )}
    >
      {/* Barra de título */}
      <div
        onPointerDown={(e) => {
          if (draggable) controls.start(e)
        }}
        onDoubleClick={() => {
          if (!mobile) setMaximized((m) => !m)
        }}
        className={cn(
          "flex shrink-0 items-center gap-2 border-b border-border/60 bg-muted/50 px-3.5 py-2.5 select-none",
          draggable && "cursor-grab active:cursor-grabbing"
        )}
      >
        <button
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={`Cerrar ${title}`}
          className="group/tl flex size-3 items-center justify-center rounded-full bg-red-400/90 transition-transform hover:scale-110"
        >
          <span className="text-[0.55rem] leading-none text-red-950 opacity-0 transition-opacity group-hover/tl:opacity-100">
            ×
          </span>
        </button>
        <button
          onClick={onMinimize}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={`Minimizar ${title}`}
          className="group/tl flex size-3 items-center justify-center rounded-full bg-yellow-400/90 transition-transform hover:scale-110"
        >
          <span className="text-[0.55rem] leading-none text-yellow-950 opacity-0 transition-opacity group-hover/tl:opacity-100">
            –
          </span>
        </button>
        <button
          onClick={() => {
            if (!mobile) setMaximized((m) => !m)
          }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={maximized ? `Restaurar ${title}` : `Maximizar ${title}`}
          className="group/tl flex size-3 items-center justify-center rounded-full bg-green-400/90 transition-transform hover:scale-110"
        >
          <span className="text-[0.5rem] leading-none text-green-950 opacity-0 transition-opacity group-hover/tl:opacity-100">
            {maximized ? "▾" : "▴"}
          </span>
        </button>
        <span className="ml-2 truncate font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground">
          {title}
        </span>
      </div>

      {/* Contenido */}
      <div className="os-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain p-5">
        {children}
      </div>
    </motion.div>
  )
}
