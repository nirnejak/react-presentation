import * as React from "react"

import Head from "next/head"

import Buttons from "components/demo/Buttons"
import Presentation from "components/Presentation"
import About from "components/Slides/About"
import Cover from "components/Slides/Cover"
import End from "components/Slides/End"

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
      <About
        title="Jitendra Nirnejak"
        subtitle="Designer and Developer"
        className="w-[680px]"
      />
    ),
  },
  { component: <Buttons /> }, // INFO: Demo component
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
