'use client'

import { useLocale } from '@/lib/use-locale'
import { SUPPORTED_LANGUAGES, type LanguageCode } from '@/lib/i18n'

interface LanguageSwitcherProps {
  /**
   * Whether to show native language names (e.g., "Türkçe" vs "Turkish")
   */
  useNativeLabels?: boolean
  /**
   * Custom className for styling
   */
  className?: string
}

/**
 * Language switcher component
 * Allows users to change the application language
 */
export function LanguageSwitcher({ 
  useNativeLabels = true,
  className = '' 
}: LanguageSwitcherProps) {
  const { currentLocale, switchLocale } = useLocale()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as LanguageCode
    switchLocale(newLocale)
  }

  return (
    <select
      value={currentLocale}
      onChange={handleLanguageChange}
      className={`px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      aria-label="Select language"
    >
      {Object.entries(SUPPORTED_LANGUAGES).map(([code, config]) => (
        <option key={code} value={code}>
          {useNativeLabels ? config.nativeLabel : config.label}
        </option>
      ))}
    </select>
  )
}
