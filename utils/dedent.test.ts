/// <reference types="bun" />

import { describe, expect, test } from "bun:test"

import dedent from "@/utils/dedent"

describe("dedent", () => {
  test("removes shared indentation and surrounding blank lines", () => {
    const code = `
      const a = 1
      if (a) {
        console.log(a)
      }
    `
    expect(dedent(code)).toBe("const a = 1\nif (a) {\n  console.log(a)\n}")
  })

  test("ignores blank lines when finding the indentation", () => {
    expect(dedent("    a\n\n    b")).toBe("a\n\nb")
  })

  test("leaves unindented code alone", () => {
    expect(dedent("a\n  b")).toBe("a\n  b")
  })

  test("handles empty code", () => {
    expect(dedent("")).toBe("")
    expect(dedent("\n   \n")).toBe("")
  })
})
