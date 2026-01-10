const aiPersonalization = require('./ai-personalization.service');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' }); // Correct current model

// In-memory cache
const foodCache = new Map();
const CACHE_TTL = 0; // DISABLED FOR DEBUGGING // 30 days

/**
 * Filter out foods that contain allergens
 * @param {Array} foods - Array of food strings like "Banana - Potassium for cramps"
 * @param {string} allergiesStr - Comma-separated allergies like "banana, peanuts"
 * @returns {Array} Filtered foods array
 */
function filterAllergens(foods, allergiesStr) {
    if (!allergiesStr || allergiesStr === 'none' || !foods || foods.length === 0) {
        return foods;
    }

    // Parse allergies into individual keywords (lowercase, trimmed)
    // Remove common suffix words like "allergy", "intolerance", "sensitivity"
    const suffixesToRemove = ['allergy', 'allergic', 'intolerance', 'intolerant', 'sensitivity', 'sensitive'];

    const allergens = allergiesStr
        .toLowerCase()
        .split(',')
        .map(a => {
            let allergen = a.trim();
            // Remove suffix words to get core allergen
            for (const suffix of suffixesToRemove) {
                allergen = allergen.replace(new RegExp(`\\s+${suffix}$`, 'i'), '');
            }
            return allergen.trim();
        })
        .filter(a => a && a !== 'none');

    if (allergens.length === 0) {
        return foods;
    }

    console.log(`🔍 Filtering for allergens: [${allergens.join(', ')}]`);

    const filteredFoods = foods.filter(food => {
        const foodLower = food.toLowerCase();

        // Check if food contains any allergen
        for (const allergen of allergens) {
            if (foodLower.includes(allergen)) {
                console.log(`  🚫 Removed: "${food}" (contains ${allergen})`);
                return false;
            }
        }
        return true;
    });

    console.log(`✅ Filtered ${foods.length} → ${filteredFoods.length} foods (removed ${foods.length - filteredFoods.length} allergenic items)`);

    return filteredFoods;
}

/**
 * Generate AI-powered food recommendations based on phase and user preferences
 */
async function getFoodSuggestions(phase, profile) {
    console.log(`\n🍽️  getFoodSuggestions called - phase: ${phase}, profile:`, profile ? 'EXISTS' : 'NULL');

    if (!profile) {
        console.log('⚠️  No profile provided - returning fallback');
        return getFallbackFood(phase, null);
    }

    const country = profile.country || 'USA';
    const language = profile.language || 'en'; // User's selected language
    const ageGroup = profile.ageGroup || '18-25';
    const diet = profile.diet || 'Non-vegetarian';
    const dietaryRestrictions = profile.dietaryRestrictions || 'none';

    console.log(`📊 Profile data: country=${country}, language=${language}, age=${ageGroup}, diet=${diet}, restrictions=${dietaryRestrictions}`)

        ;

    const cacheKey = `food_v9:${phase}:${language}:${country}:${ageGroup}:${diet}:${dietaryRestrictions}`; // v9: Added language to cache key

    // Check cache
    const cached = foodCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        console.log(`💾 Using cached food`);
        return cached.value;
    }

    console.log(`🤖 Calling Gemini AI for food generation...`);

    try {
        // Phase-specific nutritional needs
        const phaseNeeds = {
            menstrual: 'Iron-rich, warming, anti-inflammatory foods to ease cramps and replenish blood loss',
            follicular: 'Light, energizing, protein-rich foods to support body regeneration and rising energy',
            ovulation: 'Antioxidant-rich, hydrating foods to support peak energy and fertility',
            luteal: 'Complex carbs, magnesium-rich, mood-stabilizing foods to reduce bloating and PMS'
        };

        const prompt = `Generate 6 foods from ${country} suitable for the ${phase} phase of menstruation.

**CRITICAL ALLERGY WARNING:**
The user is ALLERGIC to: ${dietaryRestrictions}
YOU MUST NEVER include: ${dietaryRestrictions}
DO NOT suggest any food containing: ${dietaryRestrictions}
DO NOT use ${dietaryRestrictions} as an ingredient in ANY form

**User Profile:**
- Country: ${country}
- Age: ${ageGroup}
- Diet: ${diet}
- ALLERGIES (MUST EXCLUDE): ${dietaryRestrictions}

**${phase} Phase Needs:** ${phaseNeeds[phase]}

**MANDATORY REQUIREMENTS (IN ORDER OF IMPORTANCE):**
1. **ABSOLUTELY NO ALLERGENS**: Do NOT include ${dietaryRestrictions} in any form - not as main ingredient, not as garnish, not as flavoring
2. **Dietary Restrictions**: Respect ${diet} diet strictly
3. ${diet.toLowerCase().includes('vegan') ? 'ONLY plant-based foods, NO animal products whatsoever' : diet.toLowerCase().includes('vegetarian') ? 'NO meat or fish, dairy and eggs OK' : 'Include all food types'}
4. Include foods popular in ${country}
5. Each food should address ${phase} phase nutritional needs

**DOUBLE CHECK BEFORE RESPONDING:**
- Does ANY food contain ${dietaryRestrictions}? If YES, remove it immediately
- Are all foods safe for someone allergic to ${dietaryRestrictions}? If NO, replace them

**Format as JSON (in English only):**
{
  "foods": ["Food name - Brief benefit"],
  "nutritionalFocus": "Age-specific focus for ${ageGroup}",
  "lifestyleTips": ["Tip 1", "Tip 2", "Tip 3"],
  "ageSpecificTip": "One specific tip for ${ageGroup} age group"
}

**Example format (NOT actual recommendations):**
{
  "foods": [
    "Spinach - Iron rich",
    "Lentils - Protein and iron",
    "Ginger tea - Anti-inflammatory",
    "Bananas - Potassium for cramps",
    "Almonds - Magnesium",
    "Dark chocolate - Mood booster"
  ],
  "nutritionalFocus": "Iron and magnesium to replenish blood loss",
  "lifestyleTips": [
    "Eat warm, cooked meals",
    "Have small frequent meals",
    "Include iron-rich foods daily"
  ],
  "ageSpecificTip": "Don't skip meals during your period - your body needs extra energy"
}

REMEMBER: ABSOLUTELY NO ${dietaryRestrictions} - this is a life-threatening allergy!

Return ONLY the JSON object in English:`;

        const result = await model.generateContent(prompt);
        let responseText = result.response.text().trim();

        // Clean up response
        responseText = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

        let foodData = JSON.parse(responseText);

        // CRITICAL: Apply allergy filter to AI-generated foods
        // Even though we warn the AI, it sometimes ignores instructions
        if (foodData.foods && Array.isArray(foodData.foods)) {
            const originalCount = foodData.foods.length;
            foodData.foods = filterAllergens(foodData.foods, dietaryRestrictions);

            if (foodData.foods.length < originalCount) {
                console.log(`⚠️  AI generated ${originalCount - foodData.foods.length} allergenic foods despite warnings!`);
            }
        }

        // Cache the result
        foodCache.set(cacheKey, {
            value: foodData,
            timestamp: Date.now()
        });

        console.log(`✨ AI Generated ${foodData.foods?.length || 0} foods for ${phase}, ${country}, ${diet}`);

        return foodData;

    } catch (error) {
        // Check if it's a rate limit OR invalid API key error
        const shouldTryGroq =
            error.message?.includes('429') ||
            error.message?.includes('Too Many Requests') ||
            error.status === 429 ||
            error.message?.includes('API key not valid') ||
            error.message?.includes('API_KEY_INVALID');

        if (shouldTryGroq) {
            if (error.message?.includes('API key not valid')) {
                console.error('⚠️  Gemini API key invalid/expired - trying Groq...');
            } else {
                console.error('⏰ Gemini API RATE LIMIT exceeded!');
            }
            console.log('🔄 Trying Groq AI as backup...');

            try {
                const { generateFoodWithGroq } = require('./groq.service');
                const groqResult = await generateFoodWithGroq(phase, profile);

                // Apply allergy filter to Groq results too
                if (groqResult.foods && Array.isArray(groqResult.foods)) {
                    groqResult.foods = filterAllergens(groqResult.foods, dietaryRestrictions);
                }

                // Cache the Groq result
                foodCache.set(cacheKey, {
                    value: groqResult,
                    timestamp: Date.now()
                });

                console.log('✅ Groq AI generated recommendations successfully!');
                return groqResult;

            } catch (groqError) {
                console.error('❌ Groq also failed:', groqError.message);
                console.log('📦 Using fallback data');
                return getFallbackFood(phase, profile);
            }
        } else {
            console.error('❌ Food AI generation error:', error.message);
            console.error('   Error details:', error.errorDetails || error.status || 'Unknown');
            console.log('📦 Returning fallback food data');
            return getFallbackFood(phase, profile);
        }
    }
}

/**
 * Fallback food recommendations if AI fails
 * @param {string} phase - Menstrual phase
 * @param {Object|null} profile - User profile with allergies
 */
function getFallbackFood(phase, profile) {
    const fallbacks = {
        menstrual: {
            foods: [
                "Spinach - Iron rich",
                "Lentils - Protein and iron",
                "Ginger tea - Anti-inflammatory",
                "Bananas - Potassium for cramps",
                "Almonds - Magnesium",
                "Dark chocolate - Mood booster"
            ],
            nutritionalFocus: "Iron and magnesium to replenish blood loss",
            lifestyleTips: [
                "Eat warm, cooked meals",
                "Have small frequent meals",
                "Include iron-rich foods daily"
            ],
            ageSpecificTip: "Don't skip meals during your period - your body needs extra energy"
        },
        follicular: {
            foods: [
                "Fresh fruits - Vitamins",
                "Whole grains - Energy",
                "Nuts and seeds - Healthy fats",
                "Sprouted beans - Protein",
                "Quinoa - Complete protein",
                "Green vegetables - Nutrients"
            ],
            nutritionalFocus: "Energy and protein for body regeneration",
            lifestyleTips: [
                "Great time to try new recipes",
                "Focus on fresh, light foods",
                "Include plenty of vegetables"
            ],
            ageSpecificTip: "Your energy is rising - fuel it with nutritious meals"
        },
        ovulation: {
            foods: [
                "Berries - Antioxidants",
                "Leafy greens - Vitamins",
                "Salmon - Omega-3",
                "Citrus fruits - Vitamin C",
                "Chia seeds - Omega-3",
                "Bell peppers - Vitamin C"
            ],
            nutritionalFocus: "Antioxidants to support peak fertility",
            lifestyleTips: [
                "Stay well hydrated",
                "Eat colorful fruits and vegetables",
                "Include healthy fats"
            ],
            ageSpecificTip: "Your energy is at its peak - make the most of it with nutritious foods"
        },
        luteal: {
            foods: [
                "Sweet potatoes - Complex carbs",
                "Dark chocolate - Magnesium",
                "Avocado - Healthy fats",
                "Whole grains - Fiber",
                "Pumpkin seeds - Magnesium",
                "Quinoa - Protein and carbs"
            ],
            nutritionalFocus: "Complex carbs and magnesium for mood stability",
            lifestyleTips: [
                "Reduce caffeine to manage anxiety",
                "Eat complex carbs for stable energy",
                "Include magnesium-rich foods"
            ],
            ageSpecificTip: "Focus on foods that keep your mood and energy stable"
        }
    };

    let fallbackData = fallbacks[phase] || fallbacks.menstrual;

    // Apply allergy filter to fallback foods too
    if (profile && profile.dietaryRestrictions) {
        console.log('🔧 Applying allergy filter to fallback foods...');
        fallbackData = {
            ...fallbackData,
            foods: filterAllergens(fallbackData.foods, profile.dietaryRestrictions)
        };
    }

    return fallbackData;
}

module.exports = {
    getFoodSuggestions
};
