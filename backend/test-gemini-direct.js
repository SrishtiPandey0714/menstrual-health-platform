require('dotenv').config();
const { getAIResponse } = require('./src/services/gemini.service');

const testMessages = [
    {
        role: 'system',
        content: 'You are a helpful menstrual health assistant.'
    },
    {
        role: 'user',
        content: 'What foods should I eat during my period?'
    }
];

console.log('Testing Gemini API...');
getAIResponse(testMessages)
    .then(response => {
        console.log('\n✅ SUCCESS! Gemini API Response:');
        console.log(response);
    })
    .catch(error => {
        console.log('\n❌ FAILED! Error:');
        console.log('Message:', error.message);
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', JSON.stringify(error.response.data, null, 2));
        }
    });
