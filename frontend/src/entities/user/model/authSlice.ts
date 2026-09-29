import { createSlice } from '@reduxjs/toolkit'
import { getRefreshToken } from '@/shared/lib'
import { authApi } from '../api/authApi'
import type { User } from './types'

export interface AuthState {
  status: 'unknown' | 'authenticated' | 'anonymous'
  user: User | null
}

const initialState: AuthState = {
  status: getRefreshToken() ? 'unknown' : 'anonymous',
  user: null,
}

const anonymous = (): AuthState => ({ status: 'anonymous', user: null })

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sessionExpired: anonymous,
  },
  extraReducers: (builder) => {
    const authenticated = (_: AuthState, { payload }: { payload: { user: User } | User }) => ({
      status: 'authenticated' as const,
      user: 'user' in payload ? payload.user : payload,
    })

    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, authenticated)
      .addMatcher(authApi.endpoints.register.matchFulfilled, authenticated)
      .addMatcher(authApi.endpoints.user.matchFulfilled, authenticated)
      .addMatcher(authApi.endpoints.user.matchRejected, anonymous)
      .addMatcher(authApi.endpoints.logout.matchFulfilled, anonymous)
      .addMatcher(authApi.endpoints.logout.matchRejected, anonymous)
  },
})

export const { sessionExpired } = authSlice.actions

export const selectAuth = (state: { auth: AuthState }) => state.auth
