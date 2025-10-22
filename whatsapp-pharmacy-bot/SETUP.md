# 🚀 Quick Setup Guide

## Step 1: Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (you'll only see it once!)

## Step 2: Configure Environment

Create a `.env` file in this directory:

```bash
OPENAI_API_KEY=your_actual_api_key_here
PORT=3000
```

**Important:** Replace `your_actual_api_key_here` with your actual OpenAI API key!

## Step 3: Start the Server

```bash
npm start
```

You should see:
```
🚀 WhatsApp Pharmacy Bot Server running on http://localhost:3000
📱 OpenAI Integration: ✅ Configured
💊 Ready to serve customers in English, Greek, and Greeklish!
```

## Step 4: Open in Browser

Navigate to: `http://localhost:3000`

## 🧪 Testing Multilingual Support

Try these messages:

### English
- "I have a headache"
- "Show me vitamins"
- "I need something for a cold"

### Greek (Ελληνικά)
- "Έχω πονοκέφαλο"
- "Θέλω βιταμίνες"
- "Χρειάζομαι κάτι για το κρυολόγημα"

### Greeklish
- "Exo ponokefalo"
- "Thelo vitamines"
- "Xreiazome kati gia krioloyima"

## 💳 Testing Checkout

1. Ask the bot for a product (e.g., "I need paracetamol")
2. Click "Add" on the recommended product
3. Click the cart icon (top right)
4. Click "Checkout"
5. Fill in the form with demo data
6. Click "Place Order"
7. See your order confirmation!

## 🔧 Troubleshooting

### "OpenAI Integration: ❌ Not configured"
- Check your `.env` file exists
- Verify your API key is correct
- Make sure `.env` is in the same directory as `server.js`

### API Errors
- Check your OpenAI API key is valid
- Ensure you have credits in your OpenAI account
- Check the console for error messages

### Fallback Mode
If OpenAI is not configured, the bot will use predefined responses in English only.

## 📱 Mobile Testing

1. Get your computer's IP address:
   ```bash
   hostname -I
   ```

2. On your mobile device (same WiFi):
   - Open browser
   - Go to `http://YOUR_IP:3000`
   - Try the chat in your preferred language!

## 🎯 Next Steps

- Customize products in `js/whatsapp-products.js`
- Modify AI behavior in `server.js` (systemPrompt)
- Add more languages to the system prompt
- Integrate real payment processing
- Deploy to production (Heroku, Railway, etc.)

---

Need help? Check the main README.md for more details!
