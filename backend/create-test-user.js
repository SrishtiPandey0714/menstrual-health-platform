require('dotenv').config();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

async function createTestUser() {
    try {
        await mongoose.connect(process.env.COSMOS_DB_URI || process.env.MONGODB_URI);
        console.log('✅ Connected to DB\n');

        const email = 'testuser@gmail.com';
        const password = 'password@123';

        // Check if user already exists
        const userSchema = new mongoose.Schema({}, { strict: false });
        const User = mongoose.model('User', userSchema);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists, deleting...');
            await User.deleteOne({ email });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);
        console.log('Password hash:', hashedPassword);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            hasCompletedOnboarding: false,
            createdAt: new Date()
        });

        await newUser.save();

        console.log('\n✅ Test user created successfully!');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('\nYou can now log in with these credentials.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

createTestUser();
