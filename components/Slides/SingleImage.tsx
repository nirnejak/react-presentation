import * as motion from "motion/react-client"
import type * as React from "react"

import { fadeUp } from "@/utils/animation"

interface Props {
  image: string
  alt: string
  className?: string
}

const SingleImage: React.FC<Props> = ({ image, alt, className }) => {
  return (
    <div className={className}>
      <motion.img
        {...fadeUp(0.1)}
        src={image}
        alt={alt}
        // Cap the height so tall or wide images stay clear of the footer
        className="mx-auto max-h-[75vh] w-auto max-w-full"
      />
    </div>
  )
}

export default SingleImage
