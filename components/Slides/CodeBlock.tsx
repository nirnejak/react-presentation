"use client"

import { motion } from "motion/react"
import * as React from "react"
import { type BundledLanguage, codeToHtml } from "shiki"

import { fadeUp } from "@/utils/animation"

interface Props {
  title: string
  code: string
  language?: BundledLanguage
  className?: string
}

const CodeBlock: React.FC<Props> = ({
  title,
  code,
  language = "typescript",
  className,
}) => {
  const [codeHTML, setCodeHTML] = React.useState("")

  React.useEffect(() => {
    const generateCodeHTML = async (): Promise<void> => {
      if (code.length > 0) {
        const codeMarkup = await codeToHtml(code, {
          lang: language,
          theme: "plastic",
        })
        setCodeHTML(codeMarkup)
      } else {
        setCodeHTML("")
      }
    }

    generateCodeHTML()
  }, [code, language])

  return (
    <div className={className}>
      <motion.h1
        {...fadeUp()}
        className="text-4xl/normal font-bold tracking-tight text-gray-900 md:text-5xl"
      >
        {title}
      </motion.h1>
      <motion.div
        {...fadeUp(0.1)}
        className="mt-4 max-h-[70vh] w-[calc(100vw-24px)] overflow-auto rounded-2xl bg-[#21252B] py-2 text-sm md:min-h-[400px] md:w-full"
      >
        <pre className="-ml-11">
          <code
            dangerouslySetInnerHTML={{ __html: codeHTML }}
            className="font-mono"
          />
        </pre>
      </motion.div>
    </div>
  )
}

export default CodeBlock
