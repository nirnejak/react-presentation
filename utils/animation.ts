import type { MotionProps, Transition, Variants } from "motion/react"

export const BASE_TRANSITION: Transition = { duration: 0.4, type: "spring" }

const FADE_UP_VARIANTS: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

// Spread onto a motion element to fade it up once it scrolls into view
export const fadeUp = (delay = 0): MotionProps => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true },
  variants: FADE_UP_VARIANTS,
  transition: { ...BASE_TRANSITION, delay },
})
