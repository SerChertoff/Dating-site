'use client'

import { User } from '@/types'

interface ProfileSectionProps {
  currentUser: User | null
  onLoginRequired: () => void
}

export default function ProfileSection({ currentUser, onLoginRequired }: ProfileSectionProps) {
  if (!currentUser) {
    return (
      <section id="profile-section" className="active-section" aria-label="Profile section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '50px 20px' }}>
            <h2>Войдите, чтобы просматривать профиль</h2>
            <p>Пожалуйста, войдите в систему, чтобы видеть свой профиль.</p>
            <button
              type="button"
              className="cta-button"
              aria-label="Войти в аккаунт для просмотра профиля"
              onClick={onLoginRequired}
              style={{ marginTop: '20px' }}
            >
              Войти
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="profile-section" className="active-section" aria-label="Profile section">
      <div className="container">
        <article className="profile-container">
          <div className="profile-header">
            <div className="profile-photo">
              <img
                src={currentUser.photo}
                alt={`Фото профиля ${currentUser.name}`}
                id="profile-img"
                width={150}
                height={150}
              />
              <button
                id="change-photo-btn"
                type="button"
                aria-label="Изменить фото профиля"
              >
                Изменить фото
              </button>
            </div>
            <div className="profile-info">
              <h1 id="profile-name">{currentUser.name}</h1>
              <p id="profile-age-location">
                {currentUser.age} • {currentUser.location}
              </p>
              <div className="profile-stats" role="group" aria-label="Profile statistics">
                <div className="stat">
                  <span id="profile-matches" aria-label={`${currentUser.matches || 0} пар`}>
                    {currentUser.matches || 0}
                  </span>
                  <span>Пары</span>
                </div>
                <div className="stat">
                  <span id="profile-conversations" aria-label={`${currentUser.conversations || 0} диалогов`}>
                    {currentUser.conversations || 0}
                  </span>
                  <span>Диалоги</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-details">
            <section className="detail-section" aria-labelledby="about-heading">
              <h3 id="about-heading">О себе</h3>
              <p id="profile-about">{currentUser.about}</p>
            </section>

            <section className="detail-section" aria-labelledby="interests-heading">
              <h3 id="interests-heading">Интересы</h3>
              <div className="interests" id="profile-interests" role="list">
                {currentUser.interests && currentUser.interests.length > 0 ? (
                  currentUser.interests.map((interest, index) => (
                    <div key={index} className="interest-tag" role="listitem">
                      {interest}
                    </div>
                  ))
                ) : (
                  <p>Интересы пока не добавлены.</p>
                )}
              </div>
            </section>

            <section className="detail-section" aria-labelledby="preferences-heading">
              <h3 id="preferences-heading">Предпочтения</h3>
              <dl className="preferences">
                <div className="preference">
                  <dt>Ищу:</dt>
                  <dd id="profile-looking-for">{currentUser.lookingFor}</dd>
                </div>
                <div className="preference">
                  <dt>Возрастной диапазон:</dt>
                  <dd id="profile-age-range">{currentUser.ageRange}</dd>
                </div>
                <div className="preference">
                  <dt>Расстояние:</dt>
                  <dd id="profile-distance">{currentUser.distance}</dd>
                </div>
              </dl>
            </section>
          </div>

          <div className="profile-actions" role="group" aria-label="Profile actions">
            <button
              id="edit-profile-btn"
              type="button"
              aria-label="Редактировать профиль"
            >
              Редактировать профиль
            </button>
            <button
              id="premium-btn"
              type="button"
              aria-label="Перейти на Premium подписку"
            >
              Перейти на Premium
            </button>
          </div>
        </article>
      </div>
    </section>
  )
}
