"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { motion } from "framer-motion"
import { ArrowRight, LineChart, Users, BarChart3, AudioWaveform } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "./ui/card"
import { TextReveal } from "./ui/text-reveal"

interface ServiceItem {
    icon: React.ReactNode
    title: string
    description: string
    stats?: string[]
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
            icon: <LineChart className="w-10 h-10" />,
            title: "Smart Ad Buying",
            description: "Strategic media buying powered by industry relationships and data-driven insights. We secure premium ad placements across the audio landscape at optimal rates, maximizing your ROI.",
            // stats: ["25% Cost Savings", "2.4x ROI", "65% Premium Spots"],
            color: "from-cyan-500 to-blue-600",
        },
        {
            icon: <Users className="w-10 h-10" />,
            title: "Finding Your Audience",
            description: "Advanced audience targeting and segmentation to connect with your ideal listeners. We analyze demographics, behaviors, and interests to ensure your message reaches the right ears.",
            // stats: ["76% Audience Match", "2.8x Engagement", "18% Higher CTR"],
            color: "from-purple-500 to-violet-600",
        },
        {
            icon: <BarChart3 className="w-10 h-10" />,
            title: "Fine-Tuning & Tracking",
            description: "Real-time performance analytics and optimization. We continuously monitor, measure, and refine your campaigns using industry-leading tools to maximize impact and ROI.",
            // stats: ["Daily Reporting", "12% Lift", "98% Uptime"],
            color: "from-fuchsia-500 to-pink-600",
        },
        {
            icon: <AudioWaveform className="w-10 h-10" />,
            title: "Impact Through Audio",
            description: "Professional audio production that captures attention and drives action. From compelling ad scripts to killer talking points, we create memorable audio experiences that elevate your brand.",
            // stats: ["85% Listen-Through", "4.2/5 Quality", "22% Brand Recall"],
            color: "from-blue-500 to-indigo-600",
        },
    ]

    const [isMobile, setIsMobile] = useState(false);

    function isTouchDevice() {
        return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth < 1050);
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(isTouchDevice());
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <section ref={servicesRef} id="services" className="py-20 md:py-32 bg-gradient-to-b from-[#010101] via-[#060e12] to-[#060e12]">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="inline-block rounded-full bg-indigo-900/30 border border-indigo-500/30 px-3 py-1 text-sm text-indigo-400 font-medium mb-4">
                        Our Expertise
                    </div>
                    {!isMobile && (
                        <div className="p-3 flex justify-center w-full">
                            <TextReveal
                                text="You Know Your Business"
                                revealText="We Know How To Market It"
                                className="w-full"
                            />
                        </div>
                    )}
                    {isMobile && (
                        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
                            <h2 className="text-4xl md:text-6xl leading-[1.2] text-white">
                                You Know Your Business
                            </h2>
                            <h2 className="text-4xl md:text-6xl font-bold mb-5 leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] via-[#C651F2] to-[#8C39E0]">
                                We Know How To Market It
                            </h2>
                        </div>
                    )}
                    <p className="text-gray-300 max-w-7xl mx-auto text-xl md:text-2xl">
                        At Soundspire Media, we help startups, small businesses, and audio newbies make a splash in podcasting, streaming audio, radio, and more. We&apos;re here to make your brand&apos;s voice loud and clear, connect you with listeners who&apos;ll love you, and get you the most bang for your buck. We&apos;ll help you identify the perfect podcast audiences for your brand&apos;s message, ensuring your ads reach listeners who&apos;ll truly connect with your offering.
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
                            <Card className="h-full backdrop-blur-sm border border-indigo-300/10 hover:border-indigo-300/40 transition-all shadow-lg overflow-hidden">
                                <CardContent className="p-6">
                                    <div
                                        className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 text-white`}
                                    >
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{service.title}</h3>
                                    <p className="text-gray-300 mb-6 text-base md:text-lg">{service.description}</p>
                                    {service.stats && (
                                        <div className="border-t border-[#FF3BFF]/50 pt-4">
                                            <h4 className="text-sm md:text-base font-semibold mb-3">Performance Metrics</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {service.stats.map((stat, i) => (
                                                    <div
                                                        key={i}
                                                        className="text-xs md:text-sm text-white px-2 py-1 rounded-full border border-[#FF3BFF]/50"
                                                    >
                                                        {stat}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
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
                        className="bg-[#8C39E0] bg-gradient-to-r from-[#FF3BFF] from-10% via-[#C651F2] via-30% to-[#8C39E0] to-90% hover:from-[#FF3BFF] hover:to-[#8C39E0] text-white px-8 py-6 text-lg w-full sm:w-auto border-0 relative overflow-hidden group"
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
        </section>
    )
}