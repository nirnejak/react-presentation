"use client"
import * as React from "react"

import { motion } from "motion/react"
import { type BundledLanguage, codeToHtml } from "shiki"

import useFadeUp from "@/hooks/useFadeUp"
import classNames from "@/utils/classNames"

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
  const { ref, controls, variants } = useFadeUp()

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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    generateCodeHTML()
  }, [code, language])

  return (
    <div ref={ref} className={classNames("", className)}>
      <motion.h1
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ delay: 0, duration: 0.4, type: "spring" }}
        className="text-4xl font-bold leading-normal tracking-tight text-gray-900 md:text-5xl"
      >
        {title}
      </motion.h1>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
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
