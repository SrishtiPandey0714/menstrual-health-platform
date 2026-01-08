const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

// In-memory cache
const beverageCache = new Map();
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Generate AI-powered beverage recommendations
 */
async function getBeverageSuggestions(phase, profile) {
    console.log(`\\n🥤 getBeverageSuggestions called - phase: ${phase}, profile:`, profile ? 'EXISTS' : 'NULL');

    if (!profile) {
        console.log('⚠️  No profile provided - returning fallback');
        return getFallbackBeverages(phase);
    }

    const country = profile.country || 'USA';
    const language = profile.language || 'en'; // User's selected language
    const ageGroup = profile.ageGroup || '18-25';
    const diet = profile.diet || 'Non-vegetarian';
    const dietaryRestrictions = profile.dietaryRestrictions || 'none';

    console.log(`📊 Beverage Profile: country=${country}, language=${language}, age=${ageGroup}, diet=${diet}, restrictions=${dietaryRestrictions}`);

    const cacheKey = `beverage_v5:${phase}:${country}:${ageGroup}:${diet}:${dietaryRestrictions}`; // v5: Strengthened allergy exclusion

    // Check cache
    const cached = beverageCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        console.log(`💾 Using cached beverages`);
        return cached.value;
    }

    console.log(`🤖 Calling Gemini AI for beverage generation...`);

    try {
        const phaseNeeds = {
            menstrual: 'Warm, hydrating beverages to ease cramps and reduce inflammation',
            follicular: 'Energizing, light beverages to support rising energy',
            ovulation: 'Hydrating, refreshing beverages for peak energy',
            luteal: 'Calming, magnesium-rich beverages to reduce PMS'
        };

        const prompt = `Generate 5 beverages from ${country} suitable for the ${phase} phase of menstruation.

**CRITICAL ALLERGY WARNING:**
The user is ALLERGIC to: ${dietaryRestrictions}
YOU MUST NEVER include: ${dietaryRestrictions}
DO NOT suggest any beverage containing: ${dietaryRestrictions}
DO NOT use ${dietaryRestrictions} as an ingredient in ANY form (not even as flavoring or garnish)

**User Profile:**
- Country: ${country}
- Age: ${ageGroup}
- Diet: ${diet}
- ALLERGIES (MUST EXCLUDE): ${dietaryRestrictions}

**${phase} Phase Needs:** ${phaseNeeds[phase]}

**MANDATORY REQUIREMENTS (IN ORDER OF IMPORTANCE):**
1. **ABSOLUTELY NO ALLERGENS**: Do NOT include ${dietaryRestrictions} in any form
2. **Dietary Restrictions**: Respect ${diet} diet strictly
3. Each beverage should address ${phase} phase needs
4. Include traditional/cultural beverages from ${country}

**DOUBLE CHECK BEFORE RESPONDING:**
- Does ANY beverage contain ${dietaryRestrictions}? If YES, remove it immediately
- Are all beverages safe for someone allergic to ${dietaryRestrictions}? If NO, replace them

**Format as JSON (in English only):**
{
  "beverages": ["Beverage name - Brief benefit"],
  "hydrationTips": ["Tip 1", "Tip 2", "Tip 3"]
}

**Example format (NOT actual recommendations):**
{
  "beverages": [
    "Ginger tea - Anti-inflammatory",
    "Warm milk - Calcium and comfort",
    "Coconut water - Hydration",
    "Chamomile tea - Stress relief",
    "Warm water - Ease cramps"
  ],
  "hydrationTips": [
    "Drink warm beverages",
    "Aim for 8-10 glasses daily",
    "Avoid excessive caffeine"
  ]
}

REMEMBER: ABSOLUTELY NO ${dietaryRestrictions} - this is a life-threatening allergy!

Return ONLY the JSON object in English:`;

        const result = await model.generateContent(prompt);
        let responseText = result.response.text().trim();

        // Clean up response
        responseText = responseText.replace(/```json\\s*/g, '').replace(/```\\s*/g, '').trim();

        const beverageData = JSON.parse(responseText);

        // Cache the result
        beverageCache.set(cacheKey, {
            value: beverageData,
            timestamp: Date.now()
        });

        console.log(`✨ AI Generated ${beverageData.beverages?.length || 0} beverages for ${phase}, ${country}, ${diet}`);

        return beverageData;

    } catch (error) {
        // Check if it's a rate limit error
        if (error.message?.includes('429') || error.message?.includes('Too Many Requests') || error.status === 429) {
            console.error('⏰ Gemini RATE LIMIT - trying Groq...');

            try {
                const { generateBeveragesWithGroq } = require('./groq.service');
                const groqResult = await generateBeveragesWithGroq(phase, profile);
                beverageCache.set(cacheKey, { value: groqResult, timestamp: Date.now() });
                console.log('✅ Groq generated beverages!');
                return groqResult;
            } catch (groqError) {
                console.error('❌ Groq failed:', groqError.message);
            }
        } else {
            console.error('❌ Beverage AI error:', error.message);
        }

        console.log('📦 Returning fallback beverages');
        return getFallbackBeverages(phase);
    }
}

/**
 * Fallback beverage recommendations if AI fails
 */
function getFallbackBeverages(phase) {
    const fallbacks = {
        menstrual: {
            beverages: [
                "Warm ginger tea - Anti-inflammatory",
                "Chamomile tea - Relaxing",
                "Warm water - Ease cramps",
                "Coconut water - Hydration",
                "Herbal tea - Soothing"
            ],
            hydrationTips: [
                "Drink warm beverages",
                "Stay well hydrated",
                "Avoid excessive caffeine"
            ]
        },
        follicular: {
            beverages: [
                "Green tea - Antioxidants",
                "Fresh juice - Vitamins",
                "Smoothies - Nutrients",
                "Water - Hydration",
                "Herbal infusions - Energy"
            ],
            hydrationTips: [
                "Stay hydrated throughout the day",
                "Include fresh juices",
                "Try nutrient-rich smoothies"
            ]
        },
        ovulation: {
            beverages: [
                "Coconut water - Electrolytes",
                "Berry smoothie - Antioxidants",
                "Fresh lime water - Vitamin C",
                "Green tea - Energy",
                "Water - Hydration"
            ],
            hydrationTips: [
                "Drink plenty of water",
                "Include electrolyte drinks",
                "Stay refreshed"
            ]
        },
        luteal: {
            beverages: [
                "Chamomile tea - Calming",
                "Warm milk - Magnesium",
                "Herbal tea - Relaxing",
                "Mint water - Refreshing",
                "Decaf coffee - Comfort"
            ],
            hydrationTips: [
                "Reduce caffeine intake",
                "Choose calming beverages",
                "Stay hydrated to reduce bloating"
            ]
        }
    };

    return fallbacks[phase] || fallbacks.menstrual;
}

module.exports = {
    getBeverageSuggestions
};
