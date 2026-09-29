import { useState, type FormEvent } from 'react'
import { useLazyCountProductsByPartNumberQuery } from '@/entities/product'
import { getErrorMessage } from '@/shared/api'
import { Button, FormField, Input } from '@/shared/ui'
import styles from './CountByPartNumberOperation.module.css'

export function CountByPartNumberOperation() {
  const [showResult, setShowResult] = useState(false)
  const [partNumber, setPartNumber] = useState('')
  const [trigger, { data, isFetching, isError, error }] = useLazyCountProductsByPartNumberQuery()

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!partNumber.trim()) return
    await trigger(partNumber.trim())
    setShowResult(true)
  }

  if (!showResult) {
    return (
      <form onSubmit={submit} className={styles.form}>
        <FormField label="Партийный номер">
          <Input value={partNumber} onChange={(event) => setPartNumber(event.target.value)} />
        </FormField>
        <Button type="submit" disabled={!partNumber.trim() || isFetching}>
          {isFetching ? 'Считаем…' : 'Выполнить'}
        </Button>
      </form>
    )
  }

  return (
    <div className={styles.result}>
      {isError && <p role="alert">{getErrorMessage(error, 'Не удалось выполнить операцию')}</p>}
      {!isError && data && <p>Найдено: {data.count}</p>}
      <Button variant="secondary" onClick={() => setShowResult(false)}>
        Назад
      </Button>
    </div>
  )
}
