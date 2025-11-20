import { HomeData } from '@/lib/api/types'

/**
 * GROQ query to fetch home page data
 */
export const homeQuery = `
{
  "hero": *[_type == "home"][0].hero{
    title,
    subtitle,
    backgroundImage{
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
    cta{
      text,
      href
    }
  },
  "features": *[_type == "home"][0].features[]{
    title,
    description,
    icon,
    image{
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
    }
  },
  "about": *[_type == "home"][0].about{
    title,
    description,
    image{
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
    }
  },
  "seo": *[_type == "home"][0].seo{
    title,
    description,
    ogImage{
      asset->{
        _id,
        url
      }
    },
    keywords,
    noIndex
  }
}
`

/**
 * Fetch home page data
 */
export async function getHomeData(): Promise<HomeData | null> {
  const { SanityAPI } = await import('@/lib/api')
  
  return SanityAPI.fetch<HomeData>(homeQuery, {}, {
    useCdn: true,
    revalidate: 3600, // 1 hour
    tags: ['home']
  })
}