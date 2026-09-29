import { useState } from 'react'
import { useDeleteOrganizationMutation } from '@/entities/organization'
import { getErrorMessage } from '@/shared/api'
import { Button } from '@/shared/ui'

interface Props {
  id: number
  organizationName: string
  onDeleted?: () => void
}

export function DeleteOrganizationButton({ id, organizationName, onDeleted }: Props) {
  const [deleteOrganization, { isLoading }] = useDeleteOrganizationMutation()
  const [error, setError] = useState<string>()

  const onClick = async () => {
    if (!window.confirm(`Удалить организацию «${organizationName}»?`)) return
    setError(undefined)
    try {
      await deleteOrganization(id).unwrap()
      onDeleted?.()
    } catch (err) {
      setError(getErrorMessage(err, 'Не удалось удалить организацию'))
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
