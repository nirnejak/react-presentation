/// <reference types="bun" />

import { describe, expect, test } from "bun:test"

import {
  getDirection,
  getNavigationStep,
  parseSlideParam,
  wrapSlide,
} from "@/utils/slides"

describe("parseSlideParam", () => {
  test("converts the 1-based param to a 0-based index", () => {
    expect(parseSlideParam("1", 10)).toBe(0)
    expect(parseSlideParam("10", 10)).toBe(9)
  })

  test("returns null when missing or empty", () => {
    expect(parseSlideParam(null, 10)).toBeNull()
    expect(parseSlideParam("", 10)).toBeNull()
    expect(parseSlideParam("  ", 10)).toBeNull()
  })

  test("returns null when out of range", () => {
    expect(parseSlideParam("0", 10)).toBeNull()
    expect(parseSlideParam("11", 10)).toBeNull()
    expect(parseSlideParam("-3", 10)).toBeNull()
  })

  test("returns null when not a whole number", () => {
    expect(parseSlideParam("2.5", 10)).toBeNull()
    expect(parseSlideParam("abc", 10)).toBeNull()
  })
})

describe("wrapSlide", () => {
  test("keeps in-range slides", () => {
    expect(wrapSlide(3, 10)).toBe(3)
  })

  test("wraps past either end", () => {
    expect(wrapSlide(10, 10)).toBe(0)
    expect(wrapSlide(-1, 10)).toBe(9)
  })
})

describe("getDirection", () => {
  test("follows the order of slides", () => {
    expect(getDirection(2, 3, 10)).toBe(1)
    expect(getDirection(3, 2, 10)).toBe(-1)
  })

  test("treats wrapping around as continuing in the same direction", () => {
    expect(getDirection(9, 0, 10)).toBe(1)
    expect(getDirection(0, 9, 10)).toBe(-1)
  })

  test("uses plain order for two-slide decks", () => {
    expect(getDirection(1, 0, 2)).toBe(-1)
    expect(getDirection(0, 1, 2)).toBe(1)
  })
})

describe("getNavigationStep", () => {
  test("maps previous keys", () => {
    for (const key of ["ArrowLeft", "PageUp", "a", "A"]) {
      expect(getNavigationStep(key)).toBe(-1)
    }
  })

  test("maps next keys", () => {
    for (const key of ["ArrowRight", "PageDown", "d", "D"]) {
      expect(getNavigationStep(key)).toBe(1)
    }
  })

  test("ignores other keys", () => {
    expect(getNavigationStep("f")).toBeNull()
    expect(getNavigationStep("Enter")).toBeNull()
  })
})
