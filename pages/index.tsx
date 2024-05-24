import * as React from "react"

import Head from "next/head"

import Counter from "components/demo/Counter"
import Presentation from "components/Presentation"
import About from "components/Slides/About"
import Cover from "components/Slides/Cover"
import End from "components/Slides/End"
import CodeBlock from "components/Slides/CodeBlock"
import QuoteBlock from "components/Slides/QuoteBlock"

const slides: Array<{ component: React.ReactNode }> = [
  {
    component: (
      <Cover
        title="Welcome"
        subtitle="Let's get started!"
        className="w-[680px]"
      />
    ),
  },
  {
    component: (
      <CodeBlock
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
      />
    ),
  },
  {
    component: (
      <QuoteBlock
        quote="The most disastrous thing that you can ever learn is your first programming language"
        author="Alan Kay"
        className="w-[680px]"
      />
    ),
  },
  { component: <Counter /> }, // INFO: Demo component
  {
    component: (
      <About
        title="Jitendra Nirnejak"
        subtitle="Designer and Developer"
        className="w-[680px]"
      />
    ),
  },
  { component: <End username="nirnejak" /> },
]

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>React Presentation</title>
        <meta
          name="description"
          content="Use your React components as presentation slides"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Presentation
        slides={slides}
        sourceLink="nirnejak/react-presentation" // format: '<username>/<repository>'
      />
    </div>
  )
}

export default Home
