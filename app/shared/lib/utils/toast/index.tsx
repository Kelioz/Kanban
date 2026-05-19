import { Toast } from '@/shared/ui/Toast/Toast'
import { ExternalToast, toast } from 'sonner'

type TData = {
  type: 'success' | 'error' | 'warning'
  message: string
}

export const showToast = (data: TData, externalData?: ExternalToast) =>
  toast(<Toast message={data.message} type={data.type} />, externalData)
