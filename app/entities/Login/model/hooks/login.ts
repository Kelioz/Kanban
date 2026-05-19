import { ApiClient } from '@/shared/api/client'
import { LoginDto, LoginResponseDto } from '@/shared/api/client/api.schemas'
import { TApiError } from '@/shared/lib/types/api'
import { TMutationParameters } from '@/shared/lib/utils/mutations'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useLogin(props: TMutationParameters<LoginResponseDto>) {
  return useMutation({
    mutationFn: (loginDto: LoginDto) => ApiClient.authControllerLogin(loginDto),
    onSuccess(data) {
      if (props.onSuccess) props.onSuccess(data)
    },
    onError(error: AxiosError<TApiError>) {
      if (props.onError) props.onError(error)
    },
  })
}
