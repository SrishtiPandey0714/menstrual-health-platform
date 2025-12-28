const Profile = require('../models/Profile');
const CycleLog = require('../models/CycleLog');
const { getAIResponse } = require('../services/openai.service');
const { translateText } = require('../services/translator.service');

exports.askAI = async (req, res) => {
    try {
        const userId = req.user.sub;
        const question = req.body.question;

        const profile = await Profile.findOne({ userId });
        const recentLogs = await CycleLog.find({ userId }).sort({ date: -1 }).limit(3);

        // Get user's language preference (default to English)
        const userLang = profile?.language || 'en';

        // Translate question to English for AI processing
        const translatedQuestion = await translateText(question, 'en');

        const messages = [
            {
                role: 'system',
                content: `
You are a menstrual health assistant.
You provide educational information only.
Do NOT diagnose or prescribe.
Encourage professional help for severe symptoms.
Use respectful, inclusive language.
                `,
            },
            {
                role: 'system',
                content: `
User context:
Age group: ${profile?.ageGroup || 'unknown'}
Country: ${profile?.country || 'unknown'}
Diet: ${profile?.diet || 'unknown'}
Recent symptoms: ${recentLogs.map(l => l.symptoms).join(', ')}
                `,
            },
            {
                role: 'user',
                content: translatedQuestion,
            },
        ];

        const answer = await getAIResponse(messages);

        // Translate answer back to user's language
        const translatedAnswer = await translateText(answer, userLang);

        res.status(200).json({ answer: translatedAnswer });
    } catch (error) {
        res.status(500).json({ message: 'AI service failed' });
    }
};
