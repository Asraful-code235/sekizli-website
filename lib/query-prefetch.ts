import { QueryClient, dehydrate } from '@tanstack/react-query'


export interface QueryConfig {
  queryKey: readonly unknown[]
  queryFn: () => Promise<unknown>
  staleTime?: number
  gcTime?: number
}


export const pageQueries = {
  home: {
    queryKey: ['home'] as const,
    queryFn: async () => {
      const { getHomeData } = await import('@/sanity/queries/home/home')
      return getHomeData()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  },
  // Add more page queries here as needed
  // about: {
  //   queryKey: ['about'] as const,
  //   queryFn: async () => {
  //     const { getAboutData } = await import('@/sanity/queries/about')
  //     return getAboutData()
  //   },
  //   staleTime: 5 * 60 * 1000,
  //   gcTime: 10 * 60 * 1000,
  // },
}

/**
 * Prefetch queries for a specific page
 */
export async function prefetchPageQueries(
  queryClient: QueryClient,
  page: keyof typeof pageQueries
) {
  const queries = pageQueries[page]
  
  if (!queries) {
    console.warn(`No queries found for page: ${page}`)
    return
  }

  // Prefetch the page's queries
  await queryClient.prefetchQuery({
    queryKey: queries.queryKey,
    queryFn: queries.queryFn,
    staleTime: queries.staleTime,
    gcTime: queries.gcTime,
  })
}

/**
 * Prefetch multiple pages (useful for layouts that need data from multiple pages)
 */
export async function prefetchMultipleQueries(
  queryClient: QueryClient,
  pages: Array<keyof typeof pageQueries>
) {
  await Promise.all(
    pages.map(page => prefetchPageQueries(queryClient, page))
  )
}


export function createDehydratedState(pages: Array<keyof typeof pageQueries>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, 
        gcTime: 10 * 60 * 1000, 
      },
    },
  })

  prefetchMultipleQueries(queryClient, pages).catch(error => {
    console.error('Failed to prefetch queries:', error)
  })

  return dehydrate(queryClient)
}