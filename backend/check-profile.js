// Quick test to check what profile data exists
require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('./src/models/Profile');

async function checkProfile() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.COSMOS_DB_CONNECTION_STRING);
        console.log('✅ Connected to database');

        const profile = await Profile.findOne({});
        console.log('\n📋 Current Profile Data:');
        console.log(JSON.stringify(profile, null, 2));

        if (!profile) {
            console.log('\n❌ NO PROFILE FOUND!');
        } else {
            console.log(`\n🔍 Diet: ${profile.diet || 'NOT SET'}`);
            console.log(`🔍 Dietary Restrictions: ${profile.dietaryRestrictions || 'NOT SET'}`);
            console.log(`🔍 Country: ${profile.country || 'NOT SET'}`);
            console.log(`🔍 Age Group: ${profile.ageGroup || 'NOT SET'}`);
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

checkProfile();
