const CycleLog = require('../models/CycleLog');

exports.addCycleLog = async (req, res) => {
    try {
        const userId = req.user.sub;

        const cycleLog = new CycleLog({
            userId,
            date: req.body.date,
            symptoms: req.body.symptoms,
            painLevel: req.body.painLevel,
            notes: req.body.notes,
        });

        await cycleLog.save();

        res.status(201).json({
            message: 'Cycle log added successfully',
            data: cycleLog,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add cycle log' });
    }
};

exports.getCycleLogs = async (req, res) => {
    try {
        const userId = req.user.sub;

        const logs = await CycleLog.find({ userId }).sort({ date: -1 });

        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cycle logs' });
    }
};
