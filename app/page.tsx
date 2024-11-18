import * as React from "react"

import { type Metadata } from "next"

import Counter from "components/demo/Counter"
import Presentation from "components/Presentation"
import About from "components/Slides/About"
import CodeBlock from "components/Slides/CodeBlock"
import Cover from "components/Slides/Cover"
import End from "components/Slides/End"
import MultiImage from "components/Slides/MultiImage"
import Points from "components/Slides/Points"
import Profile from "components/Slides/Profile"
import QuoteBlock from "components/Slides/QuoteBlock"
import SingleImage from "components/Slides/SingleImage"
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
    className="max-w-[720px] px-3 md:px-0"
  />,
  <QuoteBlock
    key="quote"
    quote="The most disastrous thing that you can ever learn is your first programming language"
    author="Alan Kay"
    className="max-w-[720px] px-3 md:px-0"
  />,
  <Profile
    key="profile"
    profiles={[
      {
        name: "Chris Lattner",
        title: "Founder @ Modular AI",
        url: "x.com/clattner_llvm",
        avatar:
          "https://pbs.twimg.com/profile_images/1484209565788897285/1n6Viahb_400x400.jpg",
      },
      {
        name: "John Carmack",
        title: "Founder @ Id Tech",
        url: "x.com/id_aa_carmack",
        avatar:
          "https://pbs.twimg.com/profile_images/1560764938083352577/B1X3m4NN_400x400.jpg",
      },
    ]}
    className="max-w-[720px] px-3 md:px-0"
  />,
  <SingleImage
    key="single-image"
    image="https://images.unsplash.com/photo-1626958390898-162d3577f293?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    className="w-full px-3 md:max-w-[1020px] md:px-0"
  />,
  <Points
    key="points"
    title="2 hard problems in computer science"
    points={["Cache invalidation", "Naming things", "off-by-1 errors"]}
    className="max-w-[720px] px-3 md:px-0"
  />,
  <MultiImage
    key="multi-image"
    images={[
      "https://images.unsplash.com/photo-1607706009771-de8808640bcf?q=80&w=1087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1510751007277-36932aac9ebd?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ]}
    className="max-w-[720px] px-3 md:px-0"
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
    className="max-w-[720px] px-3 md:px-0"
  />,
  <Counter key="counter" />, // INFO: Demo component
  <About
    key="about"
    title="Jitendra Nirnejak"
    subtitle="Designer and Developer"
    className="max-w-[720px] px-3 md:px-0"
  />,
  <End key="end" username="nirnejak" className="max-w-[680px] px-3 md:px-0" />,
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
