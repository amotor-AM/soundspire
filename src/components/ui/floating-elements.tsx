"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function FloatingElements() {
  const [elements, setElements] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
  }>>([])

  useEffect(() => {
    // Generate random positions for elements on client-side only
    setElements(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 10,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <div
          key={element.id}
          style={{
            position: "absolute",
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
        >
          <motion.div
            className="rounded-full bg-[#FF3BFF]/20 border-2 border-[#FF3BFF]/10"
            style={{
              width: element.size,
              height: element.size,
              backdropFilter: "blur(8px)",
            }}
            initial={{ transform: "translate(0px, 0px)" }}
            animate={{
              transform: [
                "translate(0px, 0px)",
                "translate(-40px, 40px)",
                "translate(30px, -30px)",
                "translate(-20px, 20px)",
                "translate(0px, 0px)",
              ],
              opacity: [0.3, 0.4, 0.3, 0.5, 0.3],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut",
            }}
          />
        </div>
      ))}
    </div>
  )
}
