import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'

export function useCloseModal(backTo: string) {
  const navigate = useNavigate()
  const { search } = useLocation()

  return useCallback(() => navigate({ pathname: backTo, search }), [navigate, backTo, search])
}
