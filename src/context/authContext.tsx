import { useContext, createContext, useState, useEffect } from "react"
import { getAuth, type User, type Auth } from 'firebase/auth'
import { useFirebase } from './firebaseContext'

interface Data {
  currentUser: User | null
  auth: Auth | null
}

const AuthContext = createContext({
  currentUser: null,
  auth: null
} as Data)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [auth, setAuth] = useState<Auth | null>(null)
  const { app } = useFirebase()

  useEffect(() => {
    if (!app) return
    setAuth(getAuth())
  }, [app])

  useEffect(() => {
    if (!auth) return
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, [auth])

  const value = {
    currentUser,
    auth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)