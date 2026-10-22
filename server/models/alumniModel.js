const db = require('../config/db');

class AlumniModel {
    static async findAllProfiles() {
        const [rows] = await db.query(`
            SELECT u.name, u.email, a.graduation_year, a.company, a.job_title, a.linkedin_url 
            FROM alumni_profiles a
            JOIN users u ON a.user_id = u.user_id
        `);
        return rows;
    }

    static async upsertProfile(userId, profileData) {
        const { graduation_year, company, job_title, linkedin_url } = profileData;
        const [result] = await db.query(
            `INSERT INTO alumni_profiles (user_id, graduation_year, company, job_title, linkedin_url) 
             VALUES (?, ?, ?, ?, ?) 
             ON DUPLICATE KEY UPDATE 
             graduation_year = VALUES(graduation_year), company = VALUES(company), 
             job_title = VALUES(job_title), linkedin_url = VALUES(linkedin_url)`,
            [userId, graduation_year, company, job_title, linkedin_url]
        );
        return result;
    }
}

module.exports = AlumniModel;