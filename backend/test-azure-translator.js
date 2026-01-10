require('dotenv').config();
const axios = require('axios');

async function testAzureTranslator() {
    try {
        console.log('Testing Azure Translator...');
        console.log('Key exists:', !!process.env.AZURE_TRANSLATOR_KEY);
        console.log('Region:', process.env.AZURE_TRANSLATOR_REGION);

        const response = await axios.post(
            `${process.env.AZURE_TRANSLATOR_ENDPOINT}/translate?api-version=3.0&to=es`,
            [{ text: 'Spinach - Iron rich' }],
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY,
                    'Ocp-Apim-Subscription-Region': process.env.AZURE_TRANSLATOR_REGION,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('\n✅ Azure Translator Response:');
        console.log(response.data[0].translations[0].text);

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Azure Translator Error:', error.response?.data || error.message);
        process.exit(1);
    }
}

testAzureTranslator();
