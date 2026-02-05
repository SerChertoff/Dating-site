'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomeSection from '@/components/HomeSection'
import { User } from '@/types'

// Динамический импорт некритических компонентов для уменьшения размера начального бандла
const MatchesSection = dynamic(() => import('@/components/MatchesSection'), {
  loading: () => <div style={{ textAlign: 'center', padding: '50px' }}>Загрузка...</div>,
})

const MessagesSection = dynamic(() => import('@/components/MessagesSection'), {
  loading: () => <div style={{ textAlign: 'center', padding: '50px' }}>Загрузка...</div>,
})

const ProfileSection = dynamic(() => import('@/components/ProfileSection'), {
  loading: () => <div style={{ textAlign: 'center', padding: '50px' }}>Загрузка...</div>,
})

// Модальные окна загружаются только при необходимости (без SSR для уменьшения размера бандла)
const LoginModal = dynamic(() => import('@/components/LoginModal'), { ssr: false })
const SignupModal = dynamic(() => import('@/components/SignupModal'), { ssr: false })
const ProfileViewModal = dynamic(() => import('@/components/ProfileViewModal'), { ssr: false })

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
      <main role="main">
        {activeSection === 'home' && (
          <HomeSection onSignupClick={() => setShowSignupModal(true)} />
        )}
        {activeSection === 'matches' && (
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>Загрузка...</div>}>
            <MatchesSection
              currentUser={currentUser}
              onViewProfile={handleViewProfile}
              onLoginRequired={() => setShowLoginModal(true)}
            />
          </Suspense>
        )}
        {activeSection === 'messages' && (
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>Загрузка...</div>}>
            <MessagesSection currentUser={currentUser} />
          </Suspense>
        )}
        {activeSection === 'profile' && (
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>Загрузка...</div>}>
            <ProfileSection
              currentUser={currentUser}
              onLoginRequired={() => setShowLoginModal(true)}
            />
          </Suspense>
        )}
      </main>
      <Footer />
      {showLoginModal && (
        <Suspense fallback={null}>
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
            onShowSignup={() => {
              setShowLoginModal(false)
              setShowSignupModal(true)
            }}
          />
        </Suspense>
      )}
      {showSignupModal && (
        <Suspense fallback={null}>
          <SignupModal
            onClose={() => setShowSignupModal(false)}
            onSignup={handleSignup}
            onShowLogin={() => {
              setShowSignupModal(false)
              setShowLoginModal(true)
            }}
          />
        </Suspense>
      )}
      {showProfileViewModal && selectedProfile && (
        <Suspense fallback={null}>
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
        </Suspense>
      )}
    </>
  )
}
