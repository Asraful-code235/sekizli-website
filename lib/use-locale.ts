'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { LanguageCode } from '@/lib/i18n'

/**
 * Hook for managing language/locale in the application
 * Provides current locale and utilities to change it
 */
export function useLocale() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentLocale = (params?.locale as LanguageCode) || 'en'

  /**
   * Switch to a different locale while maintaining the current path
   */
  const switchLocale = (newLocale: LanguageCode) => {
    if (!pathname) return

    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '')
    
    // Build new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`
    
    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
    
    // Navigate to new locale path
    router.push(newPath)
  }

  /**
   * Get localized path for a given path
   */
  const getLocalizedPath = (path: string, locale?: LanguageCode) => {
    const targetLocale = locale || currentLocale
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `/${targetLocale}${cleanPath}`
  }

  return {
    currentLocale,
    switchLocale,
    getLocalizedPath,
  }
}
