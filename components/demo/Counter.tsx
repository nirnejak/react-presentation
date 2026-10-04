"use client"
import * as React from "react"

import Wrapper from "@/components/Wrapper"

const Counter: React.FC = () => {
  const [count, setCount] = React.useState(0)

  return (
    <Wrapper className="flex justify-center">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="cursor-pointer rounded-md bg-gray-800 px-5 py-3 text-gray-200 transition select-none hover:bg-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 active:scale-95"
          onClick={() => {
            if (count > 0) setCount(count - 1)
          }}
        >
          -
        </button>
        <p>Count is {count}</p>
        <button
          type="button"
          className="cursor-pointer rounded-md bg-gray-800 px-5 py-3 text-gray-200 transition select-none hover:bg-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 active:scale-95"
          onClick={() => {
            setCount(count + 1)
          }}
        >
          +
        </button>
      </div>
    </Wrapper>
  )
}

export default Counter
