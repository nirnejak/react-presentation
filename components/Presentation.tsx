"use client"

import { ChevronLeft, ChevronRight, GithubFill } from "akar-icons"
import * as React from "react"

const config = {
  isControlVisible: true,
  isPageNumberVisible: false,
}

const SWIPE_THRESHOLD = 50
const SLIDE_PARAM = "slide"
const SLIDE_CHANGE_EVENT = "slidechange"

// The current slide lives in the URL (`?slide=N`, 1-based) so a refresh or a
// shared link opens the same slide
const subscribeToSlide = (callback: () => void): (() => void) => {
  window.addEventListener("popstate", callback)
  window.addEventListener(SLIDE_CHANGE_EVENT, callback)
  return () => {
    window.removeEventListener("popstate", callback)
    window.removeEventListener(SLIDE_CHANGE_EVENT, callback)
  }
}

const getSlideParam = (): string | null =>
  new URLSearchParams(window.location.search).get(SLIDE_PARAM)

const getServerSlideParam = (): null => null

const setSlideParam = (slide: number): void => {
  const url = new URL(window.location.href)
  url.searchParams.set(SLIDE_PARAM, String(slide + 1))
  window.history.replaceState(null, "", url)
  window.dispatchEvent(new Event(SLIDE_CHANGE_EVENT))
}

const toggleFullscreen = (): void => {
  if (document.fullscreenElement !== null) {
    void document.exitFullscreen()
  } else {
    void document.documentElement.requestFullscreen()
  }
}

interface Props {
  slides: React.ReactNode[]
  sourceLink?: string
}

const Presentation: React.FC<Props> = ({ slides, sourceLink }) => {
  const slideParam = React.useSyncExternalStore(
    subscribeToSlide,
    getSlideParam,
    getServerSlideParam
  )
  const parsedSlide = Number(slideParam) - 1
  const currentSlide =
    Number.isInteger(parsedSlide) &&
    parsedSlide >= 0 &&
    parsedSlide < slides.length
      ? parsedSlide
      : 0

  const touchStart = React.useRef<{ x: number; y: number } | null>(null)

  const [isFooterVisible, setIsFooterVisible] = React.useState(true)
  const [isControlVisible, setIsControlVisible] = React.useState(
    config.isControlVisible
  )
  const [isPageNumberVisible, setIsPageNumberVisible] = React.useState(
    config.isPageNumberVisible
  )

  const prevSlide = React.useCallback(() => {
    setSlideParam(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }, [currentSlide, slides.length])

  const nextSlide = React.useCallback(() => {
    setSlideParam(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
  }, [currentSlide, slides.length])

  React.useEffect(() => {
    const handleKeyboardEvent = (e: KeyboardEvent): void => {
      if (e.metaKey || e.ctrlKey || e.altKey) return

      switch (e.key) {
        case "ArrowLeft":
        case "PageUp":
        case "A":
        case "a":
          prevSlide()
          break
        case "ArrowRight":
        case "PageDown":
        case "D":
        case "d":
          nextSlide()
          break
        case "F":
        case "f":
          if (e.repeat) break
          if (e.shiftKey) {
            toggleFullscreen()
          } else {
            setIsFooterVisible((visible) => !visible)
          }
          break
        case "C":
        case "c":
          if (e.repeat) break
          setIsControlVisible((visible) => !visible)
          break
        case "P":
        case "p":
          if (e.repeat) break
          setIsPageNumberVisible((visible) => !visible)
          break
      }
    }
    // keydown (not keyup) so the fullscreen request counts as a user gesture
    document.addEventListener("keydown", handleKeyboardEvent)
    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent)
    }
  }, [prevSlide, nextSlide])

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
    if (deltaX < 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }

  return (
    <section
      className="relative grid h-screen place-content-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div>{slides[currentSlide]}</div>
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
                    prevSlide()
                  }}
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  className="cursor-pointer rounded-full bg-gray-300 p-3 text-gray-800 transition hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 active:scale-95"
                  onClick={() => {
                    nextSlide()
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
  )
}

export default Presentation
