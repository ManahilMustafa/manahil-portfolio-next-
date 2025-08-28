"use client"

import { useEffect, useRef } from "react"

interface SparklesProps {
  className?: string
  particleCount?: number
}

export function Sparkles({ className = "", particleCount = 50 }: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createSparkle = () => {
      const sparkle = document.createElement("div")
      sparkle.className = "absolute w-1 h-1 bg-primary rounded-full sparkle"
      sparkle.style.left = Math.random() * 100 + "%"
      sparkle.style.top = Math.random() * 100 + "%"
      sparkle.style.animationDelay = Math.random() * 2 + "s"
      sparkle.style.animationDuration = Math.random() * 2 + 1 + "s"

      container.appendChild(sparkle)

      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle)
        }
      }, 3000)
    }

    const interval = setInterval(createSparkle, 100)

    // Create initial sparkles
    for (let i = 0; i < particleCount; i++) {
      setTimeout(createSparkle, i * 50)
    }

    return () => {
      clearInterval(interval)
    }
  }, [particleCount])

  return <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />
}
