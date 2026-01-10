/**
 * Quick script to fix language preference in database
 * Run with: node fix-language.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

async function fixLanguagePreference() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Find the user with hindiuser4@gmail.com
        const user = await User.findOne({ email: 'hindiuser4@gmail.com' });

        if (!user) {
            console.log('❌ User not found');
            process.exit(1);
        }

        console.log(`\n📊 Current user settings:`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Current Language: ${user.language || 'NOT SET'}`);
        console.log(`   Country: ${user.country || 'NOT SET'}`);

        // Update language to English
        user.language = 'en';
        await user.save();

        console.log(`\n✅ SUCCESS! Language updated to: en (English)`);
        console.log(`\nNow refresh your browser and check the Food page!`);

        mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

fixLanguagePreference();
