const Profile = require('../models/Profile');
const CycleLog = require('../models/CycleLog');
const { getCyclePhase } = require('../utils/cyclePhase');
const { getFoodSuggestions } = require('../services/food.service');

exports.getFoodGuidance = async (req, res) => {
    try {
        const userId = req.user.sub;

        const profile = await Profile.findOne({ userId });
        const lastLog = await CycleLog.findOne({ userId }).sort({ date: -1 });

        const phase = getCyclePhase(lastLog?.date);
        const suggestions = getFoodSuggestions(phase, profile?.diet);

        res.status(200).json({
            phase,
            ...suggestions,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch food guidance' });
    }
};
