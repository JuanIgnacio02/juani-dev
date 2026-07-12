"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

const easeOut = [0.22, 1, 0.36, 1] as const

const lines = [
  { text: "juani.dev — Mendoza, Argentina", accent: true },
  { text: "> cargando módulos…" },
  { text: "  react@19 ················ ok", ok: true },
  { text: "  next@16 ················· ok", ok: true },
  { text: "  cafeína ················· ok", ok: true },
  { text: "> montando escritorio…" },
]

/** Secuencia de boot: log de arranque y fundido al escritorio. Una vez por sesión. */
export function Boot() {
  const reduce = useReducedMotion()
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    if (reduce || sessionStorage.getItem("juanidev-booted")) return
    setShow(true)
    const id = setTimeout(() => {
      sessionStorage.setItem("juanidev-booted", "1")
      setShow(false)
    }, 2100)
    return () => clearTimeout(id)
  }, [reduce])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="flex w-72 flex-col gap-1.5 font-mono text-[0.7rem] leading-relaxed tracking-wide sm:w-80">
            {lines.map((line, i) => (
              <motion.p
                key={line.text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: 0.2 + i * 0.22 }}
                className={
                  line.accent
                    ? "mb-2 text-primary"
                    : line.ok
                      ? "text-muted-foreground"
                      : "text-foreground"
                }
              >
                {line.text}
              </motion.p>
            ))}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
              className="mt-3 h-px origin-left bg-primary/60"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
