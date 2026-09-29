import { useState } from 'react'
import { useDeleteProductMutation } from '@/entities/product'
import { getErrorMessage } from '@/shared/api'
import { Button } from '@/shared/ui'

interface Props {
  id: number
  productName: string
  onDeleted?: () => void
}

export function DeleteProductButton({ id, productName, onDeleted }: Props) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation()
  const [error, setError] = useState<string>()

  const onClick = async () => {
    if (!window.confirm(`Удалить продукт «${productName}»?`)) return
    setError(undefined)
    try {
      await deleteProduct(id).unwrap()
      onDeleted?.()
    } catch (err) {
      setError(getErrorMessage(err, 'Не удалось удалить продукт'))
    }
  }

  return (
    <span>
      <Button variant="danger" onClick={onClick} disabled={isLoading}>
        Удалить
      </Button>
      {error && (
        <p role="alert" style={{ color: 'var(--color-danger)', margin: '8px 0 0' }}>
          {error}
        </p>
      )}
    </span>
  )
}
