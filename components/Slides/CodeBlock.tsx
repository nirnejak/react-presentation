import * as motion from "motion/react-client"
import type * as React from "react"
import { type BundledLanguage, codeToHtml } from "shiki"

import { fadeUp } from "@/utils/animation"
import dedent from "@/utils/dedent"

interface Props {
  title: string
  code: string
  language?: BundledLanguage
  className?: string
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
        className="mt-4 max-h-[70vh] w-[min(720px,calc(100vw-24px))] overflow-auto rounded-2xl bg-[#21252B] p-5 text-sm md:min-h-[400px] print:max-h-none print:text-xs"
        dangerouslySetInnerHTML={{ __html: codeHTML }}
      />
    </div>
  )
}

export default CodeBlock
