import { AuthWidget } from '@/widgets/Auth/AuthWidget/AuthWidget'
import QueryProvider from './providers/queryProvider'
import Router from './router'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <AuthWidget>
          <Router />
          <Toaster
            position='top-right'
            toastOptions={{
              duration: 2000,
              unstyled: true,
            }}
          />
        </AuthWidget>
      </BrowserRouter>
    </QueryProvider>
  )
}

export default App
