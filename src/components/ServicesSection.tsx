"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowRight, Headphones, Mic, Radio, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "./ui/card"
import { TextReveal } from "./ui/text-reveal"
import { GradientSection } from "@/components/ui/gradient-section"

interface ServiceItem {
    icon: React.ReactNode
    title: string
    description: string
    stats: string[]
    color: string
}

interface ExpertiseSectionProps {
    servicesRef: React.RefObject<HTMLElement | null>
    handleCursorEnter: (variant: string, text?: string) => void
    handleCursorLeave: () => void
    scrollToSection: (sectionId: string) => void
}

export default function ServicesSection({
    servicesRef,
    handleCursorEnter,
    handleCursorLeave,
    scrollToSection,
}: ExpertiseSectionProps) {
    // Services data
    const services: ServiceItem[] = [
        {
            icon: <Mic className="w-10 h-10" />,
            title: "Podcast Advertising",
            description: "Strategic podcast sponsorships and host-read ads that connect with engaged, targeted audiences.",
            stats: ["78% Brand Recall", "4.5x ROI", "32% New Customer Acquisition"],
            color: "from-cyan-500 to-blue-600",
        },
        {
            icon: <Radio className="w-10 h-10" />,
            title: "Social Media Campaigns",
            description: "Data-driven social campaigns that drive engagement, conversions, and measurable business results.",
            stats: ["45% Average ROI", "3.2M+ Impressions", "12% Conversion Rate"],
            color: "from-purple-500 to-violet-600",
        },
        {
            icon: <MessageSquare className="w-10 h-10" />,
            title: "Influencer Marketing",
            description: "Authentic partnerships with creators who align with your brand values and target audience.",
            stats: ["89% Trust Rating", "5.7M+ Reach", "18% Engagement Rate"],
            color: "from-fuchsia-500 to-pink-600",
        },
        {
            icon: <Headphones className="w-10 h-10" />,
            title: "Audio Production",
            description: "Professional audio content creation that captivates listeners and elevates your brand message.",
            stats: ["67% Increase in Engagement", "3x Content ROI", "42% Reduced CAC"],
            color: "from-blue-500 to-indigo-600",
        },
    ]

    return (
        <GradientSection 
            className="py-20 md:py-32"
            gradientClassName="bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06),transparent_65%)]"
            ref={servicesRef}
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
                        Our Expertise
                    </div>
                    <div className="p-3 flex justify-center w-full">
                        <TextReveal 
                            text="You Know Your Business" 
                            revealText="We Know How To Market It"
                            className="w-full"
                        />
                    </div>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        At Soundspire Media, we help startups, small businesses, and audio newbies make a splash in podcasting, streaming audio, radio, and more. We&apos;re here to make your brand&apos;s voice loud and clear, connect you with listeners who&apos;ll love you, and get you the most bang for your buck.
                    </p>
                    <p className="text-gray-300">
                        We&apos;ll help you identify the perfect podcast audiences for your brand&apos;s message, ensuring your ads reach listeners who&apos;ll truly connect with your offering.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
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
                            <Card className="h-full bg-black/50 backdrop-blur-sm border border-[#8C39E0]/30 hover:border-[#8C39E0]/40 transition-all shadow-lg overflow-hidden">
                                <CardContent className="p-6">
                                    <div
                                        className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 text-white`}
                                    >
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                                    <p className="text-gray-300 mb-6">{service.description}</p>

                                    <div className="border-t border-[#FF3BFF]/50 pt-4">
                                        <h4 className="text-sm font-semibold mb-3">Performance Metrics</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {service.stats.map((stat, i) => (
                                                <div
                                                    key={i}
                                                    className="text-xs text-white px-2 py-1 rounded-full border border-[#FF3BFF]/50"
                                                >
                                                    {stat}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <Button
                        onClick={() => scrollToSection("contact")}
                        className="bg-gradient-to-r from-[#8C39E0] via-[#C651F2] to-[#FF3BFF] hover:from-[#FF3BFF] hover:to-[#8C39E0] text-white px-8 py-6 text-lg w-full sm:w-auto border-0 relative overflow-hidden group"
                        onMouseEnter={() => handleCursorEnter("button", "Discuss Your Project")}
                        onMouseLeave={handleCursorLeave}
                    >
                        <span className="relative z-10">Discuss Your Project</span>
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
                        <ArrowRight className="ml-2 w-4 h-4 relative z-10" />
                    </Button>
                </motion.div>
            </div>
        </GradientSection>
    )
}