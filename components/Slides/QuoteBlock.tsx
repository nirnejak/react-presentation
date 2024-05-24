"use client"
import * as React from "react"
import { useInView } from "react-intersection-observer"

import { motion, useAnimation } from "framer-motion"

import classNames from "utils/classNames"

interface Props {
  quote: string
  author?: string
  className?: string
}

const QuoteBlock: React.FC<Props> = ({ quote, author, className }) => {
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
      <div className="flex gap-5">
        <div className="text-9xl font-bold text-gray-900">{"“ "}</div>
        <div>
          <motion.h1
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ delay: 0, duration: 0.4, type: "spring" }}
            className="text-5xl font-bold leading-normal text-gray-900"
          >
            {quote}
          </motion.h1>
          {author !== undefined && (
            <motion.p
              initial="hidden"
              animate={controls}
              variants={variants}
              transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
              className="mt-10 text-3xl leading-normal text-gray-500"
            >
              - {author}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuoteBlock
