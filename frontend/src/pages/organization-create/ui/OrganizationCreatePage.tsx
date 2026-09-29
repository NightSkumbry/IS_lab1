import { CreateOrganizationForm } from '@/features/create-organization'
import { routes } from '@/shared/config'
import { useCloseModal } from '@/shared/lib'
import { Modal } from '@/shared/ui'

export function OrganizationCreatePage() {
  const close = useCloseModal(routes.organizations)

  return (
    <Modal title="Создание организации" onClose={close}>
      <CreateOrganizationForm onSuccess={close} onCancel={close} />
    </Modal>
  )
}
