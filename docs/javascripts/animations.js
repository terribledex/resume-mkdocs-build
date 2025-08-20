// animations.js - Основные анимации и эффекты

document.addEventListener('DOMContentLoaded', function() {
    
    // Создание плавающих частиц
    function createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        
        for (let i = 0; i < 9; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
        
        document.body.appendChild(particlesContainer);
    }

    // Добавление эффекта печатания к заголовкам
    function addTypewriterEffect() {
        const h1Elements = document.querySelectorAll('.md-typeset h1');
        h1Elements.forEach((h1, index) => {
            setTimeout(() => {
                h1.classList.add('typewriter-effect');
            }, index * 500);
        });
    }

    // Добавление эффекта появления к элементам
    function addFadeInEffect() {
        const elements = document.querySelectorAll('.md-typeset > *');
        elements.forEach((element, index) => {
            element.classList.add('fade-in-up');
            element.style.animationDelay = (index * 0.1) + 's';
        });
    }

    // Добавление эффекта мерцания к контейнерам
    function addShimmerEffect() {
        const contentContainers = document.querySelectorAll('.md-content__inner');
        contentContainers.forEach(container => {
            container.classList.add('shimmer');
        });
    }

    // Анимация при скролле
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Добавление эффекта ряби при клике
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.md-nav__link, .md-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(136, 57, 239, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Анимация для навигационных элементов
    function animateNavigation() {
        const navLinks = document.querySelectorAll('.md-nav__link');
        
        navLinks.forEach((link, index) => {
            link.style.animationDelay = (index * 0.05) + 's';
            link.classList.add('fade-in-up');
            
            // Добавляем hover эффект с задержкой
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px) scale(1.02)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
            });
        });
    }

    // Добавление градиентной анимации к заголовкам
    function addGradientAnimation() {
        const headings = document.querySelectorAll('.md-typeset h1, .md-typeset h2');
        headings.forEach(heading => {
            heading.classList.add('gradient-text');
        });
    }

    // Анимация при загрузке страницы
    function pageLoadAnimation() {
        const content = document.querySelector('.md-content');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                content.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // Добавление плавающего текстового эффекта
    function addFloatingTextEffect() {
        const emojis = document.querySelectorAll('.md-typeset h1::after, .md-typeset h2::before, .md-typeset h3::before');
        emojis.forEach(emoji => {
            emoji.classList.add('floating-text');
        });
    }

    // Анимация header при скролле
    function animateHeaderOnScroll() {
        const header = document.querySelector('.md-header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Скролл вниз
                header.style.transform = 'translateY(-100%)';
            } else {
                // Скролл вверх
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Добавление пульсирующего эффекта к важным элементам
    function addPulseEffect() {
        const socialLinks = document.querySelectorAll('.md-social__link');
        socialLinks.forEach(link => {
            link.classList.add('pulse-effect');
        });
    }

    // Parallax эффект для фоновых элементов
    function addParallaxEffect() {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-particles');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Инициализация всех анимаций
    function initializeAnimations() {
        createFloatingParticles();
        addTypewriterEffect();
        addFadeInEffect();
        addShimmerEffect();
        handleScrollAnimations();
        addRippleEffect();
        animateNavigation();
        addGradientAnimation();
        pageLoadAnimation();
        addFloatingTextEffect();
        animateHeaderOnScroll();
        addPulseEffect();
        addParallaxEffect();
    }

    // Запуск анимаций
    initializeAnimations();

    // Добавление дополнительных анимаций при изменении размера окна
    window.addEventListener('resize', function() {
        // Пересоздаем частицы при изменении размера
        const existingParticles = document.querySelector('.floating-particles');
        if (existingParticles) {
            existingParticles.remove();
            createFloatingParticles();
        }
    });

    // Эффект при фокусе на элементах
    document.addEventListener('focusin', function(e) {
        if (e.target.matches('input, textarea, button, a')) {
            e.target.style.boxShadow = '0 0 0 3px rgba(136, 57, 239, 0.3)';
            e.target.style.transform = 'scale(1.02)';
        }
    });

    document.addEventListener('focusout', function(e) {
        if (e.target.matches('input, textarea, button, a')) {
            e.target.style.boxShadow = '';
            e.target.style.transform = '';
        }
    });

    console.log('🎨 Милые анимации загружены! ✨');
});
