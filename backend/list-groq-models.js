// List available Groq models
require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function listModels() {
    try {
        const models = await groq.models.list();
        console.log('✅ Available Groq Models:\n');
        models.data.forEach(model => {
            console.log(`  - ${model.id}`);
            if (model.id.includes('llama') || model.id.includes('mixtral')) {
                console.log(`    ✨ RECOMMENDED`);
            }
        });
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

listModels();
