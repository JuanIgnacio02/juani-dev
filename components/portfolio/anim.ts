/**
 * Clases reutilizables de microinteracciones (solo transform/opacity + box-shadow).
 * Pensadas para sentirse premium sin recargar: hover sutil, glow suave, underline animado.
 */

/** Botones CTA: leve lift + scale 1.02 + glow suave. */
export const ctaHover =
  "transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 active:scale-[0.99]"

/** Botón secundario/outline: mismo movimiento, glow más tenue. */
export const ctaHoverSoft =
  "transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md hover:shadow-foreground/10 active:scale-[0.99]"

/** Underline que se desliza de izquierda a derecha al hover. */
export const linkUnderline =
  "relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-300 after:ease-out hover:after:w-full"
