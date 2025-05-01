"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState, useCallback } from "react"
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

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }
    }
  }, [direction])

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "25s")
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "37.5s")
      } else {
        containerRef.current.style.setProperty("--animation-duration", "50s")
      }
    }
  }, [speed])

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
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-24 py-4",
          start && "animate-scroll"
        )}
      >
        {items.map((item, idx) => (
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
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InfiniteMovingLogos
