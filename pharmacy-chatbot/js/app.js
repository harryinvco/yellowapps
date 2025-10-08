// Main application controller
class PharmacyApp {
    constructor() {
        this.initialized = false;
        this.init();
    }
    
    init() {
        if (this.initialized) return;
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        console.log('🏥 PharmaCare AI Assistant - Initializing...');
        
        // Initialize smooth scrolling
        this.initSmoothScrolling();
        
        // Initialize keyboard shortcuts
        this.initKeyboardShortcuts();
        
        // Initialize accessibility features
        this.initAccessibility();
        
        // Initialize advanced animations
        this.initAnimations();
        
        // Initialize responsive features
        this.initResponsiveFeatures();
        
        // Initialize performance optimizations
        this.initPerformanceOptimizations();
        
        // Add welcome animation
        this.playWelcomeAnimation();
        
        // Initialize offline support
        this.initOfflineSupport();
        
        this.initialized = true;
        console.log('✅ PharmaCare AI Assistant - Ready!');
    }
    
    initSmoothScrolling() {
        // Smooth scrolling for chat messages
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.style.scrollBehavior = 'smooth';
        }
        
        // Auto-scroll to new messages with animation
        const observer = new MutationObserver(() => {
            if (chatMessages) {
                chatMessages.scrollTo({
                    top: chatMessages.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });
        
        if (chatMessages) {
            observer.observe(chatMessages, { childList: true });
        }
    }
    
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus message input
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const messageInput = document.getElementById('messageInput');
                if (messageInput) {
                    messageInput.focus();
                }
            }
            
            // Escape to close modals/sidebar
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
            
            // Ctrl/Cmd + Enter to send message
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                const messageInput = document.getElementById('messageInput');
                if (messageInput && messageInput === document.activeElement) {
                    window.chatbot?.sendMessage();
                }
            }
        });
    }
    
    closeAllModals() {
        // Close cart sidebar
        if (window.cart?.isOpen) {
            window.cart.closeCartSidebar();
        }
        
        // Close checkout modal
        const checkoutModal = document.getElementById('checkoutModal');
        if (checkoutModal && checkoutModal.style.display === 'flex') {
            window.cart?.closeCheckout();
        }
        
        // Close success modal
        const successModal = document.getElementById('successModal');
        if (successModal && successModal.style.display === 'flex') {
            window.cart?.closeSuccessModal();
        }
    }
    
    initAccessibility() {
        // Add ARIA labels
        this.addAriaLabels();
        
        // Initialize focus management
        this.initFocusManagement();
        
        // Add screen reader announcements
        this.initScreenReaderSupport();
    }
    
    addAriaLabels() {
        const elements = [
            { selector: '#messageInput', label: 'Type your message here' },
            { selector: '#sendButton', label: 'Send message' },
            { selector: '#cartToggle', label: 'Open shopping cart' },
            { selector: '.quick-action', label: 'Quick action button' },
            { selector: '.add-to-cart-btn', label: 'Add product to cart' },
            { selector: '.filter-btn', label: 'Filter products by category' }
        ];
        
        elements.forEach(({ selector, label }) => {
            const element = document.querySelector(selector);
            if (element && !element.getAttribute('aria-label')) {
                element.setAttribute('aria-label', label);
            }
        });
    }
    
    initFocusManagement() {
        // Focus trap for modals
        const modals = ['checkoutModal', 'successModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.addEventListener('keydown', this.handleModalKeydown.bind(this));
            }
        });
    }
    
    handleModalKeydown(e) {
        if (e.key === 'Tab') {
            const modal = e.currentTarget;
            const focusableElements = modal.querySelectorAll(
                'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    }
    
    initScreenReaderSupport() {
        // Create live region for chat messages
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0,0,0,0);
            white-space: nowrap;
            border: 0;
        `;
        document.body.appendChild(liveRegion);
        
        // Announce new messages
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        const newMessage = mutation.addedNodes[0];
                        if (newMessage.classList?.contains('message')) {
                            const messageText = newMessage.querySelector('.message-content')?.textContent;
                            const sender = newMessage.classList.contains('bot-message') ? 'Assistant' : 'You';
                            if (messageText) {
                                setTimeout(() => {
                                    liveRegion.textContent = `${sender} says: ${messageText}`;
                                }, 100);
                            }
                        }
                    }
                });
            });
            
            observer.observe(chatMessages, { childList: true });
        }
    }
    
    initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        // Observe product cards
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                document.querySelectorAll('.product-card').forEach(card => {
                    observer.observe(card);
                });
            }, 500);
        });
        
        // Add hover effects to interactive elements
        this.addHoverEffects();
    }
    
    addHoverEffects() {
        // Add ripple effect to buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .quick-action, .filter-btn')) {
                this.createRippleEffect(e);
            }
        });
    }
    
    createRippleEffect(e) {
        const button = e.target;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
        
        // Add ripple animation if not exists
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    initResponsiveFeatures() {
        // Handle mobile viewport changes
        this.handleViewportChanges();
        
        // Add touch gestures for mobile
        this.initTouchGestures();
        
        // Responsive text scaling
        this.initResponsiveText();
    }
    
    handleViewportChanges() {
        const handleResize = () => {
            // Adjust cart sidebar for mobile
            const cartSidebar = document.getElementById('cartSidebar');
            if (window.innerWidth <= 768 && cartSidebar) {
                cartSidebar.style.width = '100%';
            } else if (cartSidebar) {
                cartSidebar.style.width = '400px';
            }
            
            // Adjust grid layout
            this.adjustGridLayout();
        };
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call
    }
    
    adjustGridLayout() {
        const mainContent = document.querySelector('.main-content');
        if (window.innerWidth <= 1024 && mainContent) {
            mainContent.style.gridTemplateColumns = '1fr';
        } else if (mainContent) {
            mainContent.style.gridTemplateColumns = '1fr 1fr';
        }
    }
    
    initTouchGestures() {
        // Swipe to close cart on mobile
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar && 'ontouchstart' in window) {
            let startX = 0;
            let currentX = 0;
            
            cartSidebar.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            cartSidebar.addEventListener('touchmove', (e) => {
                currentX = e.touches[0].clientX;
                const diffX = currentX - startX;
                
                if (diffX > 50) { // Swipe right threshold
                    window.cart?.closeCartSidebar();
                }
            });
        }
    }
    
    initResponsiveText() {
        // Adjust font sizes based on viewport
        const adjustFontSizes = () => {
            const root = document.documentElement;
            const baseSize = window.innerWidth < 480 ? 14 : 16;
            root.style.fontSize = `${baseSize}px`;
        };
        
        window.addEventListener('resize', adjustFontSizes);
        adjustFontSizes();
    }
    
    initPerformanceOptimizations() {
        // Lazy loading for images and heavy content
        this.initLazyLoading();
        
        // Debounce expensive operations
        this.initDebouncedOperations();
        
        // Memory cleanup
        this.initMemoryCleanup();
    }
    
    initLazyLoading() {
        // Intersection Observer for lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('loaded');
                    lazyLoadObserver.unobserve(element);
                }
            });
        });
        
        // Observe elements that should be lazy loaded
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.lazy-load').forEach(element => {
                lazyLoadObserver.observe(element);
            });
        });
    }
    
    initDebouncedOperations() {
        // Debounce search operations
        const debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };
        
        // Apply debouncing to search inputs
        const searchInputs = document.querySelectorAll('input[type="search"], input[type="text"]');
        searchInputs.forEach(input => {
            if (input.id === 'messageInput') return; // Skip chat input
            
            const debouncedHandler = debounce((e) => {
                // Handle search operations
                console.log('Search operation:', e.target.value);
            }, 300);
            
            input.addEventListener('input', debouncedHandler);
        });
    }
    
    initMemoryCleanup() {
        // Cleanup event listeners and observers on page unload
        window.addEventListener('beforeunload', () => {
            // Remove event listeners
            document.removeEventListener('keydown', this.handleKeydown);
            window.removeEventListener('resize', this.handleResize);
            
            // Clear intervals and timeouts
            if (this.intervals) {
                this.intervals.forEach(interval => clearInterval(interval));
            }
            if (this.timeouts) {
                this.timeouts.forEach(timeout => clearTimeout(timeout));
            }
        });
    }
    
    playWelcomeAnimation() {
        setTimeout(() => {
            // Animate header logo
            const logo = document.querySelector('.logo-icon');
            if (logo) {
                logo.style.animation = 'bounce 1s ease-in-out';
            }
            
            // Animate welcome message
            const firstMessage = document.querySelector('.bot-message');
            if (firstMessage) {
                firstMessage.style.animation = 'slideInLeft 0.8s ease-out';
            }
            
            // Add welcome animation styles
            if (!document.querySelector('#welcome-animations')) {
                const style = document.createElement('style');
                style.id = 'welcome-animations';
                style.textContent = `
                    @keyframes bounce {
                        0%, 20%, 53%, 80%, 100% {
                            transform: translate3d(0,0,0);
                        }
                        40%, 43% {
                            transform: translate3d(0,-30px,0);
                        }
                        70% {
                            transform: translate3d(0,-15px,0);
                        }
                        90% {
                            transform: translate3d(0,-4px,0);
                        }
                    }
                    
                    @keyframes slideInLeft {
                        from {
                            transform: translateX(-100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }, 500);
    }
    
    initOfflineSupport() {
        // Basic offline functionality
        window.addEventListener('online', () => {
            this.showConnectionStatus('Connected', 'success');
        });
        
        window.addEventListener('offline', () => {
            this.showConnectionStatus('Offline - Limited functionality', 'warning');
        });
    }
    
    showConnectionStatus(message, type) {
        const notification = document.createElement('div');
        notification.className = `connection-status ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 0.75rem 1.5rem;
            border-radius: var(--border-radius);
            color: white;
            font-weight: 500;
            z-index: 2000;
            animation: slideInDown 0.3s ease-out;
            background: ${type === 'success' ? 'var(--secondary-color)' : 'var(--accent-color)'};
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutUp 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        // Add slide animations if not exists
        if (!document.querySelector('#slide-animations')) {
            const style = document.createElement('style');
            style.id = 'slide-animations';
            style.textContent = `
                @keyframes slideInDown {
                    from {
                        transform: translate(-50%, -100%);
                        opacity: 0;
                    }
                    to {
                        transform: translate(-50%, 0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutUp {
                    from {
                        transform: translate(-50%, 0);
                        opacity: 1;
                    }
                    to {
                        transform: translate(-50%, -100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Utility methods
    showLoadingState(element) {
        if (element) {
            element.style.opacity = '0.6';
            element.style.pointerEvents = 'none';
        }
    }
    
    hideLoadingState(element) {
        if (element) {
            element.style.opacity = '1';
            element.style.pointerEvents = 'auto';
        }
    }
    
    // Public API for external access
    getAppStatus() {
        return {
            initialized: this.initialized,
            cartItems: window.cart?.getCartData?.() || null,
            onlineStatus: navigator.onLine
        };
    }
}

// Initialize the application
window.pharmacyApp = new PharmacyApp();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PharmacyApp;
}