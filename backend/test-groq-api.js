require('dotenv').config();
const { generateFoodWithGroq } = require('./src/services/groq.service');

async function testGroq() {
    try {
        console.log('Testing Groq API...\n');

        const testProfile = {
            country: 'India',
            ageGroup: '18-25',
            diet: 'Vegan',
            dietaryRestrictions: 'Lemon'
        };

        console.log('🤖 Calling Groq AI for food recommendations...');
        const result = await generateFoodWithGroq('menstrual', testProfile);

        console.log('\n✅ Groq AI is working!');
        console.log('\nGenerated Foods:');
        result.foods.forEach((food, i) => {
            console.log(`${i + 1}. ${food}`);
        });

        console.log('\nNutritional Focus:', result.nutritionalFocus);

        process.exit(0);

    } catch (error) {
        console.error('\n❌ Groq API Error:');
        console.error('Message:', error.message);
        console.error('\nFull error:', error);
        process.exit(1);
    }
}

testGroq();
