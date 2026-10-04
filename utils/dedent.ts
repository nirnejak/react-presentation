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

export default dedent
