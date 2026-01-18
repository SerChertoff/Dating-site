'use client'

import { useState, useEffect, useRef } from 'react'
import { User, Conversation, Message } from '@/types'
import { sampleConversations } from '@/data/sampleData'

interface MessagesSectionProps {
  currentUser: User | null
}

export default function MessagesSection({ currentUser }: MessagesSectionProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messageText, setMessageText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentUser) {
      setConversations(sampleConversations)
    }
  }, [currentUser])

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversation])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation)
  }

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return

    const newMessage: Message = {
      text: messageText,
      time: 'Только что',
      sent: true,
    }

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageText,
          time: 'Только что',
        }
      }
      return conv
    })

    setConversations(updatedConversations)
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: messageText,
      time: 'Только что',
    })
    setMessageText('')
    setTimeout(scrollToBottom, 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!currentUser) {
    return (
      <section id="messages-section" className="active-section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '50px 20px' }}>
            <h2>Войдите, чтобы просматривать сообщения</h2>
            <p>Пожалуйста, войдите в систему, чтобы видеть свои сообщения.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="messages-section" className="active-section">
      <div className="container">
        <div className="messages-container">
          <div className="conversation-list">
            <h3>Ваши диалоги</h3>
            <div className="search-conversations">
              <input
                type="text"
                placeholder="Поиск диалогов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="conversations" id="conversations-list">
              {filteredConversations.length === 0 ? (
                <p style={{ padding: '20px', textAlign: 'center', color: '#777' }}>
                  Диалоги не найдены
                </p>
              ) : (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`conversation ${
                      selectedConversation?.id === conversation.id ? 'active' : ''
                    }`}
                    onClick={() => handleConversationClick(conversation)}
                  >
                    <img
                      src={conversation.photo}
                      alt={conversation.name}
                      className="conversation-img"
                    />
                    <div className="conversation-info">
                      <div className="conversation-name">{conversation.name}</div>
                      <div className="conversation-preview">{conversation.lastMessage}</div>
                    </div>
                    <div className="conversation-time">{conversation.time}</div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="message-view">
            {selectedConversation ? (
              <>
                <div className="message-header">
                  <div className="recipient-info">
                    <img
                      src={selectedConversation.photo}
                      alt={selectedConversation.name}
                    />
                    <h4 id="message-recipient">{selectedConversation.name}</h4>
                  </div>
                </div>
                <div className="messages" id="messages-display">
                  {selectedConversation.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message ${message.sent ? 'sent' : 'received'}`}
                    >
                      <div className="message-content">{message.text}</div>
                      <div className="message-time">{message.time}</div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="message-input">
                  <textarea
                    id="message-text"
                    placeholder="Введите ваше сообщение здесь..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button id="send-message-btn" onClick={handleSendMessage}>
                    <i className="fas fa-paper-plane"></i> Отправить
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="message-header">
                  <div className="recipient-info">
                    <h4 id="message-recipient">Выберите диалог</h4>
                  </div>
                </div>
                <div className="messages" id="messages-display">
                  <p className="empty-message">Выберите диалог для просмотра сообщений</p>
                </div>
                <div className="message-input">
                  <textarea
                    id="message-text"
                    placeholder="Введите ваше сообщение здесь..."
                    disabled
                  />
                  <button id="send-message-btn" disabled>
                    <i className="fas fa-paper-plane"></i> Отправить
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
