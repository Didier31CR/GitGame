import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Navbar({ user, username, onLogout }: any) {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await signOut()
    logout()
    navigate('/')
    setLoading(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <span className="brand-icon">🎮</span>
          <span className="brand-text">GitGame</span>
        </div>

        <div className="navbar-menu">
          <a href="#/" onClick={() => navigate('/')}>Inicio</a>
          <a href="#/juego" onClick={() => navigate('/juego')}>Jugar</a>
          <a href="#/tutorial" onClick={() => navigate('/tutorial')}>Tutorial</a>
          <a href="#/puntuacion" onClick={() => navigate('/puntuacion')}>Puntuación</a>
        </div>

        <div className="navbar-user">
          {user && (
            <>
              <span className="user-email">{username}</span>
              <button 
                className="btn-logout" 
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? 'Cerrando...' : 'Cerrar Sesión'}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
