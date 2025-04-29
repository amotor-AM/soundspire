"use client"
import React from "react"
import FloatingElements from "./ui/floating-elements";
import { motion } from "framer-motion"
import ParticleBackground from "./ui/particle-background";
import { ChevronDown } from "lucide-react"
import { Button } from "./ui/button"

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
  heroRef: React.RefObject<HTMLDivElement | null>
  handleCursorEnter: (variant: string, text?: string) => void
  handleCursorLeave: () => void
}

export default function HeroSection({ 
  scrollToSection,
  heroRef,
  handleCursorEnter,
  handleCursorLeave
}: HeroSectionProps) {
  return (
    <motion.section
          id="hero"
          ref={heroRef}
          className="min-h-screen flex items-center justify-center relative pt-32 pb-20 overflow-hidden"
        >
            <ParticleBackground />
          <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)]" />
            <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/5" />
              ))}
            </div>
          </div>

          <FloatingElements />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center text-center w-8xl max-w-[80vw] mx-auto">
              <motion.div
                className="inline-block rounded-full bg-cyan-900/30 border border-cyan-500/30 px-3 py-1 text-sm text-cyan-400 font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Next-Gen Media Advertising
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] from-10% via-[#C651F2] via-30% to-[#8C39E0] to-90% mb-8 leading-[1.2]"
              >
                Amplify Your Brand&apos;s Digital Presence
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                We engineer cutting-edge advertising campaigns that leverage the latest in social media and podcast
                technology to deliver measurable, impactful results.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.div
                  onMouseEnter={() => handleCursorEnter("button", "Get Started")}
                  onMouseLeave={handleCursorLeave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="bg-gradient-to-r from-[#8C39E0] via-[#C651F2] to-[#FF3BFF] hover:from-[#FF3BFF] hover:to-[#8C39E0] text-white px-8 py-6 text-lg w-full sm:w-auto border-0 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Get Started</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#8C39E0] to-[#FF3BFF] opacity-0 group-hover:opacity-100"
                      animate={{
                        background: [
                          "linear-gradient(90deg, #8C39E0 0%, #FF3BFF 100%)",
                          "linear-gradient(90deg, #FF3BFF 0%, #8C39E0 100%)",
                          "linear-gradient(90deg, #8C39E0 0%, #FF3BFF 100%)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </Button>
                </motion.div>
                <motion.div
                  onMouseEnter={() => handleCursorEnter("button", "Our Work")}
                  onMouseLeave={handleCursorLeave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => scrollToSection("portfolio")}
                    variant="outline"
                    className="border-[#8C39E0] text-white hover:bg-[#8C39E0]/50 px-8 py-6 text-lg w-full sm:w-auto"
                  >
                    Our Work
                  </Button> 
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-8 h-8 text-[#FF3BFF] cursor-pointer" onClick={() => scrollToSection("services")} />
          </motion.div>
        </motion.section>
  );
}