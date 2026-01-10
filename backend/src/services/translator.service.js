const axios = require('axios');

/**
 * Translate a single text string to target language using Azure Translator
 */
async function translateText(text, targetLang) {
    // If target language is English or not specified, return original text
    if (!targetLang || targetLang === 'en' || targetLang.toLowerCase() === 'english') {
        return text;
    }

    // Check if Azure Translator is configured
    const isTranslatorConfigured = !!(
        process.env.AZURE_TRANSLATOR_KEY &&
        process.env.AZURE_TRANSLATOR_ENDPOINT &&
        process.env.AZURE_TRANSLATOR_REGION
    );

    if (!isTranslatorConfigured) {
        console.warn('⚠️  Azure Translator not configured. Returning original text.');
        return text;
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
        return text; // Fallback to original text on error
    }
}

/**
 * Translate an array of texts to target language
 */
async function translateBatch(texts, targetLang) {
    // If target language is English or not specified, return original texts
    if (!targetLang || targetLang === 'en' || targetLang.toLowerCase() === 'english') {
        return texts;
    }

    // Check if Azure Translator is configured
    const isTranslatorConfigured = !!(
        process.env.AZURE_TRANSLATOR_KEY &&
        process.env.AZURE_TRANSLATOR_ENDPOINT &&
        process.env.AZURE_TRANSLATOR_REGION
    );

    if (!isTranslatorConfigured) {
        console.warn('⚠️  Azure Translator not configured. Returning original texts.');
        return texts;
    }

    try {
        const response = await axios.post(
            `${process.env.AZURE_TRANSLATOR_ENDPOINT}/translate`,
            texts.map(text => ({ text })),
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

        return response.data.map(result => result.translations[0].text);
    } catch (error) {
        console.error('Batch translation error:', error.message);
        return texts; // Fallback to original texts on error
    }
}

module.exports = {
    translateText,
    translateBatch
};
