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
    <footer role="contentinfo">
      <div className="container">
        <nav className="footer-links" aria-label="Footer navigation">
          <div className="footer-column">
            <h4>Компания</h4>
            <ul role="list">
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} aria-label="О компании HeartMatch">
                  О нас
                </a>
              </li>
              <li>
                <a href="#careers" onClick={(e) => handleLinkClick(e, 'careers')} aria-label="Карьерные возможности">
                  Карьера
                </a>
              </li>
              <li>
                <a href="#press" onClick={(e) => handleLinkClick(e, 'press')} aria-label="Пресс-релизы">
                  Пресса
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Помощь</h4>
            <ul role="list">
              <li>
                <a href="#faq" onClick={(e) => handleLinkClick(e, 'faq')} aria-label="Часто задаваемые вопросы">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#safety" onClick={(e) => handleLinkClick(e, 'safety')} aria-label="Советы по безопасности">
                  Советы по безопасности
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} aria-label="Связаться с поддержкой">
                  Связаться с нами
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Правовая информация</h4>
            <ul role="list">
              <li>
                <a href="#privacy" onClick={(e) => handleLinkClick(e, 'privacy')} aria-label="Политика конфиденциальности">
                  Конфиденциальность
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => handleLinkClick(e, 'terms')} aria-label="Условия использования">
                  Условия использования
                </a>
              </li>
              <li>
                <a href="#cookies" onClick={(e) => handleLinkClick(e, 'cookies')} aria-label="Политика cookies">
                  Политика cookies
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Следите за нами</h4>
            <div className="social-icons" role="list" aria-label="Social media links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook - открывается в новой вкладке"
                title="Facebook"
              >
                <i className="fab fa-facebook-f" aria-hidden="true"></i>
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter - открывается в новой вкладке"
                title="Twitter"
              >
                <i className="fab fa-twitter" aria-hidden="true"></i>
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram - открывается в новой вкладке"
                title="Instagram"
              >
                <i className="fab fa-instagram" aria-hidden="true"></i>
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok - открывается в новой вкладке"
                title="TikTok"
              >
                <i className="fab fa-tiktok" aria-hidden="true"></i>
                <span className="sr-only">TikTok</span>
              </a>
            </div>
          </div>
        </nav>
        <div className="copyright">
          <p>&copy; 2023 HeartMatch. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
