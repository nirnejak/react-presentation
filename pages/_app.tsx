import * as React from "react"

import type { AppProps } from "next/app"

import "../styles/main.css"

const MyApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return <Component {...pageProps} />
}

export default MyApp
