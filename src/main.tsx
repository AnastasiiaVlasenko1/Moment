import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Agentation } from 'agentation'
import '@/styles/index.css'
import App from '@/App'
import { store } from '@/store'
import { AuthProvider } from '@/components/auth/AuthProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
        {import.meta.env.DEV && <Agentation />}
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
