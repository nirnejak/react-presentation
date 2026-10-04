import * as React from "react"

import { SLIDE_PARAM } from "@/utils/slides"

// The current slide lives in the URL (`?slide=N`) so a refresh or a shared
// link opens the same slide. Windows of the same deck (presenter view and
// audience view) stay in sync over a BroadcastChannel.

const SLIDE_CHANGE_EVENT = "slidechange"
const CHANNEL_NAME = "react-presentation"

let channel: BroadcastChannel | null = null

const getChannel = (): BroadcastChannel | null => {
  if (channel === null && typeof BroadcastChannel !== "undefined") {
    channel = new BroadcastChannel(CHANNEL_NAME)
  }
  return channel
}

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener("popstate", callback)
  window.addEventListener(SLIDE_CHANGE_EVENT, callback)
  return () => {
    window.removeEventListener("popstate", callback)
    window.removeEventListener(SLIDE_CHANGE_EVENT, callback)
  }
}

const getServerSnapshot = (): null => null

const writeSlideParam = (slide: number): void => {
  const url = new URL(window.location.href)
  url.searchParams.set(SLIDE_PARAM, String(slide + 1))
  window.history.replaceState(null, "", url)
  window.dispatchEvent(new Event(SLIDE_CHANGE_EVENT))
}

export const useSearchParam = (name: string): string | null =>
  React.useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(name),
    getServerSnapshot
  )

// Go to a slide (0-based) here and in every other window of the deck
export const setSlide = (slide: number): void => {
  writeSlideParam(slide)
  getChannel()?.postMessage({ slide })
}

// Follow slide changes made in other windows, shifted by `offset` (used by
// the presenter view's "next slide" preview)
export const useSlideSync = (offset = 0): void => {
  React.useEffect(() => {
    const slideChannel = getChannel()
    if (slideChannel === null) return

    const handleMessage = (e: MessageEvent<{ slide: number }>): void => {
      writeSlideParam(e.data.slide + offset)
    }
    slideChannel.addEventListener("message", handleMessage)
    return () => {
      slideChannel.removeEventListener("message", handleMessage)
    }
  }, [offset])
}
