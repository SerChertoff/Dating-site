'use client'

import { User } from '@/types'

interface ProfileSectionProps {
  currentUser: User | null
  onLoginRequired: () => void
}

export default function ProfileSection({ currentUser, onLoginRequired }: ProfileSectionProps) {
  if (!currentUser) {
    return (
      <section id="profile-section" className="active-section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '50px 20px' }}>
            <h2>Войдите, чтобы просматривать профиль</h2>
            <p>Пожалуйста, войдите в систему, чтобы видеть свой профиль.</p>
            <button
              className="cta-button"
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
    <section id="profile-section" className="active-section">
      <div className="container">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-photo">
              <img src={currentUser.photo} alt="Profile Photo" id="profile-img" />
              <button id="change-photo-btn">Изменить фото</button>
            </div>
            <div className="profile-info">
              <h2 id="profile-name">{currentUser.name}</h2>
              <p id="profile-age-location">
                {currentUser.age} • {currentUser.location}
              </p>
              <div className="profile-stats">
                <div className="stat">
                  <span id="profile-matches">{currentUser.matches || 0}</span>
                  <span>Пары</span>
                </div>
                <div className="stat">
                  <span id="profile-conversations">{currentUser.conversations || 0}</span>
                  <span>Диалоги</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-section">
              <h3>О себе</h3>
              <p id="profile-about">{currentUser.about}</p>
            </div>

            <div className="detail-section">
              <h3>Интересы</h3>
              <div className="interests" id="profile-interests">
                {currentUser.interests && currentUser.interests.length > 0 ? (
                  currentUser.interests.map((interest, index) => (
                    <div key={index} className="interest-tag">
                      {interest}
                    </div>
                  ))
                ) : (
                  <p>Интересы пока не добавлены.</p>
                )}
              </div>
            </div>

            <div className="detail-section">
              <h3>Предпочтения</h3>
              <div className="preferences">
                <div className="preference">
                  <span>Ищу:</span>
                  <span id="profile-looking-for">{currentUser.lookingFor}</span>
                </div>
                <div className="preference">
                  <span>Возрастной диапазон:</span>
                  <span id="profile-age-range">{currentUser.ageRange}</span>
                </div>
                <div className="preference">
                  <span>Расстояние:</span>
                  <span id="profile-distance">{currentUser.distance}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button id="edit-profile-btn">Редактировать профиль</button>
            <button id="premium-btn">Перейти на Premium</button>
          </div>
        </div>
      </div>
    </section>
  )
}
