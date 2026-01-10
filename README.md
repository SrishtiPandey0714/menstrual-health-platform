# Luniva - Menstrual Health Platform

> **Empowering menstrual health through AI-powered education and personalized support**

A full-stack application combining a Next.js frontend with an Express.js backend, providing personalized, culturally-sensitive menstrual health guidance.

---

## 🎯 Project Overview

A comprehensive platform for menstrual health that provides personalized, culturally-sensitive health guidance while prioritizing user privacy and responsible AI usage.

## 💡 Problem Statement

Millions of women and menstruating individuals face:
- Limited access to personalized menstrual health information
- Language barriers to health resources
- Cultural taboos around menstruation
- Lack of safe, evidence-based nutritional guidance

## ✨ Our Solution

An intelligent platform that:
- ✅ Provides **multilingual support** (100+ languages via Azure AI Translator)
- ✅ Offers **AI-powered educational assistance** (Azure OpenAI with responsible AI principles)
- ✅ Delivers **personalized food & lifestyle guidance** (rule-based, safe recommendations)
- ✅ Respects **cultural and dietary preferences**
- ✅ Ensures **complete data privacy and security**

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations
- **Sonner** - Toast notifications

### Backend
- **Node.js** + **Express.js** - RESTful API
- **Mongoose** - MongoDB ORM
- **JWT** - Token-based authentication
- **Axios** - HTTP client for Azure services

### Microsoft Azure Services
- **Azure OpenAI** - Context-aware educational assistance
- **Azure AI Translator** - Multilingual support (100+ languages)
- **Azure AD B2C** - Secure authentication (ready for integration)
- **Azure Cosmos DB / MongoDB** - Scalable database

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Azure Cosmos DB)
- Azure OpenAI account (optional for testing)
- Azure AI Translator account (optional for testing)

### Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd menstrual-health-platform
```

#### 2. Setup Backend
```bash
cd backend
npm install

# Create .env file (see Backend Configuration below)
npm start
```

Backend will run on `http://localhost:5000`

#### 3. Setup Frontend
```bash
cd frontend
npm install

# Create .env.local file (see Frontend Configuration below)
npm run dev
```

Frontend will run on `http://localhost:3000`

---

## ⚙️ Configuration

### Backend Configuration

Create `.env` file in `backend/` directory:

```env
# Database
COSMOS_DB_URI=mongodb://localhost:27017/menstrual-health

# Server
PORT=5000
FRONTEND_URL=http://localhost:3002

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

### Frontend Configuration

Create `.env.local` file in `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 📂 Project Structure

```
menstrual-health-platform/
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── lib/           # Utility functions
│   │   └── styles/        # Global styles
│   ├── public/            # Static assets
│   └── package.json
│
├── backend/               # Express.js backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # Database schemas
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # External services
│   │   ├── middlewares/   # Request middleware
│   │   └── utils/         # Helper functions
│   └── package.json
│
└── README.md
```

---

## 🚀 Features

### 1. User Profile Management
- Store cultural preferences (age, country, language, religion, diet)
- Personalize all system interactions

### 2. Cycle Tracking
- Track menstrual cycles with symptoms, pain levels, notes
- Historical data storage for trend analysis
- Visual calendar view

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

### 6. Educational Resources
- Curated health articles and wellness tips
- Science-backed information
- Searchable knowledge base

---

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Profile
```
POST /api/profile          # Save/update user profile
GET  /api/profile          # Get user profile
```

### Cycle Logging
```
POST /api/cycle            # Add cycle log
GET  /api/cycle            # Get all cycle logs
```

### AI Assistance
```
POST /api/ai/ask           # Ask AI a question
Body: { "question": "Your question here" }
```

### Food Guidance
```
GET  /api/food             # Get personalized food guidance
GET  /api/beverages        # Get beverage recommendations
```

### Translation
```
POST /api/translate        # Translate text
Body: { "text": "...", "targetLanguage": "es" }
```

**Note:** Most endpoints require authentication via JWT token.

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

## 🧪 Testing

### With Mock Services (No Azure Required)
The platform includes mock services for:
- Azure OpenAI responses
- Azure Translator

Simply run the server without Azure credentials to use mock services for testing.

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
- Next.js team for the excellent framework
- Open-source community for tools and libraries
- Healthcare professionals for evidence-based guidance

---

## 📧 Contact

For questions or feedback about this project, please contact the ThinkSynth team.

---

**Built with ❤️ for Imagine Cup 2025**
