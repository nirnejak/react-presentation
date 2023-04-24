import * as React from "react"

const Buttons: React.FC = () => {
  const [count, setCount] = React.useState(0)

  return (
    <div className="flex items-center gap-4">
      <button
        className="select-none rounded-md bg-gray-800 px-5 py-3 text-gray-200 transition-all hover:bg-gray-900 active:scale-95"
        onClick={() => {
          setCount(count - 1)
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
  )
}

export default Buttons
