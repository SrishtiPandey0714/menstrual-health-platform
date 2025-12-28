# Menstrual Health Platform - Backend

> **Empowering menstrual health through AI-powered education and personalized support**

## 🎯 Project Overview

A comprehensive backend system for a menstrual health platform that provides personalized, culturally-sensitive health guidance while prioritizing user privacy and responsible AI usage.

## 💡 Problem Statement

Millions of women and menstruating individuals face:
- Limited access to personalized menstrual health information
- Language barriers to health resources
- Cultural taboos around menstruation
- Lack of safe, evidence-based nutritional guidance

## ✨ Our Solution

An intelligent backend platform that:
- ✅ Provides **multilingual support** (100+ languages via Azure AI Translator)
- ✅ Offers **AI-powered educational assistance** (Azure OpenAI with responsible AI principles)
- ✅ Delivers **personalized food & lifestyle guidance** (rule-based, safe recommendations)
- ✅ Respects **cultural and dietary preferences**
- ✅ Ensures **complete data privacy and security**

---

## 🏗️ Tech Stack

### Microsoft Azure Services
- **Azure OpenAI** - Context-aware educational assistance
- **Azure AI Translator** - Multilingual support (100+ languages)
- **Azure AD B2C** - Secure authentication (ready for integration)
- **Azure Cosmos DB / MongoDB** - Scalable database

### Backend Technologies
- **Node.js** + **Express.js** - RESTful API
- **Mongoose** - MongoDB ORM
- **JWT** - Token-based authentication
- **Axios** - HTTP client for Azure services

---

## 🤖 Responsible AI Principles

Our platform follows strict AI ethics:

### What AI Does:
✅ Provides educational information only  
✅ Uses user context for personalization  
✅ Encourages professional medical advice  
✅ Uses respectful, inclusive language  

### What AI Does NOT Do:
❌ Diagnose medical conditions  
❌ Prescribe treatments  
❌ Make health predictions  
❌ Replace healthcare professionals  

### Safety Measures:
- Rule-based food recommendations (no AI-generated dietary advice)
- Temperature-controlled AI responses (0.4 for consistency)
- System prompts enforce educational-only content
- Mock services for testing without Azure credentials

---

## 📂 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── db.js        # Database connection
│   │   ├── auth.js      # Auth configuration
│   │   ├── azureOpenAI.js
│   │   └── profile.routes.js
│   ├── controllers/     # Business logic
│   │   ├── profile.controller.js
│   │   ├── cycle.controller.js
│   │   ├── ai.controller.js
│   │   └── food.controller.js
│   ├── models/          # Database schemas
│   │   ├── Profile.js
│   │   └── CycleLog.js
│   ├── routes/          # API endpoints
│   │   ├── cycle.routes.js
│   │   ├── ai.routes.js
│   │   └── food.routes.js
│   ├── services/        # External services
│   │   ├── openai.service.js
│   │   ├── translator.service.js
│   │   └── food.service.js
│   ├── middlewares/     # Request middleware
│   │   └── auth.middleware.js
│   ├── utils/           # Helper functions
│   │   └── cyclePhase.js
│   └── app.js           # Express app setup
├── server.js            # Entry point
├── package.json
└── .env.example         # Environment template
```

---

## 🚀 Features

### 1. User Profile Management
- Store cultural preferences (age, country, language, religion, diet)
- Personalize all system interactions

### 2. Cycle Logging
- Track menstrual cycles with symptoms, pain levels, notes
- Historical data storage for trend analysis

### 3. AI-Powered Assistance
- Educational Q&A using Azure OpenAI
- Context-aware responses based on user profile and cycle data
- Multilingual translation of questions and answers

### 4. Food & Lifestyle Guidance
- Safe, rule-based nutritional recommendations
- Cycle phase-aware suggestions (menstrual, follicular, ovulation, luteal)
- Diet-specific options (vegetarian/non-vegetarian)

### 5. Multilingual Support
- Automatic translation to 100+ languages
- Respects user language preference from profile

---

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Azure Cosmos DB)
- Azure OpenAI account (optional for testing)
- Azure AI Translator account (optional for testing)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd menstrual-health-platform/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**

Create a `.env` file in the backend directory:

```env
# Database
COSMOS_DB_URI=mongodb://localhost:27017/menstrual-health

# Server
PORT=5000

# Azure OpenAI (Optional - uses mock service if not configured)
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com/
AZURE_OPENAI_API_KEY=your_api_key_here
AZURE_OPENAI_DEPLOYMENT=your_deployment_name

# Azure Translator (Optional - uses mock service if not configured)
AZURE_TRANSLATOR_KEY=your_translator_key_here
AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com
AZURE_TRANSLATOR_REGION=your_region

# Azure AD B2C
AZURE_AD_TENANT_ID=your_tenant_id
AZURE_AD_CLIENT_ID=your_client_id
```

4. **Start the server**
```bash
node server.js
```

The server will start at `http://localhost:5000`

---

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Profile
```
POST /profile          # Save/update user profile
GET  /profile          # Get user profile
```

### Cycle Logging
```
POST /cycle            # Add cycle log
GET  /cycle            # Get all cycle logs (sorted newest first)
```

### AI Assistance
```
POST /ai/ask           # Ask AI a question
Body: { "question": "Your question here" }
```

### Food Guidance
```
GET  /food             # Get personalized food & lifestyle guidance
```

**Note:** All endpoints except `/health` require authentication via JWT token.

---

## 🔐 Authentication

Routes are protected using JWT-based authentication middleware. Include the token in requests:

```
Authorization: Bearer <your-jwt-token>
```

Currently configured for Azure AD B2C integration (ready for frontend implementation).

---

## 🧪 Testing

### With Mock Services (No Azure Required)
The platform includes mock services for:
- Azure OpenAI responses
- Azure Translator

Simply run the server without Azure credentials to use mock services for testing.

### Example Request (using curl)
```bash
# Health check
curl http://localhost:5000/health

# Protected endpoints (requires auth token)
curl -H "Authorization: Bearer <token>" http://localhost:5000/profile
```

---

## 👥 Team

**ThinkSynth**

Building innovative solutions for menstrual health awareness and education.

---

## 📄 License

This project was developed for Microsoft Imagine Cup 2025.

---

## 🙏 Acknowledgments

- Microsoft Azure for cloud services and AI capabilities
- Open-source community for excellent tools and libraries
- Healthcare professionals for evidence-based guidance

---

## 📧 Contact

For questions or feedback about this project, please contact the ThinkSynth team.

---

**Built with ❤️ for Imagine Cup 2025**
