'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'
import { ThemeColors, themeQuery } from '@/sanity/queries/theme/theme'
import { useQuery } from '@tanstack/react-query'
import { client } from '@/sanity/lib/client'

interface ProviderProps extends ThemeProviderProps {
  themeData?: ThemeColors | null
}

export function ThemeProvider({ children, themeData: initialThemeData, ...props }: ProviderProps) {
  // Use Tanstack Query to fetch latest theme data on client
  const { data: themeData } = useQuery({
    queryKey: ['theme'],
    queryFn: async () => {
      // Fetch directly from Sanity client on frontend
      // Use CDN but with low caching time or perspective 'published'
      return await client.fetch<ThemeColors>(themeQuery, {}, {
        filterResponse: false,
        useCdn: true // or false if you want absolute freshness
      })
    },
    initialData: initialThemeData || undefined,
    staleTime: 1000 * 60 * 5, // Consider stale after 5 minutes
    refetchOnWindowFocus: true, // Refetch when user comes back to tab
  })

  // Effect to apply dynamic colors and store in localStorage
  React.useEffect(() => {
    if (themeData?.primaryColor?.hex) {
      const primary = themeData.primaryColor.hex
      
      // Set CSS variable
      document.documentElement.style.setProperty('--primary-brand', primary)
      
      // Store in localStorage as requested
      try {
        localStorage.setItem('site-theme-primary', primary)
      } catch (e) {
        // ignore storage errors
      }
    }

    if (themeData?.secondaryColor?.hex) {
      const secondary = themeData.secondaryColor.hex
      document.documentElement.style.setProperty('--secondary-brand', secondary)
       try {
        localStorage.setItem('site-theme-secondary', secondary)
      } catch (e) {
        // ignore
      }
    }
  }, [themeData])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
