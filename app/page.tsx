import { Nav } from "@/components/portfolio/nav"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Stack } from "@/components/portfolio/stack"
import { Projects } from "@/components/portfolio/projects"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
