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
