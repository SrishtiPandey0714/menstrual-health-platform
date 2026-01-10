require('dotenv').config();
const mongoose = require('mongoose');

async function checkProfiles() {
    try {
        await mongoose.connect(process.env.COSMOS_DB_CONNECTION_STRING || process.env.MONGODB_URI);
        console.log('✅ Connected to Cosmos DB\n');

        const Profile = require('./src/models/Profile');
        const profiles = await Profile.find({});

        if (profiles.length === 0) {
            console.log('❌ No profiles found in database');
            console.log('This means no user has completed onboarding yet.\n');
        } else {
            console.log(`📊 Found ${profiles.length} profile(s) in database:\n`);
            profiles.forEach((profile, index) => {
                console.log(`━━━━━ Profile ${index + 1} ━━━━━`);
                console.log(`User ID: ${profile.userId}`);
                console.log(`Age Group: ${profile.ageGroup || 'Not set'}`);
                console.log(`Country: ${profile.country || 'Not set'}`);
                console.log(`Gender: ${profile.gender || 'Not set'}`);
                console.log(`Diet: ${profile.diet || 'Not set'}`);
                console.log(`Language: ${profile.language || 'Not set'}`);
                console.log(`AI Consent: ${profile.aiConsent ? 'Yes' : 'No'}`);
                console.log(`Created: ${profile.createdAt}`);
                console.log('');
            });
        }

        await mongoose.disconnect();
        console.log('✅ Disconnected from database');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkProfiles();
