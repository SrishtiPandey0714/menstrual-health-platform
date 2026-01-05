const aiPersonalization = require('./ai-personalization.service');

// Comprehensive food database - BASE DATA ONLY (localization handled by AI)
const FOOD_DATABASE = {
    menstrual: {
        base: {
            veg: [
                { name: 'Spinach', benefit: 'Rich in iron' },
                { name: 'Lentils', benefit: 'Protein source' },
                { name: 'Jaggery', benefit: 'Natural energy' },
                { name: 'Dates', benefit: 'Iron and energy' },
                { name: 'Warm soups', benefit: 'Comforting' },
                { name: 'Bananas', benefit: 'Potassium for cramps' }
            ],
            nonveg: [
                { name: 'Eggs', benefit: 'Protein and B12' },
                { name: 'Fish', benefit: 'Omega-3 for inflammation' },
                { name: 'Chicken broth', benefit: 'Easy protein' }
            ]
        },
        ageFocus: {
            '13-17': 'Iron and calcium for growth',
            '18-25': 'Energy-rich foods for active lifestyle',
            '26-35': 'Balanced nutrition and iron replenishment',
            '36-45': 'Anti-inflammatory foods',
            '46+': 'Easily digestible, iron-rich foods'
        }
    },
    follicular: {
        base: {
            veg: [
                { name: 'Fresh fruits', benefit: 'Vitamins' },
                { name: 'Sprouts', benefit: 'Protein' },
                { name: 'Whole grains', benefit: 'Energy' },
                { name: 'Nuts', benefit: 'Healthy fats' }
            ],
            nonveg: [
                { name: 'Lean meats', benefit: 'Protein' },
                { name: 'Eggs', benefit: 'Complete protein' }
            ]
        },
        ageFocus: {
            '13-17': 'Growth-supporting proteins',
            '18-25': 'Energy for active phase',
            '26-35': 'Sustained energy',
            '36-45': 'Metabolism support',
            '46+': 'Light, nutritious meals'
        }
    },
    ovulation: {
        base: {
            veg: [
                { name: 'Leafy greens', benefit: 'Vitamins' },
                { name: 'Berries', benefit: 'Antioxidants' },
                { name: 'Seeds', benefit: 'Omega-3' },
                { name: 'Citrus fruits', benefit: 'Vitamin C' }
            ],
            nonveg: [
                { name: 'Salmon', benefit: 'Omega-3' },
                { name: 'Eggs', benefit: 'Complete nutrition' }
            ]
        },
        ageFocus: {
            '13-17': 'Nutrient-dense foods',
            '18-25': 'Peak energy support',
            '26-35': 'Hormonal balance',
            '36-45': 'Anti-inflammatory support',
            '46+': 'Gentle, nutrient-rich options'
        }
    },
    luteal: {
        base: {
            veg: [
                { name: 'Sweet potatoes', benefit: 'Complex carbs' },
                { name: 'Dark chocolate', benefit: 'Magnesium' },
                { name: 'Quinoa', benefit: 'Complete protein' },
                { name: 'Avocado', benefit: 'Healthy fats' }
            ],
            nonveg: [
                { name: 'Turkey', benefit: 'Tryptophan' },
                { name: 'Eggs', benefit: 'B vitamins' }
            ]
        },
        ageFocus: {
            '13-17': 'Mood-supporting nutrients',
            '18-25': 'Energy and mood balance',
            '26-35': 'PMS symptom management',
            '36-45': 'Hormonal support',
            '46+': 'Gentle, comforting foods'
        }
    }
};

const getAccessibilityAwareTips = (accessibility, phase) => {
    const baseTips = {
        menstrual: ['Rest well', 'Stay hydrated', 'Gentle movement'],
        follicular: ['Light activity', 'Try new things', 'Stay energized'],
        ovulation: ['Stay active', 'Hydration important', 'Peak energy time'],
        luteal: ['Reduce caffeine', 'Prioritize sleep', 'Self-care focus']
    };

    const tips = baseTips[phase] || baseTips.menstrual;

    if (accessibility && accessibility !== 'none' && accessibility.toLowerCase().includes('mobility')) {
        return tips.map(tip =>
            tip.includes('exercise') || tip.includes('active') || tip.includes('movement')
                ? 'Gentle stretching or seated activities'
                : tip
        );
    }

    return tips;
};

// Main function - ASYNC for AI-powered translations
exports.getFoodSuggestions = async (phase, profile = {}) => {
    const {
        diet = 'Vegetarian',
        ageGroup = '18-25',
        country = 'India',
        accessibility = 'none'
    } = profile;

    const phaseData = FOOD_DATABASE[phase] || FOOD_DATABASE.menstrual;

    // Determine food category based on diet preference
    const isNonVeg = diet && (diet.toLowerCase().includes('non-veg') || diet.toLowerCase().includes('nonveg'));
    const foodList = isNonVeg ? [...phaseData.base.veg, ...phaseData.base.nonveg] : phaseData.base.veg;

    // Use AI to localize food names for ANY country (France, Spain, Germany, etc.)
    const localizedFoods = await Promise.all(
        foodList.map(async (food) => {
            try {
                // AI dynamically translates: "Spinach" → "Épinards" (France), "Espinacas" (Spain)
                const localName = await aiPersonalization.translateFoodName(food.name, country);
                return `${localName} - ${food.benefit}`;
            } catch (error) {
                console.error(`Translation error for ${food.name}:`, error);
                return `${food.name} - ${food.benefit}`; // Fallback to English
            }
        })
    );

    // Get age-specific nutritional focus
    const nutritionalFocus = phaseData.ageFocus[ageGroup] || phaseData.ageFocus['18-25'];

    // Get accessibility-aware lifestyle tips
    const lifestyleTips = getAccessibilityAwareTips(accessibility, phase);

    return {
        foods: localizedFoods,
        nutritionalFocus,
        lifestyleTips,
        ageSpecificTip: `At your age (${ageGroup}): ${nutritionalFocus}`
    };
};
