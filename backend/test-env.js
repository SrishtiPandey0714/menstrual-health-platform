require('dotenv').config();

console.log('=== Environment Variables Test ===');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? `SET (${process.env.GEMINI_API_KEY.substring(0, 10)}...)` : 'NOT SET');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'NOT SET');
console.log('USE_MOCK_AUTH:', process.env.USE_MOCK_AUTH || 'NOT SET');
console.log('===================================');
