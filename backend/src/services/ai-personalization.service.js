const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' }); // Correct current model

// Cache with 30-day TTL
const translationCache = new Map();
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

/**
 * Generate beverages with dietary restrictions
 */
async function generateBeverages(country, ageGroup = '18-25', phase = 'menstrual', profile = {}) {
    const diet = profile.diet || 'Non-vegetarian';
    const dietaryRestrictions = profile.dietaryRestrictions || 'none';

    const cacheKey = `bev_v5:${country}:${ageGroup}:${phase}:${diet}:${dietaryRestrictions}`; // v5 for fresh generation

    // Check cache
    const cached = translationCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        console.log(`💾 Cached beverages for ${phase}, ${diet}`);
        return cached.value;
    }

    try {
        const isYoung = ageGroup === '13-17' || ageGroup === '18-25';

        const phaseGuidance = {
            menstrual: 'warming, anti-inflammatory drinks',
            follicular: 'light, energizing drinks',
            ovulation: 'hydrating, antioxidant-rich drinks',
            luteal: 'calming, magnesium-rich drinks'
        };

        const prompt = `List 6 hydrating beverages from ${country} for ${phase} phase.

User: ${diet}, allergies: ${dietaryRestrictions}
Phase needs: ${phaseGuidance[phase]}

IMPORTANT: Respect ${diet} diet and avoid ${dietaryRestrictions}.

${isYoung ? 'Popular with young people.' : 'For adults.'}

JSON format:
["Drink 1 (local name)", "Drink 2", ...]

Example for India, Vegetarian, Menstrual:
["Warm ginger tea (Adrak chai)", "Turmeric milk (Haldi doodh)", "Fennel water", "Warm lemon water", "Herbal tea", "Jaggery water"]

Return ONLY JSON for ${country}, ${diet}, ${dietaryRestrictions}:`;

        const result = await model.generateContent(prompt);
        let text = result.response.text().trim()
            .replace(/```json\s*/g, '')
            .replace(/```\s*/g, '')
            .trim();

        const beverages = JSON.parse(text);

        translationCache.set(cacheKey, {
            value: beverages,
            timestamp: Date.now()
        });

        console.log(`✨ AI: ${beverages.length} beverages for ${phase}, ${diet}, ${dietaryRestrictions}`);
        return beverages;

    } catch (error) {
        console.error('❌ Beverage AI error:', error.message);
        return getDefaultBeverages(phase);
    }
}

/**
 * Generate hydration tips with dietary restrictions
 */
async function generateHydrationTips(country, ageGroup = '18-25', phase = 'menstrual', profile = {}) {
    const diet = profile.diet || 'Non-vegetarian';
    const dietaryRestrictions = profile.dietaryRestrictions || 'none';

    const cacheKey = `tips_v5:${country}:${ageGroup}:${phase}:${diet}:${dietaryRestrictions}`; // v5 for fresh generation

    const cached = translationCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        console.log(`💾 Cached tips for ${phase}, ${diet}`);
        return cached.value;
    }

    try {
        const isYoung = ageGroup === '13-17' || ageGroup === '18-25';
        const context = isYoung ? 'for teenagers' : 'for adults';

        const phaseContext = {
            menstrual: 'during cramps and bleeding',
            follicular: 'when energy is rising',
            ovulation: 'at peak energy',
            luteal: 'during PMS and bloating'
        };

        const prompt = `3 hydration tips ${context} in ${country} ${phaseContext[phase]}.

User: ${diet}, allergies: ${dietaryRestrictions}

Keep short (max 15 words each).
JSON format: ["Tip 1", "Tip 2", "Tip 3"]

Example for Vegetarian, Menstrual:
["Sip warm ginger water to ease cramps", "Avoid cold drinks during periods", "Drink herbal tea between meals"]

Return ONLY JSON for ${diet}, ${dietaryRestrictions}:`;

        const result = await model.generateContent(prompt);
        let text = result.response.text().trim()
            .replace(/```json\s*/g, '')
            .replace(/```\s*/g, '')
            .trim();

        const tips = JSON.parse(text);

        translationCache.set(cacheKey, {
            value: tips,
            timestamp: Date.now()
        });

        console.log(`✨ AI: ${tips.length} tips for ${phase}, ${diet}`);
        return tips;

    } catch (error) {
        console.error('❌ Tips AI error:', error.message);
        return getDefaultTips(phase);
    }
}

function getDefaultBeverages(phase) {
    const defaults = {
        menstrual: ["Warm water", "Ginger tea", "Herbal tea"],
        follicular: ["Water", "Green tea", "Fresh juice"],
        ovulation: ["Coconut water", "Berry smoothie", "Fresh juice"],
        luteal: ["Herbal tea", "Warm water", "Chamomile tea"]
    };
    return defaults[phase] || defaults.menstrual;
}

function getDefaultTips(phase) {
    const defaults = {
        menstrual: ["Drink warm water", "Avoid caffeine", "Stay hydrated"],
        follicular: ["Start day with water", "Stay hydrated", "Green tea energizes"],
        ovulation: ["Drink plenty of water", "Fresh juices help", "Stay hydrated"],
        luteal: ["Warm drinks reduce bloating", "Magnesium helps mood", "Herbal tea relaxes"]
    };
    return defaults[phase] || defaults.menstrual;
}

// Translation function (keep existing)
async function translateFoodName(foodName, country) {
    const cacheKey = `food:${foodName}:${country}`;
    const cached = translationCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        return cached.value;
    }

    try {
        const prompt = `Translate the food "${foodName}" to common term in ${country}. ONLY the term, no explanation:`;
        const result = await model.generateContent(prompt);
        const translation = result.response.text().trim();

        translationCache.set(cacheKey, {
            value: translation,
            timestamp: Date.now()
        });

        return translation;
    } catch (error) {
        console.error('Translation error:', error);
        return foodName;
    }
}

module.exports = {
    translateFoodName,
    generateBeverages,
    generateHydrationTips
};
