import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { FirebaseProvider } from './context/firebaseContext.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { DbProvider } from './context/dbContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseProvider>
      <AuthProvider>
        <DbProvider>
          <App />
        </DbProvider>
      </AuthProvider>
    </FirebaseProvider>
  </StrictMode>
)
