require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./src/models/User');

async function testLogin() {
    try {
        await mongoose.connect(process.env.COSMOS_DB_URI);
        console.log('✅ Connected to DB\n');

        const email = 'hindiuser3@gmail.com';
        const testPassword = 'password123'; // Replace with the password you're trying

        const user = await User.findOne({ email });

        if (!user) {
            console.log('❌ User not found');
            process.exit(1);
        }

        console.log('✅ User found');
        console.log('Email:', user.email);
        console.log('Stored password hash:', user.password);
        console.log('Has completed onboarding:', user.hasCompletedOnboarding);

        // Test password comparison
        console.log('\n🔐 Testing password comparison...');
        const isValid = await user.comparePassword(testPassword);
        console.log('Password valid:', isValid);

        // Also try direct bcrypt compare
        const directCompare = await bcrypt.compare(testPassword, user.password);
        console.log('Direct bcrypt compare:', directCompare);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

testLogin();
