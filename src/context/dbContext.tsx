import { createContext, useContext, useEffect, useState } from 'react'
import { getFirestore, collection, query, limit, type DocumentData, type Firestore, getDocs } from 'firebase/firestore'
import { useFirebase } from './firebaseContext'

interface Data {
  getCollection: (collectionName: string) => Promise<DocumentData[] | []>
}

const DbContext = createContext({
  getCollection: () => [],
} as unknown as Data)

export function DbProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<Firestore | null>(null)
  const { app } = useFirebase()

  useEffect(() => {
    if (!app) return
    setDb(getFirestore())
  }, [app])

  async function getCollection(collectionName: string) {
    if (!db) return []
    const coll = collection(db, collectionName)
    const q = query(coll, limit(10))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return data
  }

  const value = {
    getCollection
  }

  return (
    <DbContext.Provider value={value}>
      {children}
    </DbContext.Provider>
  )
}

export const useDb = () => useContext(DbContext)
