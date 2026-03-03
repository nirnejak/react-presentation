"use client"

import { motion } from "motion/react"
import type * as React from "react"

import useFadeUp from "@/hooks/useFadeUp"
import classNames from "@/utils/classNames"

interface Props {
  quote: string
  author?: string
  className?: string
}

const QuoteBlock: React.FC<Props> = ({ quote, author, className }) => {
  const { ref, controls, variants } = useFadeUp()

  return (
    <div ref={ref} className={classNames("", className)}>
      <div className="flex gap-1 md:gap-5">
        <div className="font-bold text-7xl text-gray-900 md:text-9xl">
          {"“ "}
        </div>
        <div>
          <motion.h1
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ delay: 0, duration: 0.4, type: "spring" }}
            className="font-bold text-4xl/snug text-gray-900 tracking-tight md:text-5xl/snug"
          >
            {quote}
          </motion.h1>
          {author !== undefined && (
            <motion.p
              initial="hidden"
              animate={controls}
              variants={variants}
              transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
              className="mt-10 text-gray-500 text-xl md:text-3xl"
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
