import { SanityAPI } from '@/lib/api'

/**
 * GROQ query to fetch header data by language
 */
export const headerQuery = `
*[_type == "header" && language == $language][0]{
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
  languages,
  navigationItems[]{
    title,
    link
  },
  callCta{
    icon{
      asset->{
        _id,
        url
      }
    },
    phone
  },
  socialLinks[]{
    icon{
      asset->{
        _id,
        url
      }
    },
    link
  }
}
`

/**
 * Fetch header data by language
 * @param language - Language code (en, tr, es, ar, ru)
 */
export async function getHeaderData(language: string = 'en') {
  return SanityAPI.fetch(headerQuery, { language }, {
    useCdn: true,
    revalidate: 3600, // 1 hour
    tags: ['header']
  })
}