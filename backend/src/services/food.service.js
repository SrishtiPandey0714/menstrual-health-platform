const FOOD_MAP = {
    menstrual: {
        veg: ['Spinach', 'Lentils', 'Jaggery', 'Warm soups'],
        nonveg: ['Eggs', 'Fish', 'Chicken broth'],
        tips: ['Rest well', 'Stay hydrated', 'Gentle stretching'],
    },
    follicular: {
        veg: ['Fresh fruits', 'Sprouts', 'Whole grains'],
        nonveg: ['Lean meats', 'Eggs'],
        tips: ['Light exercise', 'Try new activities'],
    },
    ovulation: {
        veg: ['Seeds', 'Nuts', 'Leafy greens'],
        nonveg: ['Fish', 'Eggs'],
        tips: ['Stay active', 'Hydration is important'],
    },
    luteal: {
        veg: ['Complex carbs', 'Bananas', 'Dark chocolate'],
        nonveg: ['Chicken', 'Fish'],
        tips: ['Reduce caffeine', 'Prioritize sleep'],
    },
};

exports.getFoodSuggestions = (phase, diet) => {
    const data = FOOD_MAP[phase] || FOOD_MAP.menstrual;
    return {
        foods: diet === 'Non-Vegetarian' || diet === 'Non-vegetarian' ? data.nonveg : data.veg,
        lifestyleTips: data.tips,
    };
};
