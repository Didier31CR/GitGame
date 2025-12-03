import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getUserProgress, getLeaderboard } from '../lib/supabase'
import { GAME_LEVELS } from '../lib/levels'
import './Leaderboard.css'

export default function Leaderboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [userProgress, setUserProgress] = useState<any[]>([])
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        navigate('/auth')
        return
      }
      setUser(currentUser)

      const { data: progress } = await getUserProgress(currentUser.id)
      setUserProgress(progress || [])

      const { data: leaders } = await getLeaderboard(10)
      setLeaderboard(leaders || [])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="leaderboard-container"><p>Cargando...</p></div>
  }

  const totalPoints = userProgress.reduce((sum, p) => sum + (p.points || 0), 0)
  const levelsCompleted = userProgress.filter(p => p.completed).length
  const medals = GAME_LEVELS.filter((level, idx) => 
    userProgress.some(p => p.levelId === level.id && p.completed)
  ).map(level => level.medal)

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-content">
        <h1>🏆 Puntuaciones</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Tu Puntuación</h3>
            <p className="big-number">{totalPoints}</p>
          </div>
          <div className="stat-card">
            <h3>Niveles Completados</h3>
            <p className="big-number">{levelsCompleted}/{GAME_LEVELS.length}</p>
          </div>
          <div className="stat-card">
            <h3>Progreso</h3>
            <p className="big-number">{Math.round((levelsCompleted / GAME_LEVELS.length) * 100)}%</p>
          </div>
          <div className="stat-card">
            <h3>Medallas</h3>
            <p className="big-number">{medals.length}</p>
          </div>
        </div>

        <div className="medals-section">
          <h2>🏅 Medallas Ganadas</h2>
          <div className="medals-container">
            {medals.length > 0 ? (
              medals.map((medal, idx) => (
                <div key={idx} className="medal">{medal}</div>
              ))
            ) : (
              <p>No hay medallas ganadas aún. ¡Juega para desbloquearlas!</p>
            )}
          </div>
        </div>

        <div className="leaderboard-section">
          <h2>👥 Top 10 Jugadores</h2>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Puesto</th>
                <th>Jugador</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length > 0 ? (
                leaderboard.map((player, idx) => (
                  <tr key={player.id} className={player.id === user?.id ? 'current-user' : ''}>
                    <td className="rank">#{idx + 1}</td>
                    <td className="username">{player.username || player.email}</td>
                    <td className="points">{player.totalPoints || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No hay datos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="progress-section">
          <h2>📊 Tu Progreso por Nivel</h2>
          <div className="progress-list">
            {GAME_LEVELS.map(level => {
              const progress = userProgress.find(p => p.levelId === level.id)
              return (
                <div key={level.id} className="progress-item">
                  <div className="level-info">
                    <span className="level-number">Nivel {level.id}</span>
                    <span className="level-title">{level.title}</span>
                  </div>
                  <div className="level-status">
                    {progress ? (
                      <>
                        <span className="completed">✓ Completado</span>
                        <span className="points">{progress.points} pts</span>
                      </>
                    ) : (
                      <span className="incomplete">○ No completado</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <button className="btn-back" onClick={() => navigate('/')}>
          ← Volver
        </button>
      </div>
    </div>
  )
}
