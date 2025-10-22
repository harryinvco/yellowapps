// WhatsApp-style Chatbot for Pharmacy
class WhatsAppPharmaChatbot {
    constructor() {
        this.messagesContainer = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.voiceBtn = document.getElementById('voiceBtn');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.quickReplies = document.getElementById('quickReplies');
        this.productCarousel = document.getElementById('productCarousel');
        this.carouselContent = document.getElementById('carouselContent');

        this.conversationHistory = [];
        this.isTyping = false;
        this.messageIdCounter = 0;

        // API Configuration
        this.apiUrl = window.location.origin + '/api/chat';
        this.sessionId = this.generateSessionId();
        this.useAI = true; // Set to false to use fallback responses

        this.initializeEventListeners();
        this.initializeVoiceInput();
        this.showWelcomeMessage();
        this.checkAPIConnection();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    async checkAPIConnection() {
        try {
            const response = await fetch(window.location.origin + '/api/health');
            const data = await response.json();
            console.log('API Status:', data);
            this.useAI = data.status === 'ok' && data.openaiConfigured;
            if (!this.useAI) {
                console.warn('OpenAI not configured, using fallback responses');
            }
        } catch (error) {
            console.warn('API not available, using fallback responses');
            this.useAI = false;
        }
    }
    
    initializeEventListeners() {
        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Catalog button
        const catalogBtn = document.getElementById('catalogBtn');
        if (catalogBtn) {
            catalogBtn.addEventListener('click', () => {
                this.addBotMessage('Here\'s our full product catalog! 🏪 Tap any product to add it to your cart.');
                this.showCatalogView();
            });
        }
        
        // Input focus handling
        this.messageInput.addEventListener('focus', () => {
            this.hideQuickReplies();
        });
        
        this.messageInput.addEventListener('blur', () => {
            setTimeout(() => this.showQuickReplies(), 100);
        });
        
        // Quick replies
        this.quickReplies.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply')) {
                const message = e.target.getAttribute('data-message');
                this.sendMessage(message);
            }
        });
        
        // Product carousel
        document.getElementById('closeCarousel').addEventListener('click', () => {
            this.hideProductCarousel();
        });
        
        // Voice input toggle
        this.messageInput.addEventListener('input', (e) => {
            if (e.target.value.trim()) {
                this.showSendButton();
            } else {
                this.showVoiceButton();
            }
        });
    }
    
    showWelcomeMessage() {
        setTimeout(() => {
            this.showQuickReplies();
        }, 1000);
    }
    
    sendMessage(predefinedMessage = null) {
        const message = predefinedMessage || this.messageInput.value.trim();
        if (!message) return;
        
        // Add user message
        this.addUserMessage(message);
        
        // Clear input
        this.messageInput.value = '';
        this.showVoiceButton();
        
        // Hide quick replies and carousel
        this.hideQuickReplies();
        this.hideProductCarousel();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process response with realistic delay
        setTimeout(() => {
            this.processUserMessage(message);
        }, 1000 + Math.random() * 1500);
    }
    
    addUserMessage(message) {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper user-message';
        
        messageWrapper.innerHTML = `
            <div class="message-bubble">
                <div class="message-content">
                    <p>${this.escapeHtml(message)}</p>
                </div>
                <div class="message-time">
                    <span>${this.getCurrentTime()}</span>
                    <i class="fas fa-check-double read"></i>
                </div>
            </div>
        `;
        
        this.messagesContainer.appendChild(messageWrapper);
        this.scrollToBottom();
        
        this.conversationHistory.push({ role: 'user', message: message });
    }
    
    addBotMessage(content, showProducts = null) {
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper bot-message';

        // Convert markdown bold to HTML
        let htmlContent = typeof content === 'string' ? content : content.outerHTML;
        if (typeof content === 'string') {
            // Convert **text** to <strong>text</strong>
            htmlContent = htmlContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Convert newlines to <br>
            htmlContent = htmlContent.replace(/\n/g, '<br>');
        }

        messageWrapper.innerHTML = `
            <div class="message-bubble">
                <div class="message-content">
                    <p>${htmlContent}</p>
                </div>
                <div class="message-time">
                    <span>${this.getCurrentTime()}</span>
                    <i class="fas fa-check-double delivered"></i>
                </div>
            </div>
        `;

        this.messagesContainer.appendChild(messageWrapper);

        // Show inline product cards if products are recommended
        if (showProducts && showProducts.length > 0) {
            setTimeout(() => {
                this.addInlineProductCards(showProducts);
                this.addWhatsAppButtons(showProducts);
            }, 300);
        } else {
            // Show quick action buttons even without products
            setTimeout(() => {
                this.addQuickActionButtons();
            }, 500);
        }

        this.scrollToBottom();

        // Show appropriate quick replies
        setTimeout(() => {
            this.showContextualQuickReplies(content);
        }, 1000);
    }

    addQuickActionButtons() {
        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.className = 'message-wrapper bot-message';
        buttonsWrapper.innerHTML = `
            <div class="whatsapp-action-buttons">
                <button class="wa-action-btn" data-action="browse">
                    <i class="fas fa-th-large"></i> Browse Catalog
                </button>
                <button class="wa-action-btn" data-action="categories">
                    <i class="fas fa-list"></i> View Categories
                </button>
                <button class="wa-action-btn" data-action="popular">
                    <i class="fas fa-star"></i> Popular Products
                </button>
            </div>
        `;

        this.messagesContainer.appendChild(buttonsWrapper);

        // Add event listeners
        buttonsWrapper.querySelectorAll('.wa-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('.wa-action-btn').dataset.action;
                this.handleActionButton(action);
            });
        });

        this.scrollToBottom();
    }

    handleActionButton(action) {
        switch(action) {
            case 'browse':
                this.showCatalogView();
                break;
            case 'categories':
                this.showCategoryPicker();
                break;
            case 'popular':
                this.sendMessage('Show me popular products');
                break;
        }
    }

    addWhatsAppButtons(products) {
        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.className = 'message-wrapper bot-message';
        buttonsWrapper.innerHTML = `
            <div class="whatsapp-action-buttons">
                <button class="wa-action-btn primary" data-action="view-all">
                    <i class="fas fa-eye"></i> View All Products
                </button>
                <button class="wa-action-btn" data-action="more">
                    <i class="fas fa-plus-circle"></i> Show More Options
                </button>
            </div>
        `;

        this.messagesContainer.appendChild(buttonsWrapper);

        buttonsWrapper.querySelectorAll('.wa-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('.wa-action-btn').dataset.action;
                if (action === 'view-all') {
                    this.showCatalogView();
                } else if (action === 'more') {
                    this.sendMessage('Show me more options');
                }
            });
        });

        this.scrollToBottom();
    }

    addInlineProductCards(products) {
        // Create inline product cards container
        const inlineCardsWrapper = document.createElement('div');
        inlineCardsWrapper.className = 'message-wrapper bot-message';
        inlineCardsWrapper.innerHTML = `
            <div class="inline-products-container">
                ${products.map(product => this.createInlineProductCard(product)).join('')}
            </div>
        `;

        this.messagesContainer.appendChild(inlineCardsWrapper);

        // Add event listeners to buy buttons
        inlineCardsWrapper.querySelectorAll('.inline-buy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                const product = getWhatsAppProductById(productId);
                if (product) {
                    window.whatsappCart.addItem(product);
                    e.target.textContent = '✓ Added';
                    e.target.style.background = '#4CAF50';
                    e.target.disabled = true;

                    setTimeout(() => {
                        e.target.textContent = '🛒 Buy Now';
                        e.target.style.background = '';
                        e.target.disabled = false;
                    }, 2000);
                }
            });
        });

        this.scrollToBottom();
    }

    createInlineProductCard(product) {
        return `
            <div class="inline-product-card">
                <div class="inline-product-icon">${product.icon}</div>
                <div class="inline-product-info">
                    <div class="inline-product-name">${product.name}</div>
                    <div class="inline-product-desc">${product.whatsappDescription}</div>
                    <div class="inline-product-price">€${product.price}</div>
                </div>
                <button class="inline-buy-btn" data-product-id="${product.id}">
                    🛒 Buy Now
                </button>
            </div>
        `;
    }
    
    async processUserMessage(message) {
        if (this.useAI) {
            try {
                const response = await this.getAIResponse(message);
                setTimeout(() => {
                    this.hideTypingIndicator();
                    this.addBotMessage(response.text, response.products);

                    this.conversationHistory.push({
                        role: 'bot',
                        message: response.text,
                        products: response.products
                    });
                }, 500);
            } catch (error) {
                console.error('AI response failed, using fallback:', error);
                this.processFallbackResponse(message);
            }
        } else {
            this.processFallbackResponse(message);
        }
    }

    async getAIResponse(message) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    sessionId: this.sessionId
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();

            // Get recommended products based on IDs returned by API
            const products = data.recommendedProducts
                .map(id => getWhatsAppProductById(id))
                .filter(p => p); // Filter out any null/undefined

            return {
                text: data.response,
                products: products.slice(0, 4) // Limit to 4 products
            };
        } catch (error) {
            console.error('Error getting AI response:', error);
            throw error;
        }
    }

    processFallbackResponse(message) {
        const response = this.generateWhatsAppResponse(message);

        setTimeout(() => {
            this.hideTypingIndicator();
            this.addBotMessage(response.text, response.products);

            this.conversationHistory.push({
                role: 'bot',
                message: response.text,
                products: response.products
            });
        }, 500);
    }
    
    generateWhatsAppResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Greeting responses
        if (this.containsAny(message, ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'start'])) {
            return {
                text: "Hi there! 😊 I'm your pharmacy assistant. What can I help you with today?",
                products: getRandomWhatsAppProducts(3)
            };
        }
        
        // Thanks responses
        if (this.containsAny(message, ['thanks', 'thank you', 'thx', 'appreciate'])) {
            return {
                text: "You're welcome! 😊 Is there anything else I can help you with?",
                products: []
            };
        }
        
        // Pain-related queries
        if (this.containsAny(message, ['headache', 'head pain', 'migraine', 'head hurt'])) {
            return {
                text: "Sorry to hear about your headache! 😔 I have some great options that work fast:",
                products: getWhatsAppRecommendedProducts(['headache'])
            };
        }
        
        if (this.containsAny(message, ['muscle pain', 'back pain', 'body ache', 'sore muscles'])) {
            return {
                text: "Muscle pain can be really uncomfortable! 💪 Here are some effective treatments:",
                products: getWhatsAppRecommendedProducts(['muscle pain'])
            };
        }
        
        if (this.containsAny(message, ['fever', 'temperature', 'hot', 'feverish', 'burning up'])) {
            return {
                text: "A fever needs attention! 🌡️ These will help bring your temperature down:",
                products: getWhatsAppRecommendedProducts(['fever'])
            };
        }
        
        // Cold & flu queries
        if (this.containsAny(message, ['cold', 'stuffy nose', 'runny nose', 'sneezing', 'blocked nose'])) {
            return {
                text: "Got a cold? 🤧 Don't worry, I've got everything you need to feel better:",
                products: getWhatsAppRecommendedProducts(['cold'])
            };
        }
        
        if (this.containsAny(message, ['cough', 'coughing', 'throat', 'tickle in throat'])) {
            return {
                text: "That cough sounds annoying! 😤 These will help soothe your throat:",
                products: getWhatsAppRecommendedProducts(['cough'])
            };
        }
        
        if (this.containsAny(message, ['sore throat', 'throat pain', 'throat hurts'])) {
            return {
                text: "Sore throat is painful! 😣 These provide fast relief:",
                products: getWhatsAppRecommendedProducts(['sore throat'])
            };
        }
        
        if (this.containsAny(message, ['flu', 'influenza', 'body aches', 'chills'])) {
            return {
                text: "The flu is tough! 🤒 Here's what will help you recover faster:",
                products: getWhatsAppRecommendedProducts(['flu'])
            };
        }
        
        // Vitamins & wellness
        if (this.containsAny(message, ['vitamins', 'supplements', 'multivitamin'])) {
            return {
                text: "Great choice for staying healthy! 💪 Here are our top vitamin recommendations:",
                products: getWhatsAppProductsByCategory('vitamins')
            };
        }
        
        if (this.containsAny(message, ['energy', 'tired', 'fatigue', 'exhausted', 'weak'])) {
            return {
                text: "Feeling low on energy? ⚡ These supplements will help boost your vitality:",
                products: getWhatsAppRecommendedProducts(['energy'])
            };
        }
        
        if (this.containsAny(message, ['immune', 'immunity', 'boost immune', 'get sick often'])) {
            return {
                text: "Building immunity is smart! 🛡️ These will strengthen your defenses:",
                products: getWhatsAppRecommendedProducts(['immune'])
            };
        }
        
        // First aid queries
        if (this.containsAny(message, ['cut', 'wound', 'bleeding', 'scrape', 'injury'])) {
            return {
                text: "Ouch! 🩹 Let's get that treated properly. Here's what you need:",
                products: getWhatsAppRecommendedProducts(['cut'])
            };
        }
        
        if (this.containsAny(message, ['burn', 'burned', 'burnt', 'kitchen accident'])) {
            return {
                text: "Burns need immediate care! ❄️ This will provide instant relief:",
                products: getWhatsAppRecommendedProducts(['burn'])
            };
        }
        
        if (this.containsAny(message, ['first aid', 'emergency', 'accident', 'bandage'])) {
            return {
                text: "Emergency supplies coming up! 🚑 Every home should have these:",
                products: getWhatsAppProductsByCategory('first-aid')
            };
        }
        
        // Category browsing
        if (this.containsAny(message, ['pain relief', 'painkillers', 'pain medicine'])) {
            return {
                text: "Here's our complete pain relief range! 💊 From mild to strong:",
                products: getWhatsAppProductsByCategory('pain-relief')
            };
        }
        
        if (this.containsAny(message, ['cold medicine', 'flu medicine', 'cold and flu'])) {
            return {
                text: "Cold & flu season essentials! 🤧 Everything to fight symptoms:",
                products: getWhatsAppProductsByCategory('cold-flu')
            };
        }
        
        // Shopping queries
        if (this.containsAny(message, ['cart', 'order', 'buy', 'purchase', 'checkout'])) {
            return {
                text: "Ready to order? 🛒 Tap the cart icon above to review your items and checkout!",
                products: []
            };
        }
        
        if (this.containsAny(message, ['delivery', 'shipping', 'how long', 'when will it arrive'])) {
            return {
                text: "We deliver fast! 🚚 Most orders arrive within 2-3 hours. Same-day delivery available in your area! 📦",
                products: []
            };
        }
        
        // Dosage questions
        if (this.containsAny(message, ['how much', 'dosage', 'how often', 'directions', 'how to take'])) {
            return {
                text: "Always follow the dosage instructions! 📋 Each product shows recommended doses. When in doubt, consult a pharmacist! 👨‍⚕️",
                products: []
            };
        }
        
        // Safety questions
        if (this.containsAny(message, ['safe', 'side effects', 'allergic', 'reactions'])) {
            return {
                text: "Safety first! ⚠️ Always read labels, check allergies, and consult a doctor if unsure. Need specific product safety info? 🔍",
                products: []
            };
        }
        
        // Help queries
        if (this.containsAny(message, ['help', 'what can you do', 'options', 'menu'])) {
            return {
                text: "I'm here to help! 🤝 I can:\n• Find medicines for symptoms 💊\n• Recommend health products 🌟\n• Help with orders 🛒\n• Answer health questions ❓\n\nJust tell me what's bothering you! 😊",
                products: getRandomWhatsAppProducts(4)
            };
        }
        
        // Search functionality
        const searchResults = searchWhatsAppProducts(message);
        if (searchResults.length > 0) {
            return {
                text: `Found these for "${userMessage}"! 🔍`,
                products: searchResults.slice(0, 4)
            };
        }
        
        // Default response
        return {
            text: "I'm not sure I understand 🤔 Could you tell me:\n• What symptoms you have? 😷\n• What type of medicine you need? 💊\n• Or try the quick options below! 👇",
            products: getRandomWhatsAppProducts(3)
        };
    }
    
    showProductCarousel(products) {
        if (products.length === 0) return;
        
        this.carouselContent.innerHTML = '';
        
        products.forEach(product => {
            const productCard = this.createWhatsAppProductCard(product);
            this.carouselContent.appendChild(productCard);
        });
        
        this.productCarousel.style.display = 'block';
        setTimeout(() => {
            this.productCarousel.classList.add('fade-in');
        }, 50);
    }
    
    createWhatsAppProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <div class="product-icon">${product.icon}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.whatsappDescription}</div>
                <div class="product-price">€${product.price}</div>
            </div>
            <button class="add-to-cart-btn" data-product-id="${product.id}">
                Add
            </button>
        `;
        
        // Add to cart functionality
        const addBtn = card.querySelector('.add-to-cart-btn');
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.whatsappCart.addItem(product);
            this.showAddedFeedback(addBtn);
            
            // Send confirmation message
            setTimeout(() => {
                this.addBotMessage(`✅ Added ${product.name} to your cart! Tap the cart icon 🛒 to checkout.`);
            }, 500);
        });
        
        // Product details on card click
        card.addEventListener('click', () => {
            this.showProductDetails(product);
        });
        
        return card;
    }
    
    showAddedFeedback(button) {
        const originalText = button.textContent;
        button.textContent = '✓';
        button.classList.add('added');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('added');
        }, 2000);
    }
    
    showProductDetails(product) {
        const detailsContent = document.createElement('div');
        detailsContent.innerHTML = `
            <strong>${product.icon} ${product.name}</strong><br><br>
            
            <strong>💡 What it does:</strong><br>
            ${product.whatsappDescription}<br><br>
            
            <strong>📋 How to use:</strong><br>
            ${product.dosage}<br><br>
            
            <strong>✨ Benefits:</strong><br>
            ${product.benefits.map(benefit => `• ${benefit}`).join('<br>')}<br><br>

            <strong>💰 Price: €${product.price}</strong>
        `;

        this.addBotMessage(detailsContent);

        // Add quick add to cart option
        setTimeout(() => {
            const quickAddContent = document.createElement('div');
            quickAddContent.innerHTML = `
                <button onclick="window.whatsappCart.addItem(${JSON.stringify(product).replace(/"/g, '&quot;')});
                this.textContent='✅ Added!'; this.disabled=true;"
                style="background: var(--whatsapp-primary); color: white; border: none;
                padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">
                🛒 Add to Cart - €${product.price}
                </button>
            `;
            this.addBotMessage(quickAddContent);
        }, 500);
    }
    
    hideProductCarousel() {
        this.productCarousel.style.display = 'none';
    }
    
    showQuickReplies() {
        if (this.messageInput.value.trim() === '') {
            this.quickReplies.style.display = 'flex';
        }
    }
    
    hideQuickReplies() {
        this.quickReplies.style.display = 'none';
    }
    
    showContextualQuickReplies(lastMessage) {
        // Update quick replies based on conversation context
        const contextReplies = this.getContextualReplies(lastMessage);
        
        if (contextReplies.length > 0) {
            this.quickReplies.innerHTML = contextReplies.map(reply => 
                `<div class="quick-reply" data-message="${reply.message}">${reply.text}</div>`
            ).join('');
            
            setTimeout(() => {
                this.showQuickReplies();
            }, 1000);
        }
    }
    
    getContextualReplies(lastMessage) {
        const message = lastMessage.toString().toLowerCase();
        
        if (message.includes('headache') || message.includes('pain')) {
            return [
                { text: '🤒 How severe?', message: 'The pain is severe' },
                { text: '⏰ How long?', message: 'I have had this pain for hours' },
                { text: '💊 Show more options', message: 'Show me more pain relief options' }
            ];
        }
        
        if (message.includes('cold') || message.includes('flu')) {
            return [
                { text: '🤧 Stuffy nose', message: 'I have a stuffy nose' },
                { text: '😤 Cough too', message: 'I also have a cough' },
                { text: '🌡️ Check fever', message: 'Do I have a fever' }
            ];
        }
        
        if (message.includes('energy') || message.includes('tired')) {
            return [
                { text: '😴 Sleep issues', message: 'I have trouble sleeping' },
                { text: '🍎 Diet help', message: 'I need diet advice' },
                { text: '💊 More vitamins', message: 'Show me more vitamins' }
            ];
        }
        
        // Default replies
        return [
            { text: '🛒 View cart', message: 'Show me my cart' },
            { text: '💊 More products', message: 'Show me more products' },
            { text: '❓ Need help', message: 'I need help with something else' }
        ];
    }
    
    showSendButton() {
        this.sendBtn.style.display = 'flex';
        this.voiceBtn.style.display = 'none';
    }
    
    showVoiceButton() {
        this.sendBtn.style.display = 'none';
        this.voiceBtn.style.display = 'flex';
    }
    
    showTypingIndicator() {
        this.typingIndicator.style.display = 'block';
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }
    
    initializeVoiceInput() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.messageInput.value = transcript;
                this.showSendButton();
            };
            
            this.recognition.onerror = (event) => {
                console.log('Speech recognition error:', event.error);
            };
            
            this.voiceBtn.addEventListener('click', () => {
                this.startVoiceInput();
            });
        } else {
            this.voiceBtn.style.display = 'none';
            this.sendBtn.style.display = 'flex';
        }
    }
    
    startVoiceInput() {
        if (this.recognition) {
            this.voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
            this.recognition.start();
            
            this.recognition.onend = () => {
                this.voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            };
        }
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showCatalogView() {
        // Show all products in a WhatsApp Business-style catalog
        const allProducts = whatsappProducts;

        const catalogMessage = document.createElement('div');
        catalogMessage.className = 'message-wrapper bot-message';
        catalogMessage.innerHTML = `
            <div class="whatsapp-catalog">
                <div class="catalog-header">
                    <i class="fas fa-store"></i>
                    <span>PharmaCare Product Catalog</span>
                </div>
                <div class="catalog-grid">
                    ${allProducts.map(product => `
                        <div class="catalog-item" data-product-id="${product.id}">
                            <div class="catalog-item-icon">${product.icon}</div>
                            <div class="catalog-item-name">${product.name}</div>
                            <div class="catalog-item-price">€${product.price}</div>
                            <button class="catalog-buy-btn" data-product-id="${product.id}">
                                Add
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.messagesContainer.appendChild(catalogMessage);

        // Add click events
        catalogMessage.querySelectorAll('.catalog-buy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = e.target.dataset.productId;
                const product = getWhatsAppProductById(productId);
                if (product) {
                    window.whatsappCart.addItem(product);
                    e.target.textContent = '✓';
                    e.target.style.background = '#4CAF50';
                    setTimeout(() => {
                        e.target.textContent = 'Add';
                        e.target.style.background = '';
                    }, 2000);
                }
            });
        });

        this.scrollToBottom();
    }

    showCategoryPicker() {
        // Show category list like WhatsApp list message
        const categories = [
            { id: 'pain-relief', name: 'Pain Relief', icon: '💊', desc: 'Headaches, fever, body pain' },
            { id: 'cold-flu', name: 'Cold & Flu', icon: '🤧', desc: 'Cough, sore throat, congestion' },
            { id: 'vitamins', name: 'Vitamins & Supplements', icon: '🌟', desc: 'Energy, immunity, wellness' },
            { id: 'first-aid', name: 'First Aid', icon: '🩹', desc: 'Bandages, antiseptic, burns' }
        ];

        const listMessage = document.createElement('div');
        listMessage.className = 'message-wrapper bot-message';
        listMessage.innerHTML = `
            <div class="whatsapp-list">
                <div class="list-header">
                    <i class="fas fa-bars"></i>
                    <span>Choose a Category</span>
                </div>
                <div class="list-items">
                    ${categories.map(cat => `
                        <div class="list-item" data-category="${cat.id}">
                            <div class="list-item-icon">${cat.icon}</div>
                            <div class="list-item-content">
                                <div class="list-item-title">${cat.name}</div>
                                <div class="list-item-desc">${cat.desc}</div>
                            </div>
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.messagesContainer.appendChild(listMessage);

        // Add click events
        listMessage.querySelectorAll('.list-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                const products = getWhatsAppProductsByCategory(category);

                // Add user message showing selection
                this.addUserMessage(`Show me ${item.querySelector('.list-item-title').textContent}`);

                // Show typing and then products
                this.showTypingIndicator();
                setTimeout(() => {
                    this.hideTypingIndicator();
                    this.addBotMessage(`Here are our ${item.querySelector('.list-item-title').textContent} products! 💊`, products);
                }, 1000);
            });
        });

        this.scrollToBottom();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.whatsappChatbot = new WhatsAppPharmaChatbot();
});