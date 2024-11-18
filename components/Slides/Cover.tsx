"use client"
import * as React from "react"

import { motion } from "framer-motion"

import useFadeUp from "hooks/useFadeUp"
import classNames from "utils/classNames"

interface Props {
  title: string
  subtitle?: string
  className?: string
}

const Cover: React.FC<Props> = ({ title, subtitle, className }) => {
  const { ref, controls, variants } = useFadeUp()

  return (
    <div ref={ref} className={classNames("text-center", className)}>
      <motion.h1
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ delay: 0, duration: 0.4, type: "spring" }}
        className="text-4xl font-bold leading-normal text-gray-900 md:text-6xl"
      >
        {title}
      </motion.h1>
      {subtitle !== undefined && (
        <motion.p
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
          className="mt-1 text-xl leading-normal text-gray-500 md:mt-4 md:text-3xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default Cover
