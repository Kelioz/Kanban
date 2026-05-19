import { ApiClient } from '@/shared/api/client'
import {
  RegisterDto,
  RegisterResponseDto,
} from '@/shared/api/client/api.schemas'
import { TMutationParameters } from '@/shared/lib/utils/mutations'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useRegister(props: TMutationParameters<RegisterResponseDto>) {
  return useMutation({
    mutationFn: (loginDto: RegisterDto) =>
      ApiClient.authControllerRegister(loginDto),
    onSuccess(data) {
      if (props.onSuccess) props.onSuccess(data)
    },
    onError(error) {
      if (props.onError) props.onError(error as AxiosError)
    },
  })
}
