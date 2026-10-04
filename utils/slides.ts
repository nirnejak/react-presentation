import type * as React from "react"

export interface Slide {
  id: string
  content: React.ReactNode
  // Speaker notes, shown in the presenter view
  notes?: string
}

export const SLIDE_PARAM = "slide"

// `?slide=N` is 1-based; returns the 0-based index, or null when missing or
// out of range
export const parseSlideParam = (
  param: string | null,
  count: number
): number | null => {
  if (param === null || param.trim() === "") return null
  const slide = Number(param) - 1
  return Number.isInteger(slide) && slide >= 0 && slide < count ? slide : null
}

// Wrap around at both ends of the deck
export const wrapSlide = (slide: number, count: number): number =>
  ((slide % count) + count) % count

// Direction of travel, treating last → first as forward and first → last as
// backward
export const getDirection = (
  from: number,
  to: number,
  count: number
): 1 | -1 => {
  if (count > 2) {
    if (from === count - 1 && to === 0) return 1
    if (from === 0 && to === count - 1) return -1
  }
  return to >= from ? 1 : -1
}

// Keys that move between slides; clickers send PageUp/PageDown
export const getNavigationStep = (key: string): 1 | -1 | null => {
  switch (key) {
    case "ArrowLeft":
    case "PageUp":
    case "A":
    case "a":
      return -1
    case "ArrowRight":
    case "PageDown":
    case "D":
    case "d":
      return 1
    default:
      return null
  }
}
