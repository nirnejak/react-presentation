import * as React from "react"
import { useInView } from "react-intersection-observer"

import { type AnimationControls, useAnimation } from "framer-motion"

const variants = {
  hidden: { translateY: 10, opacity: 0 },
  visible: { translateY: 0, opacity: 1 },
}

interface HookType {
  ref: (node?: Element | null | undefined) => void
  controls: AnimationControls
  variants: typeof variants
}

const useFadeUp = (): HookType => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  React.useEffect(() => {
    if (inView) {
      controls.start("visible").catch((err) => {
        console.log(err)
      })
    }
  }, [controls, inView])

  return { ref, controls, variants }
}

export default useFadeUp
