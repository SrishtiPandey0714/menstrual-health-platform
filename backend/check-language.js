/**
 * Script to test what language the backend is actually using
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

async function checkUserLanguage() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const user = await User.findOne({ email: 'hindiuser4@gmail.com' });

        if (!user) {
            console.log('❌ User not found');
            mongoose.disconnect();
            process.exit(1);
        }

        console.log('📊 Current Database Values:');
        console.log(`   Email: ${user.email}`);
        console.log(`   Language: "${user.language}" ${user.language === 'en' ? '✅ (English)' : '❌ (NOT English!)'}`);
        console.log(`   Country: ${user.country}`);
        console.log(`   Age: ${user.age}`);
        console.log(`   Diet: ${user.dietaryPreferences?.[0] || 'Not set'}`);
        console.log(`   Allergies: ${user.allergies?.join(', ') || 'None'}`);

        console.log('\n🔍 Analysis:');
        if (user.language === 'en') {
            console.log('   ✅ Database has English set correctly');
            console.log('   ❌ BUT you\'re still seeing Hindi - this means:');
            console.log('      1. Backend cache has old Hindi data');
            console.log('      2. Solution: Completely stop backend and restart');
        } else {
            console.log(`   ❌ Database has "${user.language}" - needs to be "en"`);
            console.log('   Run: node fix-language.js');
        }

        mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        mongoose.disconnect();
        process.exit(1);
    }
}

checkUserLanguage();
