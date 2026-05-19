import { KanBanPage } from '@/pages/kanban/page'
import { LoginPage } from '@/pages/login/page'
import { RegisterPage } from '@/pages/register/page'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function Router() {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='kanban' element={<KanBanPage />} />
      <Route path='tasks' element={<KanBanPage />} />
    </Routes>
  )
}
