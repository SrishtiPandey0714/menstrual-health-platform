require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

async function checkUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.COSMOS_DB_URI);
        console.log('✅ Connected to DB');

        const email = 'hindiuser3@gmail.com';
        const user = await User.findOne({ email });

        if (user) {
            console.log('\n📊 User Profile Data:');
            console.log('  Email:', user.email);
            console.log('  Country:', user.country);
            console.log('  Language:', user.language);
            console.log('  Age:', user.age);
            console.log('  Diet:', user.dietaryPreferences);
            console.log('  Allergies:', user.allergies);

            // Show what will be used in food/beverage services
            const profile = {
                country: user.country || 'USA',
                ageGroup: user.age <= 17 ? '13-17' : user.age <= 25 ? '18-25' : user.age <= 40 ? '26-40' : '40+',
                diet: (user.dietaryPreferences && user.dietaryPreferences.length > 0)
                    ? user.dietaryPreferences[0]
                    : 'Non-vegetarian',
                dietaryRestrictions: user.allergies && user.allergies.length > 0
                    ? user.allergies.join(', ')
                    : 'none'
            };

            console.log('\n🔧 Profile data for AI services:');
            console.log('  country:', profile.country);
            console.log('  ageGroup:', profile.ageGroup);
            console.log('  diet:', profile.diet);
            console.log('  dietaryRestrictions:', profile.dietaryRestrictions);

            // Check if Hindi prompt will be triggered
            const shouldUseHindi = (profile.country === 'India' || profile.country === 'in');
            console.log('\n✨ Will trigger Hindi prompt?', shouldUseHindi ? 'YES ✅' : 'NO ❌');
            console.log('   (Checking for country === "India" or "in")');
        } else {
            console.log(`❌ User ${email} not found`);
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

checkUser();
