const Profile = require('../models/Profile');

exports.saveProfile = async (req, res) => {
    try {
        const userId = req.user.sub; // from Azure token later

        const profileData = {
            userId,
            ageGroup: req.body.ageGroup,
            country: req.body.country,
            language: req.body.language,
            religion: req.body.religion,
            diet: req.body.diet,
            accessibility: req.body.accessibility,
        };

        const profile = await Profile.findOneAndUpdate(
            { userId },
            profileData,
            { upsert: true, new: true }
        );

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to save profile' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.sub;
        const profile = await Profile.findOne({ userId });

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
};
