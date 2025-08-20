// Дополнительные милые эффекты для сайта

document.addEventListener('DOMContentLoaded', function() {
    
    // Плавное появление элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем анимацию к различным элементам
    const animateElements = document.querySelectorAll('.md-typeset h2, .md-typeset h3, .md-typeset p, .md-typeset .admonition');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Добавляем парящие частицы в header
    function createFloatingParticles() {
        const header = document.querySelector('.md-header');
        if (!header) return;

        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: floatParticle ${8 + Math.random() * 4}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 1;
            `;
            header.appendChild(particle);
        }
    }

    // CSS для анимации частиц
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0) translateX(0) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
                transform: scale(1);
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px) scale(0);
                opacity: 0;
            }
        }
        
        .floating-particle {
            animation-delay: ${Math.random() * 8}s;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .floating-particle {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    createFloatingParticles();

    // Добавляем эффект печатной машинки для заголовков
    function typeWriter(element, speed = 100) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--md-accent-fg-color)';
        
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);
    }

    // Применяем эффект печатной машинки к главному заголовку
    const mainTitle = document.querySelector('.md-typeset h1');
    if (mainTitle && !sessionStorage.getItem('titleAnimated')) {
        sessionStorage.setItem('titleAnimated', 'true');
        typeWriter(mainTitle, 150);
    }

    // Добавляем ripple эффект для кнопок
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // CSS для ripple анимации
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Применяем ripple эффект к кнопкам
    const buttons = document.querySelectorAll('.md-nav__link, .md-social__link, .md-top');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Добавляем эффект параллакса для hero секции (с throttling для производительности)
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.md-header');
        if (header && scrolled < 500) { // Ограничиваем эффект
            header.style.transform = `translateY(${scrolled * 0.1}px)`; // Уменьшили коэффициент
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Конфетти эффект для особых событий (можно вызвать в консоли: triggerCelebration())
    window.triggerCelebration = function() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3', '#54a0ff'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * window.innerWidth}px;
                top: -10px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    };

    // CSS для конфетти
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(${window.innerHeight + 10}px) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // Добавляем smooth scroll для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Добавляем индикатор прогресса чтения
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--md-accent-fg-color), var(--md-primary-fg-color));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Пасхалка: Konami Code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.toString() === konamiSequence.toString()) {
            triggerCelebration();
            console.log('🎉 Пасхалка найдена! Поздравляем! 🎉');
            konamiCode = [];
        }
    });

    // Добавляем анимацию для emoji в навигации
    document.querySelectorAll('.md-nav__link').forEach(link => {
        const emoji = link.textContent.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu);
        if (emoji) {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'scale(1.05)';
            });
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'scale(1)';
            });
        }
    });

    console.log('✨ Сайт загружен! Попробуйте Konami Code для сюрприза! ✨');
});