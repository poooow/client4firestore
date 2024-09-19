import { FormEvent, useState } from 'react'
import { useAuth } from '../context/authContext'
import { useDb } from '../context/dbContext'
import { type DocumentData } from 'firebase/firestore/lite'
import './QueryBuilder.styles.css'

export default function QueryBuilder() {
  const { currentUser } = useAuth()
  const { getCollection } = useDb()
  const [collectionName, setCollectionName] = useState<string | null>(null)
  const [collectionLimit, setCollectionLimit] = useState<number>(10)
  const [maxStringLength, setMaxStringLength] = useState<number>(99)
  const [collection, setCollection] = useState<DocumentData[]>()
  const [error, setError] = useState<string | null>(null)

  async function getCollectionByName(e: FormEvent<HTMLFormElement>, collectionName: string, queryLimit: number) {
    e.preventDefault()
    try {
      setError(null)
      const col = await getCollection(collectionName, queryLimit)
      setCollection(col)
    } catch (error) {
      setError((error as Error).message)
      setCollection([])
    }    
  }

  function tableRows(data: DocumentData | string) {
    if (!data) return <em>null</em>
    if (typeof data === 'boolean') return <em>{data ? 'true' : 'false'}</em>
    if (typeof data === 'number') return data
    if (typeof data === 'string') return data.substring(0, maxStringLength)
    if (typeof data === 'object') return <table>{
      Object.keys(data).slice(0, collectionLimit)
      .filter(key=> key !== 'id')
      .map(key =>      
        <tr>
          <td key={key}>
            <strong>{key}: </strong> <span className="data-type">{typeof data[key]}</span> {tableRows(data[key])}
          </td>
        </tr>      
    )}</table>
    return <></>
  }

  function tableFromCollection(collection: DocumentData[]) {
    if (!collection.length) return <></>

    return (
      <table>
        <tbody>
          {collection.map(data => <tr>
            <td>{data.id}</td>
            <td>{tableRows(data)}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h1>QueryBuilder {currentUser?.email}</h1>
      <form onSubmit={(e) => getCollectionByName(e, collectionName || '', collectionLimit)}>
        Collection name: <input type="text" onChange={(e) => setCollectionName(e.target.value)} />
        Limit: <input type="number" defaultValue="10" onChange={(e) => setCollectionLimit(Number(e.target.value))} />
        <button type="submit">Get collection</button>
      </form>
      <div>Max string length: <input type="number" defaultValue="99" onChange={(e) => setMaxStringLength(Number(e.target.value))} /></div>
      <div>{error}</div>
      <div>{tableFromCollection(collection || [])}</div>
    </div>
  )
}