// Product catalog with pharmaceutical products
const products = [
    // Pain Relief
    {
        id: 'acetaminophen-500mg',
        name: 'Acetaminophen 500mg',
        category: 'pain-relief',
        price: 12.99,
        description: 'Extra strength pain reliever and fever reducer. Safe and effective for headaches, muscle aches, and arthritis pain.',
        icon: '💊',
        inStock: true,
        benefits: ['Fast-acting pain relief', 'Reduces fever', 'Gentle on stomach'],
        dosage: 'Take 1-2 tablets every 4-6 hours as needed',
        activeIngredient: 'Acetaminophen 500mg'
    },
    {
        id: 'ibuprofen-200mg',
        name: 'Ibuprofen 200mg',
        category: 'pain-relief',
        price: 8.99,
        description: 'Anti-inflammatory pain reliever for muscle pain, joint pain, and menstrual cramps.',
        icon: '🔥',
        inStock: true,
        benefits: ['Reduces inflammation', 'Long-lasting relief', 'Muscle and joint pain'],
        dosage: 'Take 1-2 tablets every 6-8 hours with food',
        activeIngredient: 'Ibuprofen 200mg'
    },
    {
        id: 'aspirin-325mg',
        name: 'Aspirin 325mg',
        category: 'pain-relief',
        price: 6.49,
        description: 'Low-dose aspirin for pain relief and heart health support.',
        icon: '❤️',
        inStock: true,
        benefits: ['Pain and fever relief', 'Heart health support', 'Anti-inflammatory'],
        dosage: 'Take 1-2 tablets as directed by physician',
        activeIngredient: 'Aspirin 325mg'
    },
    {
        id: 'topical-pain-gel',
        name: 'Topical Pain Relief Gel',
        category: 'pain-relief',
        price: 15.99,
        description: 'Cooling gel for targeted pain relief on muscles and joints.',
        icon: '🧴',
        inStock: true,
        benefits: ['Targeted relief', 'Cooling sensation', 'Non-greasy formula'],
        dosage: 'Apply to affected area 3-4 times daily',
        activeIngredient: 'Menthol 3%'
    },

    // Vitamins & Supplements
    {
        id: 'multivitamin-daily',
        name: 'Daily Multivitamin',
        category: 'vitamins',
        price: 24.99,
        description: 'Complete daily nutrition with essential vitamins and minerals for overall health.',
        icon: '🌟',
        inStock: true,
        benefits: ['Complete nutrition', 'Energy support', 'Immune system boost'],
        dosage: 'Take 1 tablet daily with food',
        activeIngredient: 'Vitamins A, C, D, E, B-Complex, Iron, Calcium'
    },
    {
        id: 'vitamin-d3-2000iu',
        name: 'Vitamin D3 2000 IU',
        category: 'vitamins',
        price: 16.99,
        description: 'High potency vitamin D3 for bone health and immune system support.',
        icon: '☀️',
        inStock: true,
        benefits: ['Bone health', 'Immune support', 'Mood enhancement'],
        dosage: 'Take 1 softgel daily',
        activeIngredient: 'Cholecalciferol (Vitamin D3) 2000 IU'
    },
    {
        id: 'omega3-fish-oil',
        name: 'Omega-3 Fish Oil',
        category: 'vitamins',
        price: 28.99,
        description: 'Premium fish oil supplement for heart and brain health.',
        icon: '🐟',
        inStock: true,
        benefits: ['Heart health', 'Brain function', 'Joint support'],
        dosage: 'Take 2 softgels daily with meals',
        activeIngredient: 'EPA 360mg, DHA 240mg'
    },
    {
        id: 'probiotics-50billion',
        name: 'Probiotics 50 Billion CFU',
        category: 'vitamins',
        price: 32.99,
        description: 'Advanced probiotic formula for digestive health and immune support.',
        icon: '🦠',
        inStock: true,
        benefits: ['Digestive health', 'Immune support', 'Gut microbiome'],
        dosage: 'Take 1 capsule daily on empty stomach',
        activeIngredient: '10 probiotic strains, 50 billion CFU'
    },

    // Cold & Flu
    {
        id: 'dayquil-liquid',
        name: 'DayQuil Cold & Flu Relief',
        category: 'cold-flu',
        price: 13.99,
        description: 'Non-drowsy daytime cold and flu symptom relief.',
        icon: '🌤️',
        inStock: true,
        benefits: ['Non-drowsy formula', 'Multi-symptom relief', 'Fast-acting'],
        dosage: 'Take 2 tablespoons every 4 hours',
        activeIngredient: 'Acetaminophen, Dextromethorphan, Phenylephrine'
    },
    {
        id: 'nyquil-liquid',
        name: 'NyQuil Nighttime Relief',
        category: 'cold-flu',
        price: 13.99,
        description: 'Nighttime cold and flu relief to help you sleep.',
        icon: '🌙',
        inStock: true,
        benefits: ['Helps you sleep', 'Multi-symptom relief', 'Nighttime formula'],
        dosage: 'Take 2 tablespoons at bedtime',
        activeIngredient: 'Acetaminophen, Dextromethorphan, Doxylamine'
    },
    {
        id: 'throat-lozenges',
        name: 'Sore Throat Lozenges',
        category: 'cold-flu',
        price: 7.99,
        description: 'Soothing lozenges for sore throat and cough relief.',
        icon: '🍯',
        inStock: true,
        benefits: ['Soothes sore throat', 'Cough suppression', 'Natural honey flavor'],
        dosage: 'Dissolve 1 lozenge every 2 hours as needed',
        activeIngredient: 'Benzocaine 6mg'
    },
    {
        id: 'nasal-spray',
        name: 'Saline Nasal Spray',
        category: 'cold-flu',
        price: 9.99,
        description: 'Gentle saline solution for nasal congestion relief.',
        icon: '💨',
        inStock: true,
        benefits: ['Natural relief', 'Moisturizes nasal passages', 'Drug-free'],
        dosage: 'Spray 1-2 times in each nostril as needed',
        activeIngredient: 'Sodium Chloride 0.65%'
    },

    // First Aid
    {
        id: 'bandages-assorted',
        name: 'Assorted Adhesive Bandages',
        category: 'first-aid',
        price: 8.49,
        description: 'Variety pack of adhesive bandages for minor cuts and scrapes.',
        icon: '🩹',
        inStock: true,
        benefits: ['Various sizes', 'Sterile protection', 'Flexible material'],
        dosage: 'Apply to clean, dry wound',
        activeIngredient: 'Sterile adhesive pad'
    },
    {
        id: 'antiseptic-wipes',
        name: 'Antiseptic Wipes (50 count)',
        category: 'first-aid',
        price: 5.99,
        description: 'Alcohol-free antiseptic wipes for wound cleaning.',
        icon: '🧽',
        inStock: true,
        benefits: ['Alcohol-free', 'Gentle cleansing', 'Individually wrapped'],
        dosage: 'Clean wound gently, allow to air dry',
        activeIngredient: 'Benzalkonium Chloride 0.13%'
    },
    {
        id: 'hydrocortisone-cream',
        name: 'Hydrocortisone Cream 1%',
        category: 'first-aid',
        price: 11.99,
        description: 'Anti-itch cream for skin irritation and rashes.',
        icon: '🧴',
        inStock: true,
        benefits: ['Reduces itching', 'Anti-inflammatory', 'Fast relief'],
        dosage: 'Apply thin layer 2-3 times daily',
        activeIngredient: 'Hydrocortisone 1%'
    },
    {
        id: 'instant-ice-pack',
        name: 'Instant Cold Pack',
        category: 'first-aid',
        price: 4.99,
        description: 'Single-use instant cold pack for injuries and swelling.',
        icon: '🧊',
        inStock: true,
        benefits: ['Instant activation', 'No refrigeration needed', 'Flexible design'],
        dosage: 'Squeeze to activate, apply for 15-20 minutes',
        activeIngredient: 'Ammonium nitrate cold pack'
    }
];

// Product categories for filtering
const categories = {
    'all': 'All Products',
    'pain-relief': 'Pain Relief',
    'vitamins': 'Vitamins & Supplements',
    'cold-flu': 'Cold & Flu',
    'first-aid': 'First Aid'
};

// Common health conditions and recommended products
const healthConditions = {
    'headache': ['acetaminophen-500mg', 'ibuprofen-200mg'],
    'fever': ['acetaminophen-500mg', 'ibuprofen-200mg'],
    'muscle pain': ['ibuprofen-200mg', 'topical-pain-gel'],
    'joint pain': ['ibuprofen-200mg', 'topical-pain-gel'],
    'cold': ['dayquil-liquid', 'nyquil-liquid', 'throat-lozenges', 'nasal-spray'],
    'flu': ['dayquil-liquid', 'nyquil-liquid', 'acetaminophen-500mg'],
    'sore throat': ['throat-lozenges', 'ibuprofen-200mg'],
    'cough': ['dayquil-liquid', 'nyquil-liquid', 'throat-lozenges'],
    'congestion': ['nasal-spray', 'dayquil-liquid'],
    'cut': ['bandages-assorted', 'antiseptic-wipes'],
    'scrape': ['bandages-assorted', 'antiseptic-wipes', 'hydrocortisone-cream'],
    'rash': ['hydrocortisone-cream'],
    'itch': ['hydrocortisone-cream'],
    'swelling': ['instant-ice-pack', 'ibuprofen-200mg'],
    'sprain': ['instant-ice-pack', 'ibuprofen-200mg'],
    'energy': ['multivitamin-daily', 'vitamin-d3-2000iu'],
    'immune': ['vitamin-d3-2000iu', 'multivitamin-daily', 'probiotics-50billion'],
    'heart health': ['omega3-fish-oil', 'aspirin-325mg'],
    'bone health': ['vitamin-d3-2000iu', 'multivitamin-daily'],
    'digestive': ['probiotics-50billion']
};

// Symptom keywords for AI responses
const symptomKeywords = {
    pain: ['headache', 'pain', 'ache', 'hurt', 'sore', 'tender'],
    fever: ['fever', 'hot', 'temperature', 'feverish'],
    cold: ['cold', 'runny nose', 'stuffy', 'congested', 'sneezing'],
    flu: ['flu', 'influenza', 'body aches', 'chills'],
    cough: ['cough', 'coughing', 'throat'],
    injury: ['cut', 'scrape', 'wound', 'bleeding', 'injured'],
    vitamins: ['vitamin', 'supplement', 'energy', 'tired', 'fatigue'],
    digestive: ['stomach', 'digestion', 'gut', 'probiotic']
};

// Function to get products by category
function getProductsByCategory(category = 'all') {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Function to search products by name or description
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm))
    );
}

// Function to get recommended products for symptoms
function getRecommendedProducts(symptoms) {
    const recommendedIds = new Set();
    
    symptoms.forEach(symptom => {
        const normalizedSymptom = symptom.toLowerCase();
        
        // Check direct matches in health conditions
        Object.keys(healthConditions).forEach(condition => {
            if (normalizedSymptom.includes(condition)) {
                healthConditions[condition].forEach(productId => {
                    recommendedIds.add(productId);
                });
            }
        });
        
        // Check symptom keywords
        Object.keys(symptomKeywords).forEach(category => {
            if (symptomKeywords[category].some(keyword => normalizedSymptom.includes(keyword))) {
                const relatedConditions = Object.keys(healthConditions).filter(condition => 
                    condition.includes(category) || category.includes(condition)
                );
                relatedConditions.forEach(condition => {
                    if (healthConditions[condition]) {
                        healthConditions[condition].forEach(productId => {
                            recommendedIds.add(productId);
                        });
                    }
                });
            }
        });
    });
    
    return products.filter(product => recommendedIds.has(product.id));
}

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Function to get random products for general recommendations
function getRandomProducts(count = 4) {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        categories,
        healthConditions,
        symptomKeywords,
        getProductsByCategory,
        searchProducts,
        getRecommendedProducts,
        getProductById,
        getRandomProducts
    };
}