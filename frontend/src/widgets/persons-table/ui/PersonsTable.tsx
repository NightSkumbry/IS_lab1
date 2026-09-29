import { useGetPersonsQuery, type PersonFilters } from '@/entities/person'
import { routes } from '@/shared/config'
import { PAGE_SIZE, useTableQueryState } from '@/shared/lib'
import { DataTable } from '@/shared/ui'
import { columns, SORT_FIELDS, type FilterKey } from '../model/columns'

export function PersonsTable() {
  const { page, sort, filters, hasFilters, setPage, toggleSort, setFilter, resetFilters } =
    useTableQueryState<Record<FilterKey, string>>(SORT_FIELDS, [
      'name',
      'eyeColor',
      'hairColor',
      'nationality',
    ])

  const { data, isFetching, isError, refetch } = useGetPersonsQuery({
    page,
    size: PAGE_SIZE,
    sort,

    filters: filters as PersonFilters,
  })

  return (
    <DataTable
      columns={columns}
      rows={data?.content}
      isFetching={isFetching}
      isError={isError}
      onRetry={refetch}
      totalElements={data?.totalElements}
      totalPages={data?.totalPages}
      page={page}
      onPageChange={setPage}
      sort={sort}
      onToggleSort={toggleSort}
      filters={filters}
      onFilterChange={(key, value) => setFilter(key as FilterKey, value)}
      hasFilters={hasFilters}
      onResetFilters={resetFilters}
      getRowId={(person) => person.id}
      getRowHref={(person) => routes.person(person.id)}
      getRowAriaLabel={(person) => `Открыть персону «${person.name}»`}
      emptyMessage="Персон нет"
    />
  )
}
