"use client"
import * as React from "react"

import { motion } from "framer-motion"

import useFadeUp from "hooks/useFadeUp"
import classNames from "utils/classNames"

interface Props {
  children: React.ReactNode
  className?: string
}

const Wrapper: React.FC<Props> = ({ children, className }) => {
  const { ref, controls, variants } = useFadeUp()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ delay: 0, duration: 0.4, type: "spring" }}
      className={classNames("max-w-[680px]", className)}
    >
      {children}
    </motion.div>
  )
}

export default Wrapper
