import { client } from '@/sanity/lib/client'
import { QueryOptions, QueryParamsType } from './types'


export class SanityAPI {
  static async fetch<T>(
    query: string,
    params?: QueryParamsType,
    options?: QueryOptions
  ): Promise<T> {
    const startTime = performance.now()
    
    try {
      const result = await client.fetch<T>(query, params || {}, {
        useCdn: options?.useCdn !== false,
        perspective: options?.perspective,
        next: {
          revalidate: options?.revalidate || 60,
          tags: options?.tags,
        },
      })

      const endTime = performance.now()
      const duration = endTime - startTime

      if (process.env.NODE_ENV === 'development') {
        console.log(`[SanityAPI] Query executed in ${duration.toFixed(2)}ms`)
        console.log(`[SanityAPI] Query: ${query.substring(0, 100)}...`)
      }

      return result
    } catch (error) {
      console.error('[SanityAPI] Query failed:', error)
      throw new Error(`Sanity query failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }


  static async getById<T>(
    id: string,
    options?: QueryOptions
  ): Promise<T | null> {
    const query = `*[_id == $id][0]`
    return this.fetch<T>(query, { id }, options)
  }


  static async getByType<T>(
    type: string,
    options?: QueryOptions & { limit?: number; offset?: number }
  ): Promise<T[]> {
    const { limit = 100, offset = 0, ...queryOptions } = options || {}
    const query = `*[_type == $type][$offset...$limit]`
    return this.fetch<T[]>(query, { type, offset, limit }, queryOptions)
  }


  static async getWhere<T>(
    filter: Record<string, unknown>,
    options?: QueryOptions & { limit?: number; offset?: number }
  ): Promise<T[]> {
    const { limit = 100, offset = 0, ...queryOptions } = options || {}
    
    const conditions = Object.entries(filter).map(
      ([key, value]) => `${key} == $${key}`
    )
    
    const query = `*[${conditions.join(' && ')}][$offset...$limit]`
    return this.fetch<T[]>(query, { ...filter, offset, limit }, queryOptions)
  }
}