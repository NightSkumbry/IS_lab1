import { useState } from 'react'
import { OrganizationPicker } from '@/entities/organization'
import { useGetProductsByManufacturerQuery, type Product } from '@/entities/product'
import { PAGE_SIZE } from '@/shared/lib'
import { Button, DataTable, FormField, type DataTableColumn } from '@/shared/ui'
import styles from './ProductsByManufacturerOperation.module.css'

const columns: DataTableColumn<Product>[] = [
  { id: 'id', title: 'ID', sortField: 'id', render: (product) => product.id },
  { id: 'name', title: 'Название', sortField: 'name', render: (product) => product.name },
  { id: 'price', title: 'Цена', sortField: 'price', render: (product) => product.price },
  { id: 'partNumber', title: 'Партийный номер', sortField: 'partNumber', render: (product) => product.partNumber },
]

export function ProductsByManufacturerOperation() {
  const [showResult, setShowResult] = useState(false)
  const [organizationId, setOrganizationId] = useState<number | ''>('')
  const [page, setPage] = useState(0)

  const { data, isFetching, isError, refetch } = useGetProductsByManufacturerQuery(
    { organizationId: organizationId || 0, page, size: PAGE_SIZE },
    { skip: !showResult || organizationId === '' },
  )

  if (!showResult) {
    return (
      <div className={styles.form}>
        <FormField label="Производитель">
          <OrganizationPicker value={organizationId} onChange={setOrganizationId} />
        </FormField>
        <Button
          disabled={organizationId === ''}
          onClick={() => {
            setPage(0)
            setShowResult(true)
          }}
        >
          Выполнить
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.result}>
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
        getRowId={(product) => product.id}
        emptyMessage="У этого производителя нет продукции"
      />
      <Button variant="secondary" onClick={() => setShowResult(false)}>
        Назад
      </Button>
    </div>
  )
}
