/**
 * SANTCOM WIX REPLICA - MAIN JAVASCRIPT
 * Handles scroll animations and interactions
 */

(function() {
    'use strict';

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Wait for DOM to be ready
    function initScrollAnimations() {
        // Observe all scroll-animate elements
        const animatedElements = document.querySelectorAll('.scroll-animate, .feature-card, .frame-item, .stat-item');

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Newsletter form handling
    function initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const email = form.querySelector('input[type="email"]').value;
                const checkbox = form.querySelector('input[type="checkbox"]').checked;

                if (email && checkbox) {
                    alert('Thank you for subscribing to our newsletter!');
                    form.reset();
                } else if (!checkbox) {
                    alert('Please check the subscription checkbox.');
                }
            });
        }
    }

    // Header scroll effect
    function initHeaderScroll() {
        const header = document.querySelector('.header');

        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // Parallax scrolling effect for stats section
    function initParallaxScroll() {
        const parallaxBg = document.querySelector('.stats-parallax-bg');

        if (parallaxBg) {
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;
                const statsSection = document.querySelector('.stats-section');

                if (statsSection) {
                    const sectionTop = statsSection.offsetTop;
                    const sectionHeight = statsSection.offsetHeight;
                    const windowHeight = window.innerHeight;

                    // Only apply parallax when section is in view
                    if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                        const offset = (scrolled - sectionTop) * 0.15;
                        parallaxBg.style.transform = `translateX(${offset}px)`;
                    }
                }
            });
        }
    }

    // Sync video layers for blending effect
    function initVideoSync() {
        const baseVideo = document.querySelector('.video-base');
        const overlayVideo = document.querySelector('.video-overlay');

        if (baseVideo && overlayVideo) {
            // Synchronize the overlay video with the base video
            baseVideo.addEventListener('play', () => overlayVideo.play());
            baseVideo.addEventListener('pause', () => overlayVideo.pause());
            baseVideo.addEventListener('seeked', () => {
                overlayVideo.currentTime = baseVideo.currentTime;
            });

            // Keep them in sync during playback
            baseVideo.addEventListener('timeupdate', () => {
                const timeDiff = Math.abs(baseVideo.currentTime - overlayVideo.currentTime);
                if (timeDiff > 0.1) {
                    overlayVideo.currentTime = baseVideo.currentTime;
                }
            });
        }
    }

    // Initialize all functions when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initScrollAnimations();
        initNewsletterForm();
        initHeaderScroll();
        initSmoothScroll();
        initParallaxScroll();
        initVideoSync();

        console.log('Santcom site initialized');
    }

})();

// Language Switcher Functionality
function initLanguageSwitcher() {
    const langEn = document.getElementById('lang-en');
    const langEs = document.getElementById('lang-es');
    
    if (!langEn || !langEs) return;
    
    const translations = {
        en: {
            solutions: 'Solutions',
            vision: 'Vision', 
            programs: 'Programs',
            blog: 'Blog',
            login: 'Log In',
            getStarted: 'Get Started',
            learnMore: 'Learn More',
            pages: 'Pages',
            home: 'Home',
            resources: 'Resources',
            subscribe: 'Subscribe to Our Newsletter',
            submit: 'Submit',
            followUs: 'Follow Us On:',
            heroTitle: 'Custom Built Machine Learning Models for Predictive Analytics',
            heroSubtitle: 'Use Data to Get a 360-Degree View of Your Business',
            statsTitle: 'The Construction Industry Challenge',
            stat1: 'Projects Over Budget',
            stat2: 'Projects Behind Schedule',
            stat3: 'ROI with Predictive Analytics',
            stat4: 'Annual Industry Losses',
            stat5: 'Cost Reduction Potential',
            partnersTitle: 'Our Collaborative Partnerships',
            ctaTitle: 'Ready to Build Smarter?',
            ctaDesc: 'Join the future of construction. Our AI-powered analytics platform helps you predict risks before they become problems, saving time, money, and resources on every project.'
        },
        es: {
            solutions: 'Soluciones',
            vision: 'Vision',
            programs: 'Programas', 
            blog: 'Blog',
            login: 'Iniciar Sesion',
            getStarted: 'Comenzar',
            learnMore: 'Saber Mas',
            pages: 'Paginas',
            home: 'Inicio',
            resources: 'Recursos',
            subscribe: 'Suscribase a Nuestro Boletin',
            submit: 'Enviar',
            followUs: 'Siganos En:',
            heroTitle: 'Modelos de Machine Learning Personalizados para Analisis Predictivo',
            heroSubtitle: 'Use Datos para Obtener una Vision 360 de su Negocio',
            statsTitle: 'El Desafio de la Industria de la Construccion',
            stat1: 'Proyectos Sobre Presupuesto',
            stat2: 'Proyectos con Retraso',
            stat3: 'ROI con Analisis Predictivo',
            stat4: 'Perdidas Anuales de la Industria',
            stat5: 'Potencial de Reduccion de Costos',
            partnersTitle: 'Nuestras Alianzas Colaborativas',
            ctaTitle: 'Listo para Construir de Forma Mas Inteligente?',
            ctaDesc: 'Unase al futuro de la construccion. Nuestra plataforma de analisis impulsada por IA le ayuda a predecir riesgos antes de que se conviertan en problemas, ahorrando tiempo, dinero y recursos en cada proyecto.'
        }
    };
    
    function setLanguage(lang) {
        const t = translations[lang];
        localStorage.setItem('santcom-lang', lang);
        
        // Update nav links
        const navLinks = document.querySelectorAll('.nav a');
        if (navLinks.length >= 4) {
            navLinks[0].textContent = t.solutions;
            navLinks[1].textContent = t.vision;
            navLinks[2].textContent = t.programs;
            navLinks[3].textContent = t.blog;
        }
        
        // Update header buttons
        const getStartedBtn = document.querySelector('.btn-get-started');
        if (getStartedBtn) getStartedBtn.textContent = t.getStarted;
        
        // Update hero section
        const heroH1 = document.querySelector('.hero-content h1');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroLearnMore = document.querySelector('.hero-content .btn-primary');
        if (heroH1) heroH1.textContent = t.heroTitle;
        if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
        if (heroLearnMore) heroLearnMore.textContent = t.learnMore;
        
        // Update stats section
        const statsH2 = document.querySelector('.stats-content h2');
        if (statsH2) statsH2.textContent = t.statsTitle;
        const statLabels = document.querySelectorAll('.stat-label');
        const statTexts = [t.stat1, t.stat2, t.stat3, t.stat4, t.stat5];
        statLabels.forEach((label, index) => {
            if (index < 5) label.textContent = statTexts[index];
        });
        
        // Update partnership section
        const partnerH2 = document.querySelector('.partnership-section h2');
        if (partnerH2) partnerH2.textContent = t.partnersTitle;
        
        // Update CTA section
        const ctaH2 = document.querySelector('.cta-section h2');
        const ctaP = document.querySelector('.cta-section p');
        const ctaBtn = document.querySelector('.cta-section .btn-primary');
        if (ctaH2) ctaH2.textContent = t.ctaTitle;
        if (ctaP) ctaP.textContent = t.ctaDesc;
        if (ctaBtn) ctaBtn.textContent = t.getStarted;
        
        // Update footer
        const footerCols = document.querySelectorAll('.footer-col h4');
        if (footerCols.length >= 3) {
            footerCols[0].textContent = t.pages;
            footerCols[1].textContent = t.resources;
            footerCols[2].textContent = t.subscribe;
        }
        
        const footerH5 = document.querySelector('.social-links h5');
        if (footerH5) footerH5.textContent = t.followUs;
        
        const submitBtn = document.querySelector('.newsletter-form .btn-submit');
        if (submitBtn) submitBtn.textContent = t.submit;
        
        // Update button states
        langEn.classList.toggle('active', lang === 'en');
        langEs.classList.toggle('active', lang === 'es');
    }
    
    // Event listeners
    langEn.addEventListener('click', () => setLanguage('en'));
    langEs.addEventListener('click', () => setLanguage('es'));
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('santcom-lang');
    if (savedLang) {
        setLanguage(savedLang);
    }
}

// Initialize language switcher on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
} else {
    initLanguageSwitcher();
}
