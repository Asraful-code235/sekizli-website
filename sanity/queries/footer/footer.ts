import { SanityAPI } from '@/lib/api'

/**
 * GROQ query to fetch footer data
 */
export const footerQuery = `
*[_type == "footer"][0]{
  logo{
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions {
          width,
          height
        }
      }
    }
  },
  description,
  socialLinks[]{
    platform,
    url,
    icon
  },
  quickLinks[]{
    title,
    href
  },
  copyrightText
}
`

/**
 * Fetch footer data
 */
export async function getFooterData() {
  return SanityAPI.fetch(footerQuery, {}, {
    useCdn: true,
    revalidate: 3600, // 1 hour
    tags: ['footer']
  })
}