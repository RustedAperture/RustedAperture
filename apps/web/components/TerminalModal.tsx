"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { FaTerminal } from "react-icons/fa6"

interface TerminalModalProps {
  isOpen: boolean
  onClose: () => void
  isMinimized: boolean
  setIsMinimized: (min: boolean) => void
  isMaximized: boolean
  setIsMaximized: (max: boolean) => void
}

interface HistoryItem {
  type: "input" | "output"
  text: string
  isHtml?: boolean
}

export function TerminalModal({ 
  isOpen, 
  onClose,
  isMinimized,
  setIsMinimized,
  isMaximized,
  setIsMaximized
}: TerminalModalProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [inputValue, setInputValue] = useState("")
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now())

  // Window dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const initialPosRef = useRef({ x: 0, y: 0 })

  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load state from sessionStorage on mount
  useEffect(() => {
    setMounted(true)
    
    if (typeof window !== "undefined") {
      try {
        const savedHistory = sessionStorage.getItem("terminal_history")
        const savedCmdHistory = sessionStorage.getItem("terminal_command_history")
        const savedStartTime = sessionStorage.getItem("terminal_start_time")
        const savedPosition = sessionStorage.getItem("terminal_position")

        if (savedHistory) {
          setHistory(JSON.parse(savedHistory))
        } else {
          // Default initial welcome lines
          setHistory([
            { type: "output", text: "Welcome to RustedAperture Terminal [Version 2.0.0]" },
            { type: "output", text: "(c) 2026 Cameron Varley. All rights reserved." },
            { type: "output", text: "" },
            { type: "output", text: "Type 'help' to view available commands." },
            { type: "output", text: "" },
          ])
        }

        if (savedCmdHistory) {
          setCommandHistory(JSON.parse(savedCmdHistory))
        }

        if (savedStartTime) {
          setSessionStartTime(parseInt(savedStartTime, 10))
        } else {
          const now = Date.now()
          setSessionStartTime(now)
          sessionStorage.setItem("terminal_start_time", now.toString())
        }

        if (savedPosition) {
          setPosition(JSON.parse(savedPosition))
        }

      } catch (e) {
        console.error("Error loading terminal state from sessionStorage. Resetting session.", e)
        try {
          sessionStorage.clear()
        } catch (clearErr) {
          console.error("Failed to clear sessionStorage", clearErr)
        }
        setHistory([
          { type: "output", text: "Welcome to RustedAperture Terminal [Version 2.0.0]" },
          { type: "output", text: "(c) 2026 Cameron Varley. All rights reserved." },
          { type: "output", text: "" },
          { type: "output", text: "Type 'help' to view available commands." },
          { type: "output", text: "" },
        ])
        setCommandHistory([])
        setSessionStartTime(Date.now())
        setPosition({ x: 0, y: 0 })
      }
    }
  }, [])

  // Save history to sessionStorage
  useEffect(() => {
    if (mounted) {
      try {
        sessionStorage.setItem("terminal_history", JSON.stringify(history))
      } catch (e) {
        console.error("Error saving terminal history", e)
      }
    }
  }, [history, mounted])

  // Save commandHistory to sessionStorage
  useEffect(() => {
    if (mounted) {
      try {
        sessionStorage.setItem("terminal_command_history", JSON.stringify(commandHistory))
      } catch (e) {
        console.error("Error saving command history", e)
      }
    }
  }, [commandHistory, mounted])

  // Save position to sessionStorage
  useEffect(() => {
    if (mounted) {
      try {
        sessionStorage.setItem("terminal_position", JSON.stringify(position))
      } catch (e) {
        console.error("Error saving terminal position", e)
      }
    }
  }, [position, mounted])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    }
  }, [isOpen])

  // Dragging event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    if (isMaximized) return // Disable dragging when maximized
    const target = e.target as HTMLElement
    if (target.closest("button") || target.closest("input")) return

    setIsDragging(true)
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    initialPosRef.current = { x: position.x, y: position.y }
    e.preventDefault()
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isMaximized) return // Disable dragging when maximized
    const target = e.target as HTMLElement
    if (target.closest("button") || target.closest("input")) return

    const touch = e.touches[0]
    if (!touch) return
    setIsDragging(true)
    dragStartRef.current = { x: touch.clientX, y: touch.clientY }
    initialPosRef.current = { x: position.x, y: position.y }
  }

  // Handle window drag movements
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y
      setPosition({
        x: initialPosRef.current.x + dx,
        y: initialPosRef.current.y + dy
      })
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return
      const dx = touch.clientX - dragStartRef.current.x
      const dy = touch.clientY - dragStartRef.current.y
      setPosition({
        x: initialPosRef.current.x + dx,
        y: initialPosRef.current.y + dy
      })
    }

    const handleDragEnd = () => {
      setIsDragging(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleDragEnd)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleDragEnd)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleDragEnd)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleDragEnd)
    }
  }, [isDragging])

  // Scroll to bottom whenever history changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  if (!isOpen || !mounted) return null

  // Focus input when clicking anywhere in terminal body
  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  const handleClose = () => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.clear()
      } catch (e) {
        console.error("Error clearing terminal session", e)
      }
    }
    onClose()
  }

  // Get dynamic uptime string
  const getUptime = () => {
    const diffMs = Date.now() - sessionStartTime
    const diffSecs = Math.floor(diffMs / 1000)
    const mins = Math.floor(diffSecs / 60)
    const secs = diffSecs % 60
    if (mins === 0) return `${secs}s`
    return `${mins}m ${secs}s`
  }

  // Escape HTML tags to prevent XSS/injection in dangerouslySetInnerHTML
  const escapeHtml = (text: string): string => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  // Generate classic ASCII cowsay art
  const generateCowsay = (message: string): string => {
    const cleanMessage = escapeHtml(message || "Moo!")
    const len = message ? message.length : 4 // fallback length of "Moo!"
    const top = "  " + "_".repeat(len + 2)
    const middle = `&lt; ${cleanMessage} &gt;`
    const bottom = "  " + "-".repeat(len + 2)
    
    return `${top}
${cleanMessage ? middle : "&lt; Moo! &gt;"}
${bottom}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`
  }

  // Generate classic Unix man page for the resume
  const getResumeManPageHtml = (): string => {
    return `
<pre style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; line-height: 1.4; color: #f8f8f2; user-select: text; margin: 0; padding: 0; white-space: pre-wrap;">
<span style="color: #75715e; font-weight: bold;">RESUME(1)                General Commands Manual               RESUME(1)</span>

<span style="color: #a6e22e; font-weight: bold;">NAME</span>
       cameron-varley - Fullstack Engineer specialized in Java, TypeScript,
       Rust, and Systems & Networking.

<span style="color: #a6e22e; font-weight: bold;">SYNOPSIS</span>
       <span style="color: #f92672; font-weight: bold;">resume</span> [options]

<span style="color: #a6e22e; font-weight: bold;">DESCRIPTION</span>
       Cameron Varley is a results-oriented Fullstack Engineer with a
       formal background in Systems & Networking. He specializes in building
       robust end-to-end applications, automated infrastructure, and
       high-availability CI/CD pipelines.

<span style="color: #a6e22e; font-weight: bold;">SECTIONS</span>
       The resume manual contains the following sections:

       <span style="color: #ae81ff; font-weight: bold;">PROFESSIONAL SUMMARY</span>
              A results-oriented Fullstack Engineer and technical operations
              specialist with a proven track record of success in end-to-end
              web application development and infrastructure automation.
              Specializes in building robust solutions using Java, TypeScript,
              and Rust. Brings extensive experience in cross-functional
              collaboration, establishing CI/CD pipelines, managing Terraform
              environments, and leading technical event operations.

       <span style="color: #ae81ff; font-weight: bold;">TECHNICAL SKILLS</span>
              <span style="color: #66d9ef; font-weight: bold;">Languages:</span>
                     TypeScript, JavaScript, Java, Rust, HTML, CSS, C,
                     Python, Kotlin

              <span style="color: #66d9ef; font-weight: bold;">Tools & Frameworks:</span>
                     Terraform, Git, GitHub Actions, CI/CD pipelines,
                     Docker, Node.js, Next.js, React

              <span style="color: #66d9ef; font-weight: bold;">Platforms & Operations:</span>
                     GCP, AWS, Datadog, Bitbucket, Shortcut, Jira

       <span style="color: #ae81ff; font-weight: bold;">EXPERIENCE</span>
              <span style="color: #66d9ef; font-weight: bold;">Fullstack Engineer</span>                                <span style="color: #e6db74;">2025 - Present</span>
              <span style="color: #f8f8f2; font-style: italic;">momoGood (formerly Givergy)</span>
                     - Shipped multiple high-impact, user-facing features in
                       Java and TypeScript.
                     - Engineered automated GitHub Actions CI/CD pipelines.
                     - Coordinated cloud infrastructure management and
                       provisioning via Terraform.

              <span style="color: #66d9ef; font-weight: bold;">Event & Product Support Specialist</span>                   <span style="color: #e6db74;">2022 - 2025</span>
              <span style="color: #f8f8f2; font-style: italic;">Givergy</span>
                     - Guided event delivery, support, platform QA, and
                       internal LMS training.

              <span style="color: #66d9ef; font-weight: bold;">Global Support Agent</span>                                 <span style="color: #e6db74;">2021 - 2022</span>
              <span style="color: #f8f8f2; font-style: italic;">Givergy</span>
                     - Provided global omni-channel technical support (email,
                       phone, live chat).

              <span style="color: #66d9ef; font-weight: bold;">Tech Manager</span>                                         <span style="color: #e6db74;">2019 - 2023</span>
              <span style="color: #f8f8f2; font-style: italic;">Givergy</span>
                     - Configured high-reliability local WLAN networks hosting
                       bidding tablets.

       <span style="color: #ae81ff; font-weight: bold;">EDUCATION</span>
              <span style="color: #66d9ef; font-weight: bold;">George Brown College</span>                                 <span style="color: #e6db74;">2018 - 2021</span>
              <span style="color: #f8f8f2; font-style: italic;">Computer Systems Technology (3-Year Advanced Diploma)</span>
                     - Focus on enterprise network design, systems administration,
                       and cloud infrastructure deployment.
                     - Hands-on training with Cisco CCNA, AWS, and Linux.

<span style="color: #a6e22e; font-weight: bold;">CONTACT</span>
       Email:    <a href="mailto:cam.avarley@gmail.com" class="text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors">cam.avarley@gmail.com</a>
       GitHub:   <a href="https://github.com/RustedAperture" target="_blank" rel="noopener noreferrer" class="text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors">github.com/RustedAperture</a>
       LinkedIn: <a href="https://www.linkedin.com/in/cameron-varley-687368136/" target="_blank" rel="noopener noreferrer" class="text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors">linkedin.com/in/cameron-varley</a>

<span style="color: #75715e; font-weight: bold;">Cameron Varley                  2026-06-26                     RESUME(1)</span>
</pre>
`;
  }

  // List of valid commands for autocomplete
  const availableCommands = [
    "help",
    "about",
    "skills",
    "experience",
    "portfolio",
    "projects",
    "resume",
    "system",
    "neofetch",
    "theme",
    "contact",
    "cowsay",
    "ls",
    "cat",
    "man",
    "git",
    "clear",
    "exit",
  ]

  // Tab completion helper
  const handleTabCompletion = () => {
    if (!inputValue) return

    const lowerInput = inputValue.toLowerCase()

    // Smart filename completion for the 'cat' command
    if (lowerInput.startsWith("cat ") || lowerInput === "cat") {
      const parts = inputValue.split(/\s+/)
      // parts[0] is 'cat', parts[1] is the partial filename if exists
      const partialFile = parts[1] || ""
      const virtualFiles = ["about.txt", "skills.json", "experience.md", "portfolio.html", "resume.pdf"]
      
      const fileMatches = virtualFiles.filter((file) => file.startsWith(partialFile.toLowerCase()))
      
      if (fileMatches.length === 1) {
        setInputValue(`cat ${fileMatches[0]}`)
      } else if (fileMatches.length > 1) {
        setHistory((prev) => [
          ...prev,
          { type: "input", text: inputValue },
          { type: "output", text: fileMatches.join("    ") },
        ])
      }
      return
    }

    // Smart argument completion for the 'man' command
    if (lowerInput.startsWith("man ") || lowerInput === "man") {
      const parts = inputValue.split(/\s+/)
      // parts[0] is 'man', parts[1] is the partial manual page if exists
      const partialArg = parts[1] || ""
      const manPages = ["resume"]
      
      const argMatches = manPages.filter((page) => page.startsWith(partialArg.toLowerCase()))
      
      if (argMatches.length === 1) {
        setInputValue(`man ${argMatches[0]}`)
      } else if (argMatches.length > 1) {
        setHistory((prev) => [
          ...prev,
          { type: "input", text: inputValue },
          { type: "output", text: argMatches.join("    ") },
        ])
      }
      return
    }

    // Smart subcommand completion for the 'git' command
    if (lowerInput.startsWith("git ") || lowerInput === "git") {
      const parts = inputValue.split(/\s+/)
      // parts[0] is 'git', parts[1] is the partial subcommand if exists
      const partialSub = parts[1] || ""
      const gitSubs = ["status", "commit", "push", "clone"]
      
      const subMatches = gitSubs.filter((sub) => sub.startsWith(partialSub.toLowerCase()))
      
      if (subMatches.length === 1) {
        setInputValue(`git ${subMatches[0]}`)
      } else if (subMatches.length > 1) {
        setHistory((prev) => [
          ...prev,
          { type: "input", text: inputValue },
          { type: "output", text: subMatches.join("    ") },
        ])
      }
      return
    }

    const trimmedInput = inputValue.trim().toLowerCase()
    const matches = availableCommands.filter((cmd) => cmd.startsWith(trimmedInput))
    if (matches.length === 1) {
      setInputValue(matches[0] + " ")
    } else if (matches.length > 1) {
      // Print matches if multiple are found
      setHistory((prev) => [
        ...prev,
        { type: "input", text: inputValue },
        { type: "output", text: matches.join("    ") },
      ])
    }
  }

  // Handle key down events for input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length === 0) return
      
      const newIndex = historyIndex + 1
      if (newIndex < commandHistory.length) {
        setHistoryIndex(newIndex)
        // History is saved chronologically (newest at end, i.e., index 0 from bottom)
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex] ?? "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const newIndex = historyIndex - 1
      if (newIndex >= 0) {
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex] ?? "")
      } else {
        setHistoryIndex(-1)
        setInputValue("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      handleTabCompletion()
    } else if (e.key === "Escape") {
      handleClose()
    }
  }

  // Execute terminal command
  const executeCommand = () => {
    const trimmedInput = inputValue.trim()

    if (!trimmedInput) {
      setHistory((prev) => [...prev, { type: "input", text: "" }])
      return
    }

    const parts = trimmedInput.split(" ")
    let command = parts[0]?.toLowerCase() ?? ""
    const args = parts.slice(1)

    // Intercept 'cat' command for virtual file system
    if (command === "cat") {
      const file = args[0]?.toLowerCase()
      if (!file) {
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "cat: missing operand" }
        ])
        return
      }
      
      // Map virtual files to existing terminal commands
      if (file === "about.txt") {
        command = "about"
      } else if (file === "skills.json") {
        command = "skills"
      } else if (file === "experience.md") {
        command = "experience"
      } else if (file === "portfolio.html") {
        command = "portfolio"
      } else if (file === "resume.pdf") {
        command = "resume"
      } else {
        setHistory((prev) => [
          ...prev,
          { type: "output", text: `cat: ${args[0]}: No such file or directory` }
        ])
        return
      }
    }

    // Add command to history for terminal prompt output
    setHistory((prev) => [...prev, { type: "input", text: trimmedInput }])
    
    // Add command to command history (for up/down arrow scroll)
    setCommandHistory((prev) => {
      // Avoid consecutive duplicate commands
      if (prev.length > 0 && prev[prev.length - 1] === trimmedInput) {
        return prev
      }
      return [...prev, trimmedInput]
    })
    setHistoryIndex(-1)
    setInputValue("")

    // Command parser
    switch (command) {
      case "help":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "Available commands:" },
          { type: "output", text: "  about       - Brief introduction of Cameron" },
          { type: "output", text: "  skills      - Technical skillset summary" },
          { type: "output", text: "  experience  - Professional work experience" },
          { type: "output", text: "  portfolio   - View projects, open source & demos" },
          { type: "output", text: "  resume      - Prints full professional résumé" },
          { type: "output", text: "  system      - System specs & status (neofetch)" },
          { type: "output", text: "  theme       - Toggle global website theme (light/dark)" },
          { type: "output", text: "  contact     - Social profiles and email links" },
          { type: "output", text: "  clear       - Clear the screen history" },
          { type: "output", text: "  exit        - Close the terminal window" },
        ])
        break

      case "about":
        setHistory((prev) => [
          ...prev,
          { 
            type: "output", 
            text: "Hi, I'm Cameron Varley (RustedAperture)!\n\nI'm a Fullstack Engineer specialized in building robust end-to-end applications using Java, TypeScript, and AI-assisted workflows. With a formal background in Systems & Networking (George Brown College), I bridge the gap between clean frontend applications and automated infrastructure (Terraform, CI/CD)." 
          },
        ])
        break

      case "skills":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "=== Technical Skills ===" },
          { type: "output", text: "Languages: TypeScript, JavaScript, Java, Rust, HTML, CSS, C, Python, Kotlin" },
          { type: "output", text: "Tools:     Terraform, Git, GitHub Actions, CI/CD pipelines, Postman, Docker" },
          { type: "output", text: "Platforms: GitHub, Bitbucket, GCP, Datadog, Shortcut, Jira" },
        ])
        break

      case "experience":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "=== Work Experience ===" },
          { type: "output", text: "• Fullstack Engineer @ momoGood (formerly Givergy) | Feb 2025 - Present" },
          { type: "output", text: "  - Shipped multiple high-impact features in Java and TypeScript." },
          { type: "output", text: "  - Engineered automated GitHub CI/CD pipelines for local deployments." },
          { type: "output", text: "  - Coordinated cloud infrastructure management via Terraform." },
          { type: "output", text: "• Event & Product Support Specialist @ Givergy | June 2022 - Feb 2025" },
          { type: "output", text: "  - Guided event support, platform QA, and internal LMS staff training." },
          { type: "output", text: "• Global Support Agent @ Givergy | Aug 2021 - June 2022" },
          { type: "output", text: "  - Delivered 24/7 omni-channel technical support across global regions." },
          { type: "output", text: "• Tech Manager @ Givergy | May 2019 - June 2023" },
          { type: "output", text: "  - Deployed and configured high-reliability LAN/WLAN silent auction networks." },
        ])
        break

      case "portfolio":
      case "projects":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "=== Active Projects ===" },
          { 
            type: "output", 
            text: "• memeBucket [Rust / Next.js] - Discord user app & dashboard. <br/>  <a href='https://github.com/RustedAperture/memeBucket' target='_blank' rel='noopener noreferrer' class='text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors'>GitHub</a> | <a href='https://memebucket.wfox.app' target='_blank' rel='noopener noreferrer' class='text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors'>Website</a>", 
            isHtml: true 
          },
          { 
            type: "output", 
            text: "• petbot [TypeScript] - Interactive Discord community bot. <br/>  <a href='https://github.com/RustedAperture/petbot' target='_blank' rel='noopener noreferrer' class='text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors'>GitHub</a> | <a href='https://petbot.wfox.app' target='_blank' rel='noopener noreferrer' class='text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors'>Website</a>", 
            isHtml: true 
          },
          { type: "output", text: "" },
          { type: "output", text: "=== Open Source Contributions ===" },
          { 
            type: "output", 
            text: "• qmk_firmware [C] - Keyboard firmware contributions. <br/>  <a href='https://github.com/qmk/qmk_firmware' target='_blank' rel='noopener noreferrer' class='text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors'>GitHub</a>", 
            isHtml: true 
          },
          { 
            type: "output", 
            text: "• greptileai/skills [AI / Agent] - Agent PR, CI, and description review skills. <br/>  <a href='https://github.com/greptileai/skills' target='_blank' rel='noopener noreferrer' class='text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors'>GitHub</a>", 
            isHtml: true 
          },
          { type: "output", text: "" },
          { type: "output", text: "=== Demos & Utils ===" },
          { 
            type: "output", 
            text: "• homeassistant_cards [TypeScript] - Lovelace custom UI rendering card. <br/>  <a href='https://github.com/RustedAperture/homeassistant_cards' target='_blank' rel='noopener noreferrer' class='text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors'>GitHub</a>", 
            isHtml: true 
          },
          { 
            type: "output", 
            text: "• jsonfriend [JavaScript] - Lightweight JSON parser and formatting library. <br/>  <a href='https://github.com/RustedAperture/jsonfriend' target='_blank' rel='noopener noreferrer' class='text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors'>GitHub</a>", 
            isHtml: true 
          },
        ])
        break

      case "resume":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "=== CAMERON VARLEY - FULLSTACK ENGINEER ===" },
          { type: "output", text: "Location: Thunder Bay, Ontario | Email: cam.avarley@gmail.com" },
          { type: "output", text: "GitHub: github.com/RustedAperture | LinkedIn: linkedin.com/in/cameron-varley-687368136" },
          { type: "output", text: "" },
          { type: "output", text: "=== PROFESSIONAL SUMMARY ===" },
          { type: "output", text: "Results-oriented Fullstack Engineer and technical operations specialist with a proven" },
          { type: "output", text: "track record of success in end-to-end web application development and infrastructure" },
          { type: "output", text: "automation. Specializes in building robust solutions using Java, TypeScript, and Rust." },
          { type: "output", text: "Brings extensive experience in cross-functional collaboration, establishing CI/CD" },
          { type: "output", text: "pipelines, managing Terraform environments, and leading technical event operations." },
          { type: "output", text: "" },
          { type: "output", text: "=== TECHNICAL SKILLS ===" },
          { type: "output", text: "Languages: TypeScript, JavaScript, Java, Rust, HTML, CSS, C, Python, Kotlin" },
          { type: "output", text: "Tools:     Terraform, Git, GitHub Actions, CI/CD, Postman, Docker" },
          { type: "output", text: "Platforms: GitHub, Bitbucket, GCP, Datadog, Shortcut, Jira" },
          { type: "output", text: "" },
          { type: "output", text: "=== WORK EXPERIENCE ===" },
          { type: "output", text: "• Fullstack Engineer @ momoGood (formerly Givergy) | Feb 2025 - Present" },
          { type: "output", text: "  - Shipped multiple high-impact, user-facing features in Java and TypeScript." },
          { type: "output", text: "  - Engineered automated GitHub Actions CI/CD pipelines." },
          { type: "output", text: "  - Coordinated cloud infrastructure management and provisioning via Terraform." },
          { type: "output", text: "• Event & Product Support Specialist @ Givergy | June 2022 - Feb 2025" },
          { type: "output", text: "  - Guided event delivery, support, platform QA, and internal LMS training." },
          { type: "output", text: "• Global Support Agent @ Givergy | Aug 2021 - June 2022" },
          { type: "output", text: "  - Provided global omni-channel technical support (email, phone, live chat)." },
          { type: "output", text: "• Tech Manager @ Givergy | May 2019 - June 2023" },
          { type: "output", text: "  - Configured high-reliability local WLAN networks hosting bidding tablets." },
          { type: "output", text: "" },
          { type: "output", text: "=== EDUCATION ===" },
          { type: "output", text: "• Computer Systems Technology @ George Brown College | 2018 - 2021" },
          { type: "output", text: "  - Advanced three-year diploma focusing on enterprise network design," },
          { type: "output", text: "    systems administration, and cloud infrastructure deployment." },
          { type: "output", text: "  - Extensive hands-on training with Cisco CCNA, AWS, and Linux administration." },
        ])
        break

      case "man":
        const manTarget = args[0]?.toLowerCase()
        if (!manTarget) {
          setHistory((prev) => [
            ...prev,
            { type: "output", text: "What manual page do you want?" },
            { type: "output", text: "For example, try 'man resume'." }
          ])
        } else if (manTarget === "resume") {
          setHistory((prev) => [
            ...prev,
            { 
              type: "output", 
              text: getResumeManPageHtml(),
              isHtml: true 
            }
          ])
        } else {
          setHistory((prev) => [
            ...prev,
            { type: "output", text: `No manual entry for ${args[0]}` },
            { type: "output", text: "Did you mean 'man resume'?" }
          ])
        }
        break

      case "system":
      case "neofetch":
        const currentTheme = resolvedTheme === "dark" ? "Dark (Amber)" : "Light (Slate)"
        setHistory((prev) => [
          ...prev,
          {
            type: "output",
            text: `
<pre style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; line-height: 1.0; display: flex; gap: 24px; color: #f8f8f2; user-select: text; margin: 0; padding: 0;">
<div style="flex-shrink: 0; color: #f92672; font-weight: bold; line-height: 1.0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
      _______
      |     |
   ___|_____|___________
  /                     \\
 |                       |
 |         __ __         |
 |        |     |        |
 |         __ __         |
 |                       |
  \\_____________________/
</div>
<div style="line-height: 1.4; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
<span style="color: #a6e22e; font-weight: bold;">cameron</span>@<span style="color: #a6e22e;">rustedaperture</span>
<span style="color: #75715e;">----------------------</span>
<span style="color: #66d9ef; font-weight: bold;">Title</span>: Fullstack Engineer
<span style="color: #66d9ef; font-weight: bold;">Employer</span>: momoGood (formerly Givergy)
<span style="color: #66d9ef; font-weight: bold;">Education</span>: George Brown College
<span style="color: #66d9ef; font-weight: bold;">Specialization</span>: Systems & Networking
<span style="color: #66d9ef; font-weight: bold;">Primary Stack</span>: Java, TypeScript, Rust, Terraform
<span style="color: #66d9ef; font-weight: bold;">Location</span>: Thunder Bay, Ontario, Canada
<span style="color: #66d9ef; font-weight: bold;">Production SLA</span>: 99.9% High Availability
<span style="color: #66d9ef; font-weight: bold;">Session Uptime</span>: ${getUptime()}
<span style="color: #66d9ef; font-weight: bold;">Active Shell</span>: zsh
<span style="color: #66d9ef; font-weight: bold;">Editor / IDE</span>: VS Code / Claude Code
<span style="color: #66d9ef; font-weight: bold;">UI Theme</span>: ${currentTheme}
</div>
</pre>
            `,
            isHtml: true,
          },
        ])
        break

      case "theme":
        const targetTheme = args[0]?.toLowerCase()
        if (targetTheme === "dark" || targetTheme === "light") {
          setTheme(targetTheme)
          setHistory((prev) => [
            ...prev,
            { type: "output", text: `Theme successfully set to ${targetTheme}.` },
          ])
        } else {
          // Toggle if no specific theme arg is given
          const nextTheme = resolvedTheme === "dark" ? "light" : "dark"
          setTheme(nextTheme)
          setHistory((prev) => [
            ...prev,
            { type: "output", text: `Theme toggled to ${nextTheme}.` },
          ])
        }
        break

      case "contact":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "=== Contact & Social Links ===" },
          { 
            type: "output", 
            text: "Email:    <a href='mailto:cam.avarley@gmail.com' class='text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors'>cam.avarley@gmail.com</a>", 
            isHtml: true 
          },
          { 
            type: "output", 
            text: "GitHub:   <a href='https://github.com/RustedAperture' target='_blank' rel='noopener noreferrer' class='text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors'>github.com/RustedAperture</a>", 
            isHtml: true 
          },
          { 
            type: "output", 
            text: "LinkedIn: <a href='https://www.linkedin.com/in/cameron-varley-687368136/' target='_blank' rel='noopener noreferrer' class='text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors'>linkedin.com/in/cameron-varley</a>", 
            isHtml: true 
          },
          { 
            type: "output", 
            text: "Website:  <a href='https://camvarley.xyz' target='_blank' rel='noopener noreferrer' class='text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors'>camvarley.xyz</a>", 
            isHtml: true 
          },
        ])
        break

      case "cowsay":
        const cowMessage = args.join(" ")
        setHistory((prev) => [
          ...prev,
          { 
            type: "output", 
            text: `<pre style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; line-height: 1.0; margin: 0; padding: 0; color: #f8f8f2; user-select: text;">${generateCowsay(cowMessage)}</pre>`,
            isHtml: true 
          }
        ])
        break

      case "ls":
        setHistory((prev) => [
          ...prev,
          { 
            type: "output", 
            text: `<span style="color: #a6e22e;">about.txt</span>    <span style="color: #66d9ef;">skills.json</span>    <span style="color: #ae81ff;">experience.md</span>    <span style="color: #f92672;">portfolio.html</span>    <span style="color: #e6db74;">resume.pdf</span>`,
            isHtml: true 
          }
        ])
        break

      case "git":
        const gitSub = args[0]?.toLowerCase()
        if (!gitSub || gitSub === "help" || gitSub === "--help" || gitSub === "-h") {
          setHistory((prev) => [
            ...prev,
            { type: "output", text: "usage: git <command> [<args>]" },
            { type: "output", text: "" },
            { type: "output", text: "  git status   - Show working tree status" },
            { type: "output", text: "  git commit   - Record changes to the repository" },
            { type: "output", text: "  git push     - Push changes to production" },
            { type: "output", text: "  git clone    - Clone this portfolio's brain" }
          ])
        } else if (gitSub === "status") {
          setHistory((prev) => [
            ...prev,
            { type: "output", text: "On branch main" },
            { type: "output", text: "Your branch is up to date with 'origin/main'." },
            { type: "output", text: "" },
            { type: "output", text: "nothing to commit, working tree clean" }
          ])
        } else if (gitSub === "commit") {
          setHistory((prev) => [
            ...prev,
            { type: "output", text: "On branch main" },
            { type: "output", text: "nothing to commit, working tree clean" }
          ])
        } else if (gitSub === "push") {
          setHistory((prev) => [
            ...prev,
            { type: "output", text: "remote: Permission to RustedAperture/brain.git denied to guest." },
            { type: "output", text: "fatal: unable to access 'https://github.com/RustedAperture/brain.git/': The requested URL returned error: 403" }
          ])
        } else if (gitSub === "clone") {
          setHistory((prev) => [
            ...prev,
            { type: "output", text: "Cloning into 'RustedAperture'..." },
            { type: "output", text: "remote: Enumerating objects: 1337, done." },
            { type: "output", text: "remote: Counting objects: 100% (1337/1337), done." },
            { type: "output", text: "remote: Total 1337 (delta 42), reused 1337 (delta 42), pack-reused 0" },
            { type: "output", text: "Receiving objects: 100% (1337/1337), 4.20 MiB | 9.81 MiB/s, done." },
            { type: "output", text: "Resolving deltas: 100% (42/42), done." },
            { 
              type: "output", 
              text: "Warning: You have successfully cloned Cameron's brain. <br/>Inspect the actual repository on <a href='https://github.com/RustedAperture/RustedAperture' target='_blank' rel='noopener noreferrer' class='text-[#66d9ef] underline hover:text-[#a6e22e] transition-colors'>GitHub</a>!", 
              isHtml: true 
            }
          ])
        } else {
          setHistory((prev) => [
            ...prev,
            { type: "output", text: `git: '${args[0]}' is not a git command. See 'git --help'.` }
          ])
        }
        break

      case "clear":
        setHistory([])
        break

      case "exit":
        handleClose()
        break



      default:
        setHistory((prev) => [
          ...prev,
          { 
            type: "output", 
            text: `bash: command not found: ${command}. Type 'help' to see a list of valid commands.` 
          },
        ])
        break
    }
  }

  // Lightweight syntax highlighter for Monokai theme
  const formatMonokai = (text: string) => {
    if (text === "") return <span>&nbsp;</span>

    // Highlight 'help' in bold green
    if (text.includes("'help'")) {
      const parts = text.split("'help'")
      return (
        <span>
          {formatMonokai(parts[0] || "")}
          <span className="text-[#a6e22e] font-bold">'help'</span>
          {formatMonokai(parts[1] || "")}
        </span>
      )
    }

    // 1. Help Command Highlighting: "  about       - Brief..."
    const helpRegex = /^(\s{2})([a-z]+)(\s+-\s+)(.+)$/
    if (helpRegex.test(text)) {
      const match = text.match(helpRegex)
      if (match) {
        return (
          <span>
            {match[1]}
            <span className="text-[#a6e22e] font-bold">{match[2]}</span>
            <span className="text-[#f92672]">{match[3]}</span>
            <span className="text-[#75715e]">{match[4]}</span>
          </span>
        )
      }
    }

    // 2. Section Headers: "=== Technical Skills ==="
    if (text.startsWith("===") && text.endsWith("===")) {
      return <span className="text-[#ae81ff] font-bold">{text}</span>
    }

    // 3. Bullet Points and Work History: "• Fullstack Engineer @ momoGood..."
    if (text.trim().startsWith("•") || text.trim().startsWith("-") || text.trim().startsWith("*")) {
      const bullet = text.includes("•") ? "•" : text.includes("-") ? "-" : "*"
      const restOfText = text.substring(text.indexOf(bullet) + 1)
      
      if (restOfText.includes("|")) {
        const parts = restOfText.split("|")
        return (
          <span>
            <span className="text-[#f92672] font-bold">{bullet}</span>
            <span className="text-[#f8f8f2]">{parts[0]}</span>
            <span className="text-[#75715e]">|</span>
            <span className="text-[#e6db74]">{parts[1]}</span>
          </span>
        )
      }

      return (
        <span>
          <span className="text-[#f92672] font-bold">{bullet}</span>
          <span className="text-[#f8f8f2]">{restOfText}</span>
        </span>
      )
    }

    // 4. Key-Value labels: "Languages: TypeScript..."
    if (text.includes(":") && !text.startsWith("http") && !text.includes("bash:")) {
      const colonIndex = text.indexOf(":")
      const key = text.substring(0, colonIndex + 1)
      const val = text.substring(colonIndex + 1)
      
      if (key.length < 25) {
        return (
          <span>
            <span className="text-[#66d9ef] font-bold">{key}</span>
            <span className="text-[#f8f8f2]">{val}</span>
          </span>
        )
      }
    }

    // 5. Shell errors: "bash: command not found..."
    if (text.startsWith("bash: ")) {
      return (
        <span>
          <span className="text-[#f92672] font-bold">bash: </span>
          <span className="text-[#f8f8f2]">{text.substring(6)}</span>
        </span>
      )
    }

    return <span className="text-[#f8f8f2]">{text}</span>
  }


  if (isMinimized) {
    return (
      <div 
        className="fixed bottom-6 left-6 z-[9999] flex items-center gap-3 pl-3 pr-4 py-2.5 rounded-lg border border-[#3e3d32] bg-[#272822]/95 backdrop-blur-md shadow-2xl hover:border-[#a6e22e]/50 hover:bg-[#1e1f1c]/90 transition-all duration-200 cursor-pointer group select-none animate-in fade-in slide-in-from-bottom-4"
        onClick={() => {
          setIsMinimized(false)
          setTimeout(() => {
            inputRef.current?.focus()
          }, 100)
        }}
        title="Restore Developer Terminal"
      >
        {/* Minimized window controls (just close and restore) */}
        <div className="flex gap-1.5 items-center mr-1" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={handleClose}
            className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:brightness-75 transition-all flex items-center justify-center group/btn border-box"
            style={{ padding: 0 }}
            title="Close"
          >
            <span className="text-[8px] text-zinc-950 font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity leading-none pb-0.5">×</span>
          </button>
          <button 
            onClick={() => {
              setIsMinimized(false)
              setTimeout(() => {
                inputRef.current?.focus()
              }, 100)
            }}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer hover:brightness-75 transition-all flex items-center justify-center group/btn border-box"
            style={{ padding: 0 }}
            title="Restore"
          >
            <span className="text-[8px] text-zinc-950 font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity leading-none pb-0.5">＋</span>
          </button>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#f8f8f2]">
          <FaTerminal className="w-3.5 h-3.5 text-[#a6e22e] group-hover:scale-110 transition-transform" />
          <span>guest@rustedaperture:~</span>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 ${
        isMaximized ? "p-0" : "p-4"
      } animate-in fade-in duration-150`}
      onClick={handleClose}
    >
      {/* Terminal Window container */}
      <div 
        className={`relative flex flex-col font-mono text-sm overflow-hidden text-[#f8f8f2] shadow-2xl ${
          isDragging ? "" : "transition-all duration-300 ease-in-out"
        } ${
          isMaximized 
            ? "w-full h-full max-w-none rounded-none border-none bg-[#272822]" 
            : "w-full max-w-2xl h-[450px] rounded-lg border border-[#3e3d32] bg-[#272822]/95 backdrop-blur-md"
        } animate-in fade-in zoom-in-95 duration-200`}
        style={{ 
          transform: isMaximized ? "none" : `translate(${position.x}px, ${position.y}px)` 
        }}
        onClick={(e) => {
          e.stopPropagation() // Prevent closing when clicking inside the window
          handleContainerClick()
        }}
      >
        {/* Terminal Header */}
        <div 
          className={`flex items-center justify-between px-4 py-2 border-b border-[#181915] bg-[#1e1f1c]/80 select-none shrink-0 ${
            isMaximized 
              ? "cursor-default" 
              : isDragging 
                ? "cursor-grabbing" 
                : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onDoubleClick={() => setIsMaximized(!isMaximized)}
        >
          {/* macOS window controls */}
          <div className="flex gap-1.5 items-center">
            <button 
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:brightness-75 transition-all flex items-center justify-center group border-box"
              style={{ padding: 0 }}
              title="Close"
            >
              <span className="text-[8px] text-zinc-950 font-bold opacity-0 group-hover:opacity-100 transition-opacity leading-none pb-0.5">×</span>
            </button>
            <button 
              onClick={() => setIsMinimized(true)}
              className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer hover:brightness-75 transition-all flex items-center justify-center group border-box"
              style={{ padding: 0 }}
              title="Minimize"
            >
              <span className="text-[8px] text-zinc-950 font-bold opacity-0 group-hover:opacity-100 transition-opacity leading-none pb-1">−</span>
            </button>
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer hover:brightness-75 transition-all flex items-center justify-center group border-box"
              style={{ padding: 0 }}
              title={isMaximized ? "Demaximize" : "Maximize"}
            >
              <span className="text-[6px] text-zinc-950 font-bold opacity-0 group-hover:opacity-100 transition-opacity leading-none">⤢</span>
            </button>
          </div>
          {/* Terminal Title */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#75715e] font-mono">
            <FaTerminal className="w-3.5 h-3.5 text-[#75715e]" />
            <span>guest@rustedaperture:~</span>
          </div>
          {/* Spacer */}
          <div className="w-12" />
        </div>

        {/* Terminal Body */}
        <div 
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5 select-text cursor-text scrollbar-thin scrollbar-thumb-[#3e3d32] scrollbar-track-transparent"
        >
          {history.map((item, index) => (
            <div key={index} className={`font-mono ${item.isHtml ? '' : 'whitespace-pre-wrap leading-relaxed'}`}>
              {item.type === "input" ? (
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="text-[#a6e22e] font-bold shrink-0 font-mono">guest@rustedaperture</span>
                  <span className="text-[#75715e] shrink-0 font-mono">:</span>
                  <span className="text-[#66d9ef] font-bold shrink-0 font-mono">~</span>
                  <span className="text-[#f8f8f2] shrink-0 font-mono">$</span>
                  <span className="text-[#f8f8f2] font-mono">{item.text}</span>
                </div>
              ) : item.isHtml ? (
                <div 
                  className="text-[#f8f8f2] font-mono" 
                  dangerouslySetInnerHTML={{ __html: item.text }} 
                />
              ) : (
                <div className="text-[#f8f8f2] font-mono">{formatMonokai(item.text)}</div>
              )}
            </div>
          ))}
          
          {/* Active Input Line */}
          <div className="flex items-center gap-1.5 mt-0.5 shrink-0 font-mono">
            <span className="text-[#a6e22e] font-bold shrink-0 font-mono">guest@rustedaperture</span>
            <span className="text-[#75715e] shrink-0 font-mono">:</span>
            <span className="text-[#66d9ef] font-bold shrink-0 font-mono">~</span>
            <span className="text-[#f8f8f2] shrink-0 font-mono">$</span>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-[#f8f8f2] font-mono focus:ring-0 p-0 m-0 caret-[#f92672] select-text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
          </div>
          
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  )
}
