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
    <nav className="hidden lg:flex items-center gap-3 lg:gap-5">
      {items.map((item, index) => {
        const href = item.link.startsWith('/') 
          ? `/${locale}${item.link}` 
          : item.link
        
        const isActive = pathname === href

        return (
          <Link
            key={index}
            href={href}
            className={`xl:text-sm text-xs font-medium transition-colors hover:text-brand-secondary border-r border-gray-500 pr-3 ${
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
