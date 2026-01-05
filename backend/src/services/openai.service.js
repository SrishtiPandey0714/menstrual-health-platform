const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');

// Check if Azure OpenAI is configured
const isAzureConfigured = process.env.AZURE_OPENAI_ENDPOINT &&
    process.env.AZURE_OPENAI_API_KEY &&
    process.env.AZURE_OPENAI_DEPLOYMENT;

let client;
if (isAzureConfigured) {
    client = new OpenAIClient(
        process.env.AZURE_OPENAI_ENDPOINT,
        new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY)
    );
}

exports.getAIResponse = async (messages) => {
    // If Azure isn't configured, return a mock response for testing
    if (!isAzureConfigured) {
        console.warn('⚠️  Azure OpenAI not configured. Using mock response.');
        return `This is a mock response for testing purposes. 

To enable real AI responses:
1. Set up Azure OpenAI service
2. Add credentials to .env file
3. Restart the server

For your question about menstrual health, I would normally provide educational information based on your profile and recent cycle logs. Please consult a healthcare provider for personalized medical advice.`;
    }

    const response = await client.getChatCompletions(
        process.env.AZURE_OPENAI_DEPLOYMENT,
        messages,
        { temperature: 0.4 }
    );

    return response.choices[0].message.content;
};
