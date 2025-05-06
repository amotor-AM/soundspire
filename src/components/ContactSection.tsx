"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Headphones, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientSection } from "@/components/ui/gradient-section"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactSectionProps {
  contactRef: React.RefObject<HTMLElement | null>
  handleCursorEnter: (variant: string, text?: string) => void
  handleCursorLeave: () => void
  handleSubmit: (e: React.FormEvent) => void
  formData: ContactFormData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function ContactSection({
  contactRef,
  handleCursorEnter,
  handleCursorLeave,
  handleSubmit,
  formData,
  handleInputChange,
}: ContactSectionProps) {
  // Form validation states
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Validate form on blur
  const validateField = (name: string, value: string) => {
    let errorMessage = ""

    switch (name) {
      case "name":
        if (!value.trim()) {
          errorMessage = "Name is required"
        }
        break
      case "email":
        if (!value.trim()) {
          errorMessage = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = "Please enter a valid email address"
        }
        break
      case "subject":
        if (!value.trim()) {
          errorMessage = "Subject is required"
        }
        break
      case "message":
        if (!value.trim()) {
          errorMessage = "Message is required"
        }
        break
      default:
        break
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }))
    return !errorMessage
  }

  // Handle form submission with validation
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const nameValid = validateField("name", formData.name)
    const emailValid = validateField("email", formData.email)
    const subjectValid = validateField("subject", formData.subject)
    const messageValid = validateField("message", formData.message)

    // If all fields are valid, submit the form
    if (nameValid && emailValid && subjectValid && messageValid) {
      handleSubmit(e)
    }
  }

  return (
    <GradientSection
      className="py-20 md:py-32"
      gradientClassName="bg-gradient-to-b from-transparent via-black/10 to-blue-950/20"
      ref={contactRef}
      id="contact"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-block rounded-full bg-indigo-900/30 border border-indigo-500/30 px-3 py-1 text-sm text-indigo-400 font-medium mb-4">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-5 leading-[1.2] bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] via-[#C651F2] to-[#8C39E0]">
            Ready to Amplify Your Brand?
          </h2>
          <p className="text-xl md:text-2xl mb-4 text-gray-300 max-w-6xl mx-auto">
            Let&apos;s discuss how we can help you achieve your advertising goals with our cutting-edge approach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-indigo-300/10 hover:border-indigo-300/40">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Send Us a Message</h3>

              <form className="space-y-4" onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-lg text-gray-300">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={(e) => validateField("name", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg bg-indigo-950/30 border ${errors.name ? "border-red-500" : "border-indigo-500/30"
                        } text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                      placeholder="Your name"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-lg text-gray-300">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={(e) => validateField("email", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg bg-indigo-950/30 border ${errors.email ? "border-red-500" : "border-indigo-500/30"
                        } text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                      placeholder="Your email"
                      required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-lg text-gray-300">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={(e) => validateField("subject", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg bg-indigo-950/30 border ${errors.subject ? "border-red-500" : "border-indigo-500/30"
                      } text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                    placeholder="Subject"
                    required
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-lg text-gray-300">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={(e) => validateField("message", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg bg-indigo-950/30 border ${errors.message ? "border-red-500" : "border-indigo-500/30"
                      } text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                    placeholder="Your message"
                    required
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => handleCursorEnter("button", "Send Message")}
                  onMouseLeave={handleCursorLeave}
                >
                  <Button
                    type="submit"
                    className="w-full bg-[#8C39E0] bg-gradient-to-r from-[#FF3BFF] from-10% via-[#C651F2] via-30% to-[#8C39E0] to-90% hover:from-[#FF3BFF] hover:to-[#8C39E0] text-white border-0 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Send Message</span>
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
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Contact Information</h3>
              <div className="space-y-6">
                <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF3BFF] to-[#8C39E0] flex items-center justify-center flex-shrink-0 text-white">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-medium text-white">Email</h4>
                    <p className="text-gray-300 text-lg">ally.kandel@soundspiremedia.com</p>
                    <p className="text-gray-300 text-lg">kristen.valentine@soundspiremedia.com</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF3BFF] to-[#8C39E0] flex items-center justify-center flex-shrink-0 text-white">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-medium text-white">Office Hours</h4>
                    <p className="text-gray-300 text-lg">By appointment only</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FF3BFF] from-10% via-[#C651F2] via-30% to-[#8C39E0] to-90% p-8 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <p className="mb-6 text-lg">
                Schedule a free 30-minute strategy call with our team to discuss your advertising goals.
              </p>
              <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => handleCursorEnter("button", "Book a Call")}
                  onMouseLeave={handleCursorLeave}
                  onClick={() => {
                    const emailAddresses = "ally.kandel@soundspiremedia.com,kristen.valentine@soundspiremedia.com";
                    const subject = "Strategy Call Request";
                    const body = "Hi Ally and Kristen,\n\nI'm interested in scheduling a strategy call to discuss my advertising goals.\n\nBest regards,";
                    const mailtoLink = `mailto:${emailAddresses}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.open(mailtoLink);
                  }}
                >
                  <Button
                    variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/20 w-full"
                  >
                    <span className="relative z-10">Book A Strategy Call</span>
    
                  </Button>
                </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </GradientSection>
  )
}
