'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavigationItem } from '@/sanity/queries/header/types'

interface NavLinksProps {
  items: NavigationItem[]
  locale: string
}

export function NavLinks({ items, locale }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-6">
      {items.map((item, index) => {
        const href = item.link.startsWith('/') 
          ? `/${locale}${item.link}` 
          : item.link
        
        const isActive = pathname === href

        return (
          <Link
            key={index}
            href={href}
            className={`text-sm font-medium transition-colors hover:text-brand-secondary border-r border-gray-500 pr-2 ${
              isActive ? 'text-brand-secondary' : 'text-gray-700'
            }`}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
