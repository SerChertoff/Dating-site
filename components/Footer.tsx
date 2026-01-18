'use client'

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault()
    
    const messages: Record<string, string> = {
      about: 'HeartMatch - это современная платформа для знакомств, которая помогает людям найти свою идеальную пару с помощью умного алгоритма подбора.',
      careers: 'Мы всегда ищем талантливых людей! Отправьте резюме на careers@heartmatch.com',
      press: 'Для пресс-запросов обращайтесь на press@heartmatch.com',
      faq: 'Часто задаваемые вопросы доступны в разделе помощи. Если у вас есть вопросы, свяжитесь с нашей службой поддержки.',
      safety: 'Безопасность наших пользователей - приоритет. Всегда встречайтесь в общественных местах и сообщайте друзьям о своих планах.',
      contact: 'Свяжитесь с нами:\nEmail: support@heartmatch.com\nТелефон: +7 (999) 123-45-67\nВремя работы: Пн-Пт, 9:00-18:00',
      privacy: 'Мы серьезно относимся к конфиденциальности. Ваши данные защищены и не передаются третьим лицам.',
      terms: 'Используя наш сервис, вы соглашаетесь с условиями использования. Полный текст доступен в настройках.',
      cookies: 'Мы используем cookies для улучшения работы сайта. Вы можете управлять настройками cookies в браузере.',
    }
    
    const message = messages[section] || 'Эта страница находится в разработке.'
    alert(message)
  }

  return (
    <footer>
      <div className="container">
        <div className="footer-links">
          <div className="footer-column">
            <h4>Компания</h4>
            <ul>
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'about')}>
                  О нас
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'careers')}>
                  Карьера
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'press')}>
                  Пресса
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Помощь</h4>
            <ul>
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'faq')}>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'safety')}>
                  Советы по безопасности
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'contact')}>
                  Связаться с нами
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Правовая информация</h4>
            <ul>
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'privacy')}>
                  Конфиденциальность
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'terms')}>
                  Условия использования
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'cookies')}>
                  Политика cookies
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Следите за нами</h4>
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 HeartMatch. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
