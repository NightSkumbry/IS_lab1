import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useLazyGetProductWithMinPartNumberQuery } from '@/entities/product'
import { getErrorMessage } from '@/shared/api'
import { routes } from '@/shared/config'
import { Button } from '@/shared/ui'
import styles from './MinPartNumberOperation.module.css'

export function MinPartNumberOperation() {
  const [showResult, setShowResult] = useState(false)
  const { search } = useLocation()
  const [trigger, { data, isFetching, isError, error }] = useLazyGetProductWithMinPartNumberQuery()

  if (!showResult) {
    return (
      <Button
        onClick={async () => {
          await trigger()
          setShowResult(true)
        }}
        disabled={isFetching}
      >
        {isFetching ? 'Ищем…' : 'Выполнить'}
      </Button>
    )
  }

  return (
    <div className={styles.result}>
      {isError && <p role="alert">{getErrorMessage(error, 'Не удалось выполнить операцию')}</p>}
      {!isError && data === null && <p>Продуктов нет.</p>}
      {!isError && data && (
        <>
          <dl className={styles.list}>
            <dt>ID</dt>
            <dd>{data.id}</dd>
            <dt>Название</dt>
            <dd>{data.name}</dd>
            <dt>Партийный номер</dt>
            <dd>{data.partNumber}</dd>
          </dl>
          <Link to={{ pathname: routes.product(data.id), search }}>Открыть карточку</Link>
        </>
      )}
      <Button variant="secondary" onClick={() => setShowResult(false)}>
        Назад
      </Button>
    </div>
  )
}
