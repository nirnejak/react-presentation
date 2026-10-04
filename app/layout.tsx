import type { Viewport } from "next"
import { JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"
import type * as React from "react"

import MotionProvider from "@/components/MotionProvider"
import classNames from "@/utils/classNames"

import "./main.css"

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
    <html
      lang="en"
      className={classNames(
        sansFont.variable,
        monoFont.variable,
        "overflow-x-hidden font-sans"
      )}
    >
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}

export default RootLayout
