import { useLocation, useParams } from 'react-router'
import { ProductDetails, useGetProductQuery } from '@/entities/product'
import { DeleteProductButton } from '@/features/delete-product'
import { routes } from '@/shared/config'
import { useCloseModal } from '@/shared/lib'
import { LinkButton, Modal } from '@/shared/ui'
import styles from './ProductViewPage.module.css'

export function ProductViewPage() {
  const id = Number(useParams().id)
  const { search } = useLocation()
  const close = useCloseModal(routes.products)
  const { data, isLoading, isError } = useGetProductQuery(id)

  return (
    <Modal title={`Продукт #${id}`} onClose={close}>
      {isLoading && <p>Загрузка…</p>}
      {isError && <p>Объект не найден или произошла ошибка загрузки.</p>}
      {data && (
        <>
          <ProductDetails product={data} />
          <div className={styles.actions}>
            <LinkButton variant="secondary" to={{ pathname: routes.productEdit(id), search }}>
              Изменить
            </LinkButton>
            <DeleteProductButton id={data.id} productName={data.name} onDeleted={close} />
          </div>
        </>
      )}
    </Modal>
  )
}
