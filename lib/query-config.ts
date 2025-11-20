import { dehydrate, QueryClient } from '@tanstack/react-query'
import { getHomeData } from '@/sanity/queries/home/home'


export async function prefetchQueries(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: ['home'],
    queryFn: () => getHomeData(),
    staleTime: 5 * 60 * 1000,
  })
}


export function getDehydratedState() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000, 
      },
    },
  })

  prefetchQueries(queryClient).catch(error => {
    console.error('Failed to prefetch queries:', error)
  })

  return dehydrate(queryClient)
}