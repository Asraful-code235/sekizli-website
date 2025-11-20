'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 3,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined


function getQueryClient() {
  if (typeof window === 'undefined') {
    return createQueryClient()
  }
  if (!browserQueryClient) browserQueryClient = createQueryClient()
  return browserQueryClient
}


export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    children
  )
}