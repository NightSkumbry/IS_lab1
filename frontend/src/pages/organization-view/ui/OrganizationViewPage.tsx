import { useLocation, useParams } from 'react-router'
import { OrganizationDetails, useGetOrganizationQuery } from '@/entities/organization'
import { DeleteOrganizationButton } from '@/features/delete-organization'
import { routes } from '@/shared/config'
import { useCloseModal } from '@/shared/lib'
import { LinkButton, Modal } from '@/shared/ui'
import styles from './OrganizationViewPage.module.css'

export function OrganizationViewPage() {
  const id = Number(useParams().id)
  const { search } = useLocation()
  const close = useCloseModal(routes.organizations)
  const { data, isLoading, isError } = useGetOrganizationQuery(id)

  return (
    <Modal title={`Организация #${id}`} onClose={close}>
      {isLoading && <p>Загрузка…</p>}
      {isError && <p>Объект не найден или произошла ошибка загрузки.</p>}
      {data && (
        <>
          <OrganizationDetails organization={data} />
          <div className={styles.actions}>
            <LinkButton variant="secondary" to={{ pathname: routes.organizationEdit(id), search }}>
              Изменить
            </LinkButton>
            <DeleteOrganizationButton id={data.id} organizationName={data.name} onDeleted={close} />
          </div>
        </>
      )}
    </Modal>
  )
}
