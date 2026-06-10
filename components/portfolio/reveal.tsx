"use client"

import * as React from "react"
import { motion, type Variants } from "motion/react"

const easeOut = [0.22, 1, 0.36, 1] as const

const directionOffset = {
  up: { y: 18, x: 0 },
  down: { y: -18, x: 0 },
  left: { x: 20, y: 0 },
  right: { x: -20, y: 0 },
  none: { x: 0, y: 0 },
}

type RevealProps = React.ComponentProps<typeof motion.div> & {
  direction?: keyof typeof directionOffset
  delay?: number
  duration?: number
}

/** Anima un bloque entrando al hacer scroll (una sola vez). */
export function Reveal({
  direction = "up",
  delay = 0,
  duration = 0.7,
  children,
  ...props
}: RevealProps) {
  const offset = directionOffset[direction]

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: easeOut }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Contenedor que escalona la animación de sus hijos <RevealItem>. */
export function RevealGroup({
  stagger = 0.1,
  delayChildren = 0,
  children,
  ...props
}: React.ComponentProps<typeof motion.div> & {
  stagger?: number
  delayChildren?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: stagger, delayChildren }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export function RevealItem({
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div variants={itemVariants} {...props}>
      {children}
    </motion.div>
  )
}
