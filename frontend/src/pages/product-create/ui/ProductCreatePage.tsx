import { CreateProductForm } from '@/features/create-product'
import { routes } from '@/shared/config'
import { useCloseModal } from '@/shared/lib'
import { Modal } from '@/shared/ui'

export function ProductCreatePage() {
  const close = useCloseModal(routes.products)

  return (
    <Modal title="Создание продукта" onClose={close}>
      <CreateProductForm onSuccess={close} onCancel={close} />
    </Modal>
  )
}
