"use client"
import * as React from "react"

import { motion } from "framer-motion"
import { highlight } from "sugar-high"

import useFadeUp from "hooks/useFadeUp"
import classNames from "utils/classNames"

interface Props {
  title: string
  code: string
  className?: string
}

const CodeBlock: React.FC<Props> = ({ title, code, className }) => {
  const { ref, controls, variants } = useFadeUp()

  const codeHTML = highlight(code)

  return (
    <div ref={ref} className={classNames("", className)}>
      <motion.h1
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ delay: 0, duration: 0.4, type: "spring" }}
        className="text-5xl font-bold leading-normal text-gray-900"
      >
        {title}
      </motion.h1>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
        className="mt-4 min-h-[400px] max-w-[670px] overflow-auto rounded-2xl bg-gray-200 py-5 text-sm text-white"
      >
        <pre className="-ml-8">
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
