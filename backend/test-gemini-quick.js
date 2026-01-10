require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    try {
        console.log('Testing Gemini API...');
        console.log('API Key exists:', !!process.env.GEMINI_API_KEY);
        console.log('API Key (first 10 chars):', process.env.GEMINI_API_KEY?.substring(0, 10));

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        const result = await model.generateContent('Say "Hello, test successful!" in Spanish');
        const response = result.response.text();
        console.log('\n✅ Gemini Response:', response);

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Gemini Error:', error.message);
        if (error.response) {
            console.error('Response error:', error.response);
        }
        process.exit(1);
    }
}

testGemini();
