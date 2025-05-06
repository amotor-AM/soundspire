"use client"

import type React from "react"
import { motion } from "framer-motion"
import dynamic from 'next/dynamic'

interface PartnersItem {
  name: string
  logo: string
}

interface PartnersSectionProps {
  partnersRef: React.RefObject<HTMLElement | null>
}

// Dynamically import the InfiniteMovingLogos component
const InfiniteMovingLogos = dynamic(() => import("@/components/ui/infinite-moving-logos"), {
  ssr: false,
  loading: () => <div className="h-24 w-full animate-pulse bg-gray-800/20 rounded-lg" />
})

export default function PartnersSection({ partnersRef }: PartnersSectionProps) {
  const topRowPartners: PartnersItem[] = [
    { name: "DraftKings", logo: "/images/partners/DraftKings.svg" },
    { name: "SimpliSafe", logo: "/images/partners/SimpliSafe.svg" },
    { name: "Lightstream", logo: "/images/partners/LightStream.svg" },
    { name: "Honey", logo: "/images/partners/Honey.svg" },
    { name: "LegalZoom", logo: "/images/partners/LegalZoom.svg" },
    { name: "Uber", logo: "/images/partners/Uber.svg" },
    { name: "Carshield", logo: "/images/partners/CarShield.png" },
    { name: "CI Financial", logo: "/images/partners/CIFinancial.svg" },
    { name: "Etsy", logo: "/images/partners/Etsy.svg" },
    { name: "Priceline", logo: "/images/partners/Priceline.svg" },
  ]

  return (
    <section id="partners" ref={partnersRef} className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 translate-y-[15%] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.05),transparent_60%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-block rounded-full bg-indigo-900/30 border border-indigo-500/30 px-3 py-1 text-sm text-indigo-400 font-medium mb-4">
            Our Partners
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-5 leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] via-[#C651F2] to-[#8C39E0]">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-6xl mx-auto">
            We collaborate with the biggest names in technology and media to deliver exceptional results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full"
        >
          {/* Static Grid */}
          {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
            {topRowPartners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex items-center justify-center"
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={200}
                  height={100}
                  className="max-w-[200px] h-auto grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  quality={85}
                  priority={index < 4}
                />
              </motion.div>
            ))}
          </div> */}

          {/* Infinite Moving Logos */}
          <div className="relative">
            <InfiniteMovingLogos
              items={topRowPartners}
              direction="left"
              speed="slow"
              className="py-8"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
