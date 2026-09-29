import { useState } from 'react'
import { useLazyGetRatingGroupsQuery } from '@/entities/product'
import { getErrorMessage } from '@/shared/api'
import { Button } from '@/shared/ui'
import styles from './RatingGroupsOperation.module.css'

export function RatingGroupsOperation() {
  const [showResult, setShowResult] = useState(false)
  const [trigger, { data, isFetching, isError, error }] = useLazyGetRatingGroupsQuery()

  if (!showResult) {
    return (
      <Button
        onClick={async () => {
          await trigger()
          setShowResult(true)
        }}
        disabled={isFetching}
      >
        {isFetching ? 'Считаем…' : 'Выполнить'}
      </Button>
    )
  }

  return (
    <div className={styles.result}>
      {isError && <p role="alert">{getErrorMessage(error, 'Не удалось выполнить операцию')}</p>}
      {!isError && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Рейтинг</th>
              <th>Количество</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((group) => (
              <tr key={group.rating}>
                <td>{group.rating}</td>
                <td>{group.count}</td>
              </tr>
            ))}
            {data && data.length === 0 && (
              <tr>
                <td colSpan={2}>Продуктов нет</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <Button variant="secondary" onClick={() => setShowResult(false)}>
        Назад
      </Button>
    </div>
  )
}
