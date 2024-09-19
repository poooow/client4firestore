import { FormEvent, useState } from 'react'
import { useAuth } from '../context/authContext'
import { useDb } from '../context/dbContext'
import { DocumentData } from 'firebase/firestore/lite'

export default function QueryBuilder() {
  const { currentUser } = useAuth()
  const { getCollection } = useDb()
  const [collectionName, setCollectionName] = useState<string | null>(null)
  const [collection, setCollection] = useState<DocumentData[]>()

  async function getCollectionByName(e: FormEvent<HTMLFormElement>, collectionName: string) {
    e.preventDefault()
    const col = await getCollection(collectionName)
    setCollection(col)
  }

  function tableFromCollection(collection: DocumentData[]) {
    if (!collection.length) return <></>
    const tableRows = collection.map(document => (
      <tr key={document.id}>
        <td>{document.id}</td>{Object.keys(document).sort().map(key => <td key={document.id + key}>{key + JSON.stringify(document[key]).substring(0, 10)}</td>)}
      </tr>
    ))

    return (
      <table>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h1>QueryBuilder {currentUser?.email}</h1>
      <form onSubmit={(e) => getCollectionByName(e, collectionName || '')}>
        Collection name: <input type="text" onChange={(e) => setCollectionName(e.target.value)} /> <button type="submit">Get collection</button>
      </form>
      <div>{tableFromCollection(collection || [])}</div>
    </div>
  )
}