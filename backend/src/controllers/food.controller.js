const User = require('../models/User');
const CycleLog = require('../models/CycleLog');
const { getCyclePhase } = require('../utils/cyclePhase');
const { getFoodSuggestions } = require('../services/food.service');

exports.getFoodGuidance = async (req, res) => {
    try {
        // Extract user ID from token (same logic as profile controller)
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const parts = token.split('.');
        if (parts.length !== 3) {
            return res.status(401).json({ message: 'Invalid token format' });
        }

        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        const userId = payload.sub;

        // Get phase from query params OR default to 'menstrual'
        let phase = req.query.phase;

        // If phase is 'unknown' or invalid, default to 'menstrual'
        const validPhases = ['menstrual', 'follicular', 'ovulation', 'luteal'];
        if (!phase || !validPhases.includes(phase)) {
            phase = 'menstrual';
        }

        // Get user profile for personalization
        const user = await User.findById(userId);

        if (!user) {
            console.log('⚠️  No user found - using fallback');
            const suggestions = await getFoodSuggestions(phase, null);
            return res.status(200).json({ phase, ...suggestions });
        }

        // Map User model to profile format expected by food service
        const profile = {
            country: user.country || 'USA',
            language: user.language || 'en', // User's selected language preference
            ageGroup: calculateAgeGroup(user.age),
            diet: (user.dietaryPreferences && user.dietaryPreferences.length > 0)
                ? user.dietaryPreferences[0]
                : 'Non-vegetarian',
            dietaryRestrictions: user.allergies && user.allergies.length > 0
                ? user.allergies.join(', ')
                : 'none'
        };

        console.log(`📊 Food API: phase=${phase}, country=${profile.country}, language=${profile.language}, age=${profile.ageGroup}, diet=${profile.diet}, allergies=${profile.dietaryRestrictions}`);
        console.log(`🔍 USER LANGUAGE PREFERENCE: "${profile.language}" (en=English, hi=Hindi, es=Spanish, fr=French)`);

        // Get food suggestions in English
        const suggestions = await getFoodSuggestions(phase, profile);

        console.log(`✅ Food API Response: ${suggestions.foods?.length || 0} foods returned`);

        // Translate to user's language if not English
        if (profile.language && profile.language !== 'en') {
            console.log(`🌐 Translating food to ${profile.language}...`);
            const { translateBatch } = require('../services/translator.service');

            try {
                // Translate all text fields
                const [translatedFoods, translatedTips, translatedFocus, translatedAgeTip] = await Promise.all([
                    translateBatch(suggestions.foods || [], profile.language),
                    translateBatch(suggestions.lifestyleTips || [], profile.language),
                    require('../services/translator.service').translateText(suggestions.nutritionalFocus || '', profile.language),
                    require('../services/translator.service').translateText(suggestions.ageSpecificTip || '', profile.language)
                ]);

                suggestions.foods = translatedFoods;
                suggestions.lifestyleTips = translatedTips;
                suggestions.nutritionalFocus = translatedFocus;
                suggestions.ageSpecificTip = translatedAgeTip;

                console.log(`✅ Translation complete to ${profile.language}`);
            } catch (translationError) {
                console.error('⚠️  Translation failed, returning English:', translationError.message);
                // Continue with English if translation fails
            }
        }

        res.status(200).json({
            phase,
            ...suggestions,
        });
    } catch (error) {
        console.error('❌ Food guidance error:', error);
        res.status(500).json({ message: 'Failed to fetch food guidance', error: error.message });
    }
};

// Helper function to convert age to age group
function calculateAgeGroup(age) {
    if (!age) return '18-25';
    if (age <= 17) return '13-17';
    if (age <= 25) return '18-25';
    if (age <= 40) return '26-40';
    return '40+';
}
