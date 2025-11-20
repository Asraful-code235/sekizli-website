import type { Metadata, Viewport } from 'next'

/**
 * Base metadata configuration
 */
const baseMetadata = {
  title: {
    default: 'Sekizli',
    template: '%s | Sekizli'
  },
  description: 'High-performance web application built with Next.js and Sanity',
  keywords: ['nextjs', 'sanity', 'performance', 'web development'],
  authors: [{ name: 'Sekizli Team' }],
  creator: 'Sekizli',
  publisher: 'Sekizli',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

/**
 * Base viewport configuration
 */
export const baseViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata(options: {
  title?: string
  description?: string
  path?: string
  ogImage?: string
  keywords?: string[]
  noIndex?: boolean
}): Metadata {
  const {
    title,
    description,
    path = '/',
    ogImage,
    keywords,
    noIndex = false
  } = options

  return {
    ...baseMetadata,
    title: title ? {
      ...baseMetadata.title,
      absolute: title
    } : baseMetadata.title,
    description: description || baseMetadata.description,
    keywords: keywords ? [...(baseMetadata.keywords as string[]), ...keywords] : baseMetadata.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: path,
      title: title || 'Sekizli',
      description: description || baseMetadata.description,
      siteName: 'Sekizli',
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || 'Sekizli',
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Sekizli',
      description: description || baseMetadata.description,
      images: ogImage ? [ogImage] : [],
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : baseMetadata.robots,
  }
}