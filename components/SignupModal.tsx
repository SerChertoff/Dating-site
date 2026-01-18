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
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>
          &times;
        </span>
        <h2>Создайте профиль HeartMatch</h2>
        <form id="signup-form" onSubmit={handleSubmit}>
          {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
          <div className="form-group">
            <label htmlFor="signup-name">Полное имя</label>
            <input
              type="text"
              id="signup-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input
              type="email"
              id="signup-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-password">Пароль</label>
            <input
              type="password"
              id="signup-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
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
              value={formData.birthdate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-location">Местоположение</label>
            <input
              type="text"
              id="signup-location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Создать аккаунт
          </button>
        </form>
        <div className="auth-links">
          <p>
            Уже есть аккаунт?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onShowLogin() }}>
              Войти
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
