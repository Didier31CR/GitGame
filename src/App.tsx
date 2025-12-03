import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Game from './pages/Game'
import Tutorial from './pages/Tutorial'
import Leaderboard from './pages/Leaderboard'
import './App.css'

function AppContent() {
  const { user, username, loading } = useAuth()

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
        {user && <Navbar user={user} username={username} onLogout={() => {}} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth onAuthSuccess={() => {}} />} />
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

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
