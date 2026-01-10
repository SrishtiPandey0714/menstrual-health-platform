// Test if new API key works
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testNewKey() {
    console.log('Testing new Gemini API key...');
    console.log('Key:', process.env.GEMINI_API_KEY);

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        const prompt = `List 3 vegetarian foods from India that are safe for someone allergic to dates and lactose intolerant. Return ONLY a JSON array.`;

        console.log('\nSending prompt to Gemini...');
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        console.log('\n✅ SUCCESS!');
        console.log('Response:', text);

    } catch (error) {
        console.error('\n❌ FAILED!');
        console.error('Error:', error.message);
        console.error('Status:', error.status);
    }
}

testNewKey();
