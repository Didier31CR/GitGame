import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../lib/supabase'
import { useState } from 'react'

interface NavbarProps {
  user: any
  onLogout: () => void
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await signOut()
    onLogout()
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
              <span className="user-email">{user.email}</span>
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
