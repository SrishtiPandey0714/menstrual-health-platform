require('dotenv').config();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const User = require('./src/models/User');

async function resetPassword() {
    try {
        await mongoose.connect(process.env.COSMOS_DB_URI);
        console.log('✅ Connected to DB\n');

        const email = 'hindiuser3@gmail.com';
        const newPassword = 'password123'; // You can change this

        const user = await User.findOne({ email });

        if (!user) {
            console.log('❌ User not found');
            process.exit(1);
        }

        console.log('✅ User found');
        console.log('Email:', user.email);

        // Hash new password
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        console.log('\n✅ Password reset successfully!');
        console.log('New password:', newPassword);
        console.log('\nYou can now log in with:');
        console.log('Email:', email);
        console.log('Password:', newPassword);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

resetPassword();
