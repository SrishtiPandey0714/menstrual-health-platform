require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('./src/models/Profile');

async function showFullProfile() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.COSMOS_DB_CONNECTION_STRING);

        const profile = await Profile.findOne({});
        console.log('\n📋 FULL PROFILE:');
        console.log('==================');
        console.log('userId:', profile.userId);
        console.log('country:', profile.country);
        console.log('ageGroup:', profile.ageGroup);
        console.log('diet:', profile.diet);
        console.log('dietaryRestrictions:', profile.dietaryRestrictions);
        console.log('language:', profile.language);
        console.log('gender:', profile.gender);
        console.log('religion:', profile.religion);
        console.log('accessibility:', profile.accessibility);
        console.log('==================\n');

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

showFullProfile();
