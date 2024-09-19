import { useContext, createContext, useState } from "react"
import { initializeApp, type FirebaseApp } from 'firebase/app'

type FirebaseConfig = {
  apiKey: string,
  authDomain: string,
  databaseURL?: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string,
  measurementId?: string,
}
interface Data {
  init: (config: FirebaseConfig) => void
  app: FirebaseApp | null
}

const FirebaseContext = createContext({
  init: () => null,
  app: null
} as Data)

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [app, setApp] = useState<FirebaseApp | null>(null)

  function init(config: FirebaseConfig) {
    setApp(initializeApp(config))
  }

  const value = {
    init,
    app
  }

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(FirebaseContext)