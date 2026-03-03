"use client"

import { motion } from "motion/react"
import type * as React from "react"

import useFadeUp from "@/hooks/useFadeUp"
import classNames from "@/utils/classNames"

interface Props {
  title: string
  points?: string[]
  className?: string
}

const Points: React.FC<Props> = ({ title, points = [], className }) => {
  const { ref, controls, variants } = useFadeUp()

  return (
    <div ref={ref} className={classNames("", className)}>
      <motion.h1
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ delay: 0, duration: 0.4, type: "spring" }}
        className="font-bold text-4xl/normal text-gray-900 tracking-tight md:text-5xl/normal"
      >
        {title}
      </motion.h1>
      <ul className="mt-3 ml-8 list-disc space-y-2 md:mt-10 md:space-y-4">
        {points.map((point, index) => (
          <motion.li
            key={point}
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{
              delay: 0.1 * (index + 1),
              duration: 0.4,
              type: "spring",
            }}
            className="text-gray-500 text-xl md:text-3xl"
          >
            {point}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default Points
