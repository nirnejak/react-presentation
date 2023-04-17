import * as React from "react"

import { ChevronLeft, ChevronRight } from "akar-icons"

interface Props {
  slides: Array<{ component: React.ReactNode }>
}

const Presentation: React.FC<Props> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  React.useEffect(() => {
    const handleKeyboardEvent = (e: KeyboardEvent): void => {
      switch (e.key) {
        case "ArrowLeft":
        case "A":
        case "a":
          prevSlide()
          break
        case "ArrowRight":
        case "B":
        case "b":
          nextSlide()
          break
      }
    }
    document.addEventListener("keyup", handleKeyboardEvent)
    return () => {
      document.removeEventListener("keyup", handleKeyboardEvent)
    }
  }, [])

  const prevSlide = (): void => {
    setCurrentSlide((slide) => {
      if (slide === 0) {
        return slides.length - 1
      } else {
        return slide - 1
      }
    })
  }

  const nextSlide = (): void => {
    setCurrentSlide((slide) => {
      if (slide === slides.length - 1) {
        return 0
      } else {
        return slide + 1
      }
    })
  }

  const renderCurrentSlide = (): React.ReactNode => {
    if (!isNaN(currentSlide) && slides.length > 0) {
      return slides[currentSlide].component
    } else {
      return null
    }
  }

  return (
    <section className="relative grid h-screen place-content-center">
      <div>{renderCurrentSlide()}</div>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          className="rounded-full bg-gray-300 p-3 text-gray-800"
          onClick={() => {
            prevSlide()
          }}
        >
          <ChevronLeft size={15} />
        </button>
        <button
          className="rounded-full bg-gray-300 p-3 text-gray-800"
          onClick={() => {
            nextSlide()
          }}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </section>
  )
}

export default Presentation
