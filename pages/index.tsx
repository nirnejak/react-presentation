import * as React from "react"

import Head from "next/head"

import Presentation from "components/Presentation"
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

      <Presentation slides={slides} />
    </div>
  )
}

export default Home
