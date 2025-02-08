"use client"
import * as React from "react"

import { motion } from "motion/react"

import useFadeUp from "@/hooks/useFadeUp"
import classNames from "@/utils/classNames"

interface Props {
  username: string
  className?: string
}

const End: React.FC<Props> = ({ username = "nirnejak", className }) => {
  const { ref, controls, variants } = useFadeUp()

  return (
    <div ref={ref} className={classNames("", className)}>
      <motion.h1
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ delay: 0, duration: 0.4, type: "spring" }}
        className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl"
      >
        Thank You
      </motion.h1>
      <div className="mt-5 flex flex-col gap-1 text-xl text-gray-400 md:mt-10 md:gap-3 md:text-3xl">
        <motion.p
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
        >
          <span className="text-gray-900">{username}</span>.com
        </motion.p>
        <motion.p
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{ delay: 0.15, duration: 0.4, type: "spring" }}
        >
          twitter.com/<span className="text-gray-900">{username}</span>
        </motion.p>
        <motion.p
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
        >
          github.com/<span className="text-gray-900">{username}</span>
        </motion.p>
        <motion.p
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{ delay: 0.25, duration: 0.4, type: "spring" }}
        >
          dribbble.com/<span className="text-gray-900">{username}</span>
        </motion.p>
      </div>
    </div>
  )
}

export default End
