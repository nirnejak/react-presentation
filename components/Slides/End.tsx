import * as React from "react"
import { useInView } from "react-intersection-observer"

import { motion, useAnimation } from "framer-motion"

import classNames from "utils/classNames"

interface Props {
  username: string
  className?: string
}

const End: React.FC<Props> = ({ username = "nirnejak", className }) => {
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
      className={classNames("w-[680px]", className)}
    >
      <h1 className="text-5xl font-bold text-gray-900">Thank You</h1>
      <div className="mt-10 flex flex-col gap-3 text-3xl text-gray-400">
        <p>
          <span className="text-gray-900">{username}</span>.com
        </p>
        <p>
          twitter.com/<span className="text-gray-900">{username}</span>
        </p>
        <p>
          github.com/<span className="text-gray-900">{username}</span>
        </p>
        <p>
          dribbble.com/<span className="text-gray-900">{username}</span>
        </p>
      </div>
    </motion.div>
  )
}

export default End
