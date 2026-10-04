"use client"

import { motion } from "motion/react"
import type * as React from "react"

import useFadeUp from "@/hooks/useFadeUp"

interface Props {
  quote: string
  author?: string
  className?: string
}

const QuoteBlock: React.FC<Props> = ({ quote, author, className }) => {
  const { ref, controls, variants } = useFadeUp()

  return (
    <div ref={ref} className={className}>
      <div className="flex gap-1 md:gap-5">
        <div className="text-7xl font-bold text-gray-900 md:text-9xl">
          {"“ "}
        </div>
        <div>
          <motion.h1
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ delay: 0, duration: 0.4, type: "spring" }}
            className="text-4xl/snug font-bold tracking-tight text-gray-900 md:text-5xl/snug"
          >
            {quote}
          </motion.h1>
          {author !== undefined && (
            <motion.p
              initial="hidden"
              animate={controls}
              variants={variants}
              transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
              className="mt-10 text-xl text-gray-500 md:text-3xl"
            >
              - {author}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuoteBlock
