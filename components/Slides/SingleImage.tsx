"use client"

import { motion } from "motion/react"
import type * as React from "react"

import useFadeUp from "@/hooks/useFadeUp"

interface Props {
  image?: string
  className?: string
}

const SingleImage: React.FC<Props> = ({ image, className }) => {
  const { ref, controls, variants } = useFadeUp()

  return (
    <div ref={ref} className={className}>
      <motion.img
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{
          delay: 0.1,
          duration: 0.4,
          type: "spring",
        }}
        src={image}
      />
    </div>
  )
}

export default SingleImage
