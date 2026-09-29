export interface ApiFieldError {
  field: string
  message: string
}

interface ErrorBody {
  message?: string
  errors?: ApiFieldError[]
}

function getBody(error: unknown): ErrorBody | undefined {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const { data } = error as { data: unknown }
    if (typeof data === 'object' && data !== null) return data as ErrorBody
  }
  return undefined
}

export function extractFieldErrors(error: unknown): ApiFieldError[] {
  const errors = getBody(error)?.errors
  return Array.isArray(errors) ? errors : []
}

export function getErrorMessage(error: unknown, fallback = 'Произошла ошибка'): string {
  const message = getBody(error)?.message
  if (message) return message
  if (typeof error === 'object' && error !== null && 'status' in error) {
    if (error.status === 'FETCH_ERROR') return 'Нет соединения с сервером'
  }
  return fallback
}
