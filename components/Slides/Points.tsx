"use client"
import * as React from "react"

import { motion } from "motion/react"

import useFadeUp from "hooks/useFadeUp"
import classNames from "utils/classNames"

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
        className="text-4xl font-bold leading-normal text-gray-900 md:text-5xl md:leading-normal"
      >
        {title}
      </motion.h1>
      <ul className="ml-8 mt-3 list-disc space-y-2 md:mt-10 md:space-y-4">
        {points.map((point, index) => (
          <motion.li
            key={index}
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{
              delay: 0.1 * (index + 1),
              duration: 0.4,
              type: "spring",
            }}
            className="text-xl text-gray-500 md:text-3xl"
          >
            {point}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default Points
