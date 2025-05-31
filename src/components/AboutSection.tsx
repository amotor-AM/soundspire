"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AboutSectionProps {
  aboutRef: React.RefObject<HTMLElement | null>
  handleCursorEnter: (variant: string, text?: string) => void
  handleCursorLeave: () => void
}

// 3D Animated Pin component
export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode
  title?: string
  href?: string
  className?: string
  containerClassName?: string
}) => {
  const [transform, setTransform] = useState("translate(-50%,-50%) rotateX(0deg)")

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)")
  }
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)")
  }

  return (
    <div
      className={cn("relative group/pin cursor-pointer", containerClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => href && window.open(href, "_blank")}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
        >
          <div className={cn("relative z-50", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} />
    </div>
  )
}

export const PinPerspective = ({
  title,
}: {
  title?: string
}) => {
  return (
    <motion.div className="pointer-events-none w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
      <div className="w-full h-full -mt-7 flex-none inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
            <span className="relative z-20 text-white text-xs font-bold inline-block py-0.5">{title}</span>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-indigo-400/0 via-indigo-400/90 to-indigo-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </div>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: [0, 1, 1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-indigo-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: [0, 1, 1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-indigo-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: [0, 1, 1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-indigo-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            />
          </>
        </div>

        <>
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-indigo-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-indigo-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40" />
          <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-indigo-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
          <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-indigo-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
        </>
      </div>
    </motion.div>
  )
}

// Founder Avatar component with 3D Pin
const FounderAvatar = ({
  image,
  name,
  role,
  linkedin,
}: {
  image: string
  name: string
  role: string
  linkedin: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-48 w-48 mb-4">
        <PinContainer
          title={`Connect with ${name}`}
          href={linkedin}
          containerClassName="w-48 h-48"
        >
          <div className="flex items-center justify-center w-32 h-32">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" sizes="128px" />
            </div>
          </div>
        </PinContainer>
      </div>

      <h3 className="text-lg font-bold text-white">{name}</h3>
      <p className="text-sm text-[#FF3BFF]">{role}</p>
    </motion.div>
  )
}

export default function AboutSection({ aboutRef }: AboutSectionProps) {
  // Founder data
  const founders = [
    {
      name: "Kristen Valentine",
      role: "Founder & Audio Ad Expert",
      image: "/images/Kristen.jpeg",
      linkedin: "https://www.linkedin.com/in/kristen-valentine-coseo-6675132a/",
    },
    {
      name: "Ally Kandel",
      role: "Founder & Audio Ad Expert",
      image: "/images/Ally.jpeg",
      linkedin: "https://www.linkedin.com/in/alisonkandel/",
    },
  ]

  return (
    <section ref={aboutRef} id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.05),transparent_60%)]">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-block rounded-full bg-indigo-900/30 border border-indigo-500/30 px-3 py-1 text-sm text-indigo-400 font-medium mb-4">
            About Us
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-5 leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] via-[#C651F2] to-[#8C39E0]">
            The Future Of Smarter Audio
          </h2>
        </motion.div>

        <div className="max-w-7xl mx-auto mb-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              We&apos;re two audio nerds who ditched the boring agency life to help brands like yours shine in the audio
              world. We are wizards at crafting audio strategies that click, and pro&apos;s at getting your ads in front of
              the right ears.
            </p>
          </motion.div>
        </div>

        {/* <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
          {founders.map((founder, index) => (
            <FounderAvatar
              key={index}
              image={founder.image}
              name={founder.name}
              role={founder.role}
              linkedin={founder.linkedin}
            />
          ))}
        </div> */}
      </div>
    </section>
  )
}
