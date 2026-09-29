import { useState } from 'react'
import { useDeletePersonMutation } from '@/entities/person'
import { getErrorMessage } from '@/shared/api'
import { Button } from '@/shared/ui'

interface Props {
  id: number
  personName: string
  onDeleted?: () => void
}

export function DeletePersonButton({ id, personName, onDeleted }: Props) {
  const [deletePerson, { isLoading }] = useDeletePersonMutation()
  const [error, setError] = useState<string>()

  const onClick = async () => {
    if (!window.confirm(`Удалить персону «${personName}»?`)) return
    setError(undefined)
    try {
      await deletePerson(id).unwrap()
      onDeleted?.()
    } catch (err) {
      setError(getErrorMessage(err, 'Не удалось удалить персону'))
    }
  }

  return (
    <span>
      <Button variant="danger" onClick={onClick} disabled={isLoading}>
        Удалить
      </Button>
      {error && (
        <p role="alert" style={{ color: 'var(--color-danger)', margin: '8px 0 0' }}>
          {error}
        </p>
      )}
    </span>
  )
}
