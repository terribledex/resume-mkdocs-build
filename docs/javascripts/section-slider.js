// section-slider.js - Ползунок для навигации между заголовками

document.addEventListener('DOMContentLoaded', function() {
    let hasReachedEnd = false;

    // Создание ползунка навигации
    function createSectionSlider() {
        const headings = document.querySelectorAll('.md-typeset h1, .md-typeset h2, .md-typeset h3');
        if (headings.length === 0) return;

        const slider = document.createElement('div');
        slider.className = 'section-slider';
        
        headings.forEach((heading, index) => {
            const dot = document.createElement('span');
            dot.className = 'section-slider__dot';
            dot.dataset.index = index;
            dot.title = heading.textContent;
            
            dot.addEventListener('click', () => {
                heading.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                updateActiveDot(index);
            });
            
            slider.appendChild(dot);
        });

        document.body.appendChild(slider);

        // Показать ползунок при скролле
        let isSliderVisible = false;
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > 300 && !isSliderVisible) {
                slider.classList.add('visible');
                isSliderVisible = true;
            } else if (scrollPosition <= 300 && isSliderVisible) {
                slider.classList.remove('visible');
                isSliderVisible = false;
            }

            // Обновление активной точки
            updateActiveSection(headings);
        });

        return slider;
    }

    // Обновление активной точки
    function updateActiveDot(index) {
        const dots = document.querySelectorAll('.section-slider__dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Определение активной секции
    function updateActiveSection(headings) {
        const scrollPosition = window.scrollY + 100;
        let activeIndex = 0;

        headings.forEach((heading, index) => {
            const headingPosition = heading.offsetTop;
            if (scrollPosition >= headingPosition) {
                activeIndex = index;
            }
        });

        updateActiveDot(activeIndex);
    }

    // Эффект конца страницы (только один раз)
    function createEndPageEffect() {
        const endEffect = document.createElement('div');
        endEffect.className = 'end-page-effect';
        endEffect.innerHTML = `
            <div class="end-page-message">
                <div>СПАСИБО, ЧТО ПРОЛИСТАЛИ ЭТО ДО КОНЦА!</div>
                <div style="font-size: 3rem; margin-top: 1rem;">🎉✨💜</div>
            </div>
        `;
        document.body.appendChild(endEffect);

        // Добавляем стили для эффекта
        const style = document.createElement('style');
        style.textContent = `
            .end-page-effect {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--cute-gradient);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.5s ease;
            }

            .end-page-effect.show {
                opacity: 1;
                visibility: visible;
            }

            .end-page-message {
                background: white;
                color: var(--cute-primary);
                padding: 3rem 4rem;
                border-radius: 20px;
                text-align: center;
                font-size: 2rem;
                font-weight: 700;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                position: relative;
                overflow: hidden;
                max-width: 90vw;
            }

            .end-page-message::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, transparent, rgba(136, 57, 239, 0.1), transparent);
                animation: sparkle 2s infinite;
            }

            @keyframes bounceIn {
                0% {
                    transform: scale(0.3) rotate(-10deg);
                    opacity: 0;
                }
                50% {
                    transform: scale(1.05) rotate(2deg);
                }
                70% {
                    transform: scale(0.9) rotate(-1deg);
                }
                100% {
                    transform: scale(1) rotate(0deg);
                    opacity: 1;
                }
            }

            @keyframes sparkle {
                0%, 100% {
                    transform: translateX(-100%);
                }
                50% {
                    transform: translateX(100%);
                }
            }

            @media (max-width: 768px) {
                .end-page-message {
                    padding: 2rem;
                    font-size: 1.5rem;
                    margin: 1rem;
                }
            }
        `;
        document.head.appendChild(style);

        return endEffect;
    }

    // Отслеживание скролла до конца
    function handleEndPageScroll() {
        const endEffect = createEndPageEffect();
        
        window.addEventListener('scroll', function() {
            const scrollThreshold = document.documentElement.scrollHeight - window.innerHeight - 50;
            
            if (window.scrollY >= scrollThreshold && !hasReachedEnd) {
                hasReachedEnd = true;
                endEffect.classList.add('show');
                
                // Убираем эффект через 3 секунды
                setTimeout(() => {
                    endEffect.classList.remove('show');
                }, 3000);
                
                // Добавляем конфетти эффект
                createConfettiEffect();
            }
        });
    }

    // Эффект конфетти
    function createConfettiEffect() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${['#8839ef', '#ea76cb', '#d20f39'][Math.floor(Math.random() * 3)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                border-radius: 50%;
                z-index: 10000;
                pointer-events: none;
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
        
        // Добавляем стили для анимации конфетти
        if (!document.querySelector('#confetti-styles')) {
            const confettiStyles = document.createElement('style');
            confettiStyles.id = 'confetti-styles';
            confettiStyles.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(720deg);
                    }
                }
            `;
            document.head.appendChild(confettiStyles);
        }
    }

    // Добавление стилей для ползунка
    function addSliderStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .section-slider {
                position: fixed;
                right: 2rem;
                top: 50%;
                transform: translateY(-50%);
                background: var(--cute-surface);
                border-radius: 25px;
                padding: 1rem;
                box-shadow: var(--cute-shadow);
                backdrop-filter: blur(20px);
                z-index: 999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .section-slider.visible {
                opacity: 1;
                visibility: visible;
                animation: slideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            @keyframes slideIn {
                from {
                    transform: translateY(-50%) translateX(100px);
                }
                to {
                    transform: translateY(-50%) translateX(0);
                }
            }

            .section-slider__dot {
                display: block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: var(--cute-text-muted);
                margin: 0.5rem 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
                position: relative;
            }

            .section-slider__dot::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: var(--cute-primary);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .section-slider__dot.active::before {
                width: 100%;
                height: 100%;
            }

            .section-slider__dot:hover {
                transform: scale(1.3);
                box-shadow: 0 0 20px rgba(136, 57, 239, 0.3);
            }

            @media (max-width: 768px) {
                .section-slider {
                    right: 1rem;
                    padding: 0.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Инициализация
    function initialize() {
        addSliderStyles();
        createSectionSlider();
        handleEndPageScroll();
    }

    initialize();
    console.log('🎯 Ползунок навигации и эффекты скролла загружены! ✨');
});
