// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Gallery Video Playback & Fullscreen
document.querySelectorAll('.video-card video').forEach(video => {
    // Play/Pause on click
    video.addEventListener('click', () => {
        togglePlay(video);
    });

    // Fullscreen button
    const container = video.parentElement;
    const fsBtn = container.querySelector('.fs-btn');
    if (fsBtn) {
        fsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { /* Safari */
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { /* IE11 */
                video.msRequestFullscreen();
            }
        });
    }
});

function togglePlay(video) {
    const hint = video.parentElement.querySelector('.play-hint');
    if (video.paused) {
        // Pause other videos
        document.querySelectorAll('video').forEach(v => {
            if (v !== video) {
                v.pause();
                const otherHint = v.parentElement.querySelector('.play-hint');
                if (otherHint) otherHint.textContent = '▶ Play';
            }
        });
        
        video.play();
        video.muted = false;
        if (hint) hint.textContent = '|| Pause';
    } else {
        video.pause();
        if (hint) hint.textContent = '▶ Play';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add reveal classes to elements
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.service-card, .section-title, .check-list li, .image-box');
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});

// Dynamic header background on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
});
