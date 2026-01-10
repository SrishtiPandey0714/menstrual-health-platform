const express = require('express');
const router = express.Router();
const { translateText } = require('../services/translator.service');

/**
 * POST /translate
 * Translate text using Azure Translator
 * Body: { text: string, targetLang: string }
 */
router.post('/', async (req, res) => {
    try {
        const { text, targetLang } = req.body;

        if (!text || !targetLang) {
            return res.status(400).json({
                message: 'Both text and targetLang are required'
            });
        }

        const translatedText = await translateText(text, targetLang);

        res.status(200).json({
            translatedText,
            originalText: text,
            targetLanguage: targetLang
        });
    } catch (error) {
        console.error('Translation API error:', error);
        res.status(500).json({
            message: 'Translation failed',
            translatedText: text // Fallback to original text
        });
    }
});

/**
 * POST /translate/batch
 * Translate multiple texts at once
 * Body: { texts: string[], targetLang: string }
 */
router.post('/batch', async (req, res) => {
    try {
        const { texts, targetLang } = req.body;

        if (!Array.isArray(texts) || !targetLang) {
            return res.status(400).json({
                message: 'texts (array) and targetLang are required'
            });
        }

        const translations = await Promise.all(
            texts.map(text => translateText(text, targetLang))
        );

        res.status(200).json({
            translations,
            targetLanguage: targetLang
        });
    } catch (error) {
        console.error('Batch translation error:', error);
        res.status(500).json({
            message: 'Batch translation failed',
            translations: texts // Fallback to original texts
        });
    }
});

module.exports = router;
