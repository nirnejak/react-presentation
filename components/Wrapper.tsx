import * as React from "react"
import { useInView } from "react-intersection-observer"

import { motion, useAnimation } from "framer-motion"

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

  const variants = {
    hidden: { translate: 10, opacity: 0 },
    visible: { translate: 0, opacity: 1 },
  }

  return (
    <motion.div
      animate={controls}
      initial="hidden"
      transition={{ delay: 0, duration: 0.4, type: "spring" }}
      variants={variants}
      ref={ref}
      className={classNames("w-[680px]", className)}
    >
      {children}
    </motion.div>
  )
}

export default Wrapper
