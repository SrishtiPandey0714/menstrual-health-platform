const axios = require('axios');

// Check if Gemini API is configured
console.log('DEBUG: GEMINI_API_KEY =', process.env.GEMINI_API_KEY ? `SET (${process.env.GEMINI_API_KEY.length} chars)` : 'NOT SET');
const isGeminiConfigured = !!process.env.GEMINI_API_KEY;

if (isGeminiConfigured) {
    console.log('✅ Gemini API Key configured');
} else {
    console.log('⚠️  Gemini API Key not found');
}

exports.getAIResponse = async (messages) => {
    // If Gemini isn't configured, return a mock response
    if (!isGeminiConfigured) {
        console.warn('⚠️  Gemini API not configured. Using mock response.');
        throw new Error('Gemini not configured');
    }

    try {
        // Convert messages array to a single prompt for Gemini
        const systemMessages = messages.filter(m => m.role === 'system');
        const userMessage = messages.find(m => m.role === 'user');

        // Combine ALL system messages (this was the bug!)
        const systemPrompt = systemMessages.map(m => m.content).join('\n\n');

        // Combine system context with user question
        const fullPrompt = systemPrompt
            ? `${systemPrompt}\n\nUser question: ${userMessage.content}`
            : userMessage.content;

        console.log('🤖 Calling Gemini API with FULL prompt (including language instruction)...');

        // Call Gemini REST API - using gemini-2.5-flash (current available model)
        const apiKey = process.env.GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const response = await axios.post(url, {
            contents: [{
                parts: [{
                    text: fullPrompt
                }]
            }]
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });

        if (!response.data || !response.data.candidates || response.data.candidates.length === 0) {
            console.error('⚠️  Gemini returned empty response');
            throw new Error('Empty response from Gemini');
        }

        const candidate = response.data.candidates[0];
        if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
            console.error('⚠️  Gemini response has no content');
            throw new Error('No content in Gemini response');
        }

        const text = candidate.content.parts[0].text;

        if (!text || text.trim().length === 0) {
            console.error('⚠️  Gemini returned empty text');
            throw new Error('Empty text from Gemini');
        }

        console.log('✅ Gemini API response received successfully');
        return text;

    } catch (error) {
        console.error('❌ Gemini API HTTP error:', error.message);
        if (error.response) {
            console.error(' Response status:', error.response.status);
            console.error('  Response data:', JSON.stringify(error.response.data).substring(0, 200));
        }

        // Throw error so controller can fall back to mock
        throw error;
    }
};
