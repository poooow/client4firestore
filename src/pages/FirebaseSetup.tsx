import { useState } from 'react'
import { useFirebase } from '../context/firebaseContext'

const FirebaseSetup = () => {
  const [config, setConfig] = useState({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  })

  const { init } = useFirebase()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    })
  }

  // Initialize Firebase with user config
  const handleInitialize = () => {
    try {
      init(config)
    } catch (error) {
      console.error('Error initializing Firebase app:', error)
    }
  }

  return (
    <div>
      <h2>Enter Firebase Config</h2>
      <form>
        <div>
          <label>API Key:</label>
          <input type="text" name="apiKey" value={config.apiKey} onChange={handleChange} />
        </div>
        <div>
          <label>Auth Domain:</label>
          <input type="text" name="authDomain" value={config.authDomain} onChange={handleChange} />
        </div>
        <div>
          <label>Project ID:</label>
          <input type="text" name="projectId" value={config.projectId} onChange={handleChange} />
        </div>
        <div>
          <label>Storage Bucket:</label>
          <input type="text" name="storageBucket" value={config.storageBucket} onChange={handleChange} />
        </div>
        <div>
          <label>Messaging Sender ID:</label>
          <input type="text" name="messagingSenderId" value={config.messagingSenderId} onChange={handleChange} />
        </div>
        <div>
          <label>App ID:</label>
          <input type="text" name="appId" value={config.appId} onChange={handleChange} />
        </div>
      </form>
      <button onClick={handleInitialize}>Initialize Firebase</button>
    </div>
  )
}

export default FirebaseSetup