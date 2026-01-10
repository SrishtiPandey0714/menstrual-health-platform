require('dotenv').config();
const mongoose = require('mongoose');

async function testUserCreation() {
    try {
        // Connect to DB
        await mongoose.connect(process.env.MONGODB_URI || process.env.COSMOS_DB_URI);
        console.log('✅ Connected to DB');

        // Define a simple schema without pre-save hook
        const TestSchema = new mongoose.Schema({
            email: String,
            testField: String
        });

        const TestModel = mongoose.model('TestUser', TestSchema);

        // Try creating a simple document
        const testDoc = new TestModel({
            email: 'simpletest@example.com',
            testField: 'test'
        });

        const saved = await testDoc.save();
        console.log('✅ Simple document saved successfully');

        // Now try with password but no pre-save hook
        const UserSchemaNoHook = new mongoose.Schema({
            email: { type: String, required: true },
            password: { type: String, required: true, minlength: 8 }
        });

        const UserNoHook = mongoose.model('UserNoHook', UserSchemaNoHook);

        const userNoHook = new UserNoHook({
            email: 'nohooktest@example.com',
            password: 'testpass123'
        });

        const savedUser = await userNoHook.save();
        console.log('✅ User without hook saved successfully');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Error details:', error);
        process.exit(1);
    }
}

testUserCreation();
