import { SanityAPI } from '@/lib/api'
import { FooterData } from './types'

/**
 * GROQ query to fetch footer data by language
 */
export const footerQuery = `
*[_type == "footer" && language == $language][0]{
  _id,
  language,
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
  craneImage{
    asset->{
      _id,
      url
    }
  },
  copyrightText,
  socialLinks[]{
    platform,
    url,
    icon
  },
  supportPhone,
  sections[]{
    title,
    links[]{
      label,
      url
    }
  },
  contact{
    address,
    phones
  }
}
`

/**
 * Fetch footer data by language
 */
export async function getFooterData(language: string = 'en') {
  return SanityAPI.fetch(footerQuery, { language }, {
    useCdn: true,
    revalidate: 3600, // 1 hour
    tags: ['footer']
  })
}
