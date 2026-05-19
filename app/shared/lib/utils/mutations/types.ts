import { UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { TApiError } from '../../types/api'

export type TBaseEntity = {
  id: string
}
export type TBaseEntityId = {
  id: number
}
export type TMutationParameters<T> = {
  onSuccess?: (data?: T) => void
  onError?: (err: AxiosError<TApiError>) => void
}

export type TQueryParameters<T extends object> = Omit<
  UseQueryOptions<T>,
  'queryKey' | 'queryFn'
>
