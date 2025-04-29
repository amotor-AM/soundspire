"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { ConfettiExplosion } from "./confetti-explosion"
// import { useState, useEffect } from "react"

interface SuccessMessageProps {
  onClose: () => void
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onClose }) => {
  // const [isExploding, setIsExploding] = useState(false)

  // useEffect(() => {
  //   setIsExploding(true)
  //   const timer = setTimeout(() => {
  //     setIsExploding(false)
  //   }, 2000)
  //   return () => clearTimeout(timer)
  // }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl"
    >
      <ConfettiExplosion/>

      <div className="bg-black/80 border border-cyan-500/30 rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2,
          }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold mb-2 text-white"
        >
          Message Sent Successfully!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-300 mb-6"
        >
          Thanks for reaching out! Our team of audio wizards will get back to you faster than a viral podcast episode.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 border-0"
          >
            Back to Website
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SuccessMessage
