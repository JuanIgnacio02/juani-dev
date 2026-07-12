import type { Metadata } from "next"
import { Fraunces, Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  axes: ["opsz", "SOFT", "WONK"],
})

export const metadata: Metadata = {
  title: "Juani Pérez — Desarrollador Full-Stack",
  description:
    "Desarrollador full-stack en Mendoza, Argentina. Construyo productos web que se sienten vivos: React, Next.js, TypeScript y diseño de interfaces.",
}

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
        fraunces.variable
      )}
    >
      <body>
        {/* Grano de película, muy sutil */}
        <div aria-hidden className="noise" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
