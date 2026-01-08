const Groq = require('groq-sdk');

// Initialize Groq client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

/**
 * Generate food recommendations using Groq (Llama 3)
 */
async function generateFoodWithGroq(phase, profile) {
    const { country, ageGroup, diet, dietaryRestrictions } = profile;

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

**User Profile:**
- Country: ${country}
- Age: ${ageGroup}
- Diet: ${diet}
- ALLERGIES (MUST EXCLUDE): ${dietaryRestrictions}

**${phase} Phase Needs:** ${phaseNeeds[phase]}

**MANDATORY REQUIREMENTS:**
1. **ABSOLUTELY NO ALLERGENS**: Do NOT include ${dietaryRestrictions}
2. Respect ${diet} diet strictly
3. Each food should address ${phase} phase nutritional needs

Return ONLY a JSON object in this exact format:
{
  "foods": ["Food name - Brief benefit"],
  "nutritionalFocus": "Age-specific focus",
  "lifestyleTips": ["Tip 1", "Tip 2", "Tip 3"],
  "ageSpecificTip": "One specific tip"
}`;

    const response = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.3-70b-versatile', // Free, fast, high quality
        temperature: 0.7,
        max_tokens: 1000,
    });

    const responseText = response.choices[0].message.content.trim();
    const cleanedText = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

    return JSON.parse(cleanedText);
}

/**
 * Generate beverage recommendations using Groq
 */
async function generateBeveragesWithGroq(phase, profile) {
    const { country, ageGroup, diet, dietaryRestrictions } = profile;

    const phaseNeeds = {
        menstrual: 'Warm, hydrating beverages to ease cramps and reduce inflammation',
        follicular: 'Energizing, light beverages to support rising energy',
        ovulation: 'Hydrating, refreshing beverages for peak energy',
        luteal: 'Calming, magnesium-rich beverages to reduce PMS'
    };

    const prompt = `Generate 5 beverages from ${country} suitable for the ${phase} phase of menstruation.

**CRITICAL ALLERGY WARNING:**
The user is ALLERGIC to: ${dietaryRestrictions}
NEVER include ${dietaryRestrictions} in ANY form.

**User Profile:**
- Country: ${country}
- Age: ${ageGroup}  
- Diet: ${diet}
- ALLERGIES: ${dietaryRestrictions}

**${phase} Phase Needs:** ${phaseNeeds[phase]}

Return ONLY a JSON object:
{
  "beverages": ["Beverage name - Brief benefit"],
  "hydrationTips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

    const response = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 800,
    });

    const responseText = response.choices[0].message.content.trim();
    const cleanedText = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

    return JSON.parse(cleanedText);
}

/**
 * Generate general chat response using Groq (for AI Assistant)
 */
async function generateGroqResponse(systemPrompt, userQuestion) {
    const response = await groq.chat.completions.create({
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userQuestion }
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 1500,
    });

    return response.choices[0].message.content.trim();
}

module.exports = {
    generateFoodWithGroq,
    generateBeveragesWithGroq,
    generateGroqResponse
};
