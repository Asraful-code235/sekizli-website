import { useQuery } from '@tanstack/react-query'
import { HomeData } from '@/lib/api/types'


export function useHomeData() {
  return useQuery<HomeData | null>({
    queryKey: ['home'],
    queryFn: async () => {
      const { getHomeData } = await import('@/sanity/queries/home/home')
      return getHomeData()
    },
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}