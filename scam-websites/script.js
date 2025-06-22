const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollEffects();
    
    controlScrolling('home');
});

function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            showTab(targetTab);
            
            navMenu.classList.remove('active');
        });
    });
    
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', function() {
            showTab('home');
            
            navMenu.classList.remove('active');
        });
        
        navLogo.style.cursor = 'pointer';
    }
}

function showTab(tabName) {
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const targetContent = document.getElementById(tabName);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    const targetLink = document.querySelector(`[data-tab="${tabName}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    controlScrolling(tabName);
}

function controlScrolling(tabName) {
    const body = document.body;
    
    if (tabName === 'home' || tabName === 'about') {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

function initializeMobileMenu() {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

function initializeScrollEffects() {
    document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.about-card, .example-card, .tip-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
}

function addClickAnimation(element) {
    element.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
}

document.querySelectorAll('.btn, .filter-btn').forEach(button => {
    addClickAnimation(button);
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    const values = ['2.6M+', '$12.5B', '25%'];
    
    stats.forEach((stat, index) => {
        const targetValue = values[index];
        let currentValue = 0;
        const increment = 1;
        const duration = 2000;
        const steps = duration / 16;
        
        const timer = setInterval(() => {
            if (currentValue < steps) {
                currentValue += increment;
                if (index === 0) {
                    stat.textContent = (currentValue * 2.6 / steps).toFixed(1) + 'M+';
                } else if (index === 1) {
                    stat.textContent = '$' + (currentValue * 12.5 / steps).toFixed(1) + 'B';
                } else {
                    stat.textContent = (currentValue * 25 / steps).toFixed(0) + '%';
                }
            } else {
                stat.textContent = targetValue;
                clearInterval(timer);
            }
        }, 16);
    });
}

const homeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'home') {
            animateStats();
            homeObserver.unobserve(entry.target);
        }
    });
});

const homeSection = document.getElementById('home');
if (homeSection) {
    homeObserver.observe(homeSection);
}

document.querySelectorAll('.example-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    Object.assign(toast.style, {
        position: 'fixed',
        top: '90px',
        right: '20px',
        background: type === 'danger' ? 'var(--danger-color)' : 'var(--success-color)',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '8px',
        zIndex: '9999',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

document.querySelectorAll('.example-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        showToast(`This is an educational example of: ${title}`, 'info');
    });
});

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

const debouncedScrollHandler = debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);