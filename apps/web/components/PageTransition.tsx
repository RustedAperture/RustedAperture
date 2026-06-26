import React from "react"

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}} />
      <div className={`animate-fade-in ${className || ""}`}>
        {children}
      </div>
    </>
  )
}
