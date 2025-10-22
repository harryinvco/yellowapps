# 🎬 WhatsApp Pharmacy Bot - Demo Guide

## 🌟 What's New

Your WhatsApp pharmacy chatbot now features:

### ✅ **OpenAI-Powered Multilingual Support**
The bot can now understand and respond in:
- **English** - Natural English conversations
- **Greek (Ελληνικά)** - Native Greek language support
- **Greeklish** - Greek written in Latin characters

### ✅ **Intelligent Conversation**
- Context-aware responses using GPT-4o-mini
- Natural understanding of symptoms and health concerns
- Smart product recommendations based on customer needs
- Maintains conversation history for better context

### ✅ **Demo Checkout System**
Fully functional e-commerce flow:
- Add products to cart
- View and manage cart items
- Complete checkout with demo payment
- Receive order confirmation
- Order tracking ID generation

## 🚀 How to Run the Demo

### 1. Quick Start (5 minutes)

```bash
# 1. Navigate to the directory
cd whatsapp-pharmacy-bot

# 2. Create .env file
cp .env.example .env

# 3. Edit .env and add your OpenAI API key
# OPENAI_API_KEY=sk-your-actual-key-here

# 4. Start the server
npm start

# 5. Open in browser
# http://localhost:3000
```

### 2. Without OpenAI (Fallback Mode)

If you don't have an OpenAI API key yet:
- The bot will automatically use predefined responses
- Limited to English only
- Still fully functional for checkout demo

## 🎭 Demo Scenarios

### Scenario 1: English Customer with Headache

**You type:** "Hi, I have a terrible headache"

**Bot responds:**
> "Sorry to hear about your headache! 😔 I have some great options that work fast. For headaches, I recommend Paracetamol 500mg ($8.99). It provides fast relief and is gentle on the stomach! 💊"

*[Bot shows product carousel with recommendations]*

**You click:** "Add to Cart"

**Bot confirms:**
> "✅ Added Paracetamol 500mg to your cart! Tap the cart icon 🛒 to checkout."

### Scenario 2: Greek Customer with Cold

**You type:** "Γεια σας, έχω κρυολόγημα"

**Bot responds:**
> "Λυπάμαι που έχετε κρυολόγημα! 🤧 Για το κρυολόγημα, σας προτείνω Cold & Flu Tablets ($11.99). Παρέχει πλήρη ανακούφιση από τα συμπτώματα! 💊"

*[Shows relevant products]*

### Scenario 3: Greeklish Customer with Fatigue

**You type:** "Exo poli kourase, xreiazome vitamines"

**Bot responds:**
> "Katalaveno! Gia tin kourase, sas protino Daily Multivitamin ($19.99). Tha sas voithisi na anaktisite tin energeia sas! 💪"

*[Shows vitamin products]*

### Scenario 4: Complete Purchase Flow

1. **Ask for product:** "I need something for muscle pain"
2. **View recommendations:** Bot shows Ibuprofen and Pain Gel
3. **Add to cart:** Click "Add" button
4. **View cart:** Click cart icon (top right)
5. **Checkout:** Click "Checkout" button
6. **Fill form:**
   - Name: "John Doe"
   - Phone: "(555) 123-4567"
   - Address: "123 Main St, Athens"
   - Payment: Select "Cash on Delivery"
7. **Place order:** Click "Place Order"
8. **Confirmation:** Receive order ID (e.g., "WP458392")

## 💡 Features to Demonstrate

### 1. Language Detection
- Type in any language
- Bot automatically responds in the same language
- No language selection needed

### 2. Smart Recommendations
- Mention symptoms: "fever", "cough", "tired"
- Bot suggests relevant products
- Shows prices and descriptions

### 3. Product Carousel
- Swipeable product cards
- Tap to view details
- Quick add to cart

### 4. Shopping Cart
- View all items
- Adjust quantities
- Remove items
- See total with tax

### 5. Checkout Process
- Mobile-optimized form
- Multiple payment options
- Order summary
- Instant confirmation

### 6. Order Confirmation
- Unique order ID
- Total amount
- Delivery estimate (2-3 hours)
- Order saved in localStorage

## 🧪 Testing Commands

### API Test
```bash
# In a new terminal, run:
node test-multilingual.js
```

This will test all three languages automatically.

### Manual Health Check
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "WhatsApp Pharmacy Bot API is running",
  "openaiConfigured": true
}
```

## 📱 Mobile Demo

1. **Find your IP:**
   ```bash
   hostname -I
   # Example output: 192.168.1.100
   ```

2. **Open on mobile:**
   - Connect phone to same WiFi
   - Open browser
   - Go to `http://192.168.1.100:3000`

3. **Test mobile features:**
   - Touch gestures
   - Voice input (browser permission required)
   - Haptic feedback
   - WhatsApp-style UI

## 🎨 Customization Demo

### Change Products
Edit `js/whatsapp-products.js`:
```javascript
{
    id: 'custom-product',
    name: 'Your Product',
    price: 19.99,
    category: 'vitamins',
    // ... more fields
}
```

### Modify AI Behavior
Edit `server.js` - change the `systemPrompt`:
```javascript
const systemPrompt = `You are a helpful pharmacy assistant...`;
```

### Add More Languages
In `server.js`, expand the system prompt to include more languages:
- Italian, Spanish, French
- Arabic, Turkish
- Any language GPT-4 supports

## 🔍 Troubleshooting

### Issue: Bot gives generic responses
**Solution:** OpenAI API key not configured. Check `.env` file.

### Issue: Products not showing
**Solution:** Check browser console. API might be failing.

### Issue: Can't add to cart
**Solution:** Check `whatsapp-cart.js` is loaded. Open browser dev tools.

### Issue: Language detection not working
**Solution:** Ensure server is running and API is configured.

## 📊 Demo Statistics

**Current Catalog:**
- 15 pharmaceutical products
- 4 categories (Pain Relief, Cold & Flu, Vitamins, First Aid)
- Prices range: $6.99 - $29.99

**Supported Languages:**
- 3 languages (English, Greek, Greeklish)
- Automatic detection
- Context-aware responses

**Demo Features:**
- ✅ Chat interface
- ✅ Product recommendations
- ✅ Shopping cart
- ✅ Checkout flow
- ✅ Order confirmation
- ✅ Multilingual support
- ✅ Mobile responsive
- ✅ PWA capabilities

## 🎯 Next Steps

For production deployment:
1. Add real payment gateway (Stripe, PayPal)
2. Connect to actual inventory system
3. Implement user authentication
4. Add order tracking
5. Email/SMS notifications
6. Prescription upload feature
7. Pharmacist verification
8. Deploy to cloud (Heroku, AWS, Railway)

---

**Enjoy your demo! 🎉**

For questions or issues, check:
- `README.md` - Full documentation
- `SETUP.md` - Setup instructions
- Console logs - Debugging information
