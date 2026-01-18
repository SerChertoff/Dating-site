'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { User } from '@/types'
import { sampleUsers } from '@/data/sampleData'

interface MatchesSectionProps {
  currentUser: User | null
  onViewProfile: (user: User) => void
  onLoginRequired: () => void
}

export default function MatchesSection({
  currentUser,
  onViewProfile,
  onLoginRequired,
}: MatchesSectionProps) {
  const [displayedMatches, setDisplayedMatches] = useState(4)
  const [genderFilter, setGenderFilter] = useState('all')
  const [ageFilter, setAgeFilter] = useState('all')
  const [distanceFilter, setDistanceFilter] = useState('all')
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  useEffect(() => {
    let users = sampleUsers.filter(
      (user) => !currentUser || user.id !== currentUser.id
    )

    // Фильтр по полу
    if (genderFilter !== 'all') {
      users = users.filter((user) => user.gender === genderFilter)
    }

    // Фильтр по возрасту
    if (ageFilter !== 'all') {
      const [min, max] = ageFilter.split('-').map(Number)
      if (max) {
        users = users.filter((user) => user.age >= min && user.age <= max)
      } else {
        users = users.filter((user) => user.age >= min)
      }
    }

    setFilteredUsers(users)
  }, [genderFilter, ageFilter, distanceFilter, currentUser])

  const handleLike = (userId: number) => {
    if (!currentUser) {
      onLoginRequired()
      return
    }
    const user = sampleUsers.find((u) => u.id === userId)
    if (user) {
      alert(`Вы поставили лайк ${user.name}!`)
    }
  }

  const handleLoadMore = () => {
    setDisplayedMatches((prev) => prev + 2)
  }

  const usersToShow = filteredUsers.slice(0, displayedMatches)

  return (
    <section id="matches-section" className="active-section">
      <div className="container">
        <h2>Ваши потенциальные пары</h2>
        <div className="filter-options">
          <select
            id="gender-filter"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="all">Все полы</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
            <option value="other">Другое</option>
          </select>
          <select
            id="age-filter"
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
          >
            <option value="all">Все возрасты</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-45">36-45</option>
            <option value="46">46+</option>
          </select>
          <select
            id="distance-filter"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
          >
            <option value="all">Любое расстояние</option>
            <option value="10">До 10 км</option>
            <option value="25">До 25 км</option>
            <option value="50">До 50 км</option>
          </select>
        </div>
        <div className="matches-grid" id="matches-container" role="list" aria-label="Potential matches">
          {usersToShow.map((user) => (
            <article
              key={user.id}
              className="match-card"
              role="listitem"
              onClick={() => onViewProfile(user)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onViewProfile(user)
                }
              }}
              tabIndex={0}
              aria-label={`Профиль ${user.name}, ${user.age} лет, ${user.location}`}
            >
              <Image
                src={user.photo}
                alt={`Фото профиля ${user.name}, ${user.age} лет, ${user.location}`}
                width={250}
                height={200}
                className="match-img"
                loading="lazy"
              />
              <div className="match-info">
                <div className="match-name-age">
                  <span className="match-name">{user.name}</span>
                  <span className="match-age">{user.age}</span>
                </div>
                <div className="match-location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{user.location}</span>
                </div>
                <div className="match-actions">
                  <button
                    type="button"
                    className="match-btn like-btn"
                    aria-label={`Поставить лайк ${user.name}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLike(user.id)
                    }}
                  >
                    <i className="fas fa-heart" aria-hidden="true"></i> Нравится
                  </button>
                  <button
                    type="button"
                    className="match-btn message-btn"
                    aria-label={`Написать сообщение ${user.name}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewProfile(user)
                    }}
                  >
                    <i className="fas fa-envelope" aria-hidden="true"></i> Сообщение
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {displayedMatches < filteredUsers.length && (
          <div className="load-more">
            <button
              id="load-more-btn"
              type="button"
              aria-label="Загрузить больше потенциальных пар"
              onClick={handleLoadMore}
            >
              Загрузить еще
            </button>
          </div>
        )}
        {displayedMatches >= filteredUsers.length && filteredUsers.length > 0 && (
          <div className="load-more">
            <button id="load-more-btn" type="button" disabled aria-label="Все пары загружены">
              Больше нет пар
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
