"use client"

import { useEffect, useRef, useState, memo } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const TextReveal = ({
  text,
  revealText,
  className,
}: {
  text: string
  revealText: string
  className?: string
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLParagraphElement | null>(null)
  const [textRect, setTextRect] = useState<DOMRect | null>(null)
  const [isMouseOver, setIsMouseOver] = useState(false)

  useEffect(() => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect()
      setTextRect(rect)
    }
  }, [text, revealText])

  function mouseMoveHandler(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault()
    if (!containerRef.current || !textRef.current) return

    const rect = textRef.current.getBoundingClientRect()
    const { clientX } = event
    const relativeX = clientX - rect.left
    const padding = rect.width * 0.1 // 10% padding on each side

    // Adjust the bounds to include padding
    if (relativeX >= -padding && relativeX <= rect.width + padding) {
      // Normalize the percentage to account for the padding
      const adjustedPercentage = ((relativeX + padding) / (rect.width + (padding * 2))) * 100
      setWidthPercentage(adjustedPercentage)
    } else if (relativeX < -padding) {
      setWidthPercentage(0)
    } else if (relativeX > rect.width + padding) {
      setWidthPercentage(100)
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false)
    setWidthPercentage(0)
  }

  function mouseEnterHandler() {
    setIsMouseOver(true)
  }

  function touchMoveHandler(event: React.TouchEvent<HTMLDivElement>) {
    event.preventDefault()
    if (!textRect || !containerRef.current) return

    const clientX = event.touches[0]!.clientX
    const relativeX = clientX - textRect.left
    const padding = textRect.width * 0.1 // 10% padding on each side

    // Adjust the bounds to include padding
    if (relativeX >= -padding && relativeX <= textRect.width + padding) {
      const adjustedPercentage = ((relativeX + padding) / (textRect.width + (padding * 2))) * 100
      setWidthPercentage(adjustedPercentage)
    } else if (relativeX < -padding) {
      setWidthPercentage(0)
    } else if (relativeX > textRect.width + padding) {
      setWidthPercentage(100)
    }
  }

  const rotateDeg = (widthPercentage - 50) * 0.1

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <div className="relative flex items-center justify-center content-center overflow-hidden h-40 w-full">
        <div className="relative inline-block" style={{ minWidth: "max-content" }}>
          <motion.div
            style={{
              width: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              minWidth: "max-content"
            }}
            animate={
              isMouseOver
                ? {
                    opacity: 1,
                    clipPath: `inset(0 ${Math.max(100 - widthPercentage - 2, 0)}% 0 0)`,
                  }
                : {
                    clipPath: `inset(0 110% 0 0)`,
                    opacity: 0,
                  }
            }
            transition={{ duration: 0 }}
            className="absolute bg-[#0d1113] z-20 will-change-transform"
          >
            <p
              ref={textRef}
              style={{
                textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
                whiteSpace: "nowrap",
              }}
              className="text-base sm:text-[3rem] py-10 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 text-center"
            >
              {revealText}
            </p>
          </motion.div>

          <motion.div
            animate={{
              left: isMouseOver 
                ? `${Math.min(widthPercentage - 2, 98)}%`
                : '-5%',
              rotate: `${rotateDeg}deg`,
              opacity: isMouseOver ? 1 : 0.5,
            }}
            transition={{ 
              duration: 0,
              type: "tween"
            }}
            className="h-40 w-[8px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute z-50 will-change-transform blur-[0.5px]"
            style={{
              pointerEvents: 'none',
              transform: `translateX(-50%)`,
            }}
          ></motion.div>

          <div className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
            <p 
              className="text-base sm:text-[3rem] py-10 font-bold bg-clip-text text-transparent bg-[#323238] text-center"
              style={{ whiteSpace: "nowrap" }}
            >
              {text}
            </p>
            <div className="absolute inset-0 w-full">
              <MemoizedStars />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Stars = () => {
  const randomMove = () => Math.random() * 15 - 7.5
  const randomOpacity = () => Math.random() * 0.7 + 0.3
  const random = () => Math.random()

  const stars = Array.from({ length: 140 }, (_, i) => {
    const row = Math.floor(i / 12)
    const col = i % 12
    
    return {
      initialX: (col / 12) * 100 + (random() * 8 - 4),
      initialY: (row / 12) * 100 + (random() * 8 - 4),
      duration: random() * 5 + 15,
      delay: random() * -10,
      size: random() * 1.5 + 1
    }
  })

  return (
    <div className="absolute inset-0">
      {stars.map((star, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: [
              `${star.initialY}%`,
              `${star.initialY + randomMove()}%`,
              `${star.initialY - randomMove()}%`,
              `${star.initialY}%`
            ],
            left: [
              `${star.initialX}%`,
              `${star.initialX - randomMove()}%`,
              `${star.initialX + randomMove()}%`,
              `${star.initialX}%`
            ],
            opacity: [randomOpacity(), randomOpacity(), randomOpacity()],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "linear",
            delay: star.delay,
          }}
          style={{
            position: "absolute",
            top: `${star.initialY}%`,
            left: `${star.initialX}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  )
}

const MemoizedStars = memo(Stars)
