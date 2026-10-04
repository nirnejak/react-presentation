import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    // TypeScript 7 (native Go compiler) doesn't expose the compiler API that
    // Next.js uses for type checking, so run the `tsc` CLI instead.
    useTypeScriptCli: true,
  },
}

export default nextConfig
