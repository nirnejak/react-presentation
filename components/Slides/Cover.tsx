import * as React from "react"

import classNames from "utils/classNames"

interface Props {
  title: string
  subtitle?: string
  className?: string
}

const Cover: React.FC<Props> = ({ title, subtitle, className }) => {
  return (
    <div className={classNames("text-center", className)}>
      <h1 className="text-3xl font-bold leading-normal text-gray-900">
        {title}
      </h1>
      {subtitle !== undefined && (
        <p className="mt-4 leading-normal text-gray-500">{subtitle}</p>
      )}
    </div>
  )
}

export default Cover
