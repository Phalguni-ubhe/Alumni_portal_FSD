const AdminModel = require('../models/adminModel');

exports.getStats = async (req, res) => {
    try {
        const stats = await AdminModel.getDashboardStats();
        res.json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to load dashboard stats' });
    }
};

exports.suspendUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await AdminModel.suspendUserAccount(userId);
        res.json({ success: true, message: `User ${userId} has been suspended` });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to suspend user' });
    }
};