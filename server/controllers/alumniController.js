const AlumniModel = require('../models/alumniModel');

exports.getDirectory = async (req, res) => {
    try {
        const directory = await AlumniModel.findAllProfiles();
        res.json({ success: true, data: directory });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch alumni directory' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        await AlumniModel.upsertProfile(req.user.id, req.body);
        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
};