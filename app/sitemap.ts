import type { MetadataRoute } from "next"

import { BASE_URL } from "@/utils/seo"

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: `${BASE_URL}/`,
    changeFrequency: "monthly",
    priority: 1,
  },
]

export default sitemap
