"use client"
import * as React from "react"

import Wrapper from "components/Wrapper"

const Counter: React.FC = () => {
  const [count, setCount] = React.useState(0)

  return (
    <Wrapper className="flex justify-center">
      <div className="flex items-center gap-4">
        <button
          className="select-none rounded-md bg-gray-800 px-5 py-3 text-gray-200 transition-all hover:bg-gray-900 active:scale-95"
          onClick={() => {
            count > 0 && setCount(count - 1)
          }}
        >
          -
        </button>
        <p>Count is {count}</p>
        <button
          className="select-none rounded-md bg-gray-800 px-5 py-3 text-gray-200 transition-all hover:bg-gray-900 active:scale-95"
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
