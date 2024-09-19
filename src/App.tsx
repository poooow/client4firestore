import { Routes, Route, BrowserRouter } from 'react-router-dom'
import FirebaseSetup from './pages/FirebaseSetup'
import Login from './pages/Login'
import QueryBuilder from './pages/QueryBuilder'
import { useFirebase } from './context/firebaseContext'
import { useAuth } from './context/authContext'

function App() {
  const { app } = useFirebase()
  const { currentUser } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={app ? currentUser ? <QueryBuilder /> : <Login /> : <FirebaseSetup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
