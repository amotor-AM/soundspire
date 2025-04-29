"use client"

import { useEffect, useState } from "react"
import { motion, type MotionValue, useSpring } from "framer-motion"

interface FuturisticCursorProps {
  variant: string
  text: string
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

export default function FuturisticCursor({ variant, text, mouseX, mouseY }: FuturisticCursorProps) {
  const [isVisible, setIsVisible] = useState(true)

  // Spring physics for smooth cursor movement
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Hide cursor when mouse leaves window
  useEffect(() => {
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  // Cursor variants
  const getCursorSize = () => {
    switch (variant) {
      case "button":
        return { width: 80, height: 80 }
      case "link":
        return { width: 40, height: 40 }
      case "card":
        return { width: 60, height: 60 }
      case "view":
        return { width: 100, height: 100 }
      case "audio":
        return { width: 100, height: 100 }
      case "social":
        return { width: 60, height: 60 }
      case "logo":
        return { width: 50, height: 50 }
      default:
        return { width: 20, height: 20 }
    }
  }

  const { width, height } = getCursorSize()

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: `-50%`,
        translateY: `-50%`,
      }}
    >
      {isVisible && (
        <>
          {/* Default cursor dot */}
          <motion.div
            className="rounded-full bg-cyan-400"
            animate={{
              width: variant === "default" ? 12 : 8,
              height: variant === "default" ? 12 : 8,
              opacity: 0.8,
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Custom cursor ring */}
          {variant !== "default" && (
            <motion.div
              className="absolute rounded-full border-2 border-cyan-400 flex items-center justify-center text-xs font-medium text-cyan-400"
              initial={{ width, height, opacity: 0 }}
              animate={{
                width,
                height,
                opacity: 0.8,
                x: `-${width / 2 - 6}px`,
                y: `-${height / 2 - 6}px`,
              }}
              transition={{ duration: 0.2 }}
            >
              {text && <span>{text}</span>}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  )
}
