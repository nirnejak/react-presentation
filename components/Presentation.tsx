"use client"

import { ChevronLeft, ChevronRight, GithubFill } from "akar-icons"
import { AnimatePresence, motion, type Variants } from "motion/react"
import * as React from "react"

import PresenterView from "@/components/PresenterView"
import SlideEmbed from "@/components/SlideEmbed"
import { setSlide, useSearchParam, useSlideSync } from "@/hooks/useSlides"
import {
  getDirection,
  getNavigationStep,
  parseSlideParam,
  SLIDE_PARAM,
  type Slide,
  wrapSlide,
} from "@/utils/slides"

const config = {
  isControlVisible: true,
  isPageNumberVisible: false,
}

const SWIPE_THRESHOLD = 50

// Slides shift slightly in the direction of travel while crossfading
const SLIDE_VARIANTS: Variants = {
  enter: (direction: number) => ({ x: direction * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction * -40, opacity: 0 }),
}

const toggleFullscreen = (): void => {
  if (document.fullscreenElement !== null) {
    void document.exitFullscreen()
  } else {
    void document.documentElement.requestFullscreen()
  }
}

interface Props {
  slides: Slide[]
  sourceLink?: string
}

const Deck: React.FC<Props> = ({ slides, sourceLink }) => {
  useSlideSync()

  const currentSlide =
    parseSlideParam(useSearchParam(SLIDE_PARAM), slides.length) ?? 0

  // Track the previous slide during render to know which way to animate
  const [previousSlide, setPreviousSlide] = React.useState(currentSlide)
  const [direction, setDirection] = React.useState<1 | -1>(1)
  if (previousSlide !== currentSlide) {
    setPreviousSlide(currentSlide)
    setDirection(getDirection(previousSlide, currentSlide, slides.length))
  }

  const touchStart = React.useRef<{ x: number; y: number } | null>(null)

  const [isFooterVisible, setIsFooterVisible] = React.useState(true)
  const [isControlVisible, setIsControlVisible] = React.useState(
    config.isControlVisible
  )
  const [isPageNumberVisible, setIsPageNumberVisible] = React.useState(
    config.isPageNumberVisible
  )

  const goBy = React.useCallback(
    (step: number) => {
      setSlide(wrapSlide(currentSlide + step, slides.length))
    },
    [currentSlide, slides.length]
  )

  React.useEffect(() => {
    const handleKeyboardEvent = (e: KeyboardEvent): void => {
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const step = getNavigationStep(e.key)
      if (step !== null) {
        goBy(step)
        return
      }
      if (e.repeat) return

      switch (e.key) {
        case "F":
        case "f":
          if (e.shiftKey) {
            toggleFullscreen()
          } else {
            setIsFooterVisible((visible) => !visible)
          }
          break
        case "C":
        case "c":
          setIsControlVisible((visible) => !visible)
          break
        case "P":
        case "p":
          setIsPageNumberVisible((visible) => !visible)
          break
        case "S":
        case "s":
          window.open(
            `?mode=presenter&${SLIDE_PARAM}=${currentSlide + 1}`,
            "presenter",
            "popup,width=1280,height=800"
          )
          break
      }
    }
    // keydown (not keyup) so the fullscreen request counts as a user gesture
    document.addEventListener("keydown", handleKeyboardEvent)
    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent)
    }
  }, [goBy, currentSlide])

  const handleTouchStart = (e: React.TouchEvent): void => {
    // Let horizontally scrollable code blocks scroll instead of navigating
    if ((e.target as HTMLElement).closest("pre") !== null) {
      touchStart.current = null
      return
    }
    const touch = e.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (e: React.TouchEvent): void => {
    if (touchStart.current === null) return
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.current.x
    const deltaY = touch.clientY - touchStart.current.y
    touchStart.current = null

    if (
      Math.abs(deltaX) < SWIPE_THRESHOLD ||
      Math.abs(deltaX) < Math.abs(deltaY)
    )
      return
    goBy(deltaX < 0 ? 1 : -1)
  }

  const slide = slides[currentSlide]

  return (
    <>
      <section
        className="relative grid h-screen place-content-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isFooterVisible && (
          <div
            role="progressbar"
            aria-label="Presentation progress"
            aria-valuemin={1}
            aria-valuemax={slides.length}
            aria-valuenow={currentSlide + 1}
            className="absolute top-0 left-0 h-1 bg-orange-500 transition-[width] duration-300 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        )}
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {slide.content}
          </motion.div>
        </AnimatePresence>
        {isFooterVisible && (
          <div className="absolute right-0 bottom-4 flex w-full items-end px-4">
            {sourceLink !== undefined && (
              <a
                href={`https://github.com/${sourceLink}/`}
                target="_blank"
                className="flex items-center gap-0.5 text-gray-600"
              >
                <GithubFill size={15} />
                <span>{sourceLink}</span>
              </a>
            )}
            <div className="ml-auto flex items-center gap-2">
              {isPageNumberVisible && (
                <p className="mr-4 text-sm text-gray-600">
                  {currentSlide + 1}/{slides.length}
                </p>
              )}
              {isControlVisible && (
                <>
                  <button
                    type="button"
                    aria-label="Previous slide"
                    className="cursor-pointer rounded-full bg-gray-300 p-3 text-gray-800 transition hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 active:scale-95"
                    onClick={() => {
                      goBy(-1)
                    }}
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next slide"
                    className="cursor-pointer rounded-full bg-gray-300 p-3 text-gray-800 transition hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 active:scale-95"
                    onClick={() => {
                      goBy(1)
                    }}
                  >
                    <ChevronRight size={15} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  )
}

// `?mode=presenter` opens the presenter view, `?mode=embed` a bare slide for
// its previews; anything else is the audience-facing deck
const Presentation: React.FC<Props> = ({ slides, sourceLink }) => {
  const mode = useSearchParam("mode")

  if (mode === "presenter") return <PresenterView slides={slides} />
  if (mode === "embed") return <SlideEmbed slides={slides} />
  return <Deck slides={slides} sourceLink={sourceLink} />
}

export default Presentation
