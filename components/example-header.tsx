/**
 * Example Header Component with Language Switcher
 * 
 * This demonstrates how to integrate the LanguageSwitcher component
 * into your site's header/navigation.
 * 
 * Usage:
 * 1. Import this component in your layout
 * 2. Customize the styling to match your design
 * 3. Add your navigation links
 */

'use client'

import { LanguageSwitcher } from '@/components/language-switcher'
import { useLocale } from '@/lib/use-locale'
import Link from 'next/link'

export function ExampleHeader() {
  const { getLocalizedPath } = useLocale()

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={getLocalizedPath('/')} className="text-xl font-bold">
            Sekizli
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href={getLocalizedPath('/corporate')}
              className="hover:text-blue-600 transition-colors"
            >
              Corporate
            </Link>
            <Link 
              href={getLocalizedPath('/products')}
              className="hover:text-blue-600 transition-colors"
            >
              Products
            </Link>
            <Link 
              href={getLocalizedPath('/services')}
              className="hover:text-blue-600 transition-colors"
            >
              Services
            </Link>
            <Link 
              href={getLocalizedPath('/contact')}
              className="hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Language Switcher & CTA */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher 
              useNativeLabels={true}
              className="text-sm"
            />
            
            <a 
              href="tel:4447595"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              444 75 95
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
