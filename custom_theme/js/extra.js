// Enhanced Theme JavaScript with Dark Mode, Animations, and Interactive Features

class EnhancedThemeManager {
    constructor() {
        this.currentPage = 0;
        this.totalPages = document.querySelectorAll('.nav-link').length;
        this.isScrolling = false;
        this.theme = localStorage.getItem('theme') || 'light';
        this.searchModal = null;
        this.cursor = null;
        this.progressBar = null;
        this.isMobile = window.innerWidth <= 768;
        
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
        
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupCustomCursor();
        this.setupProgressBar();
        this.setupNavigation();
        this.setupAnimations();
        this.setupKeyboardShortcuts();
        this.setupSearch();
        this.setupSocialLinks();
        this.showEndMessage();
        this.updatePageProgress();
        this.applyTheme();
        
        console.log('🎨 Enhanced Theme Manager initialized');
    }

    // Theme Management
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', this.toggleTheme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        this.updateThemeIcon();
        this.addCelebrationEffect();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    updateThemeIcon() {
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        
        if (sunIcon && moonIcon) {
            if (this.theme === 'dark') {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            } else {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        }
    }

    addCelebrationEffect() {
        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--accent-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: 50%;
                top: 50%;
                animation: sparkleAnimation 1s ease-out forwards;
            `;
            
            const angle = (i / 12) * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            sparkle.style.setProperty('--x', `${x}px`);
            sparkle.style.setProperty('--y', `${y}px`);
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }
        
        if (!document.querySelector('#sparkle-styles')) {
            const style = document.createElement('style');
            style.id = 'sparkle-styles';
            style.textContent = `
                @keyframes sparkleAnimation {
                    0% {
                        opacity: 1;
                        transform: translate(0, 0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(var(--x), var(--y)) scale(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Custom Cursor
    setupCustomCursor() {
        if (this.isMobile) return;
        
        this.cursor = document.querySelector('.custom-cursor');
        if (!this.cursor) return;

        document.addEventListener('mousemove', this.handleMouseMove);
        
        const interactiveElements = document.querySelectorAll('a, button, .nav-link, .social-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });

        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '0.8';
        });
    }

    handleMouseMove(e) {
        if (!this.cursor) return;
        
        requestAnimationFrame(() => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        });
    }

    // Progress Bar
    setupProgressBar() {
        this.progressBar = document.querySelector('.progress-fill');
        if (!this.progressBar) return;

        window.addEventListener('scroll', this.handleScroll);
        this.updateScrollProgress();
    }

    handleScroll() {
        if (!this.isScrolling) {
            requestAnimationFrame(() => {
                this.updateScrollProgress();
                this.isScrolling = false;
            });
            this.isScrolling = true;
        }
    }

    updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollTop / scrollHeight, 1);
        
        if (this.progressBar) {
            this.progressBar.style.width = `${progress * 100}%`;
        }
    }

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Add ripple effect to navigation links but don't prevent default
        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                this.addRippleEffect(e.target, e);
                // Let the default link behavior happen (navigate to the page)
            });
        });

        // Set current page based on active nav item
        this.updateCurrentPageFromNav();
    }

    updateCurrentPageFromNav() {
        const activeNavLink = document.querySelector('.nav-link.active');
        if (activeNavLink) {
            const pageIndex = activeNavLink.getAttribute('data-page');
            if (pageIndex !== null) {
                this.currentPage = parseInt(pageIndex);
            }
        }
    }

    addRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, var(--accent-primary) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // Animations
    setupAnimations() {
        this.animateOnScroll();
        this.setupHoverEffects();
    }

    animateOnScroll() {
        const animatedElements = document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content p, .markdown-content li');
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.transitionDelay = `${index * 0.1}s`;
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
    }

    setupHoverEffects() {
        const textElements = document.querySelectorAll('.markdown-content p, .markdown-content li, .markdown-content h2, .markdown-content h3');
        
        textElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateX(10px)';
                element.style.color = 'var(--accent-primary)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateX(0)';
                element.style.color = '';
            });
        });

        const links = document.querySelectorAll('.markdown-content a');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.textShadow = '0 0 10px var(--accent-primary)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.textShadow = '';
            });
        });
    }

    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey) {
                const activeElement = document.activeElement;
                if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                    this.toggleTheme();
                    e.preventDefault();
                }
            }
            
            if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
                const activeElement = document.activeElement;
                if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                    this.toggleSearch();
                    e.preventDefault();
                }
            }
            
            // Navigate between pages with arrow keys
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const activeElement = document.activeElement;
                if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                    const navLinks = document.querySelectorAll('.nav-link');
                    const currentActiveLink = document.querySelector('.nav-link.active');
                    
                    if (currentActiveLink && navLinks.length > 1) {
                        const currentIndex = Array.from(navLinks).indexOf(currentActiveLink);
                        let targetIndex = currentIndex;
                        
                        if (e.key === 'ArrowLeft' && currentIndex > 0) {
                            targetIndex = currentIndex - 1;
                        } else if (e.key === 'ArrowRight' && currentIndex < navLinks.length - 1) {
                            targetIndex = currentIndex + 1;
                        }
                        
                        if (targetIndex !== currentIndex) {
                            navLinks[targetIndex].click();
                            e.preventDefault();
                        }
                    }
                }
            }
            
            if (e.key === 'Escape') {
                this.closeSearch();
            }
        });
    }

    // Search
    setupSearch() {
        const searchToggle = document.querySelector('.search-toggle');
        const searchModal = document.querySelector('.search-modal');
        const searchClose = document.querySelector('.search-close');
        const searchInput = document.querySelector('#search-input');
        
        if (!searchToggle || !searchModal) return;
        
        this.searchModal = searchModal;
        
        searchToggle.addEventListener('click', () => this.toggleSearch());
        searchClose.addEventListener('click', () => this.closeSearch());
        
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                this.closeSearch();
            }
        });
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }
    }

    toggleSearch() {
        if (!this.searchModal) return;
        
        const isVisible = this.searchModal.classList.contains('show');
        
        if (isVisible) {
            this.closeSearch();
        } else {
            this.openSearch();
        }
    }

    openSearch() {
        if (!this.searchModal) return;
        
        this.searchModal.classList.remove('hidden');
        this.searchModal.classList.add('show');
        document.body.classList.add('no-scroll');
        
        setTimeout(() => {
            const searchInput = document.querySelector('#search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }, 200);
    }

    closeSearch() {
        if (!this.searchModal) return;
        
        this.searchModal.classList.remove('show');
        document.body.classList.remove('no-scroll');
        
        setTimeout(() => {
            this.searchModal.classList.add('hidden');
        }, 200);
    }

    performSearch(query) {
        const results = document.querySelector('#search-results');
        if (!results) return;
        
        if (query.length < 2) {
            results.innerHTML = '<p style="padding: 1rem; color: var(--text-muted);">Введите минимум 2 символа для поиска</p>';
            return;
        }
        
        const content = document.querySelector('.markdown-content');
        if (!content) return;
        
        const text = content.textContent.toLowerCase();
        const queryLower = query.toLowerCase();
        
        if (text.includes(queryLower)) {
            results.innerHTML = `
                <div style="padding: 1rem;">
                    <h3 style="margin-bottom: 0.5rem; color: var(--accent-primary);">Найдено на текущей странице</h3>
                    <p style="color: var(--text-secondary);">Содержимое найдено в тексте страницы</p>
                </div>
            `;
        } else {
            results.innerHTML = '<p style="padding: 1rem; color: var(--text-muted);">Ничего не найдено</p>';
        }
    }

    // Social Links
    setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.addSocialClickEffect(link);
            });
            
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateX(-10px) scale(1.1) rotate(5deg)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
            });
        });
    }

    addSocialClickEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: socialRipple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // Utility Functions
    updatePageProgress() {
        const currentPageSpan = document.querySelector('.current-page');
        const totalPagesSpan = document.querySelector('.total-pages');
        
        if (currentPageSpan) {
            currentPageSpan.textContent = this.currentPage + 1;
        }
        
        if (totalPagesSpan) {
            totalPagesSpan.textContent = this.totalPages;
        }
    }

    showEndMessage() {
        const endMessage = document.querySelector('#end-message');
        if (!endMessage) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            
            if (scrolled >= maxScroll - 100) {
                endMessage.classList.remove('hidden');
                endMessage.classList.add('show');
            } else {
                endMessage.classList.remove('show');
                setTimeout(() => {
                    if (!endMessage.classList.contains('show')) {
                        endMessage.classList.add('hidden');
                    }
                }, 500);
            }
        });
    }
}

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes ripple {
        0% {
            opacity: 1;
            transform: scale(0);
        }
        100% {
            opacity: 0;
            transform: scale(2);
        }
    }
    
    @keyframes socialRipple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyles);

// Initialize
let themeManager;

function initTheme() {
    themeManager = new EnhancedThemeManager();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

window.addEventListener('resize', () => {
    if (themeManager) {
        themeManager.isMobile = window.innerWidth <= 768;
        
        if (themeManager.isMobile && themeManager.cursor) {
            themeManager.cursor.style.display = 'none';
        } else if (!themeManager.isMobile && themeManager.cursor) {
            themeManager.cursor.style.display = 'block';
        }
    }
});

window.EnhancedThemeManager = EnhancedThemeManager;
window.themeManager = themeManager;
