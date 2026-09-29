import { useParams } from 'react-router'
import { useGetPersonQuery } from '@/entities/person'
import { EditPersonForm } from '@/features/edit-person'
import { routes } from '@/shared/config'
import { useCloseModal } from '@/shared/lib'
import { Modal } from '@/shared/ui'

export function PersonEditPage() {
  const id = Number(useParams().id)
  const close = useCloseModal(routes.persons)
  const { data: person, isLoading, isError } = useGetPersonQuery(id)

  return (
    <Modal title={`Изменение персоны #${id}`} onClose={close}>
      {isLoading && <p>Загрузка…</p>}
      {isError && <p>Объект не найден или произошла ошибка загрузки.</p>}
      {person && <EditPersonForm person={person} onSuccess={close} onCancel={close} />}
    </Modal>
  )
}
