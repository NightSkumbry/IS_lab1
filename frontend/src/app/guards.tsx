import type { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router'
import { selectAuth } from '@/entities/user'
import { routes } from '@/shared/config'

interface Props {
  children: ReactNode
}

function Restoring() {
  return <p style={{ padding: 24 }}>Загрузка…</p>
}

export function ProtectedRoute({ children }: Props) {
  const { status } = useSelector(selectAuth)
  const location = useLocation()

  if (status === 'unknown') return <Restoring />
  if (status === 'anonymous') return <Navigate to={routes.login} state={{ from: location }} replace />
  return <>{children}</>
}

export function GuestOnlyRoute({ children }: Props) {
  const { status } = useSelector(selectAuth)
  const location = useLocation()

  if (status === 'unknown') return <Restoring />
  if (status === 'authenticated') {
    const from = (location.state as { from?: { pathname: string; search: string } } | null)?.from
    return <Navigate to={from ? { pathname: from.pathname, search: from.search } : routes.products} replace />
  }
  return <>{children}</>
}
