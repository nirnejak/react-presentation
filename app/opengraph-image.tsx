import { ImageResponse } from "next/og"

import { SITE_NAME } from "@/utils/seo"

export const alt = SITE_NAME
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const OpengraphImage = (): ImageResponse => {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 96,
        background: "white",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          marginBottom: 48,
          borderRadius: 9999,
          background: "#f97316",
        }}
      />
      <div
        style={{
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "#111827",
        }}
      >
        {SITE_NAME}
      </div>
      <div style={{ marginTop: 24, fontSize: 44, color: "#6b7280" }}>
        Use your React components as presentation slides
      </div>
    </div>,
    size
  )
}

export default OpengraphImage
