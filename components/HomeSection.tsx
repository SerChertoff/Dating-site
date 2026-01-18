'use client'

import { useState, useEffect } from 'react'
import { Testimonial } from '@/types'

interface HomeSectionProps {
  onSignupClick: () => void
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    image: 'https://via.placeholder.com/100',
    text: 'Мы встретились на HeartMatch и с тех пор неразлучны!',
    author: 'Сара и Марк',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/100',
    text: 'После многих лет поисков я нашел свою половинку здесь.',
    author: 'Джессика и Дэвид',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/100',
    text: 'Система подбора действительно работает. Мы женимся в следующем месяце!',
    author: 'Эмили и Джеймс',
  },
]

export default function HomeSection({ onSignupClick }: HomeSectionProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="home-section" className="active-section">
      <div className="container">
        <div className="hero">
          <h1>Найдите свою идеальную пару сегодня</h1>
          <p>Присоединяйтесь к тысячам одиноких, ищущих любовь на HeartMatch</p>
          <button className="cta-button" id="hero-signup-btn" onClick={onSignupClick}>
            Создать бесплатный профиль
          </button>
        </div>

        <div className="features">
          <div className="feature-card">
            <i className="fas fa-heart"></i>
            <h3>Умный подбор</h3>
            <p>Наш алгоритм находит совместимых партнеров на основе ваших предпочтений.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-comments"></i>
            <h3>Реальный чат</h3>
            <p>Связывайтесь мгновенно со своими парами через нашу систему сообщений.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Безопасно и надежно</h3>
            <p>Ваша конфиденциальность и безопасность - наш главный приоритет.</p>
          </div>
        </div>

        <div className="testimonials">
          <h2>Истории успеха</h2>
          <div className="testimonial-slider">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial ${index === currentTestimonial ? 'active' : ''}`}
              >
                <img src={testimonial.image} alt={testimonial.author} />
                <p>"{testimonial.text}"</p>
                <span>- {testimonial.author}</span>
              </div>
            ))}
          </div>
          <div className="slider-controls">
            <button className="slider-prev" onClick={prevTestimonial}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="slider-next" onClick={nextTestimonial}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
