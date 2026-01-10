require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

async function testLogin() {
    try {
        // Connect to DB
        await mongoose.connect(process.env.MONGODB_URI || process.env.COSMOS_DB_URI);
        console.log('✅ Connected to DB');

        // Check if user exists
        const email = 'hindiuser2@gmail.com';
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`❌ User ${email} NOT FOUND in database`);
            console.log('\n📋 Available users:');
            const allUsers = await User.find({}).select('email createdAt');
            allUsers.forEach(u => console.log(`  - ${u.email} (created: ${u.createdAt})`));
        } else {
            console.log(`✅ User ${email} EXISTS`);
            console.log('User data:', {
                email: user.email,
                hasCompletedOnboarding: user.hasCompletedOnboarding,
                country: user.country,
                language: user.language
            });

            // Test password comparison
            const testPassword = 'password123';
            const isValid = await user.comparePassword(testPassword);
            console.log(`\n🔐 Password '${testPassword}' is ${isValid ? 'VALID ✅' : 'INVALID ❌'}`);
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

testLogin();
