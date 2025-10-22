// WhatsApp-style Shopping Cart
class WhatsAppShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('whatsappPharmacyCart') || '[]');
        
        // DOM elements
        this.cartBtn = document.getElementById('cartBtn');
        this.cartBadge = document.getElementById('cartBadge');
        this.cartModal = document.getElementById('cartModal');
        this.cartContent = document.getElementById('cartContent');
        this.cartFooter = document.getElementById('cartFooter');
        this.checkoutModal = document.getElementById('checkoutModal');
        this.successModal = document.getElementById('successModal');
        
        this.taxRate = 0.08; // 8% tax
        this.deliveryFee = 2.99;
        
        this.initializeEventListeners();
        this.updateCartDisplay();
    }
    
    initializeEventListeners() {
        // Cart button
        this.cartBtn.addEventListener('click', () => this.openCart());
        
        // Close cart
        document.getElementById('closeCart').addEventListener('click', () => this.closeCart());
        
        // Checkout
        document.getElementById('checkoutBtn').addEventListener('click', () => this.openCheckout());
        
        // Close checkout
        document.getElementById('closeCheckout').addEventListener('click', () => this.closeCheckout());
        
        // Checkout form
        document.getElementById('checkoutForm').addEventListener('submit', (e) => this.processOrder(e));
        
        // Success modal
        document.getElementById('continueBtn').addEventListener('click', () => this.closeSuccess());
        
        // Close modals on background click
        [this.cartModal, this.checkoutModal, this.successModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });
        });
        
        // Phone number formatting
        this.setupPhoneFormatting();
    }
    
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                icon: product.icon,
                quantity: quantity,
                whatsappDescription: product.whatsappDescription
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showCartNotification(`${product.icon} ${product.name} added!`);
        
        // Vibrate if supported (mobile)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }
    
    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(productId);
            return;
        }
        
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartDisplay();
        }
    }
    
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartDisplay();
    }
    
    openCart() {
        this.cartModal.style.display = 'flex';
        setTimeout(() => {
            this.cartModal.classList.add('open');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    closeCart() {
        this.cartModal.classList.remove('open');
        setTimeout(() => {
            this.cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    openCheckout() {
        if (this.items.length === 0) {
            this.showCartNotification('Your cart is empty!');
            return;
        }
        
        this.closeCart();
        this.populateOrderSummary();
        this.checkoutModal.style.display = 'flex';
        setTimeout(() => {
            this.checkoutModal.classList.add('open');
        }, 10);
    }
    
    closeCheckout() {
        this.checkoutModal.classList.remove('open');
        setTimeout(() => {
            this.checkoutModal.style.display = 'none';
        }, 300);
    }
    
    closeSuccess() {
        this.successModal.classList.remove('open');
        setTimeout(() => {
            this.successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    closeAllModals() {
        this.closeCart();
        this.closeCheckout();
        this.closeSuccess();
    }
    
    updateCartDisplay() {
        this.updateCartBadge();
        this.updateCartContent();
        this.updateCartFooter();
    }
    
    updateCartBadge() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        this.cartBadge.textContent = totalItems;
        this.cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    updateCartContent() {
        if (this.items.length === 0) {
            this.cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <span>Add some products to get started!</span>
                </div>
            `;
            this.cartFooter.style.display = 'none';
            return;
        }
        
        this.cartContent.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-icon">${item.icon}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">€${item.price} each</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="window.whatsappCart.updateQuantity('${item.id}', ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="window.whatsappCart.updateQuantity('${item.id}', ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="quantity-btn" onclick="window.whatsappCart.removeItem('${item.id}')" style="color: #ff4444;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        this.cartFooter.style.display = 'block';
    }
    
    updateCartFooter() {
        if (this.items.length === 0) return;
        
        const subtotal = this.getSubtotal();
        const tax = subtotal * this.taxRate;
        const total = subtotal + tax + this.deliveryFee;
        
        document.getElementById('subtotalAmount').textContent = subtotal.toFixed(2);
        document.getElementById('totalAmount').textContent = total.toFixed(2);
        
        document.getElementById('cartItemCount').textContent = this.items.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    populateOrderSummary() {
        const orderItems = document.getElementById('orderItems');
        const orderTotal = document.getElementById('orderTotal');
        
        const subtotal = this.getSubtotal();
        const tax = subtotal * this.taxRate;
        const total = subtotal + tax + this.deliveryFee;
        
        orderItems.innerHTML = this.items.map(item => `
            <div class="order-item">
                <span>${item.icon} ${item.name} × ${item.quantity}</span>
                <span>€${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('') + `
            <div class="order-item">
                <span>Delivery Fee</span>
                <span>€${this.deliveryFee.toFixed(2)}</span>
            </div>
            <div class="order-item">
                <span>Tax</span>
                <span>€${tax.toFixed(2)}</span>
            </div>
        `;
        
        orderTotal.textContent = total.toFixed(2);
    }
    
    processOrder(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const orderData = {
            customer: {
                name: document.getElementById('customerName').value,
                email: document.getElementById('customerEmail').value,
                phone: document.getElementById('customerPhone').value,
                address: document.getElementById('customerAddress').value,
                city: document.getElementById('customerCity').value,
                postalCode: document.getElementById('customerPostal').value,
                deliveryNotes: document.getElementById('deliveryNotes').value
            },
            payment: formData.get('payment'),
            items: [...this.items],
            subtotal: this.getSubtotal(),
            tax: this.getSubtotal() * this.taxRate,
            deliveryFee: this.deliveryFee,
            total: this.getSubtotal() + (this.getSubtotal() * this.taxRate) + this.deliveryFee,
            orderDate: new Date().toISOString(),
            orderId: this.generateOrderId()
        };

        // Simulate processing
        const submitBtn = e.target.querySelector('.place-order-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            this.completeOrder(orderData);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    completeOrder(orderData) {
        // Save order
        const orders = JSON.parse(localStorage.getItem('whatsappPharmacyOrders') || '[]');
        orders.push(orderData);
        localStorage.setItem('whatsappPharmacyOrders', JSON.stringify(orders));
        
        // Clear cart
        this.clearCart();
        
        // Show success
        document.getElementById('orderIdDisplay').textContent = orderData.orderId;
        this.closeCheckout();
        this.showSuccess();
        
        // Send confirmation message to chat
        setTimeout(() => {
            if (window.whatsappChatbot) {
                const confirmationMessage = `✅ Order confirmed! 🎉\n\nOrder ID: ${orderData.orderId}\nTotal: €${orderData.total.toFixed(2)}\nDelivery: 2-3 hours\n\nThank you for choosing PharmaCare! 💊`;
                window.whatsappChatbot.addBotMessage(confirmationMessage);
            }
        }, 1000);
        
        // Vibrate for success
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }
    
    showSuccess() {
        this.successModal.style.display = 'flex';
        setTimeout(() => {
            this.successModal.classList.add('open');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    generateOrderId() {
        return 'WP' + Date.now().toString().slice(-6);
    }
    
    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    showCartNotification(message) {
        // Create WhatsApp-style notification
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--whatsapp-primary);
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 20px;
                z-index: 1000;
                font-size: 0.9rem;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                animation: slideDown 0.3s ease-out;
            ">
                ${message}
            </div>
        `;
        
        // Add animation styles
        if (!document.querySelector('#whatsapp-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'whatsapp-notification-styles';
            style.textContent = `
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -100%);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }
                @keyframes slideUp {
                    from {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                    to {
                        opacity: 0;
                        transform: translate(-50%, -100%);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            const notificationElement = notification.querySelector('div');
            notificationElement.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    setupPhoneFormatting() {
        const phoneInput = document.getElementById('customerPhone');
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    }
    
    saveCart() {
        localStorage.setItem('whatsappPharmacyCart', JSON.stringify(this.items));
    }
    
    // Public API
    getCartData() {
        return {
            items: this.items,
            subtotal: this.getSubtotal(),
            tax: this.getSubtotal() * this.taxRate,
            deliveryFee: this.deliveryFee,
            total: this.getSubtotal() + (this.getSubtotal() * this.taxRate) + this.deliveryFee,
            itemCount: this.items.reduce((sum, item) => sum + item.quantity, 0)
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.whatsappCart = new WhatsAppShoppingCart();
});