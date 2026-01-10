require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

async function testSignup() {
    try {
        // Connect to DB
        await mongoose.connect(process.env.MONGODB_URI || process.env.COSMOS_DB_URI);
        console.log('✅ Connected to DB');

        // Try creating a user
        const user = new User({
            email: 'debugtest@example.com',
            password: 'testpass123'
        });

        console.log('Created user object:', user);

        const savedUser = await user.save();
        console.log('✅ User saved successfully:', savedUser.email);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
}

testSignup();
