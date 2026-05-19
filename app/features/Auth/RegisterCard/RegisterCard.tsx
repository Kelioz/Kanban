import { LoginDto } from '@/shared/api/client/api.schemas'
import { RegisterForm } from '@/entities/Login/ui/RegisterForm/RegisterForm'
import { useRegisterModel } from './model'

export function RegisterCard() {
  const model = useRegisterModel()
  const handleRegister = (data: LoginDto) => {
    model.execute({ email: data.email, password: data.password })
  }
  return <RegisterForm onSubmit={handleRegister} />
}
