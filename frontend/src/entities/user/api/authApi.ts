import { baseApi } from '@/shared/api'
import { clearRefreshToken, getRefreshToken, setRefreshToken } from '@/shared/lib'
import type { AuthResponse, Credentials, User } from '../model/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, Credentials>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        const { data } = await queryFulfilled
        setRefreshToken(data.refreshToken)
      },
    }),
    register: build.mutation<AuthResponse, Credentials>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        const { data } = await queryFulfilled
        setRefreshToken(data.refreshToken)
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        body: { refreshToken: getRefreshToken() },
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled
        } finally {
          clearRefreshToken()
        }
      },
    }),
    user: build.query<User, void>({
      query: () => '/auth/user',
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi
