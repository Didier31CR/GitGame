import { GAME_LEVELS } from '../lib/levels'
import { LEVEL_THEORY } from '../lib/tutorials'
import './Tutorial.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Tutorial() {
  const navigate = useNavigate()
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)

  const selectedTheory = selectedLevel ? LEVEL_THEORY[selectedLevel as keyof typeof LEVEL_THEORY] : null

  return (
    <div className="tutorial-container">
      <div className="tutorial-content">
        <h1>📖 Tutorial Completo de Git</h1>
        <p className="intro">Domina Git con 80 lecciones progresivas de teoría y práctica</p>

        {selectedTheory && (
          <div className="theory-panel">
            <button className="close-theory" onClick={() => setSelectedLevel(null)}>✕</button>
            <h2>{selectedTheory.title}</h2>
            <div className="theory-content">
              <section className="theory-section">
                <h3>📚 Teoría</h3>
                <p>{selectedTheory.theory}</p>
              </section>

              {selectedTheory.examples && (
                <section className="examples-section">
                  <h3>💻 Ejemplos Prácticos</h3>
                  {selectedTheory.examples.map((ex) => (
                    <div key={ex.step} className="example-step">
                      <div className="step-number">Paso {ex.step}</div>
                      <p className="step-description">{ex.description}</p>
                      <code className="command">{ex.command}</code>
                      <div className="output">
                        <p className="output-label">Resultado:</p>
                        <pre>{ex.output}</pre>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {selectedTheory.whyImportant && (
                <section className="importance-section">
                  <h3>⭐ ¿Por Qué es Importante?</h3>
                  <p>{selectedTheory.whyImportant}</p>
                </section>
              )}
            </div>
          </div>
        )}

        <div className="levels-grid">
          {GAME_LEVELS.map((level, index) => (
            <div 
              key={level.id} 
              className={`tutorial-card ${selectedTheory?.title === LEVEL_THEORY[level.id as keyof typeof LEVEL_THEORY]?.title ? 'active' : ''}`}
              onClick={() => setSelectedLevel(level.id)}
            >
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
              
              {LEVEL_THEORY[level.id as keyof typeof LEVEL_THEORY] && (
                <div className="has-theory">📖 Lección disponible</div>
              )}
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
