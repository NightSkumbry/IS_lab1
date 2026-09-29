import type { ReactElement } from 'react'
import { useParams } from 'react-router'
import { CountByPartNumberOperation } from '@/features/product-count-by-part-number'
import { MinPartNumberOperation } from '@/features/product-min-part-number'
import { RatingGroupsOperation } from '@/features/product-rating-groups'
import { ProductsByManufacturerOperation } from '@/features/products-by-manufacturer'
import { ReducePricesOperation } from '@/features/reduce-product-prices'
import { routes, SPECIAL_OPERATIONS } from '@/shared/config'
import { useCloseModal } from '@/shared/lib'
import { Modal } from '@/shared/ui'
import styles from './SpecialOperationModalPage.module.css'

const OPERATION_BODIES: Record<string, () => ReactElement> = {
  'min-part-number': MinPartNumberOperation,
  'rating-groups': RatingGroupsOperation,
  'count-by-part-number': CountByPartNumberOperation,
  'by-manufacturer': ProductsByManufacturerOperation,
  'reduce-price': ReducePricesOperation,
}

export function SpecialOperationModalPage() {
  const { operation: slug = '' } = useParams()
  const close = useCloseModal(routes.special)
  const meta = SPECIAL_OPERATIONS.find((item) => item.slug === slug)
  const OperationBody = OPERATION_BODIES[slug]

  if (!meta || !OperationBody) {
    return (
      <Modal title="Операция не найдена" onClose={close}>
        <p>Такой операции не существует.</p>
      </Modal>
    )
  }

  return (
    <Modal title={meta.title} onClose={close}>
      <p className={styles.description}>{meta.description}</p>
      <OperationBody />
    </Modal>
  )
}
