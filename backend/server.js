const app = require('./src/app');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();

const PORT = process.env.PORT || 5000;

// Start server after DB connection
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Backend running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
