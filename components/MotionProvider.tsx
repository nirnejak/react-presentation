"use client"

import { MotionConfig } from "motion/react"
import type * as React from "react"

interface Props {
  children: React.ReactNode
}

// Skip transform animations (keeping fades) when the OS asks for reduced motion
const MotionProvider: React.FC<Props> = ({ children }) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

export default MotionProvider
