import { Link, useLocation } from 'react-router'
import { routes, type SpecialOperationMeta } from '@/shared/config'
import styles from './OperationCard.module.css'

interface Props {
  operation: SpecialOperationMeta
}

export function OperationCard({ operation }: Props) {
  const { search } = useLocation()

  return (
    <Link
      className={styles.card}
      to={{ pathname: routes.specialOperation(operation.slug), search }}
      aria-label={operation.title}
    >
      <span className={styles.text}>
        <span className={styles.title}>{operation.title}</span>
        <span className={styles.description}>{operation.description}</span>
      </span>
      <span className={styles.arrow} aria-hidden>
        →
      </span>
    </Link>
  )
}
