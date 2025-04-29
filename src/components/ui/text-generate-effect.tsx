"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  textClassName = "bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500",
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  textClassName?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.2),
      }
    );
  }, [animate, duration, filter]);

  const textStyles = "text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight";

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <motion.div 
          ref={scope} 
          className="relative"
        >
          <div className="absolute inset-0">
            <div className={cn("whitespace-nowrap", textStyles, textClassName)}>
              {wordsArray.map((word, idx) => (
                <span key={`gradient-${idx}`} className="inline-block mr-[0.2em]">
                  {word}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            {wordsArray.map((word, idx) => (
              <motion.span
                key={`text-${idx}`}
                className={cn("opacity-0 inline-block mr-[0.2em]", textStyles)}
                style={{
                  filter: filter ? "blur(10px)" : "none",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
