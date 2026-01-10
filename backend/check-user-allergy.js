// Script to check specific user's allergy data
const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

async function checkSpecificUser(email) {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const user = await User.findOne({ email: email });

        if (!user) {
            console.log(`❌ User not found: ${email}`);
        } else {
            console.log('📊 User Profile:');
            console.log(`  Email: ${user.email}`);
            console.log(`  Name: ${user.name}`);
            console.log(`  Allergies (raw): ${JSON.stringify(user.allergies)}`);
            console.log(`  Allergies (array): [${user.allergies.join(', ')}]`);
            console.log(`  Dietary Preferences: ${JSON.stringify(user.dietaryPreferences)}`);
            console.log(`  Country: ${user.country}`);
            console.log(`  Language: ${user.language}`);
            console.log(`  Age: ${user.age}`);

            // Show what will be sent to food service
            const dietaryRestrictions = user.allergies && user.allergies.length > 0
                ? user.allergies.join(', ')
                : 'none';
            console.log(`\n🔍 What food service will receive:`);
            console.log(`  dietaryRestrictions: "${dietaryRestrictions}"`);
        }

        await mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

// Get email from command line or use default
const email = process.argv[2];
if (!email) {
    console.log('Usage: node check-user-allergy.js <email>');
    console.log('Example: node check-user-allergy.js user@example.com');
    process.exit(1);
}

checkSpecificUser(email);
