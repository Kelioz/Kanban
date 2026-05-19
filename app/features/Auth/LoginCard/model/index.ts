import { LoginModel } from '@/entities/Login'
import { LoginResponseDto } from '@/shared/api/client/api.schemas'
import { TApiError } from '@/shared/lib/types/api'
import { showToast } from '@/shared/lib/utils/toast'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

export function useLoginModel() {
  const store = LoginModel.Store
  const navigate = useNavigate()
  const onSuccess = (data: LoginResponseDto | undefined) => {
    if (data) {
      store.data = { access_token: data.access_token }
      navigate('/kanban')
      showToast({ message: 'Успех', type: 'success' })
    }
  }
  const onError = (error?: AxiosError<TApiError>) => {
    showToast({
      type: 'error',
      message:
        error?.response?.data.message ||
        'Произошла неизвестная ошибка, попробуйте позже',
    })
  }

  const execute = LoginModel.Hooks.useLogin({ onSuccess, onError })

  return { execute: execute.mutate }
}
