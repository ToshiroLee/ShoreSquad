// ===== SHORESQUAD APP INITIALIZATION =====
class ShoreSquadApp {
    constructor() {
        this.init();
    }

    init() {
        console.log('🌊 ShoreSquad App Initialized!');

        // Initialize all modules
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupInteractiveElements();
        this.setupPerformanceOptimizations();
        this.setupAccessibility();

        // Simulate loading states
        this.handleLoadingStates();

        console.log('✅ All systems ready! Let\'s clean some beaches! 🏖️');
    }

    // ===== NAVIGATION FUNCTIONALITY =====
    setupNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-links a');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.setAttribute('aria-expanded',
                    navToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
                );
            });
        }

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        // Close mobile menu if open
                        navMenu?.classList.remove('active');

                        // Smooth scroll with offset for fixed navbar
                        const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Active navigation highlighting
        this.updateActiveNavigation();
        window.addEventListener('scroll', throttle(() => {
            this.updateActiveNavigation();
        }, 100));
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

        let currentSection = '';
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop &&
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // ===== SCROLL EFFECTS =====
    setupScrollEffects() {
        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
        }, 10));

        // Reveal animations on scroll
        this.setupScrollReveal();
    }

    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe elements for reveal animations
        const revealElements = document.querySelectorAll(
            '.feature-card, .hero-card, .beach-item, .cta-content'
        );

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(el);
        });

        // Add revealed styles
        const style = document.createElement('style');
        style.textContent = `
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ===== INTERACTIVE ELEMENTS =====
    setupInteractiveElements() {
        this.setupButtons();
        this.setupCards();
        this.setupMapInteractions();
        this.setupFormInteractions();
    }

    setupButtons() {
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                // Create ripple element
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    pointer-events: none;
                `;

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupCards() {
        // Add interactive hover effects to cards
        const cards = document.querySelectorAll('.feature-card, .beach-item');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupMapInteractions() {
        const mapPlaceholder = document.querySelector('.map-placeholder');
        const mapLoading = document.querySelector('.map-loading');

        if (mapPlaceholder && mapLoading) {
            mapPlaceholder.addEventListener('click', () => {
                mapLoading.innerHTML = `
                    <div class="loading-animation">
                        <i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: var(--ocean-blue); margin-bottom: 1rem;"></i>
                        <p>Loading interactive map...</p>
                        <small>This would integrate with a real mapping service like Mapbox or Google Maps</small>
                    </div>
                `;

                // Simulate map loading
                setTimeout(() => {
                    mapLoading.innerHTML = `
                        <div class="map-demo">
                            <i class="fas fa-map-marked-alt" style="font-size: 3rem; color: var(--kelp-green); margin-bottom: 1rem;"></i>
                            <p><strong>Interactive Map Ready!</strong></p>
                            <small>🏖️ 12 beaches nearby • 🌤️ Perfect cleanup weather • 👥 3 active crews</small>
                        </div>
                    `;
                }, 2000);
            });
        }
    }

    setupFormInteractions() {
        // Enhanced form interactions
        const inputs = document.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            // Floating label effect
            input.addEventListener('focus', function () {
                this.parentElement?.classList.add('focused');
            });

            input.addEventListener('blur', function () {
                if (!this.value) {
                    this.parentElement?.classList.remove('focused');
                }
            });

            // Real-time validation feedback
            input.addEventListener('input', function () {
                this.classList.remove('error', 'success');

                if (this.type === 'email') {
                    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
                    this.classList.add(isValid ? 'success' : 'error');
                }
            });
        });
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    setupPerformanceOptimizations() {
        // Lazy loading for images
        this.setupLazyLoading();

        // Intersection Observer for animations
        this.setupIntersectionObserver();

        // Debounced resize handler
        window.addEventListener('resize', debounce(() => {
            this.handleResize();
        }, 250));
    }

    setupLazyLoading() {
        // Image lazy loading with placeholder
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    setupIntersectionObserver() {
        // Optimize animations based on viewport visibility
        const animatedElements = document.querySelectorAll('.hero-card');

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        });

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }

    handleResize() {
        // Handle responsive layout adjustments
        const isMobile = window.innerWidth < 768;
        document.body.classList.toggle('mobile', isMobile);
    }

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    setupAccessibility() {
        // Keyboard navigation enhancement
        this.setupKeyboardNavigation();

        // Screen reader announcements
        this.setupScreenReaderSupport();

        // Focus management
        this.setupFocusManagement();

        // Reduced motion preferences
        this.respectMotionPreferences();
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation for interactive elements
        document.addEventListener('keydown', (e) => {
            // Skip to main content (accessibility shortcut)
            if (e.key === 'Tab' && e.shiftKey && e.ctrlKey) {
                e.preventDefault();
                const mainContent = document.querySelector('main') || document.querySelector('.hero');
                mainContent?.focus();
            }

            // Enhanced button keyboard interaction
            if (e.key === 'Enter' || e.key === ' ') {
                const focusedElement = document.activeElement;
                if (focusedElement?.classList.contains('btn') ||
                    focusedElement?.classList.contains('nav-toggle')) {
                    e.preventDefault();
                    focusedElement.click();
                }
            }
        });
    }

    setupScreenReaderSupport() {
        // Create live region for dynamic announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(liveRegion);

        this.liveRegion = liveRegion;
    }

    announce(message) {
        // Announce messages to screen readers
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
            setTimeout(() => {
                this.liveRegion.textContent = '';
            }, 1000);
        }
    }

    setupFocusManagement() {
        // Trap focus in modal dialogs (when implemented)
        document.addEventListener('keydown', (e) => {
            const modal = document.querySelector('.modal.active');
            if (modal && e.key === 'Tab') {
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement?.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement?.focus();
                    }
                }
            }
        });
    }

    respectMotionPreferences() {
        // Disable animations if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            document.documentElement.style.setProperty('--transition-fast', '0ms');
            document.documentElement.style.setProperty('--transition-base', '0ms');
            document.documentElement.style.setProperty('--transition-slow', '0ms');
        }
    }

    // ===== LOADING STATES & UX =====
    handleLoadingStates() {
        // Simulate app loading
        const loader = this.createLoader();
        document.body.appendChild(loader);

        // Remove loader after initialization
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
            this.announce('ShoreSquad app loaded successfully');
        }, 1500);
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--ocean-blue) 0%, var(--surf-cyan) 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
            font-family: 'Poppins', sans-serif;
            transition: opacity 0.3s ease;
        `;

        loader.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-water" style="font-size: 4rem; margin-bottom: 1rem; animation: pulse 2s infinite;"></i>
                <h2 style="margin-bottom: 0.5rem;">ShoreSquad</h2>
                <p style="opacity: 0.8;">Preparing your beach cleanup adventure...</p>
                <div style="width: 200px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; margin-top: 1rem; overflow: hidden;">
                    <div style="width: 100%; height: 100%; background: white; border-radius: 2px; animation: loading 2s ease-in-out;"></div>
                </div>
            </div>
        `;

        // Add loading animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.7; }
            }
            @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);

        return loader;
    }

    // ===== NEA WEATHER API INTEGRATION =====
    async fetchNEAWeatherData() {
        try {
            // Fetch current weather conditions from NEA
            const [weatherResponse, forecastResponse] = await Promise.all([
                fetch('https://api.data.gov.sg/v1/environment/air-temperature'),
                fetch('https://api.data.gov.sg/v1/environment/24-hour-weather-forecast')
            ]);

            const weatherData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();

            return {
                current: this.processCurrentWeather(weatherData),
                forecast: this.processForecast(forecastData)
            };
        } catch (error) {
            console.error('Weather API Error:', error);
            return this.getFallbackWeatherData();
        }
    }

    processCurrentWeather(data) {
        if (!data.items || data.items.length === 0) {
            return this.getFallbackWeatherData().current;
        }

        const latest = data.items[0];
        const readings = latest.readings;

        // Find reading closest to Pasir Ris (East region)
        const eastReading = readings.find(r =>
            r.station_id === 'S24' || // Pasir Ris
            r.station_id === 'S06' || // Changi
            r.station_id === 'S43'    // Kim Chuan Road
        ) || readings[0];

        return {
            temperature: Math.round(eastReading.value),
            condition: this.getConditionFromTemp(eastReading.value),
            timestamp: latest.timestamp,
            location: 'Pasir Ris Area'
        };
    }

    processForecast(data) {
        if (!data.items || data.items.length === 0) {
            return this.getFallbackWeatherData().forecast;
        }

        const forecast = data.items[0].forecasts;
        return forecast.slice(0, 7).map(day => ({
            date: day.date,
            condition: day.forecast.toLowerCase(),
            tempHigh: day.temperature.high,
            tempLow: day.temperature.low,
            humidity: day.relative_humidity,
            windDirection: day.wind.direction,
            windSpeed: day.wind.speed
        }));
    }

    getConditionFromTemp(temp) {
        if (temp > 32) return 'hot';
        if (temp > 28) return 'warm';
        if (temp > 24) return 'pleasant';
        return 'cool';
    }

    getFallbackWeatherData() {
        return {
            current: {
                temperature: 28,
                condition: 'pleasant',
                location: 'Pasir Ris Area',
                timestamp: new Date().toISOString()
            },
            forecast: this.generateFallbackForecast()
        };
    }

    generateFallbackForecast() {
        const conditions = ['sunny', 'partly cloudy', 'cloudy', 'light rain'];
        const forecast = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            forecast.push({
                date: date.toISOString().split('T')[0],
                condition: conditions[Math.floor(Math.random() * conditions.length)],
                tempHigh: Math.round(28 + Math.random() * 6),
                tempLow: Math.round(24 + Math.random() * 4),
                humidity: Math.round(60 + Math.random() * 25),
                windDirection: 'NE',
                windSpeed: Math.round(10 + Math.random() * 10)
            });
        }

        return forecast;
    }

    // ===== WEATHER UI RENDERING =====
    async initializeWeatherSection() {
        const weatherData = await this.fetchNEAWeatherData();
        this.renderCurrentWeather(weatherData.current);
        this.renderForecast(weatherData.forecast);
        this.renderCleanupRecommendation(weatherData);
    }

    renderCurrentWeather(current) {
        const currentWeatherEl = document.querySelector('.current-weather');
        const weatherIcon = this.getWeatherIcon(current.condition);

        currentWeatherEl.innerHTML = `
            <div class="current-weather-content">
                <div class="weather-main">
                    <div class="weather-icon">
                        <i class="${weatherIcon}"></i>
                    </div>
                    <div class="weather-info">
                        <h3>${current.temperature}°C</h3>
                        <p class="condition">${this.capitalizeFirst(current.condition)}</p>
                        <p class="location">📍 ${current.location}</p>
                    </div>
                </div>
                <div class="weather-details">
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>Updated: ${this.formatTime(current.timestamp)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderForecast(forecast) {
        const forecastGrid = document.getElementById('forecast-grid');

        forecastGrid.innerHTML = forecast.map(day => `
            <div class="forecast-day">
                <div class="day-name">${this.formatDay(day.date)}</div>
                <div class="weather-icon small">
                    <i class="${this.getWeatherIcon(day.condition)}"></i>
                </div>
                <div class="temp-range">
                    <span class="temp-high">${day.tempHigh}°</span>
                    <span class="temp-low">${day.tempLow}°</span>
                </div>
                <div class="condition">${this.capitalizeFirst(day.condition)}</div>
                <div class="wind-info">
                    <i class="fas fa-wind"></i>
                    <span>${day.windSpeed} km/h</span>
                </div>
            </div>
        `).join('');
    }

    renderCleanupRecommendation(weatherData) {
        const adviceEl = document.getElementById('cleanup-advice');
        const recommendation = this.generateCleanupAdvice(weatherData);

        adviceEl.innerHTML = `
            <div class="advice-rating ${recommendation.rating}">
                <i class="${recommendation.icon}"></i>
                <strong>${recommendation.title}</strong>
            </div>
            <p>${recommendation.message}</p>
        `;
    }

    generateCleanupAdvice(weatherData) {
        const current = weatherData.current;
        const forecast = weatherData.forecast;
        const todayForecast = forecast[0];

        // Check conditions for cleanup suitability
        const temp = current.temperature;
        const isRaining = todayForecast.condition.includes('rain');
        const windSpeed = todayForecast.windSpeed;

        if (isRaining) {
            return {
                rating: 'poor',
                icon: 'fas fa-cloud-rain',
                title: 'Not Ideal for Cleanup',
                message: 'Rain expected today. Consider rescheduling for better conditions.'
            };
        }

        if (temp > 35 || windSpeed > 25) {
            return {
                rating: 'caution',
                icon: 'fas fa-exclamation-triangle',
                title: 'Cleanup with Caution',
                message: temp > 35 ?
                    'Very hot conditions. Bring extra water and take frequent breaks.' :
                    'Strong winds expected. Secure loose items and be extra careful.'
            };
        }

        if (temp >= 25 && temp <= 32 && windSpeed <= 20) {
            return {
                rating: 'excellent',
                icon: 'fas fa-thumbs-up',
                title: 'Perfect Cleanup Weather!',
                message: 'Ideal conditions for beach cleanup. Great temperature and gentle winds.'
            };
        }

        return {
            rating: 'good',
            icon: 'fas fa-check-circle',
            title: 'Good Cleanup Conditions',
            message: 'Weather looks favorable for outdoor activities. Have a great cleanup!'
        };
    }

    getWeatherIcon(condition) {
        const iconMap = {
            'sunny': 'fas fa-sun',
            'clear': 'fas fa-sun',
            'partly cloudy': 'fas fa-cloud-sun',
            'cloudy': 'fas fa-cloud',
            'overcast': 'fas fa-cloud',
            'light rain': 'fas fa-cloud-rain',
            'rain': 'fas fa-cloud-rain',
            'heavy rain': 'fas fa-cloud-showers-heavy',
            'thunderstorm': 'fas fa-bolt',
            'hot': 'fas fa-thermometer-full',
            'warm': 'fas fa-thermometer-half',
            'pleasant': 'fas fa-sun',
            'cool': 'fas fa-thermometer-quarter'
        };

        return iconMap[condition.toLowerCase()] || 'fas fa-sun';
    }

    formatDay(dateStr) {
        const date = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

        return date.toLocaleDateString('en-SG', { weekday: 'short' });
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-SG', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // ===== CREW MANAGEMENT =====
    initializeCrewFeatures() {
        // Simulate crew data and interactions
        const crewData = {
            members: [
                { name: 'Alex', avatar: '👩‍🌾', joinedRecently: true },
                { name: 'Jordan', avatar: '🧑‍🎓', isLeader: true },
                { name: 'Sam', avatar: '👨‍💼', contributions: 15 }
            ],
            totalCleanups: 23,
            impact: '2.3 tons collected'
        };

        console.log('🤝 Crew features initialized:', crewData);
        return crewData;
    }
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== FEATURE DEMONSTRATIONS =====
function demonstrateFeatures() {
    console.log('🚀 ShoreSquad Features Demo:');

    // Simulate weather check
    setTimeout(() => {
        console.log('☀️ Weather: Perfect conditions for beach cleanup!');
    }, 2000);

    // Simulate crew notifications
    setTimeout(() => {
        console.log('👥 Crew Update: 3 new members joined your cleanup crew!');
    }, 4000);

    // Simulate cleanup event
    setTimeout(() => {
        console.log('📍 Event Alert: Beach cleanup starting at Bondi Beach in 1 hour!');
    }, 6000);
}

// ===== APP INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main app
    window.shoreSquadApp = new ShoreSquadApp();

    // Run feature demonstrations
    demonstrateFeatures();

    // Service Worker registration (for PWA capabilities)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            console.log('📱 PWA capabilities ready (Service Worker would be registered here)');
        });
    }

    // Initialize weather section
    setTimeout(() => {
        window.shoreSquadApp.initializeWeatherSection();
    }, 1000);

    // Initialize crew features
    setTimeout(() => {
        window.shoreSquadApp.initializeCrewFeatures();
    }, 3000);
});

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShoreSquadApp;
}