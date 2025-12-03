import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../lib/supabase'
import './Auth.css'

interface AuthProps {
  onAuthSuccess: () => void
}

export default function Auth({ onAuthSuccess }: AuthProps) {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      if (isSignUp) {
        if (!username.trim()) {
          setError('El nombre de usuario es requerido')
          setLoading(false)
          return
        }
        console.log('Starting signup with:', { email, username })
        const { data, error: err } = await signUp(email, password, username)
        if (err) {
          console.error('Full signup error:', err)
          const errorMsg = err?.message || 'Error al crear la cuenta'
          setError(errorMsg)
          return
        }
        console.log('Signup successful:', data)
        setMessage('¡Cuenta creada exitosamente! Redirigiendo...')
        setEmail('')
        setPassword('')
        setUsername('')
        // Espera a que onAuthSuccess termine antes de navegar
        setTimeout(async () => {
          await onAuthSuccess()
          navigate('/juego')
        }, 1000)
      } else {
        console.log('Starting signin with:', { email })
        const { data, error: err } = await signIn(email, password)
        if (err) {
          console.error('Signin error:', err)
          const errorMsg = err?.message || 'Credenciales inválidas'
          setError(errorMsg)
          return
        }
        console.log('Signin successful:', data)
        // Espera a que onAuthSuccess termine antes de navegar
        await onAuthSuccess()
        navigate('/juego')
      }
    } catch (err: any) {
      console.error('Unexpected auth error:', err)
      setError(err?.message || 'Error inesperado en la autenticación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🎮 GitGame</h1>
        <h2>{isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>

        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="username">Nombre de Usuario</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu nombre de usuario"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading}
          >
            {loading 
              ? (isSignUp ? 'Creando cuenta...' : 'Iniciando sesión...') 
              : (isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión')
            }
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
            {' '}
            <button 
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
                setMessage('')
              }}
              className="toggle-btn"
            >
              {isSignUp ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </p>
        </div>

        <button 
          className="btn-back"
          onClick={() => navigate('/')}
        >
          ← Volver
        </button>
      </div>
    </div>
  )
}
