import * as React from "react"

import type { Viewport } from "next"
import { JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"

import classNames from "@/utils/classNames"

import "../styles/main.css"

export const viewport: Viewport = {
  themeColor: "#000000",
}

interface Props {
  children: React.ReactNode
}

const sansFont = localFont({
  variable: "--sans-font",
  src: [
    {
      path: "../fonts/Satoshi-Variable.woff2",
      weight: "300 800",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-VariableItalic.woff2",
      weight: "300 800",
      style: "italic",
    },
  ],
})

const monoFont = JetBrains_Mono({
  variable: "--mono-font",
  weight: ["400"],
  subsets: ["latin"],
})

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="react-presentation-maker.vercel.app"
          src="https://plausible.io/js/script.js"
        />
      </head>

      <body
        className={classNames(
          sansFont.variable,
          monoFont.variable,
          "overflow-x-hidden font-sans"
        )}
      >
        {children}
      </body>
    </html>
  )
}

export default RootLayout
