const db = require('../config/db');

class AdminModel {
    static async getDashboardStats() {
        const [users] = await db.query('SELECT COUNT(*) as total FROM users');
        const [events] = await db.query('SELECT COUNT(*) as total FROM events');
        const [registrations] = await db.query('SELECT COUNT(*) as total FROM event_registrations');
        
        return {
            totalUsers: users[0].total,
            totalEvents: events[0].total,
            totalRegistrations: registrations[0].total
        };
    }

    static async suspendUserAccount(userId) {
        const [result] = await db.query('UPDATE users SET is_active = 0 WHERE user_id = ?', [userId]);
        return result;
    }
}

module.exports = AdminModel;