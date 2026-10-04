import * as motion from "motion/react-client"
import type * as React from "react"

import { fadeUp } from "@/utils/animation"
import classNames from "@/utils/classNames"

interface Props {
  images?: string[]
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
        <motion.img
          key={image}
          {...fadeUp(0.1 * (index + 1))}
          src={image}
          className={index % 2 === 0 ? "mb-10" : "mt-20"}
        />
      ))}
    </div>
  )
}

export default MultiImage
