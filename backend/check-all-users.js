require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

async function checkCurrentUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.COSMOS_DB_URI);
        console.log('✅ Connected to DB\n');

        // Find all users to see who might be logged in
        const users = await User.find({}).select('email language dietaryPreferences allergies');

        console.log('📋 All users in database:');
        users.forEach((user, index) => {
            console.log(`\n${index + 1}. ${user.email}`);
            console.log(`   Language: ${user.language}`);
            console.log(`   Diet: ${user.dietaryPreferences}`);
            console.log(`   Allergies: ${user.allergies}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

checkCurrentUser();
