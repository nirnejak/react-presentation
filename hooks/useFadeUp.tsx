import * as React from "react"

import {
  type LegacyAnimationControls,
  useAnimation,
  useInView,
} from "motion/react"

const variants = {
  hidden: { translateY: 10, opacity: 0 },
  visible: { translateY: 0, opacity: 1 },
}

interface HookType {
  ref: React.RefObject<HTMLDivElement | null>
  controls: LegacyAnimationControls
  variants: typeof variants
}

const useFadeUp = (): HookType => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const controls = useAnimation()
  const inView = useInView(ref)

  React.useEffect(() => {
    if (inView) {
      controls.start("visible").catch((err: unknown) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
    }
  }, [controls, inView])

  return { ref, controls, variants }
}

export default useFadeUp
