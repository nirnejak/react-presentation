import * as React from "react"

interface Props {
  title: string
  subtitle?: string
}

const Cover: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-gray-900">{title}</h1>
      {subtitle !== undefined && (
        <p className="mt-4 text-gray-500">{subtitle}</p>
      )}
    </div>
  )
}

export default Cover
