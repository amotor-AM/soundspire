"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface GradientSectionProps {
  children: React.ReactNode
  className?: string
  gradientClassName?: string
  id?: string
}

export const GradientSection = forwardRef<HTMLElement, GradientSectionProps>(
  ({ children, className, gradientClassName, id }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn("relative py-20", className)}
      >
        <div className={cn("absolute inset-0", gradientClassName)} />
        {children}
      </section>
    )
  }
)

GradientSection.displayName = "GradientSection"