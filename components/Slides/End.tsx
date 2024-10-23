"use client"
import * as React from "react"

import { motion } from "framer-motion"

import useFadeUp from "hooks/useFadeUp"
import classNames from "utils/classNames"

interface Props {
  username: string
  className?: string
}

const End: React.FC<Props> = ({ username = "nirnejak", className }) => {
  const { ref, controls, variants } = useFadeUp()

  return (
    <div ref={ref} className={classNames("w-[680px]", className)}>
      <motion.h1
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ delay: 0, duration: 0.4, type: "spring" }}
        className="text-5xl font-bold text-gray-900"
      >
        Thank You
      </motion.h1>
      <div className="mt-10 flex flex-col gap-3 text-3xl text-gray-400">
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
