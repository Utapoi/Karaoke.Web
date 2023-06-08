export interface PaginatedResponse<T> {
  items: T[]
  count: number
  totalCount: number
}
