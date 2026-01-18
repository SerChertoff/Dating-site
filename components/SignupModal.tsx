'use client'

import { useState, FormEvent } from 'react'
import { User } from '@/types'

interface SignupModalProps {
  onClose: () => void
  onSignup: (user: User) => void
  onShowLogin: () => void
}

export default function SignupModal({ onClose, onSignup, onShowLogin }: SignupModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    birthdate: '',
    location: '',
  })
  const [error, setError] = useState('')

  const calculateAge = (birthdate: Date): number => {
    const diff = Date.now() - birthdate.getTime()
    const ageDate = new Date(diff)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    const { name, email, password, gender, birthdate, location } = formData

    if (!name || !email || !password || !gender || !birthdate || !location) {
      setError('Пожалуйста, заполните все поля')
      return
    }

    // Проверка существующего пользователя
    if (typeof window !== 'undefined') {
      const users = JSON.parse(localStorage.getItem('datingAppUsers') || '[]')
      const existingUser = users.find((u: User) => u.email === email)

      if (existingUser) {
        setError('Пользователь с таким email уже существует')
        return
      }

      // Расчет возраста из даты рождения
      const age = calculateAge(new Date(birthdate))

      // Создание объекта пользователя
      const user: User = {
        id: Date.now(),
        name,
        email,
        password, // В реальном приложении пароль хешировался бы
        gender: gender as 'male' | 'female' | 'other',
        age,
        location,
        photo: `https://randomuser.me/api/portraits/${
          gender === 'female' ? 'women' : 'men'
        }/${Math.floor(Math.random() * 100)}.jpg`,
        about: 'Отредактируйте профиль, чтобы добавить информацию о себе.',
        interests: [],
        lookingFor: 'Не указано',
        ageRange: 'Не указано',
        distance: 'Не указано',
        matches: 0,
        conversations: 0,
      }

      onSignup(user)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div
      className="modal active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-modal-title"
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-modal"
          type="button"
          aria-label="Закрыть окно регистрации"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 id="signup-modal-title">Создайте профиль HeartMatch</h2>
        <form id="signup-form" onSubmit={handleSubmit} noValidate>
          {error && (
            <div role="alert" aria-live="polite" style={{ color: 'red', marginBottom: '15px' }}>
              {error}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="signup-name">Полное имя</label>
            <input
              type="text"
              id="signup-name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input
              type="email"
              id="signup-email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-password">Пароль</label>
            <input
              type="password"
              id="signup-password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-gender">Пол</label>
            <select
              id="signup-gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
            >
              <option value="">Выберите</option>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
              <option value="other">Другое</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="signup-birthdate">Дата рождения</label>
            <input
              type="date"
              id="signup-birthdate"
              name="birthdate"
              autoComplete="bday"
              value={formData.birthdate}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-location">Местоположение</label>
            <input
              type="text"
              id="signup-location"
              name="location"
              autoComplete="address-level2"
              value={formData.location}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>
          <button type="submit" className="submit-btn" aria-label="Создать новый аккаунт">
            Создать аккаунт
          </button>
        </form>
        <div className="auth-links">
          <p>
            Уже есть аккаунт?{' '}
            <a
              href="#login"
              onClick={(e) => {
                e.preventDefault()
                onShowLogin()
              }}
              aria-label="Перейти к входу"
            >
              Войти
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
