'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
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
        <section className="hero" aria-label="Hero section">
          {/* Оптимизированное hero изображение для улучшения LCP */}
          <Image
            src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Счастливая пара на HeartMatch"
            fill
            priority
            quality={85}
            className="hero-background"
            sizes="100vw"
            style={{ objectFit: 'cover', zIndex: -1 }}
          />
          <div className="hero-content">
            <h1>Найдите свою идеальную пару сегодня</h1>
            <p>Присоединяйтесь к тысячам одиноких, ищущих любовь на HeartMatch</p>
            <button
              className="cta-button"
              id="hero-signup-btn"
              type="button"
              aria-label="Создать бесплатный профиль на HeartMatch"
              onClick={onSignupClick}
            >
              Создать бесплатный профиль
            </button>
          </div>
        </section>

        <section className="features" aria-label="Features">
          <div className="feature-card">
            <i className="fas fa-heart" aria-hidden="true"></i>
            <h3>Умный подбор</h3>
            <p>Наш алгоритм находит совместимых партнеров на основе ваших предпочтений.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-comments" aria-hidden="true"></i>
            <h3>Реальный чат</h3>
            <p>Связывайтесь мгновенно со своими парами через нашу систему сообщений.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-shield-alt" aria-hidden="true"></i>
            <h3>Безопасно и надежно</h3>
            <p>Ваша конфиденциальность и безопасность - наш главный приоритет.</p>
          </div>
        </section>

        <section className="testimonials" aria-label="Success stories">
          <h2>Истории успеха</h2>
          <div className="testimonial-slider" role="region" aria-label="Testimonials slider" id="testimonials">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial ${index === currentTestimonial ? 'active' : ''}`}
                role="article"
                aria-hidden={index !== currentTestimonial}
                aria-label={`Testimonial from ${testimonial.author}`}
                aria-live="polite"
              >
                <Image
                  src={testimonial.image}
                  alt={`Фото ${testimonial.author}`}
                  width={100}
                  height={100}
                  className="testimonial-image"
                />
                <blockquote>
                  <p>"{testimonial.text}"</p>
                  <cite>- {testimonial.author}</cite>
                </blockquote>
              </div>
            ))}
          </div>
          <div className="slider-controls" role="group" aria-label="Testimonial navigation">
            <button
              className="slider-prev"
              type="button"
              aria-label="Предыдущий отзыв"
              onClick={prevTestimonial}
            >
              <i className="fas fa-chevron-left" aria-hidden="true"></i>
              <span className="sr-only">Предыдущий</span>
            </button>
            <button
              className="slider-next"
              type="button"
              aria-label="Следующий отзыв"
              onClick={nextTestimonial}
            >
              <i className="fas fa-chevron-right" aria-hidden="true"></i>
              <span className="sr-only">Следующий</span>
            </button>
          </div>
        </section>
      </div>
    </section>
  )
}
