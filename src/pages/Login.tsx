import { useEffect, useState } from "react"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useAuth } from "../context/authContext"

export default function Login() {
  const [error, setError] = useState<string | null>(null)
  const { currentUser, auth } = useAuth()

  useEffect(() => {
    if (!auth) return

    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(() => {
        setError(null)
      }).catch((error) => {
        setError(error.message)
      })
  }, [auth])


  return (
    <div>
      <h1>Login {currentUser?.email}</h1>
      <div>{error}</div>
    </div>
  )
}