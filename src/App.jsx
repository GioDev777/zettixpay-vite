import { useState, useCallback } from 'react'
import LoginScreen from './components/LoginScreen'
import Dashboard   from './components/Dashboard'

export default function App() {
  const [session, setSession] = useState(null)

  const handleLogin  = useCallback((email, merchantId) => {
    setSession({ email, merchantId })
  }, [])

  const handleLogout = useCallback(() => {
    setSession(null)
  }, [])

  return session === null
    ? <LoginScreen onLogin={handleLogin} />
    : <Dashboard   session={session} onLogout={handleLogout} />
}
