import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import * as authService from '../services/authService.js'

// FRONTEND-ONLY demo authentication. No real account security, sessions, or
// persistent backend authentication is implemented. Real authentication will
// be added with the FastAPI backend in a later phase.

const AuthContext = createContext(null)

const STORAGE_KEY = 'uf_demo_auth'

function readStoredSession() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredSession()?.user || null)
  const [loading, setLoading] = useState(false)

  const persist = useCallback((session) => {
    if (session) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const login = useCallback(async (credentials) => {
    setLoading(true)
    try {
      const session = await authService.login(credentials)
      persist(session)
      setUser(session.user)
      return session.user
    } finally {
      setLoading(false)
    }
  }, [persist])

  const register = useCallback(async (payload) => {
    setLoading(true)
    try {
      const session = await authService.register(payload)
      persist(session)
      setUser(session.user)
      return session.user
    } finally {
      setLoading(false)
    }
  }, [persist])

  const signOut = useCallback(() => {
    persist(null)
    setUser(null)
  }, [persist])

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: Boolean(user), login, register, signOut }),
    [user, loading, login, register, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
