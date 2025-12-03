import './Home.css'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/juego')
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
          Comenzar Juego
        </button>
      </div>
    </div>
  )
}
