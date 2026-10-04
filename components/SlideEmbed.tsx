"use client"

import type * as React from "react"

import { useSearchParam, useSlideSync } from "@/hooks/useSlides"
import { parseSlideParam, SLIDE_PARAM, type Slide } from "@/utils/slides"

interface Props {
  slides: Slide[]
}

// A bare slide without controls, rendered inside the presenter view's previews
const SlideEmbed: React.FC<Props> = ({ slides }) => {
  const offset = Number(useSearchParam("offset") ?? 0)
  useSlideSync(offset)

  const slide = parseSlideParam(useSearchParam(SLIDE_PARAM), slides.length)

  return (
    <section className="grid h-screen place-content-center">
      {slide === null ? (
        <p className="text-4xl font-bold text-gray-400">End of presentation</p>
      ) : (
        <div key={slides[slide].id}>{slides[slide].content}</div>
      )}
    </section>
  )
}

export default SlideEmbed
