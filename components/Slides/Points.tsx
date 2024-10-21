"use client"
import * as React from "react"
import { useInView } from "react-intersection-observer"

import { motion, useAnimation } from "framer-motion"

import classNames from "utils/classNames"

interface Props {
  title: string
  points?: string[]
  className?: string
}

const Points: React.FC<Props> = ({ title, points = [], className }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  React.useEffect(() => {
    if (inView) {
      controls.start("visible").catch((err) => {
        console.log(err)
      })
    }
  }, [controls, inView])

  const variants = {
    hidden: { translateY: 10, opacity: 0 },
    visible: { translateY: 0, opacity: 1 },
  }

  return (
    <div ref={ref} className={classNames("", className)}>
      <motion.h1
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ delay: 0, duration: 0.4, type: "spring" }}
        className="text-5xl font-bold leading-normal text-gray-900"
      >
        {title}
      </motion.h1>
      {points.map((point, index) => (
        <motion.p
          key={index}
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{
            delay: 0.1 * (index + 1),
            duration: 0.4,
            type: "spring",
          }}
          className="mt-4 text-3xl leading-normal text-gray-500"
        >
          - {point}
        </motion.p>
      ))}
    </div>
  )
}

export default Points
