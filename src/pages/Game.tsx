import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GAME_LEVELS, verifyCommand } from '../lib/levels'
import { saveGameProgress, supabase } from '../lib/supabase'
import './Game.css'

export default function Game() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [command, setCommand] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' })
  const [showHint, setShowHint] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showNextButton, setShowNextButton] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())

  useEffect(() => {
    // Obtiene el usuario actual de Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
      }
    })
    setStartTime(Date.now())
  }, [])

  const currentLevel = GAME_LEVELS[currentLevelIndex]
  const isLastLevel = currentLevelIndex === GAME_LEVELS.length - 1

  const handleVerify = async () => {
    setLoading(true)
    const isCorrect = verifyCommand(command, currentLevel.correctCommands)

    if (isCorrect) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      const points = currentLevel.points - (timeSpent > 60 ? 5 : 0) + (showHint ? 0 : 5)
      
      setTotalPoints(prev => prev + points)
      setFeedback({
        type: 'success',
        message: `✅ ¡Correcto! +${points} puntos | ${currentLevel.medal}`
      })

      if (user) {
        await saveGameProgress(
          user.id,
          currentLevel.id,
          points,
          timeSpent,
          showHint
        )
      }

      setShowNextButton(true)
    } else {
      setFeedback({
        type: 'error',
        message: '❌ Ese no es el comando correcto. Intenta de nuevo.'
      })
    }
    setLoading(false)
  }

  const handleNext = () => {
    if (isLastLevel) {
      alert('🎉 ¡Completaste todos los niveles! ¡Felicidades!')
      navigate('/puntuacion')
    } else {
      setCurrentLevelIndex(prev => prev + 1)
      setCommand('')
      setShowHint(false)
      setFeedback({ type: '', message: '' })
      setShowNextButton(false)
      setStartTime(Date.now())
    }
  }

  const handleSkip = () => {
    if (confirm('¿Seguro que quieres saltar este nivel?')) {
      handleNext()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showNextButton) {
      handleVerify()
    }
  }

  return (
    <div className="game-container">
      <div className="game-content">
        <div className="game-header">
          <h2>Nivel {currentLevelIndex + 1}</h2>
          <div className="game-stats">
            <span>Puntos: <strong>{totalPoints}</strong></span>
            <span>Progreso: <strong>{currentLevelIndex + 1}</strong>/{GAME_LEVELS.length}</span>
          </div>
        </div>

        <div className="challenge-box">
          <h3>{currentLevel.title}</h3>
          <p className="description">{currentLevel.description}</p>
          
          <div className="scenario-box">
            <p><strong>📋 Escenario:</strong></p>
            <p>{currentLevel.scenario}</p>
          </div>

          <div className="hint-section">
            <button 
              className="btn-hint"
              onClick={() => setShowHint(!showHint)}
            >
              💡 {showHint ? 'Ocultar' : 'Ver'} Pista
            </button>
            {showHint && (
              <div className="hint-box">
                <p>{currentLevel.hint}</p>
              </div>
            )}
          </div>
        </div>

        <div className="input-section">
          <label htmlFor="command-input"><strong>Ingresa el comando Git:</strong></label>
          <input
            id="command-input"
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="git ..."
            disabled={showNextButton}
          />
          {!showNextButton && (
            <button 
              className="btn-verify"
              onClick={handleVerify}
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Verificar'}
            </button>
          )}
        </div>

        {feedback.message && (
          <div className={`feedback-box feedback-${feedback.type}`}>
            {feedback.message}
          </div>
        )}

        {showNextButton && (
          <div className="action-buttons">
            <button className="btn-next" onClick={handleNext}>
              {isLastLevel ? '🏁 Finalizar' : 'Siguiente Nivel →'}
            </button>
            <button className="btn-skip" onClick={handleSkip}>
              Saltar
            </button>
            <button className="btn-back" onClick={() => navigate('/')}>
              Volver
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
