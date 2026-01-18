'use client'

import { User } from '@/types'

interface ProfileViewModalProps {
  user: User
  currentUser: User | null
  onClose: () => void
  onStartConversation: () => void
  onLoginRequired: () => void
}

export default function ProfileViewModal({
  user,
  currentUser,
  onClose,
  onStartConversation,
  onLoginRequired,
}: ProfileViewModalProps) {
  const handleLike = () => {
    if (!currentUser) {
      onLoginRequired()
      return
    }
    alert(`Вы поставили лайк ${user.name}!`)
  }

  const handleMessage = () => {
    if (!currentUser) {
      onLoginRequired()
      return
    }
    onStartConversation()
  }

  // Простой расчет совместимости (в реальном приложении был бы более сложный алгоритм)
  const compatibility = Math.floor(Math.random() * 30) + 70 // 70-100%

  return (
    <div
      className="modal active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-view-title"
      onClick={onClose}
    >
      <div className="modal-content profile-view" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-modal"
          type="button"
          aria-label="Закрыть просмотр профиля"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="profile-view-header">
          <div className="profile-view-photo">
            <img
              src={user.photo}
              alt={`Фото профиля ${user.name}`}
              id="view-profile-img"
              width={200}
              height={200}
            />
          </div>
          <div className="profile-view-info">
            <h2 id="profile-view-title">{user.name}</h2>
            <p id="view-profile-age-location">
              {user.age} • {user.location}
            </p>
            <div className="profile-view-actions" role="group" aria-label="Profile actions">
              <button
                type="button"
                className="like-btn"
                id="profile-like-btn"
                aria-label={`Поставить лайк ${user.name}`}
                onClick={handleLike}
              >
                <i className="fas fa-heart" aria-hidden="true"></i> Нравится
              </button>
              <button
                type="button"
                className="message-btn"
                id="profile-message-btn"
                aria-label={`Написать сообщение ${user.name}`}
                onClick={handleMessage}
              >
                <i className="fas fa-envelope" aria-hidden="true"></i> Сообщение
              </button>
            </div>
          </div>
        </div>

        <div className="profile-view-details">
          <section className="detail-section" aria-labelledby="view-about-heading">
            <h3 id="view-about-heading">О себе</h3>
            <p id="view-profile-about">{user.about}</p>
          </section>

          <section className="detail-section" aria-labelledby="view-interests-heading">
            <h3 id="view-interests-heading">Интересы</h3>
            <div className="interests" id="view-profile-interests" role="list">
              {user.interests && user.interests.length > 0 ? (
                user.interests.map((interest, index) => (
                  <div key={index} className="interest-tag" role="listitem">
                    {interest}
                  </div>
                ))
              ) : (
                <p>Интересы не указаны.</p>
              )}
            </div>
          </section>

          {currentUser && (
            <section className="compatibility-meter" aria-labelledby="compatibility-heading">
              <h3 id="compatibility-heading">Ваша совместимость</h3>
              <div className="meter" role="progressbar" aria-valuenow={compatibility} aria-valuemin={0} aria-valuemax={100} aria-label={`Совместимость ${compatibility} процентов`}>
                <div
                  className="meter-fill"
                  id="compatibility-percentage"
                  style={{ width: `${compatibility}%` }}
                >
                  {compatibility}%
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
