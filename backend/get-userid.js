// Script to get the actual userId from the profile
require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('./src/models/Profile');

async function getUserId() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.COSMOS_DB_CONNECTION_STRING);

        const profile = await Profile.findOne({});

        if (profile) {
            console.log('\n✅ Found profile!');
            console.log('userId:', profile.userId);
            console.log('\nUse this in your mock token:');
            console.log(`sub: '${profile.userId}'`);
        } else {
            console.log('❌ No profile found');
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

getUserId();
