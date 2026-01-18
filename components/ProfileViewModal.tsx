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
    <div className="modal active" onClick={onClose}>
      <div className="modal-content profile-view" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>
          &times;
        </span>
        <div className="profile-view-header">
          <div className="profile-view-photo">
            <img src={user.photo} alt="Profile Photo" id="view-profile-img" />
          </div>
          <div className="profile-view-info">
            <h2 id="view-profile-name">{user.name}</h2>
            <p id="view-profile-age-location">
              {user.age} • {user.location}
            </p>
            <div className="profile-view-actions">
              <button className="like-btn" id="profile-like-btn" onClick={handleLike}>
                <i className="fas fa-heart"></i> Нравится
              </button>
              <button
                className="message-btn"
                id="profile-message-btn"
                onClick={handleMessage}
              >
                <i className="fas fa-envelope"></i> Сообщение
              </button>
            </div>
          </div>
        </div>

        <div className="profile-view-details">
          <div className="detail-section">
            <h3>О себе</h3>
            <p id="view-profile-about">{user.about}</p>
          </div>

          <div className="detail-section">
            <h3>Интересы</h3>
            <div className="interests" id="view-profile-interests">
              {user.interests && user.interests.length > 0 ? (
                user.interests.map((interest, index) => (
                  <div key={index} className="interest-tag">
                    {interest}
                  </div>
                ))
              ) : (
                <p>Интересы не указаны.</p>
              )}
            </div>
          </div>

          {currentUser && (
            <div className="compatibility-meter">
              <h3>Ваша совместимость</h3>
              <div className="meter">
                <div
                  className="meter-fill"
                  id="compatibility-percentage"
                  style={{ width: `${compatibility}%` }}
                >
                  {compatibility}%
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
