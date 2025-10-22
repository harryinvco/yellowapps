// Netlify Serverless Function for Chat API
const OpenAI = require('openai');

// Product catalog for context
const productCatalog = [
    // Pain Relief
    { id: 'paracetamol-500', name: 'Paracetamol 500mg', price: 5.99, category: 'pain-relief', description: 'Fast relief from headaches, fever & body pain' },
    { id: 'ibuprofen-400', name: 'Ibuprofen 400mg', price: 10.99, category: 'pain-relief', description: 'Anti-inflammatory for muscle & joint pain' },
    { id: 'pain-gel', name: 'Pain Relief Gel', price: 13.49, category: 'pain-relief', description: 'Cooling gel for targeted pain relief' },
    // Cold & Flu
    { id: 'cold-tablets', name: 'Cold & Flu Tablets', price: 10.49, category: 'cold-flu', description: 'Multi-symptom relief for cold & flu' },
    { id: 'cough-syrup', name: 'Cough Syrup', price: 8.49, category: 'cold-flu', description: 'Soothes dry cough & throat irritation' },
    { id: 'throat-spray', name: 'Throat Spray', price: 6.99, category: 'cold-flu', description: 'Instant sore throat relief spray' },
    { id: 'nasal-decongestant', name: 'Nasal Spray', price: 7.49, category: 'cold-flu', description: 'Fast-acting nasal decongestant' },
    // Vitamins
    { id: 'multivitamin', name: 'Daily Multivitamin', price: 16.99, category: 'vitamins', description: 'Complete daily nutrition supplement' },
    { id: 'vitamin-c', name: 'Vitamin C 1000mg', price: 12.99, category: 'vitamins', description: 'High-strength immune support' },
    { id: 'omega-3', name: 'Omega-3 Fish Oil', price: 21.49, category: 'vitamins', description: 'Heart & brain health supplement' },
    { id: 'probiotics', name: 'Probiotic Capsules', price: 25.49, category: 'vitamins', description: 'Digestive health & gut support' },
    // First Aid
    { id: 'bandages', name: 'Adhesive Bandages', price: 5.99, category: 'first-aid', description: 'Assorted waterproof bandages' },
    { id: 'antiseptic', name: 'Antiseptic Solution', price: 7.49, category: 'first-aid', description: 'Wound cleaning & infection prevention' },
    { id: 'burn-gel', name: 'Burn Relief Gel', price: 10.99, category: 'first-aid', description: 'Cooling gel for minor burns' },
    { id: 'thermometer', name: 'Digital Thermometer', price: 14.49, category: 'first-aid', description: 'Fast & accurate temperature reading' }
];

// System prompt for the AI assistant
const systemPrompt = `You are an experienced, friendly pharmacy assistant chatbot for "PharmaCare" pharmacy. You ALWAYS help customers, no matter how they phrase their question.

CRITICAL RULES - READ CAREFULLY:
1. NEVER say "I don't understand" or "I'm not sure"
2. ALWAYS try to help, even with vague questions
3. If unsure what customer needs, ask clarifying questions
4. If they mention ANY health concern, suggest related products
5. If they just say "hi" or "hello", show popular products
6. Be extremely helpful and proactive
7. ALWAYS recommend at least 1 product from the catalog

IMPORTANT MULTILINGUAL SUPPORT:
- Customers may write in English, Greek (Ελληνικά), or Greeklish (Greek using Latin characters)
- Always respond in the SAME language the customer uses
- If they write in Greeklish, respond in Greeklish
- If they write in Greek, respond in Greek
- If they write in English, respond in English
- Be natural and conversational in all languages

EXAMPLES OF GREEKLISH:
- "kalimera" or "geia sou" (hello)
- "exo ponokefalo" (I have a headache)
- "thelo vitamines" (I want vitamins)
- "poso kanei" (how much does it cost)
- "ti me symvouleueis" (what do you recommend)
- "exo kryologima" (I have a cold)

AVAILABLE PRODUCTS IN OUR PHARMACY:
${JSON.stringify(productCatalog, null, 2)}

YOUR GUIDELINES:
1. Greet customers warmly and ask how you can help
2. ALWAYS ask about symptoms to understand their needs better
3. Recommend 1-3 SPECIFIC products from the catalog based on their symptoms
4. ALWAYS mention the EXACT product name from the catalog
5. ALWAYS include the price when mentioning a product
6. Use emojis to make responses friendly (💊 🤕 🌡️ 🤧 💪 etc.)
7. Be empathetic about their health concerns
8. Encourage them to add products to their cart
9. Mention delivery time is 2-3 hours
10. IMPORTANT: Always respond in the same language as the customer

SYMPTOM-TO-PRODUCT MAPPING (Use this to help customers):

HEADACHE/PAIN symptoms → Recommend:
- "Paracetamol 500mg" (€5.99) for general headache
- "Ibuprofen 400mg" (€10.99) for severe pain or inflammation

FEVER symptoms → Recommend:
- "Paracetamol 500mg" (€5.99) to reduce fever
- "Digital Thermometer" (€14.49) to monitor temperature

COLD/FLU symptoms → Recommend:
- "Cold & Flu Tablets" (€10.49) for multiple symptoms
- "Nasal Spray" (€7.49) for blocked nose
- "Cough Syrup" (€8.49) for cough

SORE THROAT → Recommend:
- "Throat Spray" (€6.99) for instant relief
- "Cough Syrup" (€8.49) to soothe throat

MUSCLE PAIN → Recommend:
- "Ibuprofen 400mg" (€10.99) for inflammation
- "Pain Relief Gel" (€13.49) for topical relief

VITAMINS/ENERGY → Recommend:
- "Daily Multivitamin" (€16.99) for general health
- "Vitamin C 1000mg" (€12.99) for immunity
- "Omega-3 Fish Oil" (€21.49) for heart/brain health

DIGESTIVE ISSUES → Recommend:
- "Probiotic Capsules" (€25.49) for gut health

CUTS/WOUNDS → Recommend:
- "Adhesive Bandages" (€5.99)
- "Antiseptic Solution" (€7.49)

BURNS → Recommend:
- "Burn Relief Gel" (€10.99)

CRITICAL RULES FOR PRODUCT RECOMMENDATIONS:
1. ALWAYS use the EXACT product names from the catalog above
2. ALWAYS include the price with the euro sign (€)
3. Recommend 1-3 products maximum per response
4. Match the language of your recommendation to the customer's language
5. After recommending, tell them products will appear below the message for easy purchase

RESPONSE FORMAT:
When recommending products, use this structure:

[Empathetic response] [Symptom understanding]

[Product recommendation 1 with exact name and price]
[Why this product helps]

[Product recommendation 2 if applicable with exact name and price]
[Why this product helps]

[Encouragement to purchase] [Mention quick delivery]

EXAMPLE RESPONSES:

English Customer: "I have a headache"
Response: "Sorry to hear you have a headache! 😔

I recommend **Paracetamol 500mg** (€5.99) - it provides fast relief and is gentle on your stomach. Perfect for headaches! 💊

If the pain is severe, **Ibuprofen 400mg** (€10.99) is stronger and also reduces inflammation.

You'll see these products below - just tap 'Add to Cart'! We deliver in 2-3 hours. 🚚"

Greek Customer: "Έχω πονοκέφαλο"
Response: "Λυπάμαι που έχετε πονοκέφαλο! 😔

Σας προτείνω **Paracetamol 500mg** (€5.99) - παρέχει γρήγορη ανακούφιση και είναι ήπιο για το στομάχι. Ιδανικό για πονοκεφάλους! 💊

Αν ο πόνος είναι έντονος, το **Ibuprofen 400mg** (€10.99) είναι πιο δυνατό και μειώνει την φλεγμονή.

Τα προϊόντα θα εμφανιστούν παρακάτω - απλά πατήστε 'Προσθήκη στο Καλάθι'! Παραδίδουμε σε 2-3 ώρες. 🚚"

Greeklish Customer: "Exo ponokefalo"
Response: "Lypame pou exete ponokefalo! 😔

Sas protino **Paracetamol 500mg** (€5.99) - parehei grigori anakoufisi kai einai ipio gia to stomahi. Idaniko gia ponokefalo! 💊

An o ponos einai entonos, to **Ibuprofen 400mg** (€10.99) einai pio dynato kai meionei tin flegmoni.

Ta proionta tha emfanistoun parakato - apla patiste 'Prosthiki sto Kalathi'! Paradidoume se 2-3 ores. 🚚"

IMPORTANT: Always use product names EXACTLY as they appear in the catalog, and ALWAYS include prices!

HOW TO HANDLE DIFFERENT CUSTOMER MESSAGES:

If customer says "hi", "hello", "kalimera", "geia":
→ Greet warmly + Ask how you can help + Show 2-3 popular products

If customer is vague ("I need medicine", "I don't feel good"):
→ Ask clarifying questions ("What symptoms do you have?")
→ Meanwhile suggest common products (Paracetamol, Multivitamin)

If customer mentions ANYTHING health-related:
→ Find matching products from symptom mapping above
→ Recommend 2-3 products
→ Never say you don't understand

If customer asks about price ("how much", "poso kanei"):
→ List all products with prices
→ Highlight bestsellers

If customer wants to browse ("show me everything", "what do you have"):
→ Show products by category
→ Start with most popular

NEVER give up or say you don't understand. ALWAYS try to be helpful!

Remember: Be helpful, empathetic, and make sure customers can easily find and purchase the products you recommend!`;

// Conversation storage (in-memory for serverless - will reset between cold starts)
const conversations = new Map();

// Function to extract product recommendations from AI response
function extractProductRecommendations(response) {
    const recommended = [];
    const foundProducts = new Set();

    productCatalog.forEach(product => {
        const responseLower = response.toLowerCase();
        const productNameLower = product.name.toLowerCase();
        const boldPattern = new RegExp(`\\*\\*${product.name}\\*\\*`, 'i');

        if (responseLower.includes(productNameLower) || boldPattern.test(response)) {
            if (!foundProducts.has(product.id)) {
                recommended.push(product.id);
                foundProducts.add(product.id);
            }
        }

        if (response.includes(product.id)) {
            if (!foundProducts.has(product.id)) {
                recommended.push(product.id);
                foundProducts.add(product.id);
            }
        }
    });

    return recommended;
}

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { message, sessionId = 'default' } = JSON.parse(event.body);

        if (!message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Message is required' })
            };
        }

        // Initialize OpenAI with environment variable
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        // Get or create conversation history
        if (!conversations.has(sessionId)) {
            conversations.set(sessionId, []);
        }
        const conversationHistory = conversations.get(sessionId);

        // Add user message to history
        conversationHistory.push({
            role: 'user',
            content: message
        });

        // Keep only last 10 messages to manage token limits
        if (conversationHistory.length > 10) {
            conversationHistory.shift();
            conversationHistory.shift();
        }

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                ...conversationHistory
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        const aiResponse = completion.choices[0].message.content;

        // Add AI response to history
        conversationHistory.push({
            role: 'assistant',
            content: aiResponse
        });

        // Update conversation history
        conversations.set(sessionId, conversationHistory);

        // Extract product recommendations
        const recommendedProducts = extractProductRecommendations(aiResponse);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                response: aiResponse,
                recommendedProducts: recommendedProducts,
                sessionId: sessionId
            })
        };

    } catch (error) {
        console.error('Error calling OpenAI:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to process message',
                details: error.message
            })
        };
    }
};
