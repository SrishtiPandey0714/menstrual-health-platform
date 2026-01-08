const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    ageGroup: String,
    country: String,
    language: String,
    gender: String,
    religion: String,
    diet: String,
    dietaryRestrictions: String,
    accessibility: String,
    aiConsent: Boolean,
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', ProfileSchema);
