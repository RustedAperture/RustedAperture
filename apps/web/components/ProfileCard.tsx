"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6"
import { SiBluesky } from "react-icons/si"
import { useTheme } from "next-themes"
import { Sun, Moon, Terminal } from "lucide-react"
import { useEffect, useState } from "react"
import { TerminalModal } from "@/components/TerminalModal"

interface ProfileCardProps {
  isHome?: boolean
}

export function ProfileCard({ isHome = false }: ProfileCardProps) {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false)
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false)

  // Load state from sessionStorage on mount
  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      try {
        const savedOpen = sessionStorage.getItem("terminal_open")
        const savedMinimized = sessionStorage.getItem("terminal_minimized")
        const savedMaximized = sessionStorage.getItem("terminal_maximized")

        if (savedOpen) {
          setIsTerminalOpen(JSON.parse(savedOpen))
        }
        if (savedMinimized) {
          setIsTerminalMinimized(JSON.parse(savedMinimized))
        }
        if (savedMaximized) {
          setIsTerminalMaximized(JSON.parse(savedMaximized))
        }
      } catch (e) {
        console.error("Error loading terminal state in ProfileCard", e)
      }
    }
  }, [])

  // Save states to sessionStorage when they change
  useEffect(() => {
    if (mounted) {
      sessionStorage.setItem("terminal_open", JSON.stringify(isTerminalOpen))
    }
  }, [isTerminalOpen, mounted])

  useEffect(() => {
    if (mounted) {
      sessionStorage.setItem("terminal_minimized", JSON.stringify(isTerminalMinimized))
    }
  }, [isTerminalMinimized, mounted])

  useEffect(() => {
    if (mounted) {
      sessionStorage.setItem("terminal_maximized", JSON.stringify(isTerminalMaximized))
    }
  }, [isTerminalMaximized, mounted])

  return (
    <div
      className={`flex w-full flex-col gap-4 print:hidden ${
        isHome ? "max-w-sm" : "max-w-sm md:w-80 shrink-0"
      }`}
    >
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src="https://github.com/rustedaperture.png"
              alt="Cameron Varley"
            />
            <AvatarFallback>CV</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle>CAMERON VARLEY</CardTitle>
            <CardDescription>RustedAperture</CardDescription>
            <CardDescription>Fullstack Engineer</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button
            variant={pathname === "/" ? "default" : "secondary"}
            className="w-full"
            render={<Link href="/" />}
          >
            Home
          </Button>
          <Button
            variant={pathname === "/resume" ? "default" : "secondary"}
            className="w-full"
            render={<Link href="/resume" />}
          >
            Résumé
          </Button>
          <Button
            variant={pathname === "/portfolio" ? "default" : "secondary"}
            className="w-full"
            render={<Link href="/portfolio" />}
          >
            Portfolio
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md bg-[#1a1c1e] text-white hover:bg-[#1a1c1e]/80 hover:text-white"
          render={
            <a
              href="https://x.com/rustedaperture"
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <FaXTwitter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md bg-[#0085ff] text-white hover:bg-[#0085ff]/80 hover:text-white"
          render={
            <a
              href="https://bsky.app/profile/rustedaperture.xyz"
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <SiBluesky className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md bg-[#545b64] text-white hover:bg-[#545b64]/80 hover:text-white"
          render={
            <a
              href="https://github.com/RustedAperture"
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <FaGithub className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md bg-[#5096f2] text-white hover:bg-[#5096f2]/80 hover:text-white"
          render={
            <a
              href="https://www.linkedin.com/in/cameron-varley-687368136/"
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <FaLinkedin className="h-4 w-4" />
        </Button>
        {mounted && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-md text-zinc-200 cursor-pointer transition-colors ${
                isTerminalOpen && !isTerminalMinimized
                  ? "bg-emerald-600 hover:bg-emerald-600/80 text-white"
                  : "bg-[#0f172a] dark:bg-zinc-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white"
              }`}
              onClick={() => {
                if (!isTerminalOpen) {
                  setIsTerminalOpen(true)
                  setIsTerminalMinimized(false)
                } else if (isTerminalMinimized) {
                  setIsTerminalMinimized(false)
                } else {
                  setIsTerminalMinimized(true)
                }
              }}
              title={
                !isTerminalOpen 
                  ? "Open Developer Terminal" 
                  : isTerminalMinimized 
                    ? "Restore Developer Terminal" 
                    : "Minimize Developer Terminal"
              }
            >
              <Terminal className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-md text-white hover:text-white cursor-pointer transition-colors ${
                resolvedTheme === "dark"
                  ? "bg-[#d97706] hover:bg-[#d97706]/80"
                  : "bg-[#475569] hover:bg-[#475569]/80"
              }`}
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              title="Toggle Theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </>
        )}
      </div>

      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => {
          setIsTerminalOpen(false)
          setIsTerminalMinimized(false)
          setIsTerminalMaximized(false)
        }}
        isMinimized={isTerminalMinimized}
        setIsMinimized={setIsTerminalMinimized}
        isMaximized={isTerminalMaximized}
        setIsMaximized={setIsTerminalMaximized}
      />
    </div>
  )
}
