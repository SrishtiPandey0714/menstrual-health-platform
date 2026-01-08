const User = require('../models/User');
const Profile = require('../models/Profile');
const CycleLog = require('../models/CycleLog');
const { generateGroqResponse } = require('../services/groq.service');

exports.askAI = async (req, res) => {
    try {
        const userId = req.user.sub;
        const question = req.body.question;

        console.log(`📥 AI Request - User ID: ${userId}`);

        // Get user info and language - handle both email and ObjectId
        let user;
        try {
            user = await User.findById(userId);
        } catch (err) {
            // If findById fails, try finding by email
            user = await User.findOne({ email: userId });
        }

        if (!user) {
            console.error(`❌ User not found: ${userId}`);
            return res.status(404).json({ message: 'User not found' });
        }

        const userLang = user.language || 'en';

        // Language name mapping
        const langNames = {
            'en': 'English',
            'hi': 'Hindi (हिंदी)',
            'es': 'Spanish (Español)',
            'fr': 'French (Français)'
        };

        console.log(`🌍 User language: ${userLang} (${langNames[userLang] || userLang})`);

        const profile = await Profile.findOne({ userId });
        const recentLogs = await CycleLog.find({ userId }).sort({ date: -1 }).limit(3);

        // Build context for AI with language instruction
        const systemPrompt = `You are a compassionate menstrual health assistant.

CRITICAL RULES:
- Provide educational information ONLY
- Do NOT diagnose medical conditions
- Do NOT prescribe treatments
- Encourage professional medical help for concerning symptoms
- Use respectful, inclusive language

LANGUAGE INSTRUCTION:
You MUST respond in ${langNames[userLang] || 'English'} language ONLY.
Your entire response must be in ${langNames[userLang] || 'English'}.

User context:
- Age group: ${profile?.ageGroup || 'unknown'}
- Country: ${profile?.country || user?.country || 'unknown'}
- Diet: ${profile?.diet || user?.dietaryPreferences?.[0] || 'unknown'}
- Recent symptoms: ${recentLogs.map(l => l.symptoms).join(', ') || 'none logged'}`;

        let answer;
        try {
            // Use Groq API with language-aware prompt
            answer = await generateGroqResponse(systemPrompt, question);
            console.log(`✅ Got Groq response in ${langNames[userLang]}`);
        } catch (error) {
            console.warn('⚠️  Groq API failed, using fallback');

            // Language-specific fallbacks
            const fallbacks = {
                'hi': `मैं मासिक धर्म स्वास्थ्य के बारे में सवालों में मदद करने के लिए यहां हूं!

सामान्य विषय जिन पर मैं चर्चा कर सकता हूं:
- मासिक धर्म चक्र के चरण और क्या उम्मीद करें
- पीरियड के लक्षणों जैसे ऐंठन और मूड में बदलाव को प्रबंधित करना
- आपके चक्र के दौरान पोषण
- स्वास्थ्य सेवा प्रदाता से कब परामर्श करें

कृपया ध्यान दें: मैं केवल शैक्षिक जानकारी प्रदान करता हूं। चिकित्सा संबंधी चिंताओं के लिए, कृपया किसी स्वास्थ्य पेशेवर से परामर्श लें।`,

                'es': `¡Estoy aquí para ayudar con preguntas sobre salud menstrual!

Temas comunes que puedo discutir:
- Fases del ciclo menstrual y qué esperar
- Manejo de síntomas del período como cólicos y cambios de humor
- Nutrición durante tu ciclo
- Cuándo consultar a un profesional de la salud

Nota: Proporciono información educativa solamente. Para preocupaciones médicas, consulta a un profesional de la salud.`,

                'fr': `Je suis ici pour vous aider avec des questions sur la santé menstruelle!

Sujets communs que je peux discuter:
- Phases du cycle menstruel et à quoi s'attendre
- Gestion des symptômes comme les crampes et les sautes d'humeur
- Nutrition pendant votre cycle
- Quand consulter un professionnel de la santé

Note: Je fournis uniquement des informations éducatives. Pour des préoccupations médicales, consultez un professionnel de la santé.`,

                'en': `I'm here to help with menstrual health questions!

Common topics I can discuss:
- Menstrual cycle phases and what to expect
- Managing period symptoms like cramps and mood changes
- Nutrition during your cycle
- When to consult a healthcare provider

Please note: I provide educational information only. For medical concerns, please consult a healthcare professional.`
            };

            answer = fallbacks[userLang] || fallbacks['en'];
        }

        console.log(`📤 Sending response in ${langNames[userLang]}`);
        res.status(200).json({ answer: answer });
    } catch (error) {
        console.error('AI Controller Error:', error);
        res.status(500).json({ message: 'AI service failed', error: error.message });
    }
};
