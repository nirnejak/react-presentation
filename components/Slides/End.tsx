import * as motion from "motion/react-client"
import type * as React from "react"

import { fadeUp } from "@/utils/animation"

interface Props {
  username: string
  className?: string
}

const End: React.FC<Props> = ({ username, className }) => {
  const links = [
    { prefix: "", suffix: ".com" },
    { prefix: "twitter.com/", suffix: "" },
    { prefix: "github.com/", suffix: "" },
    { prefix: "dribbble.com/", suffix: "" },
  ]

  return (
    <div className={className}>
      <motion.h1
        {...fadeUp()}
        className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl"
      >
        Thank You
      </motion.h1>
      <div className="mt-5 flex flex-col gap-1 text-xl text-gray-400 md:mt-10 md:gap-3 md:text-3xl">
        {links.map(({ prefix, suffix }, index) => (
          <motion.p key={prefix} {...fadeUp(0.1 + 0.05 * index)}>
            {prefix}
            <span className="text-gray-900">{username}</span>
            {suffix}
          </motion.p>
        ))}
      </div>
    </div>
  )
}

export default End
