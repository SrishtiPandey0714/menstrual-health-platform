# ⚠️ IMPORTANT: Environment Variables Required

Before testing the AI endpoint, you need to add Azure OpenAI credentials to your `.env` file.

## Add to backend/.env:

```env
# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://<your-resource-name>.openai.azure.com/
AZURE_OPENAI_API_KEY=your_api_key_here
AZURE_OPENAI_DEPLOYMENT=your_deployment_name
```

## How to Get These Values:

1. **Azure Portal** → **Azure OpenAI Service**
2. **AZURE_OPENAI_ENDPOINT**: Found in "Keys and Endpoint" section
3. **AZURE_OPENAI_API_KEY**: Also in "Keys and Endpoint" (Key 1 or Key 2)
4. **AZURE_OPENAI_DEPLOYMENT**: The name of your deployed model (e.g., "gpt-35-turbo")

## ⚠️ Security:
- Never commit real keys to git
- .env is already in .gitignore
- Use environment variables in production

## Alternative for Testing:
If you don't have Azure OpenAI credentials yet, you can:
1. Mock the service response for testing
2. Use a different LLM service temporarily
3. Set up Azure OpenAI (free trial available)

---

**Status**: Environment variables need to be added before the AI endpoint will work.
