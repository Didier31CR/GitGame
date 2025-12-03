import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase, getUserProfile } from '../lib/supabase'

interface AuthContextType {
  user: any
  username: string
  loading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [username, setUsername] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    let hasInitialized = false

    // Timeout de seguridad
    const timeoutId = setTimeout(() => {
      if (isMounted && !hasInitialized) {
        setLoading(false)
      }
    }, 3000)

    // Solo usa el listener, sin getSession
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return

        hasInitialized = true
        clearTimeout(timeoutId)

        if (session?.user) {
          setUser(session.user)
          
          // Usa el email como username por ahora (más rápido que consultar la BD)
          const displayName = session.user.email?.split('@')[0] || session.user.email || ''
          setUsername(displayName)
        } else {
          setUser(null)
          setUsername('')
        }
        
        if (isMounted) {
          setLoading(false)
        }
      }
    )

    return () => {
      isMounted = false
      subscription?.unsubscribe()
      clearTimeout(timeoutId)
    }
  }, [])

  const logout = () => {
    setUser(null)
    setUsername('')
  }

  return (
    <AuthContext.Provider value={{ user, username, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
