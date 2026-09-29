import { useGetProductsQuery, type ProductFilters } from '@/entities/product'
import { routes } from '@/shared/config'
import { PAGE_SIZE, useTableQueryState } from '@/shared/lib'
import { DataTable } from '@/shared/ui'
import { columns, SORT_FIELDS, type FilterKey } from '../model/columns'

export function ProductsTable() {
  const { page, sort, filters, hasFilters, setPage, toggleSort, setFilter, resetFilters } =
    useTableQueryState<Record<FilterKey, string>>(SORT_FIELDS, [
      'name',
      'unitOfMeasure',
      'manufacturerName',
      'partNumber',
      'ownerName',
    ])

  const { data, isFetching, isError, refetch } = useGetProductsQuery({
    page,
    size: PAGE_SIZE,
    sort,

    filters: filters as ProductFilters,
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
      getRowId={(product) => product.id}
      getRowHref={(product) => routes.product(product.id)}
      getRowAriaLabel={(product) => `Открыть продукт «${product.name}»`}
      emptyMessage="Объектов нет"
    />
  )
}
