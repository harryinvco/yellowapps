// Shopping cart functionality
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('pharmacyCart') || '[]');
        this.isOpen = false;
        
        // DOM elements
        this.cartToggle = document.getElementById('cartToggle');
        this.cartSidebar = document.getElementById('cartSidebar');
        this.closeCart = document.getElementById('closeCart');
        this.cartCount = document.getElementById('cartCount');
        this.cartItems = document.getElementById('cartItems');
        this.cartSummary = document.getElementById('cartSummary');
        this.checkoutBtn = document.getElementById('checkoutBtn');
        this.checkoutModal = document.getElementById('checkoutModal');
        this.successModal = document.getElementById('successModal');
        
        this.taxRate = 0.08; // 8% tax rate
        
        this.initializeEventListeners();
        this.updateCartDisplay();
    }
    
    initializeEventListeners() {
        // Cart toggle
        this.cartToggle.addEventListener('click', () => this.toggleCart());
        this.closeCart.addEventListener('click', () => this.closeCartSidebar());
        
        // Checkout button
        this.checkoutBtn.addEventListener('click', () => this.openCheckout());
        
        // Checkout modal
        document.getElementById('closeCheckout').addEventListener('click', () => this.closeCheckout());
        document.getElementById('checkoutForm').addEventListener('submit', (e) => this.processCheckout(e));
        
        // Success modal
        document.getElementById('continueBtn').addEventListener('click', () => this.closeSuccessModal());
        
        // Close modals on overlay click
        [this.checkoutModal, this.successModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    if (modal === this.checkoutModal) this.closeCheckout();
                    if (modal === this.successModal) this.closeSuccessModal();
                }
            });
        });
        
        // Input formatting for checkout form
        this.setupInputFormatting();
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
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showCartNotification('Item added to cart!');
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
    
    toggleCart() {
        if (this.isOpen) {
            this.closeCartSidebar();
        } else {
            this.openCartSidebar();
        }
    }
    
    openCartSidebar() {
        this.cartSidebar.classList.add('open');
        this.isOpen = true;
    }
    
    closeCartSidebar() {
        this.cartSidebar.classList.remove('open');
        this.isOpen = false;
    }
    
    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartSummary();
    }
    
    updateCartCount() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCount.textContent = totalItems;
        this.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    updateCartItems() {
        if (this.items.length === 0) {
            this.cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <span>Start chatting to get product recommendations!</span>
                </div>
            `;
            this.cartSummary.style.display = 'none';
            return;
        }
        
        this.cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">
                    ${item.icon}
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease" data-product-id="${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-product-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="remove-item" data-product-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        // Add event listeners to cart item controls
        this.cartItems.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = btn.getAttribute('data-product-id');
                const item = this.items.find(i => i.id === productId);
                this.updateQuantity(productId, item.quantity - 1);
            });
        });
        
        this.cartItems.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = btn.getAttribute('data-product-id');
                const item = this.items.find(i => i.id === productId);
                this.updateQuantity(productId, item.quantity + 1);
            });
        });
        
        this.cartItems.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = btn.getAttribute('data-product-id');
                this.removeItem(productId);
            });
        });
        
        this.cartSummary.style.display = 'block';
    }
    
    updateCartSummary() {
        if (this.items.length === 0) return;
        
        const subtotal = this.getSubtotal();
        const tax = subtotal * this.taxRate;
        const total = subtotal + tax;
        
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
    
    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    getTotal() {
        const subtotal = this.getSubtotal();
        return subtotal + (subtotal * this.taxRate);
    }
    
    openCheckout() {
        if (this.items.length === 0) {
            this.showCartNotification('Your cart is empty!');
            return;
        }
        
        this.populateCheckoutSummary();
        this.checkoutModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    closeCheckout() {
        this.checkoutModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    populateCheckoutSummary() {
        const checkoutItems = document.getElementById('checkoutItems');
        const checkoutTotal = document.getElementById('checkoutTotal');
        
        checkoutItems.innerHTML = this.items.map(item => `
            <div class="checkout-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
        
        checkoutTotal.textContent = `$${this.getTotal().toFixed(2)}`;
    }
    
    processCheckout(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const orderData = {
            customer: {
                firstName: formData.get('firstName') || document.getElementById('firstName').value,
                lastName: formData.get('lastName') || document.getElementById('lastName').value,
                email: formData.get('email') || document.getElementById('email').value,
                phone: formData.get('phone') || document.getElementById('phone').value,
                address: formData.get('address') || document.getElementById('address').value
            },
            payment: {
                cardNumber: document.getElementById('cardNumber').value,
                expiryDate: document.getElementById('expiryDate').value,
                cvv: document.getElementById('cvv').value
            },
            items: [...this.items],
            subtotal: this.getSubtotal(),
            tax: this.getSubtotal() * this.taxRate,
            total: this.getTotal(),
            orderDate: new Date().toISOString()
        };
        
        // Simulate processing delay
        const submitBtn = e.target.querySelector('.place-order-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Simulate successful order
            this.completeOrder(orderData);
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    completeOrder(orderData) {
        // Save order to localStorage (in a real app, this would go to a server)
        const orders = JSON.parse(localStorage.getItem('pharmacyOrders') || '[]');
        orderData.orderId = 'PH' + Date.now().toString().slice(-6);
        orders.push(orderData);
        localStorage.setItem('pharmacyOrders', JSON.stringify(orders));
        
        // Clear cart
        this.clearCart();
        
        // Close checkout modal
        this.closeCheckout();
        
        // Show success modal
        this.showSuccessModal(orderData);
        
        // Close cart sidebar
        this.closeCartSidebar();
    }
    
    showSuccessModal(orderData) {
        // Update success message with order ID
        const successModal = this.successModal.querySelector('.success-modal');
        const orderIdElement = successModal.querySelector('.order-id');
        if (orderIdElement) {
            orderIdElement.remove();
        }
        
        const orderIdDiv = document.createElement('p');
        orderIdDiv.className = 'order-id';
        orderIdDiv.innerHTML = `<strong>Order ID: ${orderData.orderId}</strong>`;
        successModal.insertBefore(orderIdDiv, successModal.querySelector('.continue-btn'));
        
        this.successModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    closeSuccessModal() {
        this.successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    showCartNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--secondary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            animation: slideInRight 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        // Add CSS animation if not already defined
        if (!document.querySelector('#cart-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'cart-notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    setupInputFormatting() {
        // Format card number input
        const cardNumberInput = document.getElementById('cardNumber');
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            
            if (formattedValue.length > 19) {
                formattedValue = formattedValue.substr(0, 19);
            }
            
            e.target.value = formattedValue;
        });
        
        // Format expiry date input
        const expiryInput = document.getElementById('expiryDate');
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substr(0, 2) + '/' + value.substr(2, 2);
            }
            e.target.value = value;
        });
        
        // Format CVV input
        const cvvInput = document.getElementById('cvv');
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substr(0, 3);
        });
        
        // Format phone input
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = '(' + value.substr(0, 3) + ') ' + value.substr(3, 3) + '-' + value.substr(6, 4);
            } else if (value.length >= 3) {
                value = '(' + value.substr(0, 3) + ') ' + value.substr(3);
            }
            e.target.value = value;
        });
    }
    
    saveCart() {
        localStorage.setItem('pharmacyCart', JSON.stringify(this.items));
    }
    
    // Method to get cart data for external use
    getCartData() {
        return {
            items: this.items,
            subtotal: this.getSubtotal(),
            tax: this.getSubtotal() * this.taxRate,
            total: this.getTotal(),
            itemCount: this.items.reduce((sum, item) => sum + item.quantity, 0)
        };
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
});