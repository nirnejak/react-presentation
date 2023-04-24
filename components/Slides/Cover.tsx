import * as React from "react"
import { useInView } from "react-intersection-observer"

import { motion, useAnimation } from "framer-motion"

import classNames from "utils/classNames"

interface Props {
  title: string
  subtitle?: string
  className?: string
}

const Cover: React.FC<Props> = ({ title, subtitle, className }) => {
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
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }

  return (
    <motion.div
      animate={controls}
      initial="hidden"
      transition={{ delay: 0, duration: 0.4, type: "spring" }}
      variants={variants}
      ref={ref}
      className={classNames("text-center", className)}
    >
      <h1 className="text-6xl font-bold leading-normal text-gray-900">
        {title}
      </h1>
      {subtitle !== undefined && (
        <p className="mt-4 text-3xl leading-normal text-gray-500">{subtitle}</p>
      )}
    </motion.div>
  )
}

export default Cover
