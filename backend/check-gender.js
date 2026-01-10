require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

async function checkUserGender() {
    try {
        await mongoose.connect(process.env.COSMOS_DB_URI);
        console.log('✅ Connected to DB\n');

        // Check your user
        const user = await User.findOne({ email: 'testuser@gmail.com' });

        if (!user) {
            console.log('❌ User not found');
            process.exit(1);
        }

        console.log('📋 Current User Data:');
        console.log('Email:', user.email);
        console.log('Gender:', user.gender || 'NOT SET');
        console.log('Diet Preferences:', user.dietaryPreferences);
        console.log('Allergies:', user.allergies);
        console.log('Age:', user.age);
        console.log('Country:', user.country);

        // Try to update gender to female if not set
        if (!user.gender) {
            console.log('\n❌ Gender field is empty!');
            console.log('Setting gender to "female" for testing...');
            user.gender = 'female';
            await user.save();
            console.log('✅ Gender updated to:', user.gender);
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

checkUserGender();
