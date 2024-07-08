import * as React from "react"

import { type Metadata } from "next"

import Counter from "components/demo/Counter"
import Presentation from "components/Presentation"
import About from "components/Slides/About"
import CodeBlock from "components/Slides/CodeBlock"
import Cover from "components/Slides/Cover"
import End from "components/Slides/End"
import QuoteBlock from "components/Slides/QuoteBlock"
import generateMetadata from "utils/seo"

export const metadata: Metadata = generateMetadata({
  path: "/",
  title: "React Presentation",
  description: "Use your React components as presentation slides",
})

const slides: React.ReactNode[] = [
  <Cover
    key="cover"
    title="Welcome"
    subtitle="Let's get started!"
    className="w-[680px]"
  />,
  <QuoteBlock
    key="quote"
    quote="The most disastrous thing that you can ever learn is your first programming language"
    author="Alan Kay"
    className="w-[680px]"
  />,
  <CodeBlock
    key="code"
    title="Counter.tsx"
    code={`
        import * as React from "react"

        const Counter: React.FC = () => {
          const [count, setCount] = React.useState(0)

          return (
            <div className="flex justify-center">
              <div className="flex items-center gap-4">
                <button
                  className="select-none rounded-md bg-gray-800 px-5 py-3 text-gray-200 transition-all hover:bg-gray-900 active:scale-95"
                  onClick={() => {
                    count > 0 && setCount(count - 1)
                  }}
                >
                  -
                </button>
                <p>Count is {count}</p>
                <button
                  className="select-none rounded-md bg-gray-800 px-5 py-3 text-gray-200 transition-all hover:bg-gray-900 active:scale-95"
                  onClick={() => {
                    setCount(count + 1)
                  }}
                >
                  +
                </button>
              </div>
            </div>
          )
        }

        export default Counter;
        `}
    className="w-[680px]"
  />,
  <Counter key="counter" />, // INFO: Demo component
  <About
    key="about"
    title="Jitendra Nirnejak"
    subtitle="Designer and Developer"
    className="w-[680px]"
  />,
  <End key="end" username="nirnejak" />,
]

const Home: React.FC = () => {
  return (
    <div>
      <Presentation
        slides={slides}
        sourceLink="nirnejak/react-presentation" // format: '<username>/<repository>'
      />
    </div>
  )
}

export default Home
