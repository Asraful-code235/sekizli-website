
export const SUPPORTED_LANGUAGES = {
  en: { code: 'en', label: 'English', nativeLabel: 'English', dir: 'ltr' },
  tr: { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe', dir: 'ltr' },
  es: { code: 'es', label: 'Spanish', nativeLabel: 'Español', dir: 'ltr' },
  ar: { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
  ru: { code: 'ru', label: 'Russian', nativeLabel: 'Русский', dir: 'ltr' },
} as const

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES

export const DEFAULT_LANGUAGE: LanguageCode = 'en'

export function getSupportedLanguageCodes(): LanguageCode[] {
  return Object.keys(SUPPORTED_LANGUAGES) as LanguageCode[]
}

export function isValidLanguageCode(code: string): code is LanguageCode {
  return code in SUPPORTED_LANGUAGES
}

export function getLanguageConfig(code: string) {
  if (isValidLanguageCode(code)) {
    return SUPPORTED_LANGUAGES[code]
  }
  return SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE]
}

export function getLanguageDirection(code: string): 'ltr' | 'rtl' {
  const config = getLanguageConfig(code)
  return config.dir
}

export function formatLanguageLabel(code: string, useNative = false): string {
  const config = getLanguageConfig(code)
  return useNative ? config.nativeLabel : config.label
}
