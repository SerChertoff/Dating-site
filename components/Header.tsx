'use client'

import { User } from '@/types'

interface HeaderProps {
  currentUser: User | null
  activeSection: string
  onSectionChange: (section: string) => void
  onLoginClick: () => void
  onSignupClick: () => void
  onLogout: () => void
}

export default function Header({
  currentUser,
  activeSection,
  onSectionChange,
  onLoginClick,
  onSignupClick,
  onLogout,
}: HeaderProps) {
  const sections = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'matches', label: 'Matches', icon: 'fas fa-heart' },
    { id: 'messages', label: 'Messages', icon: 'fas fa-envelope' },
    { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
  ]

  return (
    <header>
      <div className="container">
        <div className="logo">HeartMatch</div>
        <nav>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href="#"
                  className={activeSection === section.id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    onSectionChange(section.id)
                  }}
                >
                  <i className={section.icon}></i> {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {!currentUser ? (
          <div className="auth-buttons">
            <button id="login-btn" onClick={onLoginClick}>
              Login
            </button>
            <button id="signup-btn" onClick={onSignupClick}>
              Sign Up
            </button>
          </div>
        ) : (
          <div className="user-menu">
            <img src={currentUser.photo} alt="Profile" id="user-avatar" />
            <div className="dropdown-content">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onSectionChange('profile')
                }}
              >
                My Profile
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Settings
              </a>
              <a
                href="#"
                id="logout-btn"
                onClick={(e) => {
                  e.preventDefault()
                  onLogout()
                }}
              >
                Logout
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
