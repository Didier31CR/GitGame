import './Home.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '../lib/supabase'

export default function Home() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  const handleStart = () => {
    if (!user) {
      navigate('/auth')
    } else {
      navigate('/juego')
    }
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🎮 GitGame</h1>
        <p className="subtitle">Aprende Git Jugando</p>
      </header>

      <div className="home-content">
        <p className="intro-text">
          Un juego interactivo para dominar los comandos de Git de forma divertida y educativa.
        </p>

        <div className="features">
          <div className="feature-card">
            <h3>📚 Aprende</h3>
            <p>Conceptos fundamentales de Git</p>
          </div>
          <div className="feature-card">
            <h3>🎯 Practica</h3>
            <p>Resuelve desafíos interactivos</p>
          </div>
          <div className="feature-card">
            <h3>🏆 Compite</h3>
            <p>Obtén puntos y medallas</p>
          </div>
        </div>

        <button className="btn-large btn-primary" onClick={handleStart}>
          {user ? 'Comenzar Juego' : 'Iniciar Sesión'}
        </button>

        {!user && (
          <p className="auth-hint">
            Necesitas iniciar sesión o crear una cuenta para jugar
          </p>
        )}
      </div>
    </div>
  )
}
