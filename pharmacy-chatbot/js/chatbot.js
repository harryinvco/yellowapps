// Chatbot functionality for PharmaCare AI Assistant
class PharmaChatbot {
    constructor() {
        this.messagesContainer = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.productsGrid = document.getElementById('productsGrid');
        
        this.conversationHistory = [];
        this.isTyping = false;
        
        this.initializeEventListeners();
        this.displayInitialProducts();
    }

    initializeEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Quick action buttons
        document.querySelectorAll('.quick-action').forEach(button => {
            button.addEventListener('click', () => {
                const message = button.getAttribute('data-message');
                this.sendMessage(message);
            });
        });
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.handleCategoryFilter(button);
            });
        });
    }

    sendMessage(predefinedMessage = null) {
        const message = predefinedMessage || this.messageInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Clear input
        this.messageInput.value = '';
        
        // Add to conversation history
        this.conversationHistory.push({ role: 'user', message: message });
        
        // Show typing indicator and process response
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.processUserMessage(message);
        }, 1500 + Math.random() * 1000); // Random delay for realism
    }

    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        if (typeof message === 'string') {
            messageContent.innerHTML = `<p>${message}</p>`;
        } else {
            messageContent.appendChild(message);
        }
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = this.getCurrentTime();
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        this.isTyping = true;
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        this.typingIndicator.style.display = 'none';
    }

    processUserMessage(message) {
        const response = this.generateResponse(message);
        
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(response.text, 'bot');
            
            if (response.products && response.products.length > 0) {
                this.displayProducts(response.products);
            }
            
            this.conversationHistory.push({ role: 'bot', message: response.text });
        }, 500);
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Greeting responses
        if (this.containsAny(message, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
            return {
                text: "Hello! I'm here to help you with all your pharmaceutical needs. What symptoms or health concerns can I assist you with today?",
                products: this.getRandomProducts(4)
            };
        }
        
        // Pain-related queries
        if (this.containsAny(message, ['headache', 'head pain', 'migraine'])) {
            return {
                text: "I can help with headache relief! For headaches, I typically recommend acetaminophen or ibuprofen. Acetaminophen is gentler on the stomach, while ibuprofen also reduces inflammation. Here are some effective options:",
                products: this.getRecommendedProducts(['headache'])
            };
        }
        
        if (this.containsAny(message, ['muscle pain', 'muscle ache', 'sore muscles', 'muscle strain'])) {
            return {
                text: "For muscle pain and soreness, anti-inflammatory medications like ibuprofen work well, and topical gels can provide targeted relief. Here are my recommendations:",
                products: this.getRecommendedProducts(['muscle pain'])
            };
        }
        
        if (this.containsAny(message, ['joint pain', 'arthritis', 'joint ache'])) {
            return {
                text: "Joint pain can be effectively managed with anti-inflammatory medications. I recommend ibuprofen for internal relief and topical gels for direct application. These products can help:",
                products: this.getRecommendedProducts(['joint pain'])
            };
        }
        
        if (this.containsAny(message, ['back pain', 'backache'])) {
            return {
                text: "Back pain can be quite uncomfortable. I recommend anti-inflammatory medications combined with topical pain relief for best results. Consider these options:",
                products: this.getRecommendedProducts(['muscle pain'])
            };
        }
        
        // Cold and flu queries
        if (this.containsAny(message, ['cold', 'runny nose', 'stuffy nose', 'congestion'])) {
            return {
                text: "I can help you feel better! For cold symptoms, you'll want different medications for day and night. DayQuil keeps you alert during the day, while NyQuil helps you rest at night. Here are my recommendations:",
                products: this.getRecommendedProducts(['cold'])
            };
        }
        
        if (this.containsAny(message, ['flu', 'influenza', 'body aches', 'chills'])) {
            return {
                text: "The flu can make you feel terrible! I recommend a combination approach: pain relievers for body aches and fever, plus day/night cold medications. These products will help:",
                products: this.getRecommendedProducts(['flu'])
            };
        }
        
        if (this.containsAny(message, ['cough', 'coughing', 'throat'])) {
            return {
                text: "A persistent cough can be really bothersome. Cough suppressants and throat lozenges can provide relief. For nighttime, NyQuil can help you sleep despite the cough. Try these:",
                products: this.getRecommendedProducts(['cough'])
            };
        }
        
        if (this.containsAny(message, ['sore throat', 'throat pain'])) {
            return {
                text: "Sore throats are painful but treatable! Throat lozenges provide direct relief, while ibuprofen reduces inflammation and pain. Here's what I recommend:",
                products: this.getRecommendedProducts(['sore throat'])
            };
        }
        
        // Fever queries
        if (this.containsAny(message, ['fever', 'temperature', 'hot', 'feverish'])) {
            return {
                text: "For fever reduction, both acetaminophen and ibuprofen are effective. Acetaminophen is gentler on the stomach, while ibuprofen lasts longer. Stay hydrated! Here are good options:",
                products: this.getRecommendedProducts(['fever'])
            };
        }
        
        // Vitamins and supplements
        if (this.containsAny(message, ['vitamin', 'supplement', 'energy', 'tired', 'fatigue'])) {
            return {
                text: "Vitamins and supplements can definitely boost your energy and overall health! A good multivitamin covers your bases, while specific supplements like Vitamin D and Omega-3 target particular needs. Consider these:",
                products: this.getRecommendedProducts(['energy'])
            };
        }
        
        if (this.containsAny(message, ['immune', 'immunity', 'sick often', 'boost immune'])) {
            return {
                text: "Supporting your immune system is smart! Vitamin D, probiotics, and a good multivitamin all help strengthen your body's defenses. These products support immune health:",
                products: this.getRecommendedProducts(['immune'])
            };
        }
        
        if (this.containsAny(message, ['heart', 'cardiovascular', 'heart health'])) {
            return {
                text: "Heart health is crucial! Omega-3 fatty acids support cardiovascular function, and low-dose aspirin may be recommended by your doctor for heart protection. Consider these heart-healthy options:",
                products: this.getRecommendedProducts(['heart health'])
            };
        }
        
        // Digestive health
        if (this.containsAny(message, ['stomach', 'digestive', 'gut', 'probiotic', 'digestion'])) {
            return {
                text: "Digestive health affects your whole body! Probiotics help maintain healthy gut bacteria, which supports digestion and immune function. Here's what can help:",
                products: this.getRecommendedProducts(['digestive'])
            };
        }
        
        // First aid queries
        if (this.containsAny(message, ['cut', 'scrape', 'wound', 'bleeding', 'injured'])) {
            return {
                text: "For cuts and scrapes, proper wound care is essential! Clean the wound first with antiseptic wipes, then apply a sterile bandage. For pain and inflammation, consider these first aid essentials:",
                products: this.getRecommendedProducts(['cut'])
            };
        }
        
        if (this.containsAny(message, ['rash', 'itch', 'itchy', 'skin irritation'])) {
            return {
                text: "Skin irritation can be very uncomfortable! Hydrocortisone cream is excellent for reducing itching and inflammation from rashes, insect bites, and minor skin reactions. This should help:",
                products: this.getRecommendedProducts(['rash'])
            };
        }
        
        if (this.containsAny(message, ['sprain', 'swelling', 'swollen', 'twisted ankle'])) {
            return {
                text: "For sprains and swelling, the RICE method works well: Rest, Ice, Compression, Elevation. An instant cold pack and anti-inflammatory medication can provide immediate relief:",
                products: this.getRecommendedProducts(['sprain'])
            };
        }
        
        // Category browsing
        if (this.containsAny(message, ['pain relief', 'pain medication', 'pain killer'])) {
            this.updateCategoryFilter('pain-relief');
            return {
                text: "Here's our complete selection of pain relief medications. We have options for different types of pain - from headaches to muscle aches to joint pain:",
                products: this.getProductsByCategory('pain-relief')
            };
        }
        
        if (this.containsAny(message, ['vitamins', 'supplements', 'multivitamin'])) {
            this.updateCategoryFilter('vitamins');
            return {
                text: "Our vitamin and supplement selection includes everything from daily multivitamins to specialized nutrients. These support various aspects of your health:",
                products: this.getProductsByCategory('vitamins')
            };
        }
        
        if (this.containsAny(message, ['cold medicine', 'flu medicine', 'cold and flu'])) {
            this.updateCategoryFilter('cold-flu');
            return {
                text: "Here are all our cold and flu medications. Remember: DayQuil for daytime (non-drowsy), NyQuil for nighttime (helps you sleep), plus targeted treatments for specific symptoms:",
                products: this.getProductsByCategory('cold-flu')
            };
        }
        
        if (this.containsAny(message, ['first aid', 'bandage', 'antiseptic', 'emergency'])) {
            this.updateCategoryFilter('first-aid');
            return {
                text: "Here's our first aid selection for treating minor injuries and skin conditions. Every home should have these basics for emergency care:",
                products: this.getProductsByCategory('first-aid')
            };
        }
        
        // Shopping and cart queries
        if (this.containsAny(message, ['cart', 'checkout', 'order', 'buy', 'purchase'])) {
            return {
                text: "I can help you with your order! Click the shopping cart icon in the top right to view your items, adjust quantities, or proceed to checkout. Need help finding specific products?",
                products: []
            };
        }
        
        // Dosage and safety questions
        if (this.containsAny(message, ['dosage', 'how much', 'how often', 'directions'])) {
            return {
                text: "Dosage information is very important! Each product has specific dosing instructions listed on the product details. Always follow the package directions and consult a pharmacist or doctor if you're unsure. Would you like information about a specific medication?",
                products: []
            };
        }
        
        if (this.containsAny(message, ['side effects', 'safe', 'safety', 'interactions'])) {
            return {
                text: "Safety is our top priority! Always read medication labels carefully, check for drug interactions, and consult with a healthcare provider if you have questions. Each product includes safety information. What specific medication are you asking about?",
                products: []
            };
        }
        
        // General help
        if (this.containsAny(message, ['help', 'what can you do', 'how does this work'])) {
            return {
                text: "I'm here to help you find the right medications and health products! I can recommend treatments for symptoms, explain product benefits, help you browse categories, and assist with ordering. Just tell me about your symptoms or what you're looking for!",
                products: this.getRandomProducts(4)
            };
        }
        
        // Default response with product search
        const searchResults = this.searchProducts(message);
        if (searchResults.length > 0) {
            return {
                text: `I found some products that might help with "${userMessage}". Here are the most relevant options:`,
                products: searchResults.slice(0, 6)
            };
        }
        
        // Fallback response
        return {
            text: "I'd be happy to help! Could you tell me more about your symptoms or what you're looking for? I can assist with pain relief, cold & flu symptoms, vitamins, first aid, and more. You can also browse our categories using the filter buttons above the products.",
            products: this.getRandomProducts(4)
        };
    }

    containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }

    displayProducts(products) {
        this.productsGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = this.createProductCard(product);
            this.productsGrid.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                ${product.icon}
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">$${product.price}</div>
            <div class="product-actions">
                <button class="add-to-cart-btn" data-product-id="${product.id}">
                    <i class="fas fa-cart-plus"></i>
                    Add to Cart
                </button>
                <button class="quick-view-btn" data-product-id="${product.id}">
                    <i class="fas fa-info-circle"></i>
                </button>
            </div>
        `;
        
        // Add event listeners
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        const quickViewBtn = card.querySelector('.quick-view-btn');
        
        addToCartBtn.addEventListener('click', () => {
            window.cart.addItem(product);
            this.showAddToCartFeedback(addToCartBtn);
        });
        
        quickViewBtn.addEventListener('click', () => {
            this.showProductDetails(product);
        });
        
        return card;
    }

    showAddToCartFeedback(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.classList.add('added');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('added');
        }, 2000);
    }

    showProductDetails(product) {
        const message = `
            <div class="product-details">
                <h4>${product.name}</h4>
                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Active Ingredient:</strong> ${product.activeIngredient}</p>
                <p><strong>Dosage:</strong> ${product.dosage}</p>
                <p><strong>Benefits:</strong></p>
                <ul>
                    ${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
                <p><strong>Price:</strong> $${product.price}</p>
                <button class="add-to-cart-btn" onclick="window.cart.addItem(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        
        this.addMessage(message, 'bot');
    }

    handleCategoryFilter(button) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Get category and display products
        const category = button.getAttribute('data-category');
        const products = this.getProductsByCategory(category);
        this.displayProducts(products);
    }

    updateCategoryFilter(category) {
        const button = document.querySelector(`[data-category="${category}"]`);
        if (button) {
            this.handleCategoryFilter(button);
        }
    }

    displayInitialProducts() {
        this.displayProducts(this.getRandomProducts(8));
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Delegate to products.js functions
    getProductsByCategory(category) {
        return getProductsByCategory(category);
    }

    searchProducts(query) {
        return searchProducts(query);
    }

    getRecommendedProducts(symptoms) {
        return getRecommendedProducts(symptoms);
    }

    getRandomProducts(count) {
        return getRandomProducts(count);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new PharmaChatbot();
});