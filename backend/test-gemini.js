require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    try {
        console.log('Testing Gemini API...\n');

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.log('❌ GEMINI_API_KEY not found in environment!');
            process.exit(1);
        }

        console.log('✅ API Key found:', apiKey.substring(0, 10) + '...');

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        console.log('🤖 Calling Gemini AI...');
        const result = await model.generateContent('Say "Hello World"');
        const response = result.response.text();

        console.log('\n✅ Gemini AI is working!');
        console.log('Response:', response);
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Gemini API Error:');
        console.error('Message:', error.message);
        console.error('Status:', error.status);
        console.error('Details:', error.errorDetails);
        console.error('\nFull error:', error);
        process.exit(1);
    }
}

testGemini();
