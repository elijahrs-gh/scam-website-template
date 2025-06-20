document.addEventListener('DOMContentLoaded', function() {
    initConfetti();
    initCountdown();
    initPrizeAnimation();
    initClaimButton();
    generateRandomTicketNumber();
});

function initConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8'];
    
    for (let i = 0; i < 100; i++) {
        createConfettiPiece(confettiContainer, colors);
    }
}

function createConfettiPiece(container, colors) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
    confetti.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(confetti);
    
    if (!document.querySelector('#confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes fall {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function initCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    function updateCountdown() {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        
        const totalSeconds = Math.floor((midnight - now) / 1000);
        
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initPrizeAnimation() {
    const prizeElement = document.getElementById('prize-amount');
    const targetAmount = 1000000;
    let currentAmount = 0;
    const increment = targetAmount / 100;
    
    function animateAmount() {
        if (currentAmount < targetAmount) {
            currentAmount += increment;
            prizeElement.textContent = Math.floor(currentAmount).toLocaleString();
            requestAnimationFrame(animateAmount);
        } else {
            prizeElement.textContent = targetAmount.toLocaleString();
        }
    }
    
    setTimeout(animateAmount, 500);
}

function generateRandomTicketNumber() {
    const ticketElement = document.getElementById('ticket-number');
    const randomNum = Math.floor(Math.random() * 1000000000);
    ticketElement.textContent = `LT-2025-${randomNum.toString().padStart(9, '0')}`;
}

function initClaimButton() {
    const claimButton = document.getElementById('claim-btn');
    
    claimButton.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        showClaimModal();
    });
}

function showClaimModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <div style="font-size: 3em; margin-bottom: 20px;">🎉</div>
        <h2 style="color: #2c5aa0; margin-bottom: 20px;">Prize Claim Initiated!</h2>
        <p style="margin-bottom: 20px; color: #666;">
            Your claim has been processed. A verification specialist will contact you within 24 hours.
        </p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <strong>Claim Reference:</strong> #${Math.random().toString(36).substr(2, 9).toUpperCase()}
        </div>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: #27ae60; color: white; border: none; padding: 12px 24px; 
                       border-radius: 25px; cursor: pointer; font-weight: bold;">
            Continue
        </button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function addDynamicEffects() {
    const numberBalls = document.querySelectorAll('.number-ball');
    
    setInterval(() => {
        const randomBall = numberBalls[Math.floor(Math.random() * numberBalls.length)];
        randomBall.style.boxShadow = '0 0 20px #ffd700';
        
        setTimeout(() => {
            randomBall.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        }, 1000);
    }, 3000);
    
    const winnerText = document.querySelector('.winner-text');
    const originalText = winnerText.textContent;
    winnerText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            winnerText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 2000);
}

setTimeout(addDynamicEffects, 1000);

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.ticket-info, .winning-numbers, .claim-section').forEach(el => {
        observer.observe(el);
    });
    
    const slideStyle = document.createElement('style');
    slideStyle.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(slideStyle);
}

setTimeout(addScrollAnimations, 500);