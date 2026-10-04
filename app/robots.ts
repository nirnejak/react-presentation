import type { MetadataRoute } from "next"

import { BASE_URL } from "@/utils/seo"

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/" },
  sitemap: `${BASE_URL}/sitemap.xml`,
})

export default robots
