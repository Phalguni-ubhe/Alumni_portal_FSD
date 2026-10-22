const db = require('../config/db');

class UserModel {
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(userData) {
        const { name, email, hash, role, college_id } = userData;
        const [result] = await db.query(
            'INSERT INTO users (name, email, password_hash, role, college_id) VALUES (?, ?, ?, ?, ?)',
            [name, email, hash, role, college_id]
        );
        return result.insertId;
    }

    static async updateRefreshToken(userId, token) {
        await db.query('UPDATE users SET refresh_token = ? WHERE user_id = ?', [token, userId]);
    }
}

module.exports = UserModel;