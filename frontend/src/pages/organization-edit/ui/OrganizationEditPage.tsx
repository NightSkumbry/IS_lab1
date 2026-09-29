import { useParams } from 'react-router'
import { useGetOrganizationQuery } from '@/entities/organization'
import { EditOrganizationForm } from '@/features/edit-organization'
import { routes } from '@/shared/config'
import { useCloseModal } from '@/shared/lib'
import { Modal } from '@/shared/ui'

export function OrganizationEditPage() {
  const id = Number(useParams().id)
  const close = useCloseModal(routes.organizations)
  const { data: organization, isLoading, isError } = useGetOrganizationQuery(id)

  return (
    <Modal title={`Изменение организации #${id}`} onClose={close}>
      {isLoading && <p>Загрузка…</p>}
      {isError && <p>Объект не найден или произошла ошибка загрузки.</p>}
      {organization && (
        <EditOrganizationForm organization={organization} onSuccess={close} onCancel={close} />
      )}
    </Modal>
  )
}
