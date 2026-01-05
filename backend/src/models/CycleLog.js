const mongoose = require('mongoose');

const CycleLogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    date: {
        type: Date,
        required: true
    },
    symptoms: {
        type: [String],
        default: []
    },
    painLevel: {
        type: Number,
        min: 0,
        max: 10
    },
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Index for efficient querying by user and date
CycleLogSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('CycleLog', CycleLogSchema);
