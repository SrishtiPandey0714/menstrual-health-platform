const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.COSMOS_DB_URI);
        console.log('✅ Cosmos DB connected successfully');
    } catch (error) {
        console.warn('⚠️  DB connection failed:', error.message);
        console.warn('⚠️  Server will run without database. Some features may not work.');
        // Don't exit - allow server to run without DB in development
    }
};

module.exports = connectDB;
