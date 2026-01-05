const axios = require('axios');

exports.translateText = async (text, targetLang) => {
    // If target language is English or not specified, return original text
    if (!targetLang || targetLang === 'en' || targetLang.toLowerCase() === 'english') {
        return text;
    }

    // Check if Azure Translator is configured (at runtime, not at module load)
    const isTranslatorConfigured = !!(process.env.AZURE_TRANSLATOR_KEY &&
        process.env.AZURE_TRANSLATOR_ENDPOINT &&
        process.env.AZURE_TRANSLATOR_REGION);

    // Debug logging
    console.log('🔍 Azure Translator Config Check:', {
        hasKey: !!process.env.AZURE_TRANSLATOR_KEY,
        hasEndpoint: !!process.env.AZURE_TRANSLATOR_ENDPOINT,
        hasRegion: !!process.env.AZURE_TRANSLATOR_REGION,
        isConfigured: isTranslatorConfigured
    });

    // If Azure Translator isn't configured, return mock response
    if (!isTranslatorConfigured) {
        console.warn('⚠️  Azure Translator not configured. Returning mock translation.');
        return `[Mock Translation to ${targetLang}] ${text}`;
    }

    console.log(`✅ Using Azure Translator for ${targetLang} translation`);

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
