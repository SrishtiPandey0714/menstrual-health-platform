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
    religion: String,
    diet: String,
    accessibility: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', ProfileSchema);
