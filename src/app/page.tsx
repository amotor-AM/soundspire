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
// import TestimonialsSection from "@/components/TestamonialsSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const navItems = [
  { name: "Home", link: "#hero" },
  { name: "Services", link: "#services" },
  { name: "About", link: "#about" },
  { name: "Partners", link: "#partners" },
  { name: "Contact", link: "#contact" }
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [activeSection, setActiveSection] = useState("hero")
  const [cursorVariant, setCursorVariant] = useState("default")
  const [cursorText, setCursorText] = useState("")
  const [DOMLoaded, setDOMLoaded] = useState(false)
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
  const heroRef = useRef<HTMLElement>(null)
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    setDOMLoaded(true)
  }, [])

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
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Send form data to API route
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // if (!response.ok) {
      //   throw new Error(data.error || 'Failed to send message');
      // }
      
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Keep loader visible for enough time to show all steps
      // Each step takes 'duration' ms, so we need at least loadingStates.length * duration
      const totalDuration = loadingStates.length * 2000; // 2000ms per step
      
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(true);
      }, totalDuration);
      
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      // You could add error handling UI here
      alert('Failed to send message. Please try again later.');
    }
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <main className="relative overflow-x-hidden max-w-[100vw]">
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
      {showSuccess && <SuccessMessage onClose={() => setShowSuccess(false)} />}
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
      <div className="absolute top-0 left-0 w-full max-w-[100vw] overflow-x-hidden">
        <HeroSection
          DOMLoaded={DOMLoaded}
          scrollToSection={scrollToSection}
          heroRef={heroRef}
          handleCursorEnter={handleCursorEnter}
          handleCursorLeave={handleCursorLeave}
        />
      </div>
      <div className="relative">
        <div className="h-screen" />
        <div className="w-full bg-[#060e12]">
          <ServicesSection
            DOMLoaded={DOMLoaded}
            servicesRef={servicesRef}
            handleCursorEnter={handleCursorEnter}
            handleCursorLeave={handleCursorLeave}
            scrollToSection={scrollToSection}
          />
          <AboutSection 
            aboutRef={aboutRef} 
            handleCursorEnter={handleCursorEnter} 
            handleCursorLeave={handleCursorLeave}
          />

          {/* <TestimonialsSection handleCursorEnter={handleCursorEnter} handleCursorLeave={handleCursorLeave} /> */}

          <PartnersSection partnersRef={partnersRef} DOMLoaded={DOMLoaded} />

          <ContactSection
            contactRef={contactRef}
            handleCursorEnter={handleCursorEnter}
            handleCursorLeave={handleCursorLeave}
            handleSubmit={handleFormSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </main>
  );
}
