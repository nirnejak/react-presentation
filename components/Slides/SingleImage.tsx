import * as motion from "motion/react-client"
import Image, { type StaticImageData } from "next/image"
import type * as React from "react"

import { fadeUp } from "@/utils/animation"

interface Props {
  image: StaticImageData
  alt: string
  className?: string
}

const SingleImage: React.FC<Props> = ({ image, alt, className }) => {
  return (
    <motion.div {...fadeUp(0.1)} className={className}>
      <Image
        src={image}
        alt={alt}
        placeholder="blur"
        sizes="(min-width: 768px) 1020px, 100vw"
        // Cap the height so tall or wide images stay clear of the footer
        className="mx-auto h-auto max-h-[75vh] w-auto max-w-full object-contain"
      />
    </motion.div>
  )
}

export default SingleImage
