import * as React from "react"

import Head from "next/head"

import Buttons from "components/demo/Buttons"
import Presentation from "components/Presentation"
import About from "components/Slides/About"
import Cover from "components/Slides/Cover"
import End from "components/Slides/End"
import CodeBlock from "components/Slides/CodeBlock"

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
        title="Input.tsx"
        code={`
        import * as React from "react"

        interface Props {
          name: string
        }

        const Input: React.FC<Props> = ({ name }) => {
          return <div>
            <input type="text" value={name} />
          </div>
        }

        export default Input
        `}
        className="w-[680px]"
      />
    ),
  },
  { component: <Buttons /> }, // INFO: Demo component
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
