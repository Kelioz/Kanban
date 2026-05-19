import { LoginModel } from '@/entities/Login'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const AuthWidget = observer((props: PropsWithChildren) => {
  const store = LoginModel.Store
  const navigate = useNavigate()
  const path = useLocation()

  useEffect(() => {
    const isAuthPage =
      path.pathname === '/login' || path.pathname === '/register'
    console.log(store.isAuthenticated, store.accessToken)

    if (!store.isAuthenticated && !isAuthPage) {
      navigate('/login')
    } else if (store.isAuthenticated && isAuthPage) {
      navigate('/kanban')
    }
  }, [])

  return <>{props.children}</>
})
