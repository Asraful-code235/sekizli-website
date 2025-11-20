import type { QueryParams } from '@sanity/client'

export interface QueryOptions {
  useCdn?: boolean
  perspective?: 'published' | 'drafts' | 'raw'
  revalidate?: number | false
  tags?: string[]
}

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SEOFields {
  title?: string
  description?: string
  ogImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  keywords?: string[]
  noIndex?: boolean
}

export interface Page extends SanityDocument {
  title: string
  slug: {
    current: string
  }
  seo?: SEOFields
}

export interface Post extends SanityDocument {
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  content?: unknown[]
  publishedAt?: string
  author?: {
    name: string
    slug?: {
      current: string
    }
  }
  categories?: Array<{
    title: string
    slug: {
      current: string
    }
  }>
  seo?: SEOFields
}

export interface HomeData {
  hero?: {
    title: string
    subtitle?: string
    backgroundImage?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
    cta?: {
      text: string
      href: string
    }
  }
  features?: Array<{
    title: string
    description: string
    icon?: string
    image?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }>
  about?: {
    title: string
    description: string
    image?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }
  seo?: SEOFields
}

export type QueryParamsType = QueryParams