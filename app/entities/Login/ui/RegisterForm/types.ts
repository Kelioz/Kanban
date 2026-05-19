import { LoginDto } from '@/shared/api/client/api.schemas'

export type TProps = {
  onSubmit: (data: LoginDto) => void
}
