"use client"
import * as React from "react"
import { useInView } from "react-intersection-observer"

import { motion, useAnimation } from "framer-motion"

import { fadeUpVariants } from "utils/animation"
import classNames from "utils/classNames"

interface Props {
  children: React.ReactNode
  className?: string
}

const Wrapper: React.FC<Props> = ({ children, className }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  React.useEffect(() => {
    if (inView) {
      controls.start("visible").catch((err) => {
        console.log(err)
      })
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUpVariants}
      transition={{ delay: 0, duration: 0.4, type: "spring" }}
      className={classNames("w-[680px]", className)}
    >
      {children}
    </motion.div>
  )
}

export default Wrapper
