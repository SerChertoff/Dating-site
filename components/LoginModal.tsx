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
    <div
      className="modal active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-modal"
          type="button"
          aria-label="Закрыть окно входа"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 id="login-modal-title">Вход в HeartMatch</h2>
        <form id="login-form" onSubmit={handleSubmit} noValidate>
          {error && (
            <div role="alert" aria-live="polite" style={{ color: 'red', marginBottom: '15px' }}>
              {error}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Пароль</label>
            <input
              type="password"
              id="login-password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>
          <button type="submit" className="submit-btn" aria-label="Войти в аккаунт">
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
