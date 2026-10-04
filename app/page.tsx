import type { Metadata } from "next"
import type * as React from "react"

import chrisLattner from "@/assets/images/chris-lattner.jpg"
import johnCarmack from "@/assets/images/john-carmack.jpg"
import keyboard from "@/assets/images/keyboard.jpg"
import laptopCode from "@/assets/images/laptop-code.jpg"
import laptopTyping from "@/assets/images/laptop-typing.jpg"
import Counter from "@/components/demo/Counter"
import Presentation from "@/components/Presentation"
import About from "@/components/Slides/About"
import CodeBlock from "@/components/Slides/CodeBlock"
import Cover from "@/components/Slides/Cover"
import End from "@/components/Slides/End"
import MultiImage from "@/components/Slides/MultiImage"
import Points from "@/components/Slides/Points"
import Profile from "@/components/Slides/Profile"
import QuoteBlock from "@/components/Slides/QuoteBlock"
import SingleImage from "@/components/Slides/SingleImage"
import getMetadata from "@/utils/seo"
import type { Slide } from "@/utils/slides"

export const metadata: Metadata = getMetadata({
  path: "/",
  title: "React Presentation",
  description: "Use your React components as presentation slides",
})

const slides: Slide[] = [
  {
    id: "cover",
    content: (
      <Cover
        title="Welcome"
        subtitle="Let's get started!"
        className="max-w-[720px] px-3 md:px-0"
      />
    ),
    notes:
      "Introduce yourself and the topic. Use ← / → to move between slides.",
  },
  {
    id: "quote",
    content: (
      <QuoteBlock
        quote="The most disastrous thing that you can ever learn is your first programming language"
        author="Alan Kay"
        className="max-w-[720px] px-3 md:px-0"
      />
    ),
  },
  {
    id: "profile",
    content: (
      <Profile
        profiles={[
          {
            name: "Chris Lattner",
            title: "Founder @ Modular AI",
            url: "x.com/clattner_llvm",
            avatar: chrisLattner,
          },
          {
            name: "John Carmack",
            title: "Founder @ Id Tech",
            url: "x.com/id_aa_carmack",
            avatar: johnCarmack,
          },
        ]}
        className="max-w-[720px] px-3 md:px-0"
      />
    ),
  },
  {
    id: "single-image",
    content: (
      <SingleImage
        alt="Backlit mechanical keyboard"
        image={keyboard}
        className="w-full px-3 md:max-w-[1020px] md:px-0"
      />
    ),
  },
  {
    id: "points",
    content: (
      <Points
        title="2 hard problems in computer science"
        points={["Cache invalidation", "Naming things", "off-by-1 errors"]}
        className="max-w-[720px] px-3 md:px-0"
      />
    ),
    notes: "Pause for the laugh on the third point.",
  },
  {
    id: "multi-image",
    content: (
      <MultiImage
        images={[
          {
            src: laptopCode,
            alt: "Laptop with code on screen",
          },
          {
            src: laptopTyping,
            alt: "Hand typing on a laptop showing code",
          },
        ]}
        className="max-w-[720px] px-3 md:px-0"
      />
    ),
  },
  {
    id: "code",
    content: (
      <CodeBlock
        language="tsx"
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
      />
    ),
    notes:
      "Walk through the state update, then switch to the live demo on the next slide.",
  },
  {
    id: "counter",
    content: <Counter />,
    notes: "Live demo: click the buttons to show the component is interactive.",
  },
  {
    id: "about",
    content: (
      <About
        title="Jitendra Nirnejak"
        subtitle="Designer and Developer"
        className="max-w-[720px] px-3 md:px-0"
      />
    ),
  },
  {
    id: "end",
    content: <End username="nirnejak" className="max-w-[680px] px-3 md:px-0" />,
    notes: "Thank the audience and open the floor for questions.",
  },
]

const Home: React.FC = () => {
  return (
    <Presentation
      slides={slides}
      sourceLink="nirnejak/react-presentation" // format: '<username>/<repository>'
    />
  )
}

export default Home
