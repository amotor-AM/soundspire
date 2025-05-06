"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState, useCallback, useMemo } from "react"
import Image from "next/image"

export const InfiniteMovingLogos = ({
  items,
  direction = "left",
  speed = "normal",
  className,
}: {
  items: {
    name: string
    logo: string
    width?: number
    height?: number
  }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)
  const [start, setStart] = useState(false)

  // Memoize the animation duration based on speed
  const animationDuration = useMemo(() => {
    switch (speed) {
      case "fast":
        return "360s"  // 6 minutes
      case "slow":
        return "720s"  // 12 minutes
      default:
        return "480s"  // 8 minutes
    }
  }, [speed])

  // Memoize the animation direction
  const animationDirection = useMemo(() => {
    return direction === "left" ? "forwards" : "reverse"
  }, [direction])

  // Memoize the duplicated items to prevent unnecessary re-renders
  const duplicatedItems = useMemo(() => {
    return [...items, ...items]
  }, [items])

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-direction", animationDirection)
    }
  }, [animationDirection])

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-duration", animationDuration)
    }
  }, [animationDuration])

  useEffect(() => {
    function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children)

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true)
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem)
          }
        })

        getDirection()
        getSpeed()
        setStart(true)
      }
    }
    
    addAnimation()
  }, [getDirection, getSpeed])

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-8xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-24 py-4",
          start && "animate-scroll"
        )}
        style={{
          animationDuration: animationDuration,
          animationDirection: animationDirection as "normal" | "reverse",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <li
            className="relative flex h-20 shrink-0 items-center justify-center transition-all hover:scale-105"
            key={`${item.name}-${idx}`}
          >
            <div className="relative h-full w-[200px]">
              <Image
                src={item.logo || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-contain transition-all brightness-0 invert"
                sizes="(max-width: 768px) 100vw, 200px"
                quality={85}
                priority={idx < 4}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InfiniteMovingLogos
