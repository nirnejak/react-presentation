import * as React from "react"

import type { AppProps } from "next/app"
import localFont from "next/font/local"

import classNames from "utils/classNames"

import "../styles/main.css"

const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    {
      path: "./Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "./Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
})

const MyApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return (
    <main className={classNames(satoshi.variable, "font-sans")}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
