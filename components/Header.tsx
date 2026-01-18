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
    <header role="banner">
      <div className="container">
        <div className="logo" role="img" aria-label="HeartMatch Logo">
          HeartMatch
        </div>
        <nav role="navigation" aria-label="Main navigation">
          <ul role="menubar">
            {sections.map((section) => (
              <li key={section.id} role="none">
                <a
                  href={`#${section.id}`}
                  role="menuitem"
                  aria-label={section.label}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                  className={activeSection === section.id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    onSectionChange(section.id)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSectionChange(section.id)
                    }
                  }}
                >
                  <i className={section.icon} aria-hidden="true"></i> {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {!currentUser ? (
          <div className="auth-buttons" role="group" aria-label="Authentication buttons">
            <button
              id="login-btn"
              type="button"
              aria-label="Login to your account"
              onClick={onLoginClick}
            >
              Login
            </button>
            <button
              id="signup-btn"
              type="button"
              aria-label="Sign up for a new account"
              onClick={onSignupClick}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="user-menu" role="button" aria-label="User menu" tabIndex={0}>
            <img
              src={currentUser.photo}
              alt={`${currentUser.name} profile picture`}
              id="user-avatar"
              width={40}
              height={40}
            />
            <div className="dropdown-content" role="menu" aria-label="User menu options">
              <a
                href="#profile"
                role="menuitem"
                aria-label="View my profile"
                onClick={(e) => {
                  e.preventDefault()
                  onSectionChange('profile')
                }}
              >
                My Profile
              </a>
              <a
                href="#settings"
                role="menuitem"
                aria-label="Account settings"
                onClick={(e) => e.preventDefault()}
              >
                Settings
              </a>
              <a
                href="#logout"
                id="logout-btn"
                role="menuitem"
                aria-label="Logout from account"
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
