import { SanityAPI } from '@/lib/api'

export interface ThemeColors {
  primaryColor?: {
    hex: string
  }
  secondaryColor?: {
    hex: string
  }
}

export const themeQuery = `
*[_type == "theme"][0]{
  primaryColor{
    hex
  },
  secondaryColor{
    hex
  }
}
`

export async function getThemeData() {
  return SanityAPI.fetch(themeQuery, {}, {
    useCdn: true,
    revalidate: 3600, // 1 hour
    tags: ['theme']
  })
}

