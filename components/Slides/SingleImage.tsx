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
      <motion.img {...fadeUp(0.1)} src={image} alt={alt} />
    </div>
  )
}

export default SingleImage
