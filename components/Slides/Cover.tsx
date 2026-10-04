import * as motion from "motion/react-client"
import type * as React from "react"

import { fadeUp } from "@/utils/animation"
import classNames from "@/utils/classNames"

interface Props {
  title: string
  subtitle?: string
  className?: string
}

const Cover: React.FC<Props> = ({ title, subtitle, className }) => {
  return (
    <div className={classNames("text-center", className)}>
      <motion.h1
        {...fadeUp()}
        className="text-4xl/normal font-bold tracking-tight text-gray-900 md:text-6xl"
      >
        {title}
      </motion.h1>
      {subtitle !== undefined && (
        <motion.p
          {...fadeUp(0.1)}
          className="mt-1 text-xl/normal text-gray-500 md:mt-4 md:text-3xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default Cover
