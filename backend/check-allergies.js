// Script to check user allergies
const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

async function checkUserAllergies() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Find all users with allergies
        const users = await User.find({ allergies: { $exists: true, $ne: [] } });

        console.log(`\n📊 Found ${users.length} users with allergies:\n`);

        users.forEach((user, index) => {
            console.log(`User ${index + 1}:`);
            console.log(`  Email: ${user.email}`);
            console.log(`  Allergies: ${JSON.stringify(user.allergies)}`);
            console.log(`  Dietary Preferences: ${JSON.stringify(user.dietaryPreferences)}`);
            console.log(`  Country: ${user.country}`);
            console.log(`  Language: ${user.language}`);
            console.log('');
        });

        await mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

checkUserAllergies();
