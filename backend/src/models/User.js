const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    name: {
        type: String,
        default: '',
    },
    age: {
        type: Number,
        min: 10,
        max: 120,
    },
    country: {
        type: String,
        default: '',
    },
    region: {
        type: String,
        default: '',
    },
    language: {
        type: String,
        default: 'en',
    },
    gender: {
        type: String,
        default: '',
    },
    birthDate: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
    dietaryPreferences: {
        type: [String],
        default: [],
    },
    allergies: {
        type: [String],
        default: [],
    },
    hasCompletedOnboarding: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// NOTE: Pre-save hook removed - password hashing now done in controller
// This avoids Cosmos DB compatibility issues with async hooks
// bcrypt is still needed for comparePassword method

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
