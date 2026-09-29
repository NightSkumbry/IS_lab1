import { CreatePersonForm } from '@/features/create-person'
import { routes } from '@/shared/config'
import { useCloseModal } from '@/shared/lib'
import { Modal } from '@/shared/ui'

export function PersonCreatePage() {
  const close = useCloseModal(routes.persons)

  return (
    <Modal title="Создание персоны" onClose={close}>
      <CreatePersonForm onSuccess={close} onCancel={close} />
    </Modal>
  )
}
