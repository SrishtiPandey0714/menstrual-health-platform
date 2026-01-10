require('dotenv').config();
const axios = require('axios');

const apiKey = 'AIzaSyAYJyFJDb2O2nuWwgcu3Olc1lp07wkGODs';
const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;

console.log('🔥 Testing BRAND NEW API Key from different Google account...\n');

axios.post(url, {
    contents: [{
        parts: [{
            text: 'Say "Hello! The Gemini API is working!" in one sentence.'
        }]
    }]
}, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000
})
    .then(response => {
        console.log('✅ SUCCESS! API is working perfectly!\n');
        console.log('Response:', response.data.candidates[0].content.parts[0].text);
        console.log('\n🎉 Ready to use in your application!');
    })
    .catch(error => {
        console.log('❌ FAILED!\n');
        console.log('Error Message:', error.message);
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Error Data:', JSON.stringify(error.response.data, null, 2));
        }
    });
