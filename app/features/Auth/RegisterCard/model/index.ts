import { LoginModel } from '@/entities/Login'
import { RegisterResponseDto } from '@/shared/api/client/api.schemas'
import { useNavigate } from 'react-router-dom'

export function useRegisterModel() {
  const store = LoginModel.Store
  const navigate = useNavigate()
  const onSuccess = (data: RegisterResponseDto | undefined) => {
    if (data) {
      // Лиза сделает сразу отдачу токена
      store.data = { access_token: data.access_token }
      navigate('/kanban')
    }
  }
  const onError = () => {}

  const execute = LoginModel.Hooks.useRegister({ onSuccess, onError })

  return { execute: execute.mutate }
}
