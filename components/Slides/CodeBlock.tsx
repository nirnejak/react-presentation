import * as motion from "motion/react-client"
import type * as React from "react"
import { type BundledLanguage, codeToHtml } from "shiki"

import { fadeUp } from "@/utils/animation"

interface Props {
  title: string
  code: string
  language?: BundledLanguage
  className?: string
}

// Strip surrounding blank lines and the indentation shared by every line,
// so code can be written indented inside a template literal
const dedent = (code: string): string => {
  const lines = code.replace(/^\s*\n|\n\s*$/g, "").split("\n")
  const indent = Math.min(
    ...lines
      .filter((line) => line.trim().length > 0)
      .map((line) => line.search(/\S/))
  )
  return lines.map((line) => line.slice(indent)).join("\n")
}

const CodeBlock = async ({
  title,
  code,
  language = "typescript",
  className,
}: Props): Promise<React.ReactElement> => {
  const codeHTML = await codeToHtml(dedent(code), {
    lang: language,
    theme: "plastic",
  })

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
        className="mt-4 max-h-[70vh] w-[calc(100vw-24px)] overflow-auto rounded-2xl bg-[#21252B] p-5 text-sm md:min-h-[400px] md:w-full"
        dangerouslySetInnerHTML={{ __html: codeHTML }}
      />
    </div>
  )
}

export default CodeBlock
