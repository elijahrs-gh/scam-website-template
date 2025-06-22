const claimCreditsBtn = document.getElementById('claimCreditsBtn');
const getStartedBtn = document.getElementById('getStartedBtn');
const signInPage = document.getElementById('signInPage');
const mainContent = document.getElementById('mainContent');
const backToHomeBtn = document.getElementById('backToHome');
const signInForm = document.getElementById('signInForm');
const signInBtn = document.getElementById('signInBtn');

function showSignInPage() {
    mainContent.style.display = 'none';
    signInPage.style.display = 'block';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function showMainPage() {
    signInPage.style.display = 'none';
    mainContent.style.display = 'block';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleSignIn(e) {
    e.preventDefault();
    const email = document.getElementById('signInEmail').value.trim();
    const password = document.getElementById('signInPassword').value.trim();
    
    if (!email || !password) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    signInBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    signInBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Welcome back! Redirecting to dashboard...', 'success');
        setTimeout(() => {
            window.location.href = '#dashboard';
        }, 2000);
    }, 1500);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #dc3545, #c82333)'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}" style="margin-right: 8px;"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
        if (type === 'error') {
            signInBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
            signInBtn.disabled = false;
        }
    }, 3000);
}

claimCreditsBtn.addEventListener('click', showSignInPage);
getStartedBtn.addEventListener('click', showSignInPage);
backToHomeBtn.addEventListener('click', showMainPage);
signInForm.addEventListener('submit', handleSignIn);

document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToTop();
    });
});

document.querySelector('.navbar .btn-secondary').addEventListener('click', showSignInPage);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#dashboard') return;
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            scrollToTop();
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .feature-card {
        opacity: 0;
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

function createRandomCloud() {
    const cloud = document.createElement('div');
    cloud.className = 'cloud dynamic-cloud';
    
    const size = Math.random() * 60 + 40;
    const top = Math.random() * 80 + 10;
    const duration = Math.random() * 20 + 20;
    
    cloud.style.cssText = `
        width: ${size}px;
        height: ${size * 0.4}px;
        top: ${top}%;
        left: -${size}px;
        animation: float ${duration}s infinite linear;
        animation-delay: ${Math.random() * 10}s;
    `;
    
    cloud.innerHTML = `
        <style>
            .dynamic-cloud::before {
                width: ${size * 0.5}px;
                height: ${size * 0.5}px;
                top: -${size * 0.25}px;
                left: ${size * 0.1}px;
            }
            .dynamic-cloud::after {
                width: ${size * 0.6}px;
                height: ${size * 0.4}px;
                top: -${size * 0.15}px;
                right: ${size * 0.1}px;
            }
        </style>
    `;
    
    document.querySelector('.clouds-container').appendChild(cloud);
    
    setTimeout(() => {
        cloud.remove();
    }, duration * 1000);
}

setInterval(createRandomCloud, 8000);

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number && !statNumber.hasAttribute('data-animated')) {
                statNumber.setAttribute('data-animated', 'true');
                animateCounter(statNumber, number);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});