"use client"
import { useState, useEffect, useRef } from "react"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import FuturisticCursor from "@/components/ui/futuristic-cursor"
import { useMobile } from "@/hooks/use-moble"
import { MultiStepLoader } from "@/components/ui/multi-step-loader"
import SuccessMessage from "@/components/ui/success-message"
// sections
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestamonialsSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const navItems = [
  { name: "Home", link: "#hero" },
  { name: "Services", link: "#services" },
  { name: "Work", link: "#portfolio" },
  { name: "Partners", link: "#partners" }
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [activeSection, setActiveSection] = useState("hero")
  const [cursorVariant, setCursorVariant] = useState("default")
  const [cursorText, setCursorText] = useState("")
  const isMobile = useMobile()
  // const [visible, setVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const partnersRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Mouse position for interactive elements
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Scroll progress
  const { scrollYProgress } = useScroll()
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Background gradient animation based on scroll
  const gradientRotate = useTransform(smoothScrollYProgress, [0, 1], [0, 360])
  const gradientRotateStyle = useMotionTemplate`${gradientRotate}deg`

  // Loading states for the multi-step loader
  const loadingStates = [
    { text: "Making sure your email hits all the right notes..." },
    { text: "Tuning our inbox to the perfect frequency for your email..." },
    { text: "Routing your message to the right team..." },
    { text: "Delicately placing your email at the top of our inbox..." }
  ]

  // Update active section based on scroll position
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY + 100
  //     const sections = ["hero", "services", "about", "partners", "contact"] // Changed "portfolio" to "about"

  //     for (const section of sections) {
  //       const element = document.getElementById(section)
  //       if (element) {
  //         if (scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
  //           setActiveSection(section)
  //           break
  //         }
  //       }
  //     }
  //   }

  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

  // Mouse move handler for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Cursor handlers
  const handleCursorEnter = (variant: string, text = "") => {
    setCursorVariant(variant)
    setCursorText(text)
  }

  const handleCursorLeave = () => {
    setCursorVariant("default")
    setCursorText("")
  }

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill in all fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    // Simulate form submission with the multi-step loader
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 6000) // Show each loading state for 2 seconds (3 states * 2 seconds)
  }

  // Close success message
  const handleCloseSuccess = () => {
    setShowSuccess(false)
  }

  return (
    <main className="relative">
      {/* Base background layers */}
      <div className="fixed inset-0 bg-black/90" />
      <motion.div
        className="fixed inset-0 opacity-50"
        style={{
          background: `linear-gradient(${gradientRotateStyle}, 
            rgba(15, 23, 42, 0.8), 
            rgba(30, 27, 75, 0.8), 
            rgba(15, 23, 42, 0.8))`
        }}
      />

      {!isMobile && <FuturisticCursor variant={cursorVariant} text={cursorText} mouseX={mouseX} mouseY={mouseY} />}
      
      {/* Multi-step loader */}
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={isLoading}
        duration={2000}
        loop={false}
        onComplete={() => {
          setIsLoading(false)
          setShowSuccess(true)
        }}
      />

      {/* Success message */}
      {showSuccess && <SuccessMessage onClose={handleCloseSuccess} />}
      <Navbar className="fixed top-0 left-0 right-0 z-50">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center">
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            // onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* Hero Section */}
      <div className="absolute top-0 left-0 w-full">
        <HeroSection
          scrollToSection={scrollToSection}
          heroRef={heroRef}
          handleCursorEnter={handleCursorEnter}
          handleCursorLeave={handleCursorLeave}
        />
      </div>
      <div className="relative">
        <div className="h-screen" />
        <div className="w-full bg-[#0d1113]">
          <ServicesSection
            servicesRef={servicesRef}
            handleCursorEnter={handleCursorEnter}
            handleCursorLeave={handleCursorLeave}
            scrollToSection={scrollToSection}
          />
          <AboutSection aboutRef={aboutRef} handleCursorEnter={handleCursorEnter} handleCursorLeave={handleCursorLeave} />

          <TestimonialsSection handleCursorEnter={handleCursorEnter} handleCursorLeave={handleCursorLeave} />

          <PartnersSection partnersRef={partnersRef} />

          <ContactSection
            contactRef={contactRef}
            handleCursorEnter={handleCursorEnter}
            handleCursorLeave={handleCursorLeave}
            handleSubmit={handleSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
          /> 
        </div>
      </div>
      <footer>
        <Footer/>
      </footer>
    </main>
  );
}
