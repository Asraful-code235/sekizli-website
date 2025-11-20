'use client'

import { useState } from 'react'
import { useLocale } from '@/lib/use-locale'
import { SUPPORTED_LANGUAGES, type LanguageCode } from '@/lib/i18n'
import { Globe } from 'lucide-react'

interface LanguageDropdownProps {
  availableLanguages: string[]
}

export function LanguageDropdown({ availableLanguages }: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { currentLocale, switchLocale } = useLocale()

  // Filter languages based on what's available from Sanity
  const filteredLanguages = Object.entries(SUPPORTED_LANGUAGES)
    .filter(([code]) => availableLanguages.includes(code))
    .map(([langCode, config]) => ({ langCode: langCode as LanguageCode, ...config }))

  const handleLanguageSwitch = (langCode: LanguageCode) => {
    switchLocale(langCode)
    setIsOpen(false)
  }

  return (
    <div
      className='relative bottom-0 bg-teal-700'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Hamburger Icon with Current Language */}
      <button
        className='flex items-center gap-2 px-2 py-2 bg-teal-700 hover:bg-teal-600 transition-colors'
        aria-label='Select language'
      >
        {/* Hamburger Icon */}
        <div className='flex flex-col gap-1 text-white'>
          <Globe />
        </div>

        {/* Current Language */}
        <span className='text-sm font-medium uppercase text-white'>{currentLocale}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className='absolute top-full left-0 bg-teal-700 shadow-lg py-1 z-50 text-white'>
          {filteredLanguages.map(({ langCode, nativeLabel }) => (
            <button
              key={langCode}
              onClick={() => handleLanguageSwitch(langCode)}
              className={`w-full text-center px-4 py-2 text-sm hover:bg-teal-600 transition-colors ${
                langCode === currentLocale ? "bg-teal-700 font-medium" : ""
              }`}
            >
              <span className='uppercase text-xs mr-2 '>{langCode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
