'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomeSection from '@/components/HomeSection'
import MatchesSection from '@/components/MatchesSection'
import MessagesSection from '@/components/MessagesSection'
import ProfileSection from '@/components/ProfileSection'
import LoginModal from '@/components/LoginModal'
import SignupModal from '@/components/SignupModal'
import ProfileViewModal from '@/components/ProfileViewModal'
import { User, Conversation } from '@/types'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showProfileViewModal, setShowProfileViewModal] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<User | null>(null)

  useEffect(() => {
    // Проверка авторизации из localStorage
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('datingAppUser')
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser))
      }
    }
  }, [])

  const handleLogin = (user: User) => {
    setCurrentUser(user)
    if (typeof window !== 'undefined') {
      localStorage.setItem('datingAppUser', JSON.stringify(user))
    }
    setShowLoginModal(false)
  }

  const handleSignup = (user: User) => {
    setCurrentUser(user)
    if (typeof window !== 'undefined') {
      localStorage.setItem('datingAppUser', JSON.stringify(user))
      const users = JSON.parse(localStorage.getItem('datingAppUsers') || '[]')
      users.push(user)
      localStorage.setItem('datingAppUsers', JSON.stringify(users))
    }
    setShowSignupModal(false)
    setActiveSection('profile')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('datingAppUser')
    }
    setActiveSection('home')
  }

  const handleViewProfile = (user: User) => {
    setSelectedProfile(user)
    setShowProfileViewModal(true)
  }

  return (
    <>
      <Header
        currentUser={currentUser}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLoginClick={() => setShowLoginModal(true)}
        onSignupClick={() => setShowSignupModal(true)}
        onLogout={handleLogout}
      />
      <main>
        {activeSection === 'home' && (
          <HomeSection onSignupClick={() => setShowSignupModal(true)} />
        )}
        {activeSection === 'matches' && (
          <MatchesSection
            currentUser={currentUser}
            onViewProfile={handleViewProfile}
            onLoginRequired={() => setShowLoginModal(true)}
          />
        )}
        {activeSection === 'messages' && (
          <MessagesSection currentUser={currentUser} />
        )}
        {activeSection === 'profile' && (
          <ProfileSection
            currentUser={currentUser}
            onLoginRequired={() => setShowLoginModal(true)}
          />
        )}
      </main>
      <Footer />
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onShowSignup={() => {
            setShowLoginModal(false)
            setShowSignupModal(true)
          }}
        />
      )}
      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSignup={handleSignup}
          onShowLogin={() => {
            setShowSignupModal(false)
            setShowLoginModal(true)
          }}
        />
      )}
      {showProfileViewModal && selectedProfile && (
        <ProfileViewModal
          user={selectedProfile}
          currentUser={currentUser}
          onClose={() => {
            setShowProfileViewModal(false)
            setSelectedProfile(null)
          }}
          onStartConversation={() => {
            setShowProfileViewModal(false)
            setActiveSection('messages')
          }}
          onLoginRequired={() => {
            setShowProfileViewModal(false)
            setShowLoginModal(true)
          }}
        />
      )}
    </>
  )
}
