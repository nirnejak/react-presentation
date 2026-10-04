import * as motion from "motion/react-client"
import type * as React from "react"

import { fadeUp } from "@/utils/animation"
import classNames from "@/utils/classNames"

interface Props {
  children: React.ReactNode
  className?: string
}

const Wrapper: React.FC<Props> = ({ children, className }) => {
  return (
    <motion.div
      {...fadeUp()}
      className={classNames("max-w-[680px]", className)}
    >
      {children}
    </motion.div>
  )
}

export default Wrapper
