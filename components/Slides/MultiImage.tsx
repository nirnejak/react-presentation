import * as motion from "motion/react-client"
import Image, { type StaticImageData } from "next/image"
import type * as React from "react"

import { fadeUp } from "@/utils/animation"
import classNames from "@/utils/classNames"

interface SlideImage {
  src: StaticImageData
  alt: string
}

interface Props {
  images?: SlideImage[]
  className?: string
}

const MultiImage: React.FC<Props> = ({ images, className }) => {
  return (
    <div
      className={classNames(
        "grid grid-cols-2 items-center gap-5 md:gap-20",
        className
      )}
    >
      {images?.map((image, index) => (
        <motion.div
          key={image.src.src}
          {...fadeUp(0.1 * (index + 1))}
          className={index % 2 === 0 ? "mb-10" : "mt-20"}
        >
          <Image
            src={image.src}
            alt={image.alt}
            placeholder="blur"
            loading="eager"
            sizes="(min-width: 768px) 330px, 50vw"
          />
        </motion.div>
      ))}
    </div>
  )
}

export default MultiImage
