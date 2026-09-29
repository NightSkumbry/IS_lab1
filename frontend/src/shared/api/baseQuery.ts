import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { clearRefreshToken, getRefreshToken, setRefreshToken } from '@/shared/lib'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include',
})

type Query = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>

let onSessionExpired: (() => void) | undefined

export function setSessionExpiredHandler(handler: () => void) {
  onSessionExpired = handler
}

function isAuthEndpoint(args: string | FetchArgs): boolean {
  const url = typeof args === 'string' ? args : args.url
  return url.startsWith('/auth/') && url !== '/auth/user'
}

type RefreshResult = 'ok' | 'expired' | 'failed'

let refreshing: Promise<RefreshResult> | null = null

const refreshTokens = async (...[, api, extra]: Parameters<Query>): Promise<RefreshResult> => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return 'expired'

  const result = await rawBaseQuery(
    { url: '/auth/refresh', method: 'POST', body: { refreshToken } },
    api,
    extra,
  )
  if (result.data) {
    setRefreshToken((result.data as { refreshToken: string }).refreshToken)
    return 'ok'
  }
  const status = result.error?.status
  return status === 401 || status === 403 ? 'expired' : 'failed'
}

export const baseQueryWithReauth: Query = async (args, api, extra) => {
  let result = await rawBaseQuery(args, api, extra)

  if (result.error?.status === 401 && !isAuthEndpoint(args)) {
    refreshing ??= refreshTokens(args, api, extra).finally(() => {
      refreshing = null
    })
    const outcome = await refreshing

    if (outcome === 'ok') {
      result = await rawBaseQuery(args, api, extra)
    } else if (outcome === 'expired') {
      clearRefreshToken()
      onSessionExpired?.()
    }
  }

  return result
}
