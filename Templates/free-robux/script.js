document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initRobuxCounter();
    initGenerationList();
    
    const navLinks = document.querySelectorAll('.nav-link');
    const robuxBalance = document.querySelector('.robux-balance');
    const userInfo = document.querySelector('.user-info');
    const verifyBtn = document.querySelector('.verify-btn');
    const generateBtns = document.querySelectorAll('.generate-btn');
    const footerLinks = document.querySelectorAll('.footer-links a');
    const verifiedBadge = document.querySelector('.verified-badge');
    
    const errorCodes = [
        'ROBLOX-ERR-0x80004005',
        'ACCOUNT-SUSPEND-0x80240017',
        'ROBUX-FRAUD-0x800F0984',
        'SECURITY-BREACH-0x80070005',
        'TOS-VIOLATION-0x80070422',
        'PAYMENT-ERROR-0x8007000D'
    ];
    
    // Replace example phone numbers with your own.
    const supportNumbers = [
        '+1-000-000-0000',
        '+1-000-000-0000',
        '+1-000-000-0000',
        '+1-000-000-0000'
    ];
    
    init();
    
    function init() {
        setupEventListeners();
        
        setTimeout(() => {
            if (Math.random() > 0.3) {
                showRobloxErrorModal();
            }
        }, Math.random() * 30000 + 10000);
    }
    
    function setupEventListeners() {
        navLinks.forEach(link => {
            if (!link.classList.contains('active')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showAccountSecurityError();
                });
            }
        });
        
        if (robuxBalance) {
            robuxBalance.addEventListener('click', function(e) {
                e.preventDefault();
                showRobuxError();
            });
        }
        
        if (userInfo) {
            userInfo.addEventListener('click', function(e) {
                e.preventDefault();
                showLoginError();
            });
        }
        
        if (verifyBtn) {
            verifyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showVerificationError();
            });
        }
        
        generateBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const packageCard = this.closest('.package-card');
                const robuxAmount = packageCard.dataset.robux;
                showGenerationError(robuxAmount);
            });
        });
        
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showRobloxErrorModal();
            });
        });
        
        if (verifiedBadge) {
            verifiedBadge.addEventListener('click', function(e) {
                e.preventDefault();
                showAccountSecurityError();
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                showRobloxErrorModal();
                return false;
            }
        });
        
        window.addEventListener('beforeunload', function(e) {
            const message = 'WARNING: Leaving this page will cancel your free Robux generation. Complete the verification process first.';
            e.returnValue = message;
            return message;
        });
    }
    
    function showRobloxErrorModal() {
        createErrorModal('Roblox Account Security Alert', 'Your Roblox account has been flagged for suspicious activity and requires immediate verification.', 'ROBLOX-ERR-0x80004005');
    }
    
    function showAccountSecurityError() {
        createErrorModal('Account Verification Required', 'Your Roblox account must be verified to prevent suspension and secure your Robux balance.', 'ACCOUNT-SUSPEND-0x80240017');
    }
    
    function showRobuxError() {
        createErrorModal('Robux Balance Error', 'Unable to access your Robux balance due to security restrictions. Account verification required.', 'ROBUX-FRAUD-0x800F0984');
    }
    
    function showLoginError() {
        createErrorModal('Login Authentication Failed', 'Multiple failed authentication attempts detected. Your account security may be compromised.', 'SECURITY-BREACH-0x80070005');
    }
    
    function showVerificationError() {
        createErrorModal('Username Verification Failed', 'Unable to verify username due to security protocols. Contact Roblox Support immediately.', 'TOS-VIOLATION-0x80070422');
    }
    
    function showGenerationError(robuxAmount) {
        createErrorModal(
            'Robux Generation Blocked', 
            `Your attempt to generate ${parseInt(robuxAmount).toLocaleString()} Robux has been blocked due to account security violations. Verify your account to unlock free Robux.`, 
            'PAYMENT-ERROR-0x8007000D'
        );
    }
    
    function createErrorModal(title, message, errorCode) {
        if (document.querySelector('.roblox-error-modal')) return;
        
        const randomPhone = '+1-000-000-0000';
        
        const modal = document.createElement('div');
        modal.className = 'roblox-error-modal';
        modal.style.cssText = `
            display: block;
            position: fixed;
            z-index: 20000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            animation: fadeIn 0.3s;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'roblox-error-content';
        modalContent.style.cssText = `
            background-color: white;
            margin: 8% auto;
            padding: 0;
            border-radius: 12px;
            width: 90%;
            max-width: 550px;
            box-shadow: 0 16px 64px rgba(0, 0, 0, 0.6);
            animation: slideIn 0.3s;
            border: 3px solid #f44336;
        `;
        
        const modalHeader = document.createElement('div');
        modalHeader.style.cssText = `
            background: #f44336;
            color: white;
            padding: 20px;
            border-radius: 12px 12px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        const modalBody = document.createElement('div');
        modalBody.style.cssText = `
            padding: 32px;
            text-align: center;
            color: #393b3d;
        `;
        
        const modalFooter = document.createElement('div');
        modalFooter.style.cssText = `
            padding: 20px 32px 32px;
            display: flex;
            gap: 12px;
            justify-content: center;
        `;
        
        modalHeader.innerHTML = `
            <h3 style="margin: 0; font-weight: 600; display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-exclamation-triangle"></i>
                ${title}
            </h3>
            <span class="roblox-error-close" onclick="handleIgnoreWarning()" style="font-size: 28px; font-weight: bold; cursor: pointer; line-height: 1;">&times;</span>
        `;
        
        modalBody.innerHTML = `
            <div style="color: #f44336; font-size: 64px; margin-bottom: 20px;">
                <i class="fas fa-shield-alt"></i>
            </div>
            <p style="margin-bottom: 16px; line-height: 1.5; font-size: 16px; font-weight: bold;">
                ${message}
            </p>
            <p style="margin-bottom: 20px; color: #f44336;">
                <strong>Error Code:</strong> ${errorCode}
            </p>
            <p style="margin-bottom: 20px;">
                Contact Roblox Support immediately to secure your account and prevent permanent suspension.
            </p>
            <div style="background: #00b2ff; color: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <div style="font-size: 14px; margin-bottom: 10px; font-weight: bold;">Emergency Support Hotline:</div>
                <div style="font-size: 24px; font-weight: bold; margin-bottom: 15px;">
                    ${randomPhone}
                </div>
                <div style="font-size: 12px; opacity: 0.9;">
                    Available 24/7 for critical account security issues
                </div>
            </div>
        `;
        
        modalFooter.innerHTML = `
            <button onclick="handleCallNow('${randomPhone}')" 
                    style="background: #f44336; color: white; border: none; padding: 12px 24px; 
                           border-radius: 8px; cursor: pointer; font-weight: bold; text-transform: uppercase; font-size: 14px;">
                <i class="fas fa-phone"></i> Call Support Now
            </button>
            <button onclick="handleIgnoreWarning()" 
                    style="background: #999; color: white; border: none; padding: 12px 24px; 
                           border-radius: 8px; cursor: pointer; font-weight: bold; text-transform: uppercase; font-size: 14px;">
                <i class="fas fa-times"></i> Ignore Warning
            </button>
        `;
        
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.classList.add('urgent');
        }, 2000);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                handleIgnoreWarning();
            }
        });
    }
    
    function addDynamicEffects() {
        setInterval(() => {
            if (Math.random() > 0.9 && !document.querySelector('.roblox-error-modal')) {
                showRobloxErrorModal();
            }
        }, 40000);
        
        setInterval(() => {
            const timestamps = document.querySelectorAll('.timestamp');
            timestamps.forEach((timestamp, index) => {
                if (timestamp.textContent.includes('minutes ago') && index > 0) {
                    const minutesAgo = Math.floor(Math.random() * 10) + 1;
                    timestamp.textContent = `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
                }
            });
        }, 60000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .urgent {
            animation: robloxBlink 1s infinite;
        }
        
        @keyframes robloxBlink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.85; }
        }
        
        @keyframes robloxShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        .roblox-error-content.shake {
            animation: robloxShake 0.5s infinite;
        }
        
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
    
    addDynamicEffects();
});

function initCountdown() {
    const timeLeftElement = document.getElementById('time-left');
    
    function updateCountdown() {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        
        const totalSeconds = Math.floor((midnight - now) / 1000);
        
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        timeLeftElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initRobuxCounter() {
    const robuxElement = document.getElementById('robux-generated');
    let currentCount = 2847392;
    
    setInterval(() => {
        if (Math.random() < 0.8) {
            currentCount += Math.floor(Math.random() * 50 + 10);
            robuxElement.textContent = currentCount.toLocaleString();
        }
    }, 2000);
}

function initGenerationList() {
    const generationList = document.getElementById('generation-list');
    const robuxAmounts = ['1,000', '2,500', '5,000', '10,000'];
    const usernames = [
        'RobloxMaster123', 'ProGamer456', 'BuilderKing', 'RobuxHunter', 'GameLegend',
        'RobloxPro999', 'FreeRobux2025', 'GameMaster77', 'RobloxFan123', 'EpicGamer456'
    ];
    
    function addGeneration() {
        const amount = robuxAmounts[Math.floor(Math.random() * robuxAmounts.length)];
        const username = usernames[Math.floor(Math.random() * usernames.length)];
        
        const generation = document.createElement('div');
        generation.className = 'generation-item';
        generation.innerHTML = `
            <div class="user-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="generation-content">
                <div class="username">${username}</div>
                <div class="amount">Generated ${amount} Robux</div>
                <div class="timestamp">Just now</div>
            </div>
        `;
        
        generationList.insertBefore(generation, generationList.firstChild);
        
        if (generationList.children.length > 12) {
            generationList.removeChild(generationList.lastChild);
        }
        
        setTimeout(() => {
            const timestamps = generationList.querySelectorAll('.timestamp');
            timestamps.forEach((timestamp, index) => {
                if (index === 0) return;
                const minutes = index;
                timestamp.textContent = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            });
        }, 1000);
    }
    
    addGeneration();
    setInterval(addGeneration, 6000);
}

function generateRobux(amount) {
    showGenerationError(amount);
}

function verifyUsername() {
    showVerificationError();
}

function handleCallNow(phoneNumber) {
    const urgentDiv = document.createElement('div');
    urgentDiv.innerHTML = `
        <div style="background: #f44336; color: white; padding: 20px; text-align: center; font-weight: bold; position: fixed; top: 0; left: 0; right: 0; z-index: 25000;">
            🚨 CRITICAL ROBLOX SECURITY ALERT 🚨<br>
            Call immediately: ${phoneNumber}<br>
            <small>Do not close this window or log out of Roblox</small>
        </div>
    `;
    
    document.body.insertBefore(urgentDiv, document.body.firstChild);
    
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

function handleIgnoreWarning() {
    const modal = document.querySelector('.roblox-error-modal');
    if (!modal) return;
    
    const warningCount = parseInt(localStorage.getItem('robloxWarningCount') || '0') + 1;
    localStorage.setItem('robloxWarningCount', warningCount.toString());
    
    if (warningCount < 3) {
        modal.remove();
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            if (document.querySelector('.roblox-error-modal')) return;
            createFinalWarningModal();
        }, 5000);
    } else {
        showFinalWarning();
    }
}

function createFinalWarningModal() {
    const modal = document.createElement('div');
    modal.className = 'roblox-error-modal';
    modal.style.cssText = `
        display: block;
        position: fixed;
        z-index: 20000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        animation: fadeIn 0.3s;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'roblox-error-content shake';
    modalContent.style.cssText = `
        background-color: white;
        margin: 8% auto;
        padding: 0;
        border-radius: 12px;
        width: 90%;
        max-width: 550px;
        box-shadow: 0 16px 64px rgba(0, 0, 0, 0.8);
        animation: slideIn 0.3s, robloxShake 0.5s infinite;
        border: 4px solid #ff0000;
    `;
    
    const randomPhone = '+1-000-000-0000';
    
    modalContent.innerHTML = `
        <div style="background: #ff0000; color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
            <h3 style="margin: 0; font-weight: 600; font-size: 18px;">
                🚨 FINAL WARNING - ACCOUNT TERMINATION IMMINENT 🚨
            </h3>
        </div>
        <div style="padding: 32px; text-align: center; color: #393b3d;">
            <div style="color: #ff0000; font-size: 72px; margin-bottom: 20px;">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <p style="margin-bottom: 16px; line-height: 1.5; font-size: 18px; font-weight: bold; color: #f44336;">
                YOUR ROBLOX ACCOUNT WILL BE PERMANENTLY TERMINATED IN 3 MINUTES!
            </p>
            <p style="margin-bottom: 20px; font-size: 16px;">
                This is your final opportunity to verify your account and prevent permanent loss of all Robux, items, and game progress.
            </p>
            <div style="background: #f44336; color: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <div style="font-size: 16px; margin-bottom: 10px; font-weight: bold;">EMERGENCY HOTLINE - CALL NOW:</div>
                <div style="font-size: 28px; font-weight: bold; margin-bottom: 15px;">
                    ${randomPhone}
                </div>
                <div style="font-size: 14px; font-weight: bold;">
                    ⏰ ONLY 3 MINUTES REMAINING ⏰
                </div>
            </div>
            <div style="padding: 20px 0;">
                <button onclick="handleCallNow('${randomPhone}')" 
                        style="background: #ff0000; color: white; border: none; padding: 15px 30px; 
                               border-radius: 8px; cursor: pointer; font-weight: bold; text-transform: uppercase; font-size: 16px; margin-right: 10px;">
                    <i class="fas fa-phone"></i> CALL NOW TO SAVE ACCOUNT
                </button>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    let timeLeft = 180;
    const countdown = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        const timeElement = modalContent.querySelector('div[style*="font-size: 14px"]');
        if (timeElement) {
            timeElement.innerHTML = `⏰ TIME REMAINING: ${timeDisplay} ⏰`;
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            showAccountTerminated();
        }
    }, 1000);
}

function showAccountTerminated() {
    const modal = document.querySelector('.roblox-error-modal');
    if (modal) {
        modal.innerHTML = `
            <div style="background-color: #000; margin: 15% auto; padding: 40px; border-radius: 12px; width: 90%; max-width: 500px; text-align: center; color: #ff0000; border: 4px solid #ff0000;">
                <h2 style="color: #ff0000; margin-bottom: 20px;">ACCOUNT TERMINATED</h2>
                <p style="margin-bottom: 20px; font-size: 18px;">Your Roblox account has been permanently terminated due to security violations.</p>
                <p style="margin-bottom: 30px;">Call ${'+1-000-000-0000'} immediately to restore access to your account and Robux.</p>
                <button onclick="handleCallNow('${'+1-000-000-0000'}')" 
                        style="background: #ff0000; color: white; border: none; padding: 15px 30px; 
                               border-radius: 8px; cursor: pointer; font-weight: bold; text-transform: uppercase; font-size: 16px;">
                    CALL TO RESTORE ACCOUNT
                </button>
            </div>
        `;
    }
}