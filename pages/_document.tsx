import * as React from "react"

import { Html, Head, Main, NextScript } from "next/document"

const MyDocument: React.FC = () => {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        {/* Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/<path-to-icons>/icon-512x512.png" />
        <link
          rel="mask-icon"
          href="/<path-to-icons>/icon-512x512.png"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Basic Meta */}
        <meta name="keywords" content="Next.js, TypeScript, Starter" />
        <meta name="author" content="Next.js TypeScript Starter" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="application-name" content="Next.js TypeScript Starter" />
        {/* Schema.org for Google */}
        <meta itemProp="name" content="Next.js TypeScript Starter" />
        {/* Open Graph */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={"Next.js TypeScript Starter"} />
        {/* Facebook App */}
        <meta property="fb:admins" content="<fb-admin-id>" />
        <meta property="fb:app_id" content="<fb-app-id>" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@twitterusername" />
        <meta name="twitter:site" content="@twitterusername" />
      </Head>
      <body className="overflow-x-hidden bg-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
