// WhatsApp-style App Controller
class WhatsAppPharmacyApp {
    constructor() {
        this.initialized = false;
        this.init();
    }
    
    init() {
        if (this.initialized) return;
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        console.log('📱 WhatsApp Pharmacy Bot - Initializing...');
        
        // Set up PWA features
        this.initializePWA();
        
        // Mobile-specific features
        this.initializeMobileFeatures();
        
        // WhatsApp-style interactions
        this.initializeWhatsAppFeatures();
        
        // Performance optimizations
        this.initializePerformance();
        
        // Accessibility for mobile
        this.initializeMobileAccessibility();
        
        // Network status
        this.initializeNetworkStatus();
        
        this.initialized = true;
        console.log('✅ WhatsApp Pharmacy Bot - Ready!');
        
        // Show install prompt if available
        this.showInstallPrompt();
    }
    
    initializePWA() {
        // Register service worker for offline functionality
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/whatsapp-pharmacy-bot/sw.js')
                    .then(registration => {
                        console.log('Service Worker registered:', registration);
                    })
                    .catch(error => {
                        console.log('Service Worker registration failed:', error);
                    });
            });
        }
        
        // Handle install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
        });
        
        // Handle app installed
        window.addEventListener('appinstalled', () => {
            console.log('App installed successfully!');
            this.showNotification('App installed! 📱', 'success');
        });
    }
    
    initializeMobileFeatures() {
        // Prevent zoom on input focus (iOS)
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (this.isIOS()) {
                    input.style.fontSize = '16px';
                }
            });
        });
        
        // Handle device orientation
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.adjustForOrientation();
            }, 100);
        });
        
        // Touch feedback
        this.initializeTouchFeedback();
        
        // Haptic feedback
        this.initializeHapticFeedback();
        
        // Swipe gestures
        this.initializeSwipeGestures();
    }
    
    initializeWhatsAppFeatures() {
        // Auto-scroll behavior
        this.initializeAutoScroll();
        
        // Message status updates
        this.initializeMessageStatus();
        
        // Typing indicators
        this.initializeTypingBehavior();
        
        // Voice message simulation
        this.initializeVoiceFeatures();
        
        // WhatsApp-style notifications
        this.initializeWhatsAppNotifications();
    }
    
    initializeTouchFeedback() {
        // Add touch feedback to buttons
        const buttons = document.querySelectorAll('button, .quick-reply, .product-card');
        
        buttons.forEach(button => {
            button.addEventListener('touchstart', () => {
                button.style.transform = 'scale(0.95)';
                button.style.transition = 'transform 0.1s ease';
            });
            
            button.addEventListener('touchend', () => {
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 100);
            });
        });
    }
    
    initializeHapticFeedback() {
        // Vibration patterns for different actions
        const vibrationPatterns = {
            tap: [10],
            success: [100, 50, 100],
            error: [200, 100, 200],
            notification: [50, 30, 50, 30, 50]
        };
        
        // Add haptic feedback to buttons
        document.addEventListener('click', (e) => {
            if (navigator.vibrate) {
                if (e.target.matches('.send-btn, .add-to-cart-btn')) {
                    navigator.vibrate(vibrationPatterns.tap);
                }
                if (e.target.matches('.checkout-btn, .place-order-btn')) {
                    navigator.vibrate(vibrationPatterns.success);
                }
            }
        });
    }
    
    initializeSwipeGestures() {
        let startY = 0;
        let currentY = 0;
        
        // Swipe to refresh chat
        const chatMessages = document.getElementById('chatMessages');
        
        chatMessages.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });
        
        chatMessages.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
            const diffY = currentY - startY;
            
            // Pull to refresh at top
            if (chatMessages.scrollTop === 0 && diffY > 100) {
                this.showPullToRefresh();
            }
        });
        
        chatMessages.addEventListener('touchend', () => {
            this.hidePullToRefresh();
        });
    }
    
    initializeAutoScroll() {
        // Smooth auto-scroll for new messages
        const observer = new MutationObserver(() => {
            const chatMessages = document.getElementById('chatMessages');
            if (chatMessages) {
                chatMessages.scrollTo({
                    top: chatMessages.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });
        
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            observer.observe(chatMessages, { childList: true, subtree: true });
        }
    }
    
    initializeMessageStatus() {
        // Simulate message delivery status
        setTimeout(() => {
            const messages = document.querySelectorAll('.user-message .fas.fa-check-double');
            messages.forEach(icon => {
                // Simulate delivered status
                setTimeout(() => {
                    icon.classList.add('delivered');
                }, Math.random() * 1000 + 500);
                
                // Simulate read status
                setTimeout(() => {
                    icon.classList.add('read');
                    icon.classList.remove('delivered');
                }, Math.random() * 2000 + 1500);
            });
        }, 1000);
    }
    
    initializeTypingBehavior() {
        // Show typing indicator when user is typing
        const messageInput = document.getElementById('messageInput');
        let typingTimer;
        
        messageInput.addEventListener('input', () => {
            clearTimeout(typingTimer);
            
            // Show "user is typing" in header (simulate bot seeing user type)
            const onlineStatus = document.querySelector('.online-status');
            onlineStatus.innerHTML = '<i class="fas fa-circle"></i> typing...';
            
            typingTimer = setTimeout(() => {
                onlineStatus.innerHTML = '<i class="fas fa-circle"></i> online';
            }, 2000);
        });
    }
    
    initializeVoiceFeatures() {
        // Voice message recording simulation
        const voiceBtn = document.getElementById('voiceBtn');
        let isRecording = false;
        
        voiceBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (!isRecording) {
                this.startVoiceRecording();
            }
        });
        
        voiceBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (isRecording) {
                this.stopVoiceRecording();
            }
        });
    }
    
    startVoiceRecording() {
        this.isRecording = true;
        const voiceBtn = document.getElementById('voiceBtn');
        voiceBtn.style.background = '#ff4444';
        voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
        
        if (navigator.vibrate) {
            navigator.vibrate([50]);
        }
        
        this.showVoiceRecordingUI();
    }
    
    stopVoiceRecording() {
        this.isRecording = false;
        const voiceBtn = document.getElementById('voiceBtn');
        voiceBtn.style.background = 'var(--whatsapp-primary)';
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        
        this.hideVoiceRecordingUI();
        
        // Simulate voice message
        if (window.whatsappChatbot) {
            window.whatsappChatbot.addUserMessage('🎤 Voice message: "I need something for my headache"');
            setTimeout(() => {
                window.whatsappChatbot.processUserMessage('I need something for my headache');
            }, 1000);
        }
    }
    
    showVoiceRecordingUI() {
        // Show recording indicator
        const indicator = document.createElement('div');
        indicator.id = 'voiceRecordingIndicator';
        indicator.innerHTML = `
            <div style="
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 1rem 2rem;
                border-radius: 20px;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                z-index: 1000;
            ">
                <div style="
                    width: 10px;
                    height: 10px;
                    background: #ff4444;
                    border-radius: 50%;
                    animation: pulse 1s infinite;
                "></div>
                Recording... Release to send
            </div>
        `;
        document.body.appendChild(indicator);
    }
    
    hideVoiceRecordingUI() {
        const indicator = document.getElementById('voiceRecordingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    initializeWhatsAppNotifications() {
        // Simulate WhatsApp-style notifications
        this.notificationQueue = [];
        this.isShowingNotification = false;
    }
    
    showNotification(message, type = 'info') {
        this.notificationQueue.push({ message, type });
        
        if (!this.isShowingNotification) {
            this.processNotificationQueue();
        }
    }
    
    processNotificationQueue() {
        if (this.notificationQueue.length === 0) {
            this.isShowingNotification = false;
            return;
        }
        
        this.isShowingNotification = true;
        const notification = this.notificationQueue.shift();
        
        const notificationElement = document.createElement('div');
        notificationElement.className = 'whatsapp-notification';
        notificationElement.innerHTML = `
            <div class="notification-content ${notification.type}">
                <span>${notification.message}</span>
            </div>
        `;
        
        // Add styles
        if (!document.querySelector('#whatsapp-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'whatsapp-notification-styles';
            style.textContent = `
                .whatsapp-notification {
                    position: fixed;
                    top: 20px;
                    left: 1rem;
                    right: 1rem;
                    z-index: 2000;
                    animation: slideDownNotification 0.3s ease-out;
                }
                
                .notification-content {
                    background: var(--whatsapp-primary);
                    color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    text-align: center;
                    font-weight: 500;
                }
                
                .notification-content.success {
                    background: #4CAF50;
                }
                
                .notification-content.error {
                    background: #f44336;
                }
                
                @keyframes slideDownNotification {
                    from {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notificationElement);
        
        setTimeout(() => {
            notificationElement.style.animation = 'slideDownNotification 0.3s ease-out reverse';
            setTimeout(() => {
                if (notificationElement.parentNode) {
                    notificationElement.parentNode.removeChild(notificationElement);
                }
                this.processNotificationQueue();
            }, 300);
        }, 3000);
    }
    
    initializePerformance() {
        // Lazy load images and content
        this.initializeLazyLoading();
        
        // Optimize scroll performance
        this.optimizeScrolling();
        
        // Memory cleanup
        this.initializeMemoryManagement();
    }
    
    initializeLazyLoading() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        document.querySelectorAll('.lazy-load').forEach(element => {
            observer.observe(element);
        });
    }
    
    optimizeScrolling() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll optimizations
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        document.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    initializeMobileAccessibility() {
        // High contrast mode detection
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.body.classList.add('high-contrast');
        }
        
        // Reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
        
        // Screen reader optimizations
        this.initializeScreenReaderOptimizations();
    }
    
    initializeScreenReaderOptimizations() {
        // Announce cart updates
        const cartObserver = new MutationObserver(() => {
            const cartBadge = document.getElementById('cartBadge');
            if (cartBadge) {
                cartBadge.setAttribute('aria-label', `${cartBadge.textContent} items in cart`);
            }
        });
        
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
            cartObserver.observe(cartBadge, { childList: true, characterData: true });
        }
    }
    
    initializeNetworkStatus() {
        const updateNetworkStatus = () => {
            const onlineStatus = document.querySelector('.online-status');
            if (navigator.onLine) {
                onlineStatus.innerHTML = '<i class="fas fa-circle"></i> online';
                this.showNotification('Connected 📶', 'success');
            } else {
                onlineStatus.innerHTML = '<i class="fas fa-circle" style="color: #ccc;"></i> offline';
                this.showNotification('No connection 📵', 'error');
            }
        };
        
        window.addEventListener('online', updateNetworkStatus);
        window.addEventListener('offline', updateNetworkStatus);
    }
    
    showInstallPrompt() {
        if (this.deferredPrompt && !localStorage.getItem('whatsapp-pharmacy-install-dismissed')) {
            setTimeout(() => {
                const installBanner = document.createElement('div');
                installBanner.innerHTML = `
                    <div style="
                        position: fixed;
                        bottom: 20px;
                        left: 1rem;
                        right: 1rem;
                        background: white;
                        border: 1px solid var(--border-color);
                        border-radius: 12px;
                        padding: 1rem;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        z-index: 1000;
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                    ">
                        <div style="flex: 1;">
                            <strong>Install PharmaCare</strong><br>
                            <small>Get instant access to pharmacy services</small>
                        </div>
                        <button onclick="this.parentElement.parentElement.remove()" style="
                            background: none;
                            border: none;
                            color: var(--text-light);
                            font-size: 1.2rem;
                            cursor: pointer;
                        ">×</button>
                        <button onclick="window.whatsappApp.installApp()" style="
                            background: var(--whatsapp-primary);
                            color: white;
                            border: none;
                            padding: 0.5rem 1rem;
                            border-radius: 6px;
                            cursor: pointer;
                        ">Install</button>
                    </div>
                `;
                document.body.appendChild(installBanner);
            }, 5000);
        }
    }
    
    installApp() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    localStorage.setItem('whatsapp-pharmacy-install-dismissed', 'true');
                }
                this.deferredPrompt = null;
            });
        }
    }
    
    showPullToRefresh() {
        // Implement pull to refresh
        console.log('Pull to refresh triggered');
    }
    
    hidePullToRefresh() {
        // Hide pull to refresh indicator
    }
    
    adjustForOrientation() {
        // Adjust UI for orientation changes
        const isLandscape = window.innerHeight < window.innerWidth;
        if (isLandscape) {
            document.body.classList.add('landscape');
        } else {
            document.body.classList.remove('landscape');
        }
    }
    
    initializeMemoryManagement() {
        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            // Clear intervals, timeouts, etc.
            if (this.intervals) {
                this.intervals.forEach(clearInterval);
            }
            if (this.timeouts) {
                this.timeouts.forEach(clearTimeout);
            }
        });
    }
    
    isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    }
    
    isAndroid() {
        return /Android/.test(navigator.userAgent);
    }
    
    // Public API
    getAppStatus() {
        return {
            initialized: this.initialized,
            isOnline: navigator.onLine,
            platform: this.isIOS() ? 'iOS' : this.isAndroid() ? 'Android' : 'Desktop',
            cartData: window.whatsappCart?.getCartData() || null
        };
    }
}

// Initialize the app
window.whatsappApp = new WhatsAppPharmacyApp();