"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface SplitTextProps {
  text: string
  className?: string
}

export default function SplitText({ text, className }: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.04 * i,
      },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "tween",
        duration: 1,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "tween",
        duration: 1,
      },
    },
  }

  const textStyle = "inline-block mr-[0.2em] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] via-[#C651F2] to-[#8C39E0]"

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("relative", className)}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className={textStyle}
          variants={child}
          style={{ opacity: 0 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
