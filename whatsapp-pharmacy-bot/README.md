# 💊 PharmaCare - WhatsApp Pharmacy Chatbot

A modern, WhatsApp-style pharmacy chatbot with AI-powered multilingual support (English, Greek, Greeklish). Built with OpenAI GPT-4o-mini for intelligent product recommendations and customer service.

![Pharmacy Chatbot](https://img.shields.io/badge/AI-Powered-green)
![Languages](https://img.shields.io/badge/Languages-3-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

## ✨ Features

- 🤖 **AI-Powered Assistant** - Intelligent product recommendations using OpenAI GPT-4o-mini
- 🌍 **Multilingual Support** - English, Greek (Ελληνικά), and Greeklish
- 📱 **WhatsApp-Style UI** - Authentic messaging experience
- 🛒 **Shopping Cart** - Full e-commerce functionality
- 💳 **Multiple Payment Methods** - Cash on Delivery, Card, Apple Pay
- 🚚 **Order Management** - Track orders with 2-3 hour delivery
- 📦 **Product Catalog** - 15 pharmacy products across 4 categories
- 🎨 **Responsive Design** - Mobile-first, works on all devices
- 💶 **Euro Currency** - All prices in EUR

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd whatsapp-pharmacy-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

4. **Run the development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🌐 Deploy to Netlify

### Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### Manual Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick steps:**
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect repository to Netlify
3. Add `OPENAI_API_KEY` environment variable in Netlify
4. Deploy!

## 📦 Product Categories

- 💊 **Pain Relief** - Paracetamol, Ibuprofen, Pain Gel
- 🤧 **Cold & Flu** - Tablets, Cough Syrup, Throat Spray, Nasal Spray
- 💪 **Vitamins** - Multivitamin, Vitamin C, Omega-3, Probiotics
- 🩹 **First Aid** - Bandages, Antiseptic, Burn Gel, Thermometer

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Netlify Serverless Functions
- **AI:** OpenAI GPT-4o-mini
- **Styling:** Custom CSS with WhatsApp design patterns
- **Icons:** Font Awesome
- **Storage:** LocalStorage for cart persistence

## 🌍 Language Support

The chatbot automatically detects and responds in the customer's language:

- **English:** "I have a headache"
- **Greek:** "Έχω πονοκέφαλο"
- **Greeklish:** "Exo ponokefalo"

## 💡 Usage Examples

### Customer Interactions

```
Customer: "I have a headache"
Bot: "Sorry to hear you have a headache! 😔

I recommend **Paracetamol 500mg** (€5.99) - it provides fast relief 
and is gentle on your stomach. Perfect for headaches! 💊

You'll see these products below - just tap 'Add to Cart'! 
We deliver in 2-3 hours. 🚚"
```

### Greeklish Example

```
Customer: "Exo kryologima"
Bot: "Lypame pou exete kryologima! 🤧

Sas protino **Cold & Flu Tablets** (€10.49) - 
boitha me ola ta symptomata tou kryologimatos!

Ta proionta tha emfanistoun parakato! 
Paradidoume se 2-3 ores. 🚚"
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `PORT` | Port for local dev (default: 3000) | No |

## 📁 Project Structure

```
whatsapp-pharmacy-bot/
├── index.html              # Main HTML file
├── css/
│   └── whatsapp-style.css  # WhatsApp-style CSS
├── js/
│   ├── whatsapp-app.js     # Main app logic
│   ├── whatsapp-chatbot.js # Chatbot functionality
│   ├── whatsapp-cart.js    # Shopping cart
│   └── whatsapp-products.js # Product catalog
├── netlify/
│   └── functions/
│       ├── chat.js         # AI chat endpoint
│       └── health.js       # Health check endpoint
├── netlify.toml            # Netlify configuration
├── server.js               # Local dev server (optional)
├── package.json            # Dependencies
├── .env.example            # Environment template
└── DEPLOYMENT.md           # Deployment guide
```

## 🧪 Testing

### Test the AI Chatbot

1. Ask health-related questions
2. Try different languages (English/Greek/Greeklish)
3. Add products to cart
4. Complete checkout process

### Test API Endpoints

```bash
# Health check
curl https://your-site.netlify.app/api/health

# Chat endpoint
curl -X POST https://your-site.netlify.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"I have a headache","sessionId":"test123"}'
```

## 🐛 Troubleshooting

### AI not responding
- Verify `OPENAI_API_KEY` is set correctly
- Check API key is valid at https://platform.openai.com/api-keys
- Review function logs in Netlify Dashboard

### Products not loading
- Clear browser cache
- Check browser console for errors
- Verify `whatsapp-products.js` is loaded

### Checkout not working
- Ensure all form fields are filled
- Check browser console for errors
- Verify cart has items

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or issues:
- Open an issue on GitHub
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Review Netlify documentation

## 🎉 Acknowledgments

- OpenAI for GPT-4o-mini API
- Font Awesome for icons
- Netlify for serverless functions and hosting

---

Made with ❤️ for pharmacy customers worldwide
