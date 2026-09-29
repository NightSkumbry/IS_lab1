import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { extractFieldErrors } from '@/shared/api/errors'

export function applyServerErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
): boolean {
  const fieldErrors = extractFieldErrors(error)
  for (const { field, message } of fieldErrors) {
    setError(field as Path<T>, { type: 'server', message })
  }
  return fieldErrors.length > 0
}
