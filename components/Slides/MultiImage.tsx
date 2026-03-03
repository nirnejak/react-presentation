"use client"

import { motion } from "motion/react"
import type * as React from "react"

import useFadeUp from "@/hooks/useFadeUp"
import classNames from "@/utils/classNames"

interface Props {
  images?: string[]
  className?: string
}

const MultiImage: React.FC<Props> = ({ images = [], className }) => {
  const { ref, controls, variants } = useFadeUp()

  return (
    <div
      ref={ref}
      className={classNames(
        "grid grid-cols-2 items-center gap-5 md:gap-20",
        className
      )}
    >
      {images.map((image, index) => (
        // biome-ignore lint/performance/noImgElement: animated with motion
        <motion.img
          key={image}
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{
            delay: 0.1 * (index + 1),
            duration: 0.4,
            type: "spring",
          }}
          src={image}
          className={index % 2 === 0 ? "mb-10" : "mt-20"}
        />
      ))}
    </div>
  )
}

export default MultiImage
