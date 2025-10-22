// Test Script for Multilingual Support
// This script demonstrates the API calls for different languages

const API_URL = 'http://localhost:3000/api/chat';

async function testMessage(message, language) {
    console.log(`\n📝 Testing ${language}:`);
    console.log(`User: "${message}"`);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                sessionId: `test-${language}`
            })
        });

        const data = await response.json();
        console.log(`Bot: "${data.response}"`);

        if (data.recommendedProducts && data.recommendedProducts.length > 0) {
            console.log(`💊 Recommended Products: ${data.recommendedProducts.join(', ')}`);
        }

        return data;
    } catch (error) {
        console.error(`❌ Error:`, error.message);
    }
}

async function runTests() {
    console.log('🧪 Testing WhatsApp Pharmacy Bot - Multilingual Support\n');
    console.log('Make sure the server is running (npm start)');
    console.log('================================================\n');

    // Test English
    await testMessage('I have a headache', 'English');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test Greek
    await testMessage('Έχω πονοκέφαλο', 'Greek');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test Greeklish
    await testMessage('Exo ponokefalo', 'Greeklish');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test Product Search in English
    await testMessage('Show me vitamins', 'English - Product Search');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test Checkout Question in Greeklish
    await testMessage('Poso kanei to paracetamol?', 'Greeklish - Price Question');

    console.log('\n✅ Testing complete!');
}

// Run tests
runTests().catch(console.error);
