import { SanityAPI } from '@/lib/api'

/**
 * GROQ query to fetch contact page data
 */
export const contactQuery = `
*[_type == "contact"][0]{
  title,
  description,
  email,
  phone,
  address,
  socialLinks[]{
    platform,
    url
  },
  seo{
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
 * Fetch contact page data
 */
export async function getContactData() {
  return SanityAPI.fetch(contactQuery, {}, {
    useCdn: true,
    revalidate: 3600, // 1 hour
    tags: ['contact']
  })
}