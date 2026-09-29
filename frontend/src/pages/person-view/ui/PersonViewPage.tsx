import { useLocation, useParams } from 'react-router'
import { PersonDetails, useGetPersonQuery } from '@/entities/person'
import { DeletePersonButton } from '@/features/delete-person'
import { routes } from '@/shared/config'
import { useCloseModal } from '@/shared/lib'
import { LinkButton, Modal } from '@/shared/ui'
import styles from './PersonViewPage.module.css'

export function PersonViewPage() {
  const id = Number(useParams().id)
  const { search } = useLocation()
  const close = useCloseModal(routes.persons)
  const { data, isLoading, isError } = useGetPersonQuery(id)

  return (
    <Modal title={`Персона #${id}`} onClose={close}>
      {isLoading && <p>Загрузка…</p>}
      {isError && <p>Объект не найден или произошла ошибка загрузки.</p>}
      {data && (
        <>
          <PersonDetails person={data} />
          <div className={styles.actions}>
            <LinkButton variant="secondary" to={{ pathname: routes.personEdit(id), search }}>
              Изменить
            </LinkButton>
            <DeletePersonButton id={data.id} personName={data.name} onDeleted={close} />
          </div>
        </>
      )}
    </Modal>
  )
}
