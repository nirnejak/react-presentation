"use client"

import { motion } from "motion/react"
import type * as React from "react"

import useFadeUp from "@/hooks/useFadeUp"
import classNames from "@/utils/classNames"

interface Props {
  title: string
  subtitle?: string
  className?: string
}

const About: React.FC<Props> = ({ title, subtitle, className }) => {
  const { ref, controls, variants } = useFadeUp()

  return (
    <div ref={ref} className={classNames("", className)}>
      <motion.h1
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ delay: 0, duration: 0.4, type: "spring" }}
        className="font-bold text-4xl/normal text-gray-900 tracking-tight md:text-5xl"
      >
        {title}
      </motion.h1>
      {subtitle !== undefined && (
        <motion.p
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
          className="mt-1 text-gray-500 text-xl/normal md:mt-4 md:text-3xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default About
