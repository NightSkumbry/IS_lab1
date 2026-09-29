import { configureStore } from '@reduxjs/toolkit'
import { authApi, authSlice, sessionExpired } from '@/entities/user'
import { baseApi, setSessionExpiredHandler } from '@/shared/api'
import { getRefreshToken } from '@/shared/lib'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setSessionExpiredHandler(() => {
  store.dispatch(sessionExpired())
  store.dispatch(baseApi.util.resetApiState())
})

export function restoreSession() {
  if (getRefreshToken()) {
    store.dispatch(authApi.endpoints.user.initiate())
  }
}
