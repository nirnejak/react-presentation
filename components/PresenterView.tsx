"use client"

import * as React from "react"

import { setSlide, useSearchParam, useSlideSync } from "@/hooks/useSlides"
import {
  getNavigationStep,
  parseSlideParam,
  SLIDE_PARAM,
  type Slide,
  wrapSlide,
} from "@/utils/slides"

const PREVIEW_WIDTH = 1280
const PREVIEW_HEIGHT = 720

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`
}

interface SlidePreviewProps {
  src: string
  title: string
}

// Renders the deck in an iframe at a fixed size, scaled down to fit
const SlidePreview: React.FC<SlidePreviewProps> = ({ src, title }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(0)

  React.useEffect(() => {
    const element = ref.current
    if (element === null) return

    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / PREVIEW_WIDTH)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 bg-white"
    >
      {/* oxlint-disable-next-line react/iframe-missing-sandbox -- our own page; previews need scripts and same-origin BroadcastChannel */}
      <iframe
        src={src}
        title={title}
        tabIndex={-1}
        className="pointer-events-none absolute top-0 left-0 origin-top-left"
        style={{
          width: PREVIEW_WIDTH,
          height: PREVIEW_HEIGHT,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  )
}

interface Props {
  slides: Slide[]
}

const PresenterView: React.FC<Props> = ({ slides }) => {
  useSlideSync()

  const currentSlide =
    parseSlideParam(useSearchParam(SLIDE_PARAM), slides.length) ?? 0
  // Previews follow along on their own, so their URLs only need the start
  const [initialSlide] = React.useState(currentSlide)

  const [startedAt, setStartedAt] = React.useState(() => Date.now())
  const [now, setNow] = React.useState(startedAt)
  const elapsed = Math.max(0, Math.floor((now - startedAt) / 1000))

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  React.useEffect(() => {
    const handleKeyboardEvent = (e: KeyboardEvent): void => {
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const step = getNavigationStep(e.key)
      if (step !== null) {
        setSlide(wrapSlide(currentSlide + step, slides.length))
      } else if ((e.key === "r" || e.key === "R") && !e.repeat) {
        const timestamp = Date.now()
        setStartedAt(timestamp)
        setNow(timestamp)
      }
    }
    document.addEventListener("keydown", handleKeyboardEvent)
    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent)
    }
  }, [currentSlide, slides.length])

  const notes = slides[currentSlide].notes

  return (
    <main className="grid h-screen grid-rows-[auto_1fr] gap-6 bg-gray-50 p-6">
      <header className="flex items-center gap-6 text-gray-500">
        <p className="font-mono text-3xl text-gray-900 tabular-nums">
          {formatTime(elapsed)}
        </p>
        <p className="text-lg">
          Slide {currentSlide + 1} / {slides.length}
        </p>
        <p className="ml-auto text-sm">← / → navigate · R reset timer</p>
      </header>
      <div className="grid min-h-0 grid-cols-[2fr_1fr] gap-6">
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-500">Current</p>
          <SlidePreview
            src={`?mode=embed&offset=0&${SLIDE_PARAM}=${initialSlide + 1}`}
            title="Current slide"
          />
        </div>
        <div className="flex min-h-0 flex-col">
          <p className="mb-2 text-sm font-semibold text-gray-500">Next</p>
          <SlidePreview
            src={`?mode=embed&offset=1&${SLIDE_PARAM}=${initialSlide + 2}`}
            title="Next slide"
          />
          <p className="mt-6 mb-2 text-sm font-semibold text-gray-500">Notes</p>
          <div className="min-h-0 flex-1 overflow-auto rounded-xl border border-gray-200 bg-white p-5 text-xl/relaxed whitespace-pre-line text-gray-800">
            {notes ?? (
              <span className="text-gray-400">No notes for this slide</span>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default PresenterView
