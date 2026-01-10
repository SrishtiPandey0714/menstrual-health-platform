require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

async function checkAndUpdateUserData() {
    try {
        await mongoose.connect(process.env.COSMOS_DB_URI);
        console.log('✅ Connected to DB\n');

        const user = await User.findOne({ email: 'testuser@gmail.com' });

        if (!user) {
            console.log('❌ User not found');
            process.exit(1);
        }

        console.log('📋 Current User Data:');
        console.log('Email:', user.email);
        console.log('Gender:', user.gender || 'NOT SET');
        console.log('Diet:', user.dietaryPreferences);
        console.log('Allergies:', user.allergies);
        console.log('Phone:', user.phone || 'NOT SET');
        console.log('Birth Date:', user.birthDate || 'NOT SET');

        console.log('\n✨ If gender/diet are not set, the user needs to fill them in the settings page once.');
        console.log('After saving, they will auto-load on future visits.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

checkAndUpdateUserData();
