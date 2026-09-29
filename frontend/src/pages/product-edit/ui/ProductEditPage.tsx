import { useParams } from 'react-router'
import { useGetProductQuery } from '@/entities/product'
import { EditProductForm } from '@/features/edit-product'
import { routes } from '@/shared/config'
import { useCloseModal } from '@/shared/lib'
import { Modal } from '@/shared/ui'

export function ProductEditPage() {
  const id = Number(useParams().id)
  const close = useCloseModal(routes.products)
  const { data: product, isLoading, isError } = useGetProductQuery(id)

  return (
    <Modal title={`Изменение продукта #${id}`} onClose={close}>
      {isLoading && <p>Загрузка…</p>}
      {isError && <p>Объект не найден или произошла ошибка загрузки.</p>}
      {product && <EditProductForm product={product} onSuccess={close} onCancel={close} />}
    </Modal>
  )
}
