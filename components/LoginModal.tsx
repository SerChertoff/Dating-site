'use client'

import { useState, FormEvent } from 'react'
import { User } from '@/types'

interface LoginModalProps {
  onClose: () => void
  onLogin: (user: User) => void
  onShowSignup: () => void
}

export default function LoginModal({ onClose, onLogin, onShowSignup }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Пожалуйста, введите email и пароль')
      return
    }

    // Проверка пользователя в localStorage
    if (typeof window !== 'undefined') {
      const users = JSON.parse(localStorage.getItem('datingAppUsers') || '[]')
      const user = users.find(
        (u: User) => u.email === email && u.password === password
      )

      if (user) {
        // Удаляем пароль перед передачей
        const { password: _, ...userWithoutPassword } = user
        onLogin(userWithoutPassword as User)
      } else {
        setError('Неверный email или пароль')
      }
    }
  }

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>
          &times;
        </span>
        <h2>Вход в HeartMatch</h2>
        <form id="login-form" onSubmit={handleSubmit}>
          {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Пароль</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Войти
          </button>
        </form>
        <div className="auth-links">
          <a href="#" onClick={(e) => { e.preventDefault(); alert('Функция восстановления пароля в разработке') }}>
            Забыли пароль?
          </a>
          <p>
            Нет аккаунта?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onShowSignup() }}>
              Зарегистрироваться
            </a>
          </p>
        </div>
        <div className="social-login">
          <p>Или войдите через:</p>
          <div className="social-buttons">
            <button
              className="social-btn facebook"
              onClick={() => alert('Вход через Facebook в разработке')}
            >
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
            <button
              className="social-btn google"
              onClick={() => alert('Вход через Google в разработке')}
            >
              <i className="fab fa-google"></i> Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
