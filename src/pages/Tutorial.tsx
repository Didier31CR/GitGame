import { GAME_LEVELS } from '../lib/levels'
import './Tutorial.css'
import { useNavigate } from 'react-router-dom'

export default function Tutorial() {
  const navigate = useNavigate()

  return (
    <div className="tutorial-container">
      <div className="tutorial-content">
        <h1>📖 Tutorial de Git</h1>
        <p className="intro">Aprende los comandos esenciales de Git para dominar el control de versiones</p>

        <div className="levels-grid">
          {GAME_LEVELS.map((level, index) => (
            <div key={level.id} className="tutorial-card">
              <div className="card-number">{index + 1}</div>
              <h3>{level.title}</h3>
              <p className="card-description">{level.description}</p>
              
              <div className="commands">
                <p><strong>Comando(s):</strong></p>
                <code>{level.correctCommands[0]}</code>
                {level.correctCommands.length > 1 && (
                  <p className="alternatives">+ {level.correctCommands.length - 1} alternativa(s)</p>
                )}
              </div>

              <div className="scenario-info">
                <p><strong>Escenario:</strong></p>
                <p>{level.scenario}</p>
              </div>

              <div className="hint-info">
                <p><strong>Pista:</strong></p>
                <p>{level.hint}</p>
              </div>

              <div className="footer-card">
                <span className="medal">{level.medal}</span>
                <span className="points">+{level.points} pts</span>
              </div>
            </div>
          ))}
        </div>

        <div className="tips-section">
          <h2>💡 Consejos para Aprender</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>1. Practica Regularmente</h4>
              <p>Dedica tiempo diario a jugar y reforzar tu conocimiento</p>
            </div>
            <div className="tip-card">
              <h4>2. Experimenta</h4>
              <p>Crea repositorios de prueba y prueba los comandos</p>
            </div>
            <div className="tip-card">
              <h4>4. Lee Documentación</h4>
              <p>Consulta la documentación oficial de Git para profundizar</p>
            </div>
            <div className="tip-card">
              <h4>4. Enseña a Otros</h4>
              <p>Explicar conceptos ayuda a solidificar tu aprendizaje</p>
            </div>
          </div>
        </div>

        <div className="additional-commands">
          <h2>📚 Comandos Adicionales para Explorar</h2>
          <div className="command-list">
            <div className="command-item">
              <code>git clone</code>
              <p>Clonar un repositorio remoto</p>
            </div>
            <div className="command-item">
              <code>git branch -d</code>
              <p>Eliminar una rama</p>
            </div>
            <div className="command-item">
              <code>git rebase</code>
              <p>Reorganizar commits</p>
            </div>
            <div className="command-item">
              <code>git stash</code>
              <p>Guardar cambios temporalmente</p>
            </div>
            <div className="command-item">
              <code>git tag</code>
              <p>Crear etiquetas</p>
            </div>
            <div className="command-item">
              <code>git reset</code>
              <p>Deshacer cambios</p>
            </div>
          </div>
        </div>

        <button className="btn-back" onClick={() => navigate('/')}>
          ← Volver
        </button>
      </div>
    </div>
  )
}
