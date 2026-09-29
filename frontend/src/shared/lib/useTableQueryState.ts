import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

export const PAGE_SIZE = 10

export interface SortState {
  field: string
  direction: 'asc' | 'desc'
}

function parseSort(value: string | null, sortFields: ReadonlySet<string>): SortState | undefined {
  const [field, direction] = value?.split(',') ?? []
  if (!sortFields.has(field) || (direction !== 'asc' && direction !== 'desc')) return undefined
  return { field, direction }
}

export function useTableQueryState<TFilters extends Record<string, string>>(
  sortFields: ReadonlySet<string>,
  filterKeys: readonly (keyof TFilters & string)[],
) {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Math.max(Number(searchParams.get('page') ?? 1) - 1 || 0, 0)
  const sortValue = searchParams.get('sort')
  const sort = useMemo(() => parseSort(sortValue, sortFields), [sortValue, sortFields])

  const filtersKey = filterKeys.map((key) => searchParams.get(key) ?? '').join('\u0000')
  const filters = useMemo(() => {
    const result = {} as TFilters
    for (const key of filterKeys) {
      const value = searchParams.get(key)
      if (value) result[key] = value as TFilters[typeof key]
    }
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey])

  const update = useCallback(
    (mutate: (params: URLSearchParams) => void, resetPage: boolean) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev)
        mutate(params)
        if (resetPage) params.delete('page')
        return params
      })
    },
    [setSearchParams],
  )

  const setPage = useCallback(
    (next: number) => update((params) => params.set('page', String(next + 1)), false),
    [update],
  )

  const toggleSort = useCallback(
    (field: string) =>
      update((params) => {
        const current = parseSort(params.get('sort'), sortFields)
        if (current?.field !== field) params.set('sort', `${field},asc`)
        else if (current.direction === 'asc') params.set('sort', `${field},desc`)
        else params.delete('sort')
      }, true),
    [update, sortFields],
  )

  const setFilter = useCallback(
    (key: keyof TFilters & string, value: string) =>
      update((params) => (value ? params.set(key, value) : params.delete(key)), true),
    [update],
  )

  const resetFilters = useCallback(
    () => update((params) => filterKeys.forEach((key) => params.delete(key)), true),
    [update, filterKeys],
  )

  const hasFilters = Object.keys(filters).length > 0

  return { page, sort, filters, hasFilters, setPage, toggleSort, setFilter, resetFilters }
}
