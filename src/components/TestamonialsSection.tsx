"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {GradientSection} from "@/components/ui/gradient-section"

interface Testimonial {
  quote: string
  author: string
  position: string
  image: string
}

interface TestimonialsSectionProps {
  handleCursorEnter: (variant: string, text?: string) => void
  handleCursorLeave: () => void
}

export default function TestimonialsSection({ handleCursorEnter, handleCursorLeave }: TestimonialsSectionProps) {
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      quote:
        "Soundspire transformed our podcast advertising strategy. We saw a 300% increase in conversions within the first month.",
      author: "Sarah Johnson",
      position: "CMO at NeoTech Ventures",
      image: "/testimonial-1.jpg",
    },
    {
      quote:
        "Their social media campaigns consistently outperform industry benchmarks. The team's creativity and data-driven approach is unmatched.",
      author: "Michael Chen",
      position: "Director of Marketing, Quantum Fitness",
      image: "/testimonial-2.jpg",
    },
    {
      quote:
        "Working with Soundspire has been transformative for our brand. They understand our audience and deliver results that exceed expectations.",
      author: "Jessica Williams",
      position: "Founder, Fusion Foods",
      image: "/testimonial-3.jpg",
    },
  ]

  return (
    <GradientSection 
      className="py-20 md:py-32"
      gradientClassName="bg-gradient-to-b from-transparent via-black/20 to-blue-950/20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-block rounded-full bg-cyan-900/30 border border-cyan-500/30 px-3 py-1 text-sm text-cyan-400 font-medium mb-4">
            Client Success
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] via-[#C651F2] to-[#8C39E0]">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Hear from the brands who&apos;ve experienced our results-driven approach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
              onMouseEnter={() => handleCursorEnter("card")}
              onMouseLeave={handleCursorLeave}
            >
              <Card className="h-full bg-black/30 backdrop-blur-sm border-2 border-[#FF3BFF]/20 hover:border-[#FF3BFF]/40 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF3BFF]/10 via-[#C651F2]/10 to-[#8C39E0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="p-6 relative z-10">
                  <div className="mb-6">
                    <div className="flex gap-1">
                      {Array(5).fill(0).map((_, i) => (
                        <span key={i} className="text-[#FF3BFF]">★</span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 italic relative">
                    <span className="absolute -left-2 -top-2 text-4xl text-[#FF3BFF]/20">&ldquo;</span>
                    {testimonial.quote}
                    <span className="absolute -right-2 bottom-0 text-4xl text-[#FF3BFF]/20">&rdquo;</span>
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF3BFF]/30 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF3BFF]/20 via-[#C651F2]/20 to-[#8C39E0]/20" />
                      <Image
                        src={testimonial.image || "/placeholder.svg?height=48&width=48&query=professional headshot"}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover relative z-10"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] to-[#8C39E0]">
                        {testimonial.author}
                      </h4>
                      <p className="text-sm text-[#FF3BFF]/70">{testimonial.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </GradientSection>
  )
}
