import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export default function PortfolioPage() {
  return (
    <div className="flex w-full max-w-4xl flex-1 flex-col">
      <Card className="min-h-[600px] w-full">
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
          <CardDescription>
            A comprehensive collection of my active projects, technical demos, and past work.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          {/* Navigation */}
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" render={<Link href="#active" />}>
              Active Projects
            </Button>
            <Button variant="secondary" size="sm" render={<Link href="#open-source" />}>
              Open Source
            </Button>
            <Button variant="secondary" size="sm" render={<Link href="#tech-demos" />}>
              Tech Demos
            </Button>
            <Button variant="secondary" size="sm" render={<Link href="#retired" />}>
              Retired Projects
            </Button>
          </div>

          {/* Active Projects */}
          <div id="active" className="flex flex-col gap-4 scroll-mt-24">
            <h3 className="text-lg font-semibold tracking-tight border-b pb-2">Active Projects</h3>
            <div className="grid gap-4 md:grid-cols-2">
              
              {/* EZGif */}
              <a href="https://github.com/RustedAperture/ezgif" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full border border-border/50 hover:border-primary/50 transition-colors bg-card hover:bg-accent/10">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base">ezgif</CardTitle>
                      <Badge variant="outline" className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20">Rust</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A Discord user app and web dashboard for managing and serving personal random image and GIF categories. Built with a Rust Axum backend and a Next.js frontend.
                    </p>
                  </CardContent>
                </Card>
              </a>

              {/* PetBot */}
              <a href="https://github.com/RustedAperture/petbot" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full border border-border/50 hover:border-primary/50 transition-colors bg-card hover:bg-accent/10">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base">petbot</CardTitle>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">TypeScript</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      An interactive, feature-rich bot built in TypeScript designed for community engagement, offering real-time interactions and robust command handling.
                    </p>
                  </CardContent>
                </Card>
              </a>



            </div>
          </div>

          {/* Open Source Contributions */}
          <div id="open-source" className="flex flex-col gap-4 scroll-mt-24">
            <h3 className="text-lg font-semibold tracking-tight border-b pb-2">Open Source Contributions</h3>
            <div className="grid gap-4 md:grid-cols-2">
              
              {/* QMK Firmware */}
              <a href="https://github.com/qmk/qmk_firmware" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full border border-border/50 hover:border-primary/50 transition-colors bg-card hover:bg-accent/10">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base">qmk_firmware</CardTitle>
                      <Badge variant="outline" className="bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20">C</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Contributed to the open-source keyboard firmware for Atmel AVR and Arm USB families, used by mechanical keyboard enthusiasts worldwide.
                    </p>
                  </CardContent>
                </Card>
              </a>

              {/* Greptile AI Skills */}
              <a href="https://github.com/greptileai/skills" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full border border-border/50 hover:border-primary/50 transition-colors bg-card hover:bg-accent/10">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base">greptileai/skills</CardTitle>
                      <Badge variant="outline" className="bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20">AI / Agent</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Developed and contributed agent skills for checking PR review comments, CI/CD status checks, and description completeness.
                    </p>
                  </CardContent>
                </Card>
              </a>

            </div>
          </div>

          {/* Tech Demos */}
          <div id="tech-demos" className="flex flex-col gap-4 scroll-mt-24">
            <h3 className="text-lg font-semibold tracking-tight border-b pb-2">Tech Demos</h3>
            <div className="grid gap-4 md:grid-cols-2">
              
              {/* Home Assistant Cards */}
              <a href="https://github.com/RustedAperture/homeassistant_cards" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full border border-border/50 hover:border-primary/50 transition-colors bg-card hover:bg-accent/10">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base">homeassistant_cards</CardTitle>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">TypeScript</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A custom Lovelace UI card for Home Assistant featuring dynamic entity rendering, values, and a gradient severity progress bar.
                    </p>
                  </CardContent>
                </Card>
              </a>

              {/* jsonfriend */}
              <a href="https://github.com/RustedAperture/jsonfriend" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full border border-border/50 hover:border-primary/50 transition-colors bg-card hover:bg-accent/10">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base">jsonfriend</CardTitle>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20">JavaScript</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A lightweight JavaScript utility for easily parsing, formatting, and interacting with JSON data structures.
                    </p>
                  </CardContent>
                </Card>
              </a>

              {/* IP2RANGE */}
              <a href="https://github.com/RustedAperture/IP2RANGE" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full border border-border/50 hover:border-primary/50 transition-colors bg-card hover:bg-accent/10">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base">IP2RANGE</CardTitle>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">Python</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A Python script designed for network engineering and security analysis, efficiently converting IP addresses into block ranges and CIDR notation.
                    </p>
                  </CardContent>
                </Card>
              </a>

            </div>
          </div>

          {/* Retired Projects */}
          <div id="retired" className="flex flex-col gap-4 scroll-mt-24">
            <h3 className="text-lg font-semibold tracking-tight border-b pb-2">Retired Projects</h3>
            <div className="grid gap-4 md:grid-cols-2 opacity-80 hover:opacity-100 transition-opacity">
              
              {/* Recipe Book */}
              <a href="https://github.com/RustedAperture/recipe-book" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full border border-border/50 hover:border-primary/50 transition-colors bg-card/50">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base">recipe-book</CardTitle>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">TypeScript</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A robust, full-stack recipe management web application architected with Payload CMS to handle rich content management and data relationships.
                    </p>
                  </CardContent>
                </Card>
              </a>

              {/* Fox CSS */}
              <a href="https://github.com/RustedAperture/Fox_CSS" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full border border-border/50 hover:border-primary/50 transition-colors bg-card/50">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base">Fox_CSS</CardTitle>
                      <Badge variant="outline" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20">CSS Framework</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      An experimental, custom CSS framework designed from the ground up to provide lightweight, utility-driven styling and responsive layout primitives.
                    </p>
                  </CardContent>
                </Card>
              </a>

              {/* Synthetik */}
              <a href="https://github.com/RustedAperture/Synthetik" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full border border-border/50 hover:border-primary/50 transition-colors bg-card/50">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base">Synthetik</CardTitle>
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">Android / Kotlin</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A custom-built WearOS smartwatch face developed for Android wearables, utilizing Gradle build tools and Kotlin Android integrations.
                    </p>
                  </CardContent>
                </Card>
              </a>

              {/* Text Wars */}
              <a href="https://github.com/RustedAperture/Text-Wars" target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-[1.02]">
                <Card className="h-full border border-border/50 hover:border-primary/50 transition-colors bg-card/50">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-base">Text-Wars</CardTitle>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20">Python</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      An interactive, terminal-based text adventure game featuring an expansive simulated economy, gambling mechanics, and enemy battle systems.
                    </p>
                  </CardContent>
                </Card>
              </a>

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
