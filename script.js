document.addEventListener('DOMContentLoaded', function() {
    // DOM элементы
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const showLoginLink = document.getElementById('show-login-link');
    const showSignupLink = document.getElementById('show-signup-link');
    const heroSignupBtn = document.getElementById('hero-signup-btn');
    const profileViewModal = document.getElementById('profile-view-modal');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // Слайдер отзывов
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    // Пример данных
    const sampleUsers = [
        {
            id: 1,
            name: 'Анна Смирнова',
            age: 28,
            location: 'Москва',
            gender: 'female',
            photo: 'https://randomuser.me/api/portraits/women/44.jpg',
            about: 'Люблю путешествия и кофе. Увлекаюсь чтением и пробую новые рестораны.',
            interests: ['Путешествия', 'Чтение', 'Кофе', 'Фотография'],
            lookingFor: 'Спутника для совместных приключений',
            ageRange: '25-35',
            distance: 'До 25 км'
        },
        {
            id: 2,
            name: 'Дмитрий Иванов',
            age: 32,
            location: 'Санкт-Петербург',
            gender: 'male',
            photo: 'https://randomuser.me/api/portraits/men/32.jpg',
            about: 'Программист, люблю баскетбол и готовку. Ищу спутницу для прогулок по городу.',
            interests: ['Баскетбол', 'Готовка', 'Технологии', 'Кино'],
            lookingFor: 'Серьезные отношения',
            ageRange: '28-35',
            distance: 'До 30 км'
        },
        {
            id: 3,
            name: 'Екатерина Петрова',
            age: 26,
            location: 'Новосибирск',
            gender: 'female',
            photo: 'https://randomuser.me/api/portraits/women/68.jpg',
            about: 'Куратор художественной галереи, увлекаюсь фотографией и джазом.',
            interests: ['Искусство', 'Фотография', 'Джаз', 'Вино'],
            lookingFor: 'Творческого и доброго человека',
            ageRange: '25-35',
            distance: 'До 20 км'
        },
        {
            id: 4,
            name: 'Алексей Соколов',
            age: 30,
            location: 'Екатеринбург',
            gender: 'male',
            photo: 'https://randomuser.me/api/portraits/men/75.jpg',
            about: 'Фитнес-тренер, люблю пляж и здоровый образ жизни. Ищу активную спутницу.',
            interests: ['Фитнес', 'Пляж', 'Питание', 'Танцы'],
            lookingFor: 'Активную партнершу',
            ageRange: '25-35',
            distance: 'До 15 км'
        },
        {
            id: 5,
            name: 'Ольга Кузнецова',
            age: 29,
            location: 'Казань',
            gender: 'female',
            photo: 'https://randomuser.me/api/portraits/women/25.jpg',
            about: 'Маркетолог, люблю ходить в походы с собакой и пробовать новое крафтовое пиво.',
            interests: ['Походы', 'Собаки', 'Крафтовое пиво', 'Йога'],
            lookingFor: 'Искренние отношения',
            ageRange: '27-35',
            distance: 'До 25 км'
        },
        {
            id: 6,
            name: 'Иван Попов',
            age: 34,
            location: 'Ростов-на-Дону',
            gender: 'male',
            photo: 'https://randomuser.me/api/portraits/men/81.jpg',
            about: 'Финансовый аналитик, увлекаюсь лыжами и классическими автомобилями. Ищу спутницу для совместных приключений.',
            interests: ['Лыжи', 'Автомобили', 'Финансы', 'Путешествия'],
            lookingFor: 'Долгосрочные отношения',
            ageRange: '28-38',
            distance: 'До 30 км'
        }
    ];
    
    const sampleConversations = [
        {
            id: 1,
            userId: 1,
            name: 'Анна Смирнова',
            photo: 'https://randomuser.me/api/portraits/women/44.jpg',
            lastMessage: 'Привет! Как прошел твой выходной?',
            time: '2 часа назад',
            messages: [
                {
                    text: 'Привет!',
                    time: 'Вчера, 15:45',
                    sent: false
                },
                {
                    text: 'Здравствуй! Как дела?',
                    time: 'Вчера, 16:12',
                    sent: true
                },
                {
                    text: 'У меня все хорошо, спасибо что спросил. А у тебя?',
                    time: 'Вчера, 16:30',
                    sent: false
                },
                {
                    text: 'Отлично! Только вернулся с прогулки.',
                    time: 'Вчера, 17:02',
                    sent: true
                },
                {
                    text: 'Привет! Как прошел твой выходной?',
                    time: '2 часа назад',
                    sent: false
                }
            ]
        },
        {
            id: 2,
            userId: 2,
            name: 'Дмитрий Иванов',
            photo: 'https://randomuser.me/api/portraits/men/32.jpg',
            lastMessage: 'Игра начинается в 19:30, встретимся в 19:00?',
            time: '1 день назад',
            messages: [
                {
                    text: 'Привет Дмитрий!',
                    time: '2 дня назад, 10:15',
                    sent: true
                },
                {
                    text: 'Привет! Как ты?',
                    time: '2 дня назад, 10:30',
                    sent: false
                },
                {
                    text: 'Отлично! Ты все еще хочешь пойти на баскетбол завтра?',
                    time: '2 дня назад, 11:45',
                    sent: true
                },
                {
                    text: 'Конечно! С нетерпением жду.',
                    time: '2 дня назад, 12:20',
                    sent: false
                },
                {
                    text: 'Игра начинается в 19:30, встретимся в 19:00?',
                    time: '1 день назад',
                    sent: false
                }
            ]
        },
        {
            id: 3,
            userId: 3,
            name: 'Екатерина Петрова',
            photo: 'https://randomuser.me/api/portraits/women/68.jpg',
            lastMessage: 'Выставка открывается на следующей неделе, если интересно!',
            time: '3 дня назад',
            messages: [
                {
                    text: 'Привет Екатерина, увидел твой профиль и мне понравился твой вкус в искусстве!',
                    time: '4 дня назад, 14:15',
                    sent: true
                },
                {
                    text: 'Спасибо! Ты тоже увлекаешься искусством?',
                    time: '4 дня назад, 15:45',
                    sent: false
                },
                {
                    text: 'Да, я вообще фотограф-любитель.',
                    time: '4 дня назад, 16:20',
                    sent: true
                },
                {
                    text: 'Это замечательно! Нам стоит обсудить это подробнее.',
                    time: '4 дня назад, 17:30',
                    sent: false
                },
                {
                    text: 'Выставка открывается на следующей неделе, если интересно!',
                    time: '3 дня назад',
                    sent: false
                }
            ]
        }
    ];
    
    // Текущий пользователь
    let currentUser = null;
    let displayedMatches = 4;
    
    // Инициализация приложения
    function init() {
        // Проверка авторизации (из localStorage)
        const storedUser = localStorage.getItem('datingAppUser');
        if (storedUser) {
            currentUser = JSON.parse(storedUser);
            updateAuthUI();
            loadProfileData();
        }
        
        // Загрузка пар
        loadMatches();
        
        // Загрузка диалогов
        loadConversations();
        
        // Настройка обработчиков событий
        setupEventListeners();
        
        // Запуск слайдера отзывов
        showTestimonial(currentTestimonial);
        setInterval(nextTestimonial, 5000);
    }
    
    // Настройка обработчиков событий
    function setupEventListeners() {
        // Навигационные ссылки
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.id.replace('-link', '-section');
                
                // Обновление активной ссылки
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Показ соответствующей секции
                sections.forEach(section => section.classList.remove('active-section'));
                document.getElementById(sectionId).classList.add('active-section');
            });
        });
        
        // Кнопки авторизации
        loginBtn.addEventListener('click', showLoginModal);
        signupBtn.addEventListener('click', showSignupModal);
        logoutBtn.addEventListener('click', logout);
        heroSignupBtn.addEventListener('click', showSignupModal);
        
        // Управление модальными окнами
        closeModalButtons.forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });
        
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeAllModals();
            showLoginModal();
        });
        
        showSignupLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeAllModals();
            showSignupModal();
        });
        
        // Форма входа
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Простая валидация
            if (email && password) {
                // В реальном приложении здесь был бы API запрос
                loginUser(email, password);
            } else {
                alert('Пожалуйста, введите email и пароль');
            }
        });
        
        // Форма регистрации
        document.getElementById('signup-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const gender = document.getElementById('signup-gender').value;
            const birthdate = document.getElementById('signup-birthdate').value;
            const location = document.getElementById('signup-location').value;
            
            // Простая валидация
            if (name && email && password && gender && birthdate && location) {
                // Расчет возраста из даты рождения
                const age = calculateAge(new Date(birthdate));
                
                // Создание объекта пользователя
                const user = {
                    id: Date.now(), // Простой уникальный ID
                    name,
                    email,
                    password, // В реальном приложении пароль хешировался бы
                    gender,
                    age,
                    location,
                    photo: `https://randomuser.me/api/portraits/${gender === 'female' ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`,
                    about: 'Отредактируйте профиль, чтобы добавить информацию о себе.',
                    interests: [],
                    lookingFor: 'Не указано',
                    ageRange: 'Не указано',
                    distance: 'Не указано',
                    matches: 0,
                    conversations: 0
                };
                
                // В реальном приложении здесь был бы API запрос
                signupUser(user);
            } else {
                alert('Пожалуйста, заполните все поля');
            }
        });
        
        // Управление слайдером отзывов
        prevBtn.addEventListener('click', prevTestimonial);
        nextBtn.addEventListener('click', nextTestimonial);
        
        // Кнопка "Показать еще"
        loadMoreBtn.addEventListener('click', function() {
            displayedMatches += 2;
            if (displayedMatches >= sampleUsers.length) {
                displayedMatches = sampleUsers.length;
                this.disabled = true;
                this.textContent = 'Больше нет пар';
            }
            loadMatches();
        });
    }
    
    // Функции авторизации
    function loginUser(email, password) {
        // В реальном приложении здесь был бы API запрос для проверки учетных данных
        // Для демо просто создадим простого пользователя
        
        // Проверка пользователя в localStorage
        const users = JSON.parse(localStorage.getItem('datingAppUsers')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            currentUser = user;
            localStorage.setItem('datingAppUser', JSON.stringify(currentUser));
            updateAuthUI();
            loadProfileData();
            closeAllModals();
        } else {
            alert('Неверный email или пароль');
        }
    }
    
    function signupUser(user) {
        // В реальном приложении здесь был бы API запрос
        // Для демо сохраним в localStorage
        
        // Проверка существующего пользователя
        const users = JSON.parse(localStorage.getItem('datingAppUsers')) || [];
        const existingUser = users.find(u => u.email === user.email);
        
        if (existingUser) {
            alert('Пользователь с таким email уже существует');
            return;
        }
        
        // Добавление нового пользователя
        users.push(user);
        localStorage.setItem('datingAppUsers', JSON.stringify(users));
        
        // Авторизация пользователя
        currentUser = user;
        localStorage.setItem('datingAppUser', JSON.stringify(currentUser));
        updateAuthUI();
        loadProfileData();
        closeAllModals();
        
        // Показ секции профиля
        navLinks.forEach(l => l.classList.remove('active'));
        document.getElementById('profile-link').classList.add('active');
        sections.forEach(section => section.classList.remove('active-section'));
        document.getElementById('profile-section').classList.add('active-section');
    }
    
    function logout() {
        currentUser = null;
        localStorage.removeItem('datingAppUser');
        updateAuthUI();
        
        // Показ главной страницы
        navLinks.forEach(l => l.classList.remove('active'));
        document.getElementById('home-link').classList.add('active');
        sections.forEach(section => section.classList.remove('active-section'));
        document.getElementById('home-section').classList.add('active-section');
    }
    
    function updateAuthUI() {
        if (currentUser) {
            authButtons.classList.add('hidden');
            userMenu.classList.remove('hidden');
            document.getElementById('user-avatar').src = currentUser.photo;
        } else {
            authButtons.classList.remove('hidden');
            userMenu.classList.add('hidden');
        }
    }
    
    // Функции модальных окон
    function showLoginModal() {
        loginModal.style.display = 'block';
    }
    
    function showSignupModal() {
        signupModal.style.display = 'block';
    }
    
    function closeAllModals() {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
        profileViewModal.style.display = 'none';
    }
    
    // Функции слайдера отзывов
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Функции профиля
    function loadProfileData() {
        if (!currentUser) return;
        
        document.getElementById('profile-name').textContent = currentUser.name;
        document.getElementById('profile-age-location').textContent = `${currentUser.age} • ${currentUser.location}`;
        document.getElementById('profile-img').src = currentUser.photo;
        document.getElementById('profile-about').textContent = currentUser.about;
        document.getElementById('profile-matches').textContent = currentUser.matches;
        document.getElementById('profile-conversations').textContent = currentUser.conversations;
        document.getElementById('profile-looking-for').textContent = currentUser.lookingFor;
        document.getElementById('profile-age-range').textContent = currentUser.ageRange;
        document.getElementById('profile-distance').textContent = currentUser.distance;
        
        // Загрузка интересов
        const interestsContainer = document.getElementById('profile-interests');
        interestsContainer.innerHTML = '';
        
        if (currentUser.interests && currentUser.interests.length > 0) {
            currentUser.interests.forEach(interest => {
                const tag = document.createElement('div');
                tag.className = 'interest-tag';
                tag.textContent = interest;
                interestsContainer.appendChild(tag);
            });
        } else {
            interestsContainer.innerHTML = '<p>Интересы пока не добавлены.</p>';
        }
    }
    
    // Функции подбора пар
    function loadMatches() {
        const matchesContainer = document.getElementById('matches-container');
        matchesContainer.innerHTML = '';
        
        // Исключение текущего пользователя (если он есть в примере данных)
        const filteredUsers = sampleUsers.filter(user => !currentUser || user.id !== currentUser.id);
        
        // Показ ограниченного количества пар
        const usersToShow = filteredUsers.slice(0, displayedMatches);
        
        usersToShow.forEach(user => {
            const matchCard = document.createElement('div');
            matchCard.className = 'match-card';
            matchCard.innerHTML = `
                <img src="${user.photo}" alt="${user.name}" class="match-img">
                <div class="match-info">
                    <div class="match-name-age">
                        <span class="match-name">${user.name}</span>
                        <span class="match-age">${user.age}</span>
                    </div>
                    <div class="match-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${user.location}</span>
                    </div>
                    <div class="match-actions">
                        <button class="match-btn like-btn" data-id="${user.id}"><i class="fas fa-heart"></i> Нравится</button>
                        <button class="match-btn message-btn" data-id="${user.id}"><i class="fas fa-envelope"></i> Сообщение</button>
                    </div>
                </div>
            `;
            matchesContainer.appendChild(matchCard);
            
            // Обработчики для кнопок
            matchCard.querySelector('.like-btn').addEventListener('click', function() {
                likeUser(user.id);
            });
            
            matchCard.querySelector('.message-btn').addEventListener('click', function() {
                viewUserProfile(user.id);
            });
            
            // Просмотр профиля при клике на карточку
            matchCard.addEventListener('click', function(e) {
                if (!e.target.classList.contains('match-btn')) {
                    viewUserProfile(user.id);
                }
            });
        });
    }
    
    function likeUser(userId) {
        if (!currentUser) {
            showLoginModal();
            return;
        }
        
        const user = sampleUsers.find(u => u.id === userId);
        if (user) {
            alert(`Вы поставили лайк ${user.name}!`);
            // В реальном приложении здесь был бы API запрос
        }
    }
    
    function viewUserProfile(userId) {
        const user = sampleUsers.find(u => u.id === userId);
        if (user) {
            // Заполнение данных в модальном окне
            document.getElementById('view-profile-name').textContent = user.name;
            document.getElementById('view-profile-age-location').textContent = `${user.age} • ${user.location}`;
            document.getElementById('view-profile-img').src = user.photo;
            document.getElementById('view-profile-about').textContent = user.about;
            
            // Загрузка интересов
            const interestsContainer = document.getElementById('view-profile-interests');
            interestsContainer.innerHTML = '';
            
            if (user.interests && user.interests.length > 0) {
                user.interests.forEach(interest => {
                    const tag = document.createElement('div');
                    tag.className = 'interest-tag';
                    tag.textContent = interest;
                    interestsContainer.appendChild(tag);
                });
            } else {
                interestsContainer.innerHTML = '<p>Интересы не указаны.</p>';
            }
            
            // Показ модального окна
            profileViewModal.style.display = 'block';
            
            // Обработчики для кнопок в модальном окне
            document.getElementById('profile-like-btn').addEventListener('click', function() {
                likeUser(userId);
            });
            
            document.getElementById('profile-message-btn').addEventListener('click', function() {
                startConversation(userId);
                profileViewModal.style.display = 'none';
            });
        }
    }
    
    function startConversation(userId) {
        if (!currentUser) {
            showLoginModal();
            return;
        }
        
        // Переключение на секцию сообщений
        navLinks.forEach(l => l.classList.remove('active'));
        document.getElementById('messages-link').classList.add('active');
        sections.forEach(section => section.classList.remove('active-section'));
        document.getElementById('messages-section').classList.add('active-section');
        
        // В реальном приложении здесь была бы логика начала нового диалога
        alert(`Начат новый диалог с пользователем ${userId}`);
    }
    
    // Функции сообщений
    function loadConversations() {
        const conversationsList = document.getElementById('conversations-list');
        conversationsList.innerHTML = '';
        
        if (!currentUser) return;
        
        sampleConversations.forEach(conversation => {
            const convElement = document.createElement('div');
            convElement.className = 'conversation';
            convElement.innerHTML = `
                <img src="${conversation.photo}" alt="${conversation.name}" class="conversation-img">
                <div class="conversation-info">
                    <div class="conversation-name">${conversation.name}</div>
                    <div class="conversation-preview">${conversation.lastMessage}</div>
                </div>
                <div class="conversation-time">${conversation.time}</div>
            `;
            conversationsList.appendChild(convElement);
            
            convElement.addEventListener('click', function() {
                showMessages(conversation.id);
            });
        });
    }
    
    function showMessages(conversationId) {
        const conversation = sampleConversations.find(c => c.id === conversationId);
        if (!conversation) return;
        
        const messagesDisplay = document.getElementById('messages-display');
        messagesDisplay.innerHTML = '';
        
        // Заголовок с информацией о получателе
        document.getElementById('message-recipient').textContent = conversation.name;
        
        // Активация поля ввода
        document.getElementById('message-text').disabled = false;
        document.getElementById('send-message-btn').disabled = false;
        
        // Отображение сообщений
        conversation.messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${msg.sent ? 'sent' : 'received'}`;
            messageElement.innerHTML = `
                <div class="message-content">${msg.text}</div>
                <div class="message-time">${msg.time}</div>
            `;
            messagesDisplay.appendChild(messageElement);
        });
        
        // Прокрутка вниз
        messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
        
        // Обработчик отправки сообщения
        document.getElementById('send-message-btn').addEventListener('click', function() {
            const messageText = document.getElementById('message-text').value.trim();
            if (messageText) {
                const newMessage = {
                    text: messageText,
                    time: 'Только что',
                    sent: true
                };
                
                // В реальном приложении здесь был бы API запрос
                conversation.messages.push(newMessage);
                
                // Добавление сообщения в чат
                const messageElement = document.createElement('div');
                messageElement.className = 'message sent';
                messageElement.innerHTML = `
                    <div class="message-content">${newMessage.text}</div>
                    <div class="message-time">${newMessage.time}</div>
                `;
                messagesDisplay.appendChild(messageElement);
                
                // Очистка поля ввода
                document.getElementById('message-text').value = '';
                
                // Прокрутка вниз
                messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
            }
        });
    }
    
    // Вспомогательные функции
    function calculateAge(birthdate) {
        const diff = Date.now() - birthdate.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    
    // Запуск приложения
    init();
});