import { Outlet } from 'react-router'
import { SPECIAL_OPERATIONS } from '@/shared/config'
import { OperationCard } from './OperationCard'
import styles from './SpecialOperationsPage.module.css'

export function SpecialOperationsPage() {
  return (
    <>
      <h1 className={styles.title}>Спецоперации</h1>
      <div className={styles.list}>
        {SPECIAL_OPERATIONS.map((operation) => (
          <OperationCard key={operation.slug} operation={operation} />
        ))}
      </div>
      <Outlet />
    </>
  )
}
