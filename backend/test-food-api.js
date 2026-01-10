// Test script to check food API
require('dotenv').config();
const mongoose = require('mongoose');
const { getFoodSuggestions } = require('./src/services/food.service');

async function testFoodAPI() {
    try {
        // Connect to DB
        await mongoose.connect(process.env.MONGODB_URI || process.env.COSMOS_DB_CONNECTION_STRING);
        console.log('✅ Connected to database');

        // Test profile
        const testProfile = {
            country: 'India',
            ageGroup: '13-17',
            diet: 'Vegetarian',
            accessibility: 'none'
        };

        console.log('\n🔍 Testing Food Suggestions for different phases:\n');

        // Test each phase
        const phases = ['menstrual', 'follicular', 'ovulation', 'luteal'];

        for (const phase of phases) {
            console.log(`\n===== ${phase.toUpperCase()} PHASE =====`);
            const result = await getFoodSuggestions(phase, testProfile);
            console.log('Foods:', result.foods?.slice(0, 2) || 'No foods');
            console.log('Nutritional Focus:', result.nutritionalFocus || 'None');
            console.log('Tips:', result.lifestyleTips || 'None');
        }

        await mongoose.disconnect();
        console.log('\n✅ Test complete');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testFoodAPI();
