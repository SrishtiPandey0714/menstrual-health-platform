// Quick test of Groq API key
require('dotenv').config();
const Groq = require('groq-sdk');

const apiKey = process.env.GROQ_API_KEY;
console.log('Testing Groq API Key:', apiKey);

const groq = new Groq({ apiKey });

async function testGroq() {
    try {
        const response = await groq.chat.completions.create({
            messages: [{ role: 'user', content: 'Say hello' }],
            model: 'llama-3.1-70b-versatile',
            temperature: 0.7,
            max_tokens: 100
        });

        console.log('✅ SUCCESS! Groq API is working!');
        console.log('Response:', response.choices[0].message.content);
        process.exit(0);
    } catch (error) {
        console.error('❌ FAILED! Groq API error:');
        console.error('   Status:', error.status);
        console.error('   Message:', error.message);
        console.error('   Full error:', JSON.stringify(error, null, 2));
        process.exit(1);
    }
}

testGroq();
