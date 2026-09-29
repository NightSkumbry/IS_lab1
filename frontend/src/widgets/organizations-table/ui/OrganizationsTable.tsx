import { useGetOrganizationsQuery, type OrganizationFilters } from '@/entities/organization'
import { routes } from '@/shared/config'
import { PAGE_SIZE, useTableQueryState } from '@/shared/lib'
import { DataTable } from '@/shared/ui'
import { columns, SORT_FIELDS, type FilterKey } from '../model/columns'

export function OrganizationsTable() {
  const { page, sort, filters, hasFilters, setPage, toggleSort, setFilter, resetFilters } =
    useTableQueryState<Record<FilterKey, string>>(SORT_FIELDS, ['name', 'type'])

  const { data, isFetching, isError, refetch } = useGetOrganizationsQuery({
    page,
    size: PAGE_SIZE,
    sort,

    filters: filters as OrganizationFilters,
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
      getRowId={(organization) => organization.id}
      getRowHref={(organization) => routes.organization(organization.id)}
      getRowAriaLabel={(organization) => `Открыть организацию «${organization.name}»`}
      emptyMessage="Организаций нет"
    />
  )
}
