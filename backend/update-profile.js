// Script to manually update profile with dietary restrictions
require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('./src/models/Profile');

async function updateProfile() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.COSMOS_DB_CONNECTION_STRING);
        console.log('Connected to database');

        const result = await Profile.findOneAndUpdate(
            { userId: 'test2' },
            {
                dietaryRestrictions: 'dates, lactose'
            },
            { new: true }
        );

        console.log('\n✅ Profile Updated!');
        console.log('userId:', result.userId);
        console.log('diet:', result.diet);
        console.log('dietaryRestrictions:', result.dietaryRestrictions);

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

updateProfile();
