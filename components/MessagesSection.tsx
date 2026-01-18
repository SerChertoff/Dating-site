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
      <section id="messages-section" className="active-section" aria-label="Messages section">
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
    <section id="messages-section" className="active-section" aria-label="Messages section">
      <div className="container">
        <div className="messages-container">
          <div className="conversation-list" role="complementary" aria-label="Conversations list">
            <h3>Ваши диалоги</h3>
            <div className="search-conversations">
              <label htmlFor="conversation-search" className="sr-only">
                Поиск диалогов
              </label>
              <input
                type="search"
                id="conversation-search"
                placeholder="Поиск диалогов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Поиск диалогов"
              />
            </div>
            <div className="conversations" id="conversations-list" role="list" aria-label="Conversations">
              {filteredConversations.length === 0 ? (
                <p style={{ padding: '20px', textAlign: 'center', color: '#777' }} role="status">
                  Диалоги не найдены
                </p>
              ) : (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`conversation ${
                      selectedConversation?.id === conversation.id ? 'active' : ''
                    }`}
                    role="listitem"
                    onClick={() => handleConversationClick(conversation)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleConversationClick(conversation)
                      }
                    }}
                    tabIndex={0}
                    aria-label={`Диалог с ${conversation.name}. Последнее сообщение: ${conversation.lastMessage}`}
                    aria-selected={selectedConversation?.id === conversation.id}
                  >
                    <img
                      src={conversation.photo}
                      alt={`Аватар ${conversation.name}`}
                      className="conversation-img"
                      width={50}
                      height={50}
                    />
                    <div className="conversation-info">
                      <div className="conversation-name">{conversation.name}</div>
                      <div className="conversation-preview">{conversation.lastMessage}</div>
                    </div>
                    <div className="conversation-time" aria-label={`Последнее сообщение ${conversation.time}`}>
                      {conversation.time}
                    </div>
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
                      alt={`Аватар ${selectedConversation.name}`}
                      width={40}
                      height={40}
                    />
                    <h4 id="message-recipient">{selectedConversation.name}</h4>
                  </div>
                </div>
                <div className="messages" id="messages-display" role="log" aria-live="polite" aria-label={`Сообщения с ${selectedConversation.name}`}>
                  {selectedConversation.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message ${message.sent ? 'sent' : 'received'}`}
                      role="listitem"
                      aria-label={message.sent ? 'Ваше сообщение' : `Сообщение от ${selectedConversation.name}`}
                    >
                      <div className="message-content">{message.text}</div>
                      <time className="message-time" dateTime={message.time} aria-label={`Отправлено ${message.time}`}>
                        {message.time}
                      </time>
                    </div>
                  ))}
                  <div ref={messagesEndRef} aria-hidden="true" />
                </div>
                <div className="message-input">
                  <label htmlFor="message-text" className="sr-only">
                    Введите сообщение
                  </label>
                  <textarea
                    id="message-text"
                    name="message"
                    placeholder="Введите ваше сообщение здесь..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    aria-label="Поле ввода сообщения"
                  />
                  <button
                    id="send-message-btn"
                    type="button"
                    aria-label="Отправить сообщение"
                    onClick={handleSendMessage}
                  >
                    <i className="fas fa-paper-plane" aria-hidden="true"></i> Отправить
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
                  <label htmlFor="message-text-disabled" className="sr-only">
                    Введите сообщение
                  </label>
                  <textarea
                    id="message-text-disabled"
                    placeholder="Введите ваше сообщение здесь..."
                    disabled
                    aria-label="Поле ввода сообщения (недоступно)"
                  />
                  <button id="send-message-btn" type="button" disabled aria-label="Отправить сообщение (недоступно)">
                    <i className="fas fa-paper-plane" aria-hidden="true"></i> Отправить
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
