import * as motion from "motion/react-client"
import type * as React from "react"

import { fadeUp } from "@/utils/animation"

interface Props {
  quote: string
  author?: string
  className?: string
}

const QuoteBlock: React.FC<Props> = ({ quote, author, className }) => {
  return (
    <div className={className}>
      <div className="flex gap-1 md:gap-5">
        <div className="text-7xl font-bold text-gray-900 md:text-9xl">
          {"“ "}
        </div>
        <div>
          <motion.h1
            {...fadeUp()}
            className="text-4xl/snug font-bold tracking-tight text-gray-900 md:text-5xl/snug"
          >
            {quote}
          </motion.h1>
          {author !== undefined && (
            <motion.p
              {...fadeUp(0.1)}
              className="mt-10 text-xl text-gray-500 md:text-3xl"
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
