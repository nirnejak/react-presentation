import type { Metadata } from "next"

export const BASE_URL = "https://react-presentation-maker.vercel.app" // Don't include slash at the end
export const SITE_NAME = "React Presentation"

interface MetadataArgs {
  path: string
  title: string
  description: string
  image?: string
}

const getMetadata = ({
  path,
  title,
  description,
  image,
}: MetadataArgs): Metadata => {
  // Without an explicit image, app/opengraph-image.tsx is used
  const images = image !== undefined ? { images: [image] } : {}

  const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title,
    description,

    applicationName: SITE_NAME,
    creator: "Jitendra Nirnejak",
    authors: [{ name: "Jitendra Nirnejak", url: "https://nirnejak.com" }],
    robots:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    keywords: [
      "React",
      "Presentation",
      "Slides",
      "Next.js",
      "TailwindCSS",
      "Motion",
      "TypeScript",
    ],

    icons: {
      icon: "/favicon.ico",
      shortcut: "/icons/icon-512x512.png",
      apple: "/icons/icon-512x512.png",
    },
    manifest: "/manifest.json",

    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      ...images,
    },

    twitter: {
      card: "summary_large_image",
      site: "@nirnejak",
      creator: "@nirnejak",
      title,
      description,
      ...images,
    },

    appleWebApp: {
      capable: true,
      title,
      statusBarStyle: "black-translucent",
    },
  }
  return metadata
}

export default getMetadata
