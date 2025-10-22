// WhatsApp-style Products for Pharmacy Bot
const whatsappProducts = [
    // Pain Relief
    {
        id: 'paracetamol-500',
        name: 'Paracetamol 500mg',
        category: 'pain-relief',
        price: 5.99,
        description: 'Fast relief from headaches, fever & body pain',
        icon: '💊',
        inStock: true,
        whatsappDescription: 'Quick pain relief tablets - Safe for adults & children over 12',
        dosage: '1-2 tablets every 4-6 hours',
        benefits: ['Headache relief', 'Fever reducer', 'Body pain relief']
    },
    {
        id: 'ibuprofen-400',
        name: 'Ibuprofen 400mg',
        category: 'pain-relief',
        price: 10.99,
        description: 'Anti-inflammatory for muscle & joint pain',
        icon: '🔥',
        inStock: true,
        whatsappDescription: 'Strong anti-inflammatory - Great for muscle pain & swelling',
        dosage: '1 tablet every 6-8 hours with food',
        benefits: ['Muscle pain', 'Joint inflammation', 'Long-lasting relief']
    },
    {
        id: 'pain-gel',
        name: 'Pain Relief Gel',
        category: 'pain-relief',
        price: 13.49,
        description: 'Cooling gel for targeted pain relief',
        icon: '🧴',
        inStock: true,
        whatsappDescription: 'Apply directly to painful areas - Fast-acting cooling gel',
        dosage: 'Apply 3-4 times daily to affected area',
        benefits: ['Targeted relief', 'Cooling effect', 'No oral medication needed']
    },

    // Cold & Flu
    {
        id: 'cold-tablets',
        name: 'Cold & Flu Tablets',
        category: 'cold-flu',
        price: 10.49,
        description: 'Multi-symptom relief for cold & flu',
        icon: '🤧',
        inStock: true,
        whatsappDescription: 'All-in-one cold relief - Stops runny nose, congestion & aches',
        dosage: '2 tablets every 4 hours',
        benefits: ['Congestion relief', 'Stops runny nose', 'Reduces body aches']
    },
    {
        id: 'cough-syrup',
        name: 'Cough Syrup',
        category: 'cold-flu',
        price: 7.49,
        description: 'Soothes dry cough & throat irritation',
        icon: '🍯',
        inStock: true,
        whatsappDescription: 'Natural honey-based formula - Calms persistent cough',
        dosage: '2 teaspoons every 4 hours',
        benefits: ['Dry cough relief', 'Soothes throat', 'Natural ingredients']
    },
    {
        id: 'throat-spray',
        name: 'Throat Spray',
        category: 'cold-flu',
        price: 5.99,
        description: 'Instant sore throat relief spray',
        icon: '💨',
        inStock: true,
        whatsappDescription: 'Instant throat numbing - Perfect for severe sore throat',
        dosage: '2-3 sprays every 2 hours',
        benefits: ['Instant relief', 'Numbs pain', 'Easy to use anywhere']
    },
    {
        id: 'nasal-decongestant',
        name: 'Nasal Spray',
        category: 'cold-flu',
        price: 7.49,
        description: 'Fast-acting nasal decongestant',
        icon: '🌬️',
        inStock: true,
        whatsappDescription: 'Unblocks stuffy nose in minutes - Breathe freely again',
        dosage: '1-2 sprays per nostril twice daily',
        benefits: ['Fast congestion relief', 'Clear breathing', 'Long-lasting']
    },

    // Vitamins & Supplements
    {
        id: 'multivitamin',
        name: 'Daily Multivitamin',
        category: 'vitamins',
        price: 14.49,
        description: 'Complete daily nutrition supplement',
        icon: '🌟',
        inStock: true,
        whatsappDescription: 'All essential vitamins in one tablet - Boost your daily energy',
        dosage: '1 tablet daily with breakfast',
        benefits: ['Complete nutrition', 'Energy boost', 'Immune support']
    },
    {
        id: 'vitamin-c',
        name: 'Vitamin C 1000mg',
        category: 'vitamins',
        price: 10.99,
        description: 'High-strength immune support',
        icon: '🍊',
        inStock: true,
        whatsappDescription: 'Mega-dose Vitamin C - Perfect for cold season protection',
        dosage: '1 tablet daily',
        benefits: ['Immune boost', 'Cold prevention', 'Antioxidant protection']
    },
    {
        id: 'omega-3',
        name: 'Omega-3 Fish Oil',
        category: 'vitamins',
        price: 21.49,
        description: 'Heart & brain health supplement',
        icon: '🐟',
        inStock: true,
        whatsappDescription: 'Premium fish oil - Support your heart & brain health',
        dosage: '2 capsules daily with meals',
        benefits: ['Heart health', 'Brain function', 'Joint support']
    },
    {
        id: 'probiotics',
        name: 'Probiotic Capsules',
        category: 'vitamins',
        price: 25.49,
        description: 'Digestive health & gut support',
        icon: '🦠',
        inStock: true,
        whatsappDescription: 'Good bacteria for your gut - Improve digestion naturally',
        dosage: '1 capsule daily on empty stomach',
        benefits: ['Digestive health', 'Gut bacteria', 'Immune support']
    },

    // First Aid
    {
        id: 'bandages',
        name: 'Adhesive Bandages',
        category: 'first-aid',
        price: 5.99,
        description: 'Assorted waterproof bandages',
        icon: '🩹',
        inStock: true,
        whatsappDescription: 'Waterproof bandages pack - Perfect for cuts & scrapes',
        dosage: 'Apply to clean wound, change daily',
        benefits: ['Waterproof', 'Various sizes', 'Strong adhesion']
    },
    {
        id: 'antiseptic',
        name: 'Antiseptic Solution',
        category: 'first-aid',
        price: 7.49,
        description: 'Wound cleaning & infection prevention',
        icon: '🧽',
        inStock: true,
        whatsappDescription: 'Kills 99.9% germs - Essential for wound cleaning',
        dosage: 'Apply to cotton pad, clean wound gently',
        benefits: ['Kills germs', 'Prevents infection', 'Fast healing']
    },
    {
        id: 'burn-gel',
        name: 'Burn Relief Gel',
        category: 'first-aid',
        price: 10.99,
        description: 'Cooling gel for minor burns',
        icon: '❄️',
        inStock: true,
        whatsappDescription: 'Instant cooling relief - Perfect for kitchen burns',
        dosage: 'Apply liberally to burn area',
        benefits: ['Instant cooling', 'Pain relief', 'Prevents scarring']
    },
    {
        id: 'thermometer',
        name: 'Digital Thermometer',
        category: 'first-aid',
        price: 14.49,
        description: 'Fast & accurate temperature reading',
        icon: '🌡️',
        inStock: true,
        whatsappDescription: 'Instant temperature check - Know when you have fever',
        dosage: 'Place under tongue for 30 seconds',
        benefits: ['Fast reading', 'Accurate', 'Easy to read display']
    }
];

// WhatsApp-style categories
const whatsappCategories = {
    'all': { name: 'All Products', emoji: '🏪' },
    'pain-relief': { name: 'Pain Relief', emoji: '💊' },
    'cold-flu': { name: 'Cold & Flu', emoji: '🤧' },
    'vitamins': { name: 'Vitamins', emoji: '🌟' },
    'first-aid': { name: 'First Aid', emoji: '🩹' }
};

// WhatsApp-style health conditions mapping
const whatsappConditions = {
    // Pain conditions
    'headache': ['paracetamol-500', 'ibuprofen-400'],
    'head pain': ['paracetamol-500', 'ibuprofen-400'],
    'migraine': ['paracetamol-500', 'ibuprofen-400'],
    'muscle pain': ['ibuprofen-400', 'pain-gel'],
    'back pain': ['ibuprofen-400', 'pain-gel'],
    'joint pain': ['ibuprofen-400', 'pain-gel'],
    'body ache': ['paracetamol-500', 'ibuprofen-400'],
    'fever': ['paracetamol-500', 'thermometer'],
    
    // Cold & flu conditions
    'cold': ['cold-tablets', 'cough-syrup', 'throat-spray', 'nasal-decongestant'],
    'flu': ['cold-tablets', 'paracetamol-500', 'cough-syrup'],
    'cough': ['cough-syrup', 'throat-spray'],
    'sore throat': ['throat-spray', 'cough-syrup'],
    'runny nose': ['cold-tablets', 'nasal-decongestant'],
    'stuffy nose': ['nasal-decongestant', 'cold-tablets'],
    'congestion': ['nasal-decongestant', 'cold-tablets'],
    'sneezing': ['cold-tablets'],
    
    // Health & wellness
    'vitamins': ['multivitamin', 'vitamin-c', 'omega-3'],
    'energy': ['multivitamin', 'vitamin-c'],
    'immune': ['vitamin-c', 'multivitamin', 'probiotics'],
    'tired': ['multivitamin', 'omega-3'],
    'weak': ['multivitamin', 'vitamin-c'],
    'digestion': ['probiotics'],
    'stomach': ['probiotics'],
    
    // First aid
    'cut': ['bandages', 'antiseptic'],
    'wound': ['antiseptic', 'bandages'],
    'burn': ['burn-gel'],
    'scrape': ['bandages', 'antiseptic'],
    'injury': ['bandages', 'antiseptic', 'thermometer']
};

// WhatsApp-style symptom keywords for natural language processing
const whatsappSymptomKeywords = {
    pain: ['hurt', 'pain', 'ache', 'sore', 'painful', 'hurts', 'aching'],
    fever: ['hot', 'temperature', 'feverish', 'burning up', 'chills'],
    cold: ['cold', 'stuffy', 'runny', 'sneezy', 'blocked nose'],
    cough: ['cough', 'coughing', 'throat', 'tickle'],
    energy: ['tired', 'weak', 'energy', 'fatigue', 'exhausted'],
    stomach: ['stomach', 'tummy', 'gut', 'digestion', 'bloated']
};

// Function to get products by category for WhatsApp
function getWhatsAppProductsByCategory(category = 'all') {
    if (category === 'all') {
        return whatsappProducts;
    }
    return whatsappProducts.filter(product => product.category === category);
}

// Function to search products for WhatsApp
function searchWhatsAppProducts(query) {
    const searchTerm = query.toLowerCase();
    return whatsappProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.whatsappDescription.toLowerCase().includes(searchTerm) ||
        product.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm))
    );
}

// Function to get recommended products for WhatsApp based on symptoms
function getWhatsAppRecommendedProducts(symptoms) {
    const recommendedIds = new Set();
    
    symptoms.forEach(symptom => {
        const normalizedSymptom = symptom.toLowerCase();
        
        // Direct condition matches
        Object.keys(whatsappConditions).forEach(condition => {
            if (normalizedSymptom.includes(condition)) {
                whatsappConditions[condition].forEach(productId => {
                    recommendedIds.add(productId);
                });
            }
        });
        
        // Keyword matching
        Object.keys(whatsappSymptomKeywords).forEach(category => {
            if (whatsappSymptomKeywords[category].some(keyword => normalizedSymptom.includes(keyword))) {
                // Find related conditions
                const relatedConditions = Object.keys(whatsappConditions).filter(condition => 
                    condition.includes(category) || 
                    normalizedSymptom.includes(condition)
                );
                
                relatedConditions.forEach(condition => {
                    if (whatsappConditions[condition]) {
                        whatsappConditions[condition].forEach(productId => {
                            recommendedIds.add(productId);
                        });
                    }
                });
            }
        });
    });
    
    return whatsappProducts.filter(product => recommendedIds.has(product.id));
}

// Function to get product by ID for WhatsApp
function getWhatsAppProductById(id) {
    return whatsappProducts.find(product => product.id === id);
}

// Function to get random products for WhatsApp
function getRandomWhatsAppProducts(count = 3) {
    const shuffled = [...whatsappProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to format product for WhatsApp message
function formatProductForWhatsApp(product) {
    return {
        title: product.name,
        description: product.whatsappDescription,
        price: `€${product.price}`,
        emoji: product.icon,
        benefits: product.benefits.slice(0, 3), // Limit to 3 benefits for mobile
        id: product.id
    };
}