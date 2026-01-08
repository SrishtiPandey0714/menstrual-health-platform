const User = require('../models/User');
const { getBeverageSuggestions } = require('../services/beverage.service');

exports.getBeverages = async (req, res) => {
    try {
        // Extract user ID from token (same logic as food controller)
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

        const validPhases = ['menstrual', 'follicular', 'ovulation', 'luteal'];
        if (!phase || !validPhases.includes(phase)) {
            phase = 'menstrual';
        }

        // Get user profile for personalization
        const user = await User.findById(userId);

        if (!user) {
            console.log('⚠️  No user found - using fallback');
            const suggestions = await getBeverageSuggestions(phase, null);
            return res.status(200).json({ phase, ...suggestions });
        }

        // Map User model to profile format expected by beverage service
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

        console.log(`📊 Beverage API: phase=${phase}, country=${profile.country}, language=${profile.language}, age=${profile.ageGroup}, diet=${profile.diet}, allergies=${profile.dietaryRestrictions}`);

        // Get beverage suggestions in English
        const suggestions = await getBeverageSuggestions(phase, profile);

        console.log(`✅ Beverage API Response: ${suggestions.beverages?.length || 0} beverages returned`);

        // Translate to user's language if not English
        if (profile.language && profile.language !== 'en') {
            console.log(`🌐 Translating beverages to ${profile.language}...`);
            const { translateBatch, translateText } = require('../services/translator.service');

            try {
                // Translate all text fields
                const [translatedBeverages, translatedTips] = await Promise.all([
                    translateBatch(suggestions.beverages || [], profile.language),
                    translateBatch(suggestions.hydrationTips || [], profile.language)
                ]);

                suggestions.beverages = translatedBeverages;
                suggestions.hydrationTips = translatedTips;

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
        console.error('❌ Beverage guidance error:', error);
        res.status(500).json({ message: 'Failed to fetch beverage guidance', error: error.message });
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
