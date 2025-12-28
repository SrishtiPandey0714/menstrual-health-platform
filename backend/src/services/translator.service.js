const axios = require('axios');

// Check if Azure Translator is configured
const isTranslatorConfigured = process.env.AZURE_TRANSLATOR_KEY &&
    process.env.AZURE_TRANSLATOR_ENDPOINT &&
    process.env.AZURE_TRANSLATOR_REGION;

exports.translateText = async (text, targetLang) => {
    // If target language is English or not specified, return original text
    if (!targetLang || targetLang === 'en' || targetLang.toLowerCase() === 'english') {
        return text;
    }

    // If Azure Translator isn't configured, return mock response
    if (!isTranslatorConfigured) {
        console.warn('⚠️  Azure Translator not configured. Returning original text.');
        return `[Mock Translation to ${targetLang}] ${text}`;
    }

    try {
        const response = await axios.post(
            `${process.env.AZURE_TRANSLATOR_ENDPOINT}/translate`,
            [{ text }],
            {
                params: {
                    'api-version': '3.0',
                    to: targetLang,
                },
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY,
                    'Ocp-Apim-Subscription-Region': process.env.AZURE_TRANSLATOR_REGION,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data[0].translations[0].text;
    } catch (error) {
        console.error('Translation error:', error.message);
        // Fallback to original text on error
        return text;
    }
};
