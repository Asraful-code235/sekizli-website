import { HomeData } from '@/lib/api/types'

export interface HomeProps {
  data: HomeData | null
  isLoading: boolean
  error: Error | null
}