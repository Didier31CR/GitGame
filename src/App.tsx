import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getCurrentUser, supabase } from './lib/supabase'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Game from './pages/Game'
import Tutorial from './pages/Tutorial'
import Leaderboard from './pages/Leaderboard'
import './App.css'

export default function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
    
    // Escucha cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const checkUser = async () => {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const handleAuthSuccess = async () => {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Cargando GitGame...</p>
      </div>
    )
  }

  return (
    <Router>
      <div className="app">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
          <Route 
            path="/juego" 
            element={user ? <Game /> : <Navigate to="/auth" />}
          />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route 
            path="/puntuacion" 
            element={user ? <Leaderboard /> : <Navigate to="/auth" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}
