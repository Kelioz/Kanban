import { LoginForm } from '@/entities/Login/ui/loginForm/LoginForm'
import { useLoginModel } from './model'
import { LoginDto } from '@/shared/api/client/api.schemas'

export function LoginCard() {
  const model = useLoginModel()
  const handleLogin = (data: LoginDto) => {
    model.execute({ email: data.email, password: data.password })
  }
  return <LoginForm onSubmit={handleLogin} />
}
