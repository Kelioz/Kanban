import {
  QueryCache,
  QueryClient,
  keepPreviousData,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { LoginModel } from '@/entities/Login'
import { MINUTE } from '../lib/utils/date/const'

const store = LoginModel.Store

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      enabled: false,
      retryDelay: 500,
      staleTime: 0,
      gcTime: 15 * MINUTE,
      placeholderData: keepPreviousData,
    },
  },
  queryCache: new QueryCache({
    onError(err) {
      const error = err as AxiosError

      if (error.response?.status === 401) {
        store.clear()
        return (window.location.href = '/login')
      }
    },
  }),
})
