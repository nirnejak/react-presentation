import * as motion from "motion/react-client"
import type * as React from "react"

import { fadeUp } from "@/utils/animation"

const USERNAME = "{username}"

const DEFAULT_LINKS = [
  `${USERNAME}.com`,
  `x.com/${USERNAME}`,
  `github.com/${USERNAME}`,
  `dribbble.com/${USERNAME}`,
]

// Highlight the (first) username in the link text
const renderLink = (link: string, username: string): React.ReactNode => {
  const [before, ...rest] = link.split(USERNAME)
  if (rest.length === 0) return link
  return (
    <>
      {before}
      <span className="text-gray-900">{username}</span>
      {rest.join(username)}
    </>
  )
}

interface Props {
  username: string
  // Links without the protocol; `{username}` is replaced and highlighted
  links?: string[]
  className?: string
}

const End: React.FC<Props> = ({
  username,
  links = DEFAULT_LINKS,
  className,
}) => {
  return (
    <div className={className}>
      <motion.h1
        {...fadeUp()}
        className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl"
      >
        Thank You
      </motion.h1>
      <div className="mt-5 flex flex-col gap-1 text-xl text-gray-400 md:mt-10 md:gap-3 md:text-3xl">
        {links.map((link, index) => (
          <motion.a
            key={link}
            {...fadeUp(0.1 + 0.05 * index)}
            href={`https://${link.replaceAll(USERNAME, username)}`}
            target="_blank"
            className="transition-colors hover:text-gray-600"
          >
            {renderLink(link, username)}
          </motion.a>
        ))}
      </div>
    </div>
  )
}

export default End
