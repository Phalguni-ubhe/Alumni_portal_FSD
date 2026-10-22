const db = require('../config/db');

class EventModel {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM events ORDER BY event_date ASC');
        return rows;
    }

    static async findById(eventId) {
        const [rows] = await db.query('SELECT * FROM events WHERE event_id = ?', [eventId]);
        return rows[0];
    }

    static async registerStudent(eventId, userId) {
        const [result] = await db.query(
            'INSERT INTO event_registrations (event_id, user_id, status) VALUES (?, ?, "confirmed")',
            [eventId, userId]
        );
        return result;
    }

    static async checkRegistration(eventId, userId) {
        const [rows] = await db.query(
            'SELECT * FROM event_registrations WHERE event_id = ? AND user_id = ?',
            [eventId, userId]
        );
        return rows[0];
    }
}

module.exports = EventModel;