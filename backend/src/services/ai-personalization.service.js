const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// In-memory cache for translations (30-day TTL)
const translationCache = new Map();
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Translate food name to local language/term for a specific country
 * @param {string} foodName - English food name (e.g., "Spinach")
 * @param {string} country - Country name (e.g., "France")
 * @returns {Promise<string>} - Localized food name (e.g., "Épinards")
 */
async function translateFoodName(foodName, country) {
    const cacheKey = `food:${foodName}:${country}`;

    // Check cache first
    const cached = translationCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        return cached.value;
    }

    try {
        const prompt = `Translate the food "${foodName}" to the common term used in ${country}. 
Provide ONLY the translated term without any explanation or additional text.
If the food name is the same in ${country}, just return the name as-is.
Examples:
- Spinach in France: Épinards
- Spinach in Spain: Espinacas
- Spinach in Germany: Spinat
- Lentils in France: Lentilles

Now translate: ${foodName} in ${country}:`;

        const result = await model.generateContent(prompt);
        const translation = result.response.text().trim();

        console.log(`🌍 AI Translation: "${foodName}" → "${translation}" (${country})`);

        // Cache the result
        translationCache.set(cacheKey, {
            value: translation,
            timestamp: Date.now()
        });

        return translation;
    } catch (error) {
        console.error('Translation error:', error);
        return foodName; // Fallback to original name
    }
}

/**
 * Generate country-specific hydrating beverages suitable for menstrual health
 * @param {string} country - Country name (e.g., "France")
 * @param {string} ageGroup - Age group (e.g., "18-25")
 * @returns {Promise<Array>} - List of beverages with cultural context
 */
async function generateBeverages(country, ageGroup = '18-25') {
    const cacheKey = `beverages:${country}:${ageGroup}`;

    // Check cache
    const cached = translationCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        return cached.value;
    }

    try {
        const isYoung = ageGroup === '13-17' || ageGroup === '18-25';

        const prompt = `List 6 traditional and modern hydrating beverages from ${country} that are suitable for menstrual health.
${isYoung ? 'Consider beverages popular with young people.' : 'Consider beverages for adults.'}
Include the local name in parentheses if different from English.
Format as a JSON array of strings.
Example for France: ["Water (Eau)", "Herbal tea (Tisane)", "Ginger infusion", "Mineral water (Eau minérale)", "Green tea (Thé vert)", "Vegetable broth (Bouillon)"]

Return ONLY the JSON array, no other text:`;

        const result = await model.generateContent(prompt);
        let beveragesText = result.response.text().trim();

        // Clean up the response to extract JSON
        // Remove markdown code blocks if present
        beveragesText = beveragesText.replace(/```json\n?/g, '').replace(/```\n?/g, '');

        const beverages = JSON.parse(beveragesText);

        // Cache the result
        translationCache.set(cacheKey, {
            value: beverages,
            timestamp: Date.now()
        });

        return beverages;
    } catch (error) {
        console.error('Beverage generation error:', error);
        // Fallback to generic beverages
        return ["Water", "Herbal Tea", "Ginger Tea", "Coconut Water", "Green Tea", "Fresh Juice"];
    }
}

/**
 * Generate age-appropriate hydration tips for a specific country
 * @param {string} country - Country name
 * @param {string} ageGroup - Age group
 * @returns {Promise<Array>} - Hydration tips
 */
async function generateHydrationTips(country, ageGroup = '18-25') {
    const cacheKey = `tips:${country}:${ageGroup}`;

    // Check cache
    const cached = translationCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        return cached.value;
    }

    try {
        const isYoung = ageGroup === '13-17';
        const context = isYoung ? `for teenagers (13-17) who go to school in ${country}` : `for adults in ${country}`;

        const prompt = `Provide 3 culturally relevant hydration tips ${context} during menstruation.
Keep tips short (max 15 words each).
Format as a JSON array of strings.
Example: ["Start your day with warm water", "Keep a water bottle at school", "Herbal teas help with digestion"]

Return ONLY the JSON array:`;

        const result = await model.generateContent(prompt);
        let tipsText = result.response.text().trim();

        // Clean up the response
        tipsText = tipsText.replace(/```json\n?/g, '').replace(/```\n?/g, '');

        const tips = JSON.parse(tipsText);

        // Cache
        translationCache.set(cacheKey, {
            value: tips,
            timestamp: Date.now()
        });

        return tips;
    } catch (error) {
        console.error('Tips generation error:', error);
        return [
            "Start your day with warm water",
            "Stay hydrated throughout the day",
            "Herbal teas help with digestion"
        ];
    }
}

/**
 * Clear cache (for testing or manual refresh)
 */
function clearCache() {
    translationCache.clear();
}

module.exports = {
    translateFoodName,
    generateBeverages,
    generateHydrationTips,
    clearCache
};
