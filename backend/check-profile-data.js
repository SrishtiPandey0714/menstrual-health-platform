require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

async function checkUserProfile() {
    try {
        await mongoose.connect(process.env.COSMOS_DB_URI);
        console.log('✅ Connected to DB\n');

        // Check testuser@gmail.com
        const user = await User.findOne({ email: 'testuser@gmail.com' });

        if (!user) {
            console.log('❌ User not found');
            process.exit(1);
        }

        console.log('✅ User found!');
        console.log('Email:', user.email);
        console.log('Name:', user.name);
        console.log('Gender:', user.gender);
        console.log('Age:', user.age);
        console.log('Country:', user.country);
        console.log('Language:', user.language);
        console.log('Diet Preferences (array):', user.dietaryPreferences);
        console.log('Allergies (array):', user.allergies);
        console.log('Has completed onboarding:', user.hasCompletedOnboarding);

        console.log('\n📋 Profile API would return:');
        console.log(JSON.stringify({
            fullName: user.name,
            name: user.name,
            email: user.email,
            gender: user.gender,
            age: user.age,
            country: user.country,
            language: user.language,
            dietaryPreferences: user.dietaryPreferences,
            allergies: user.allergies
        }, null, 2));

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

checkUserProfile();
