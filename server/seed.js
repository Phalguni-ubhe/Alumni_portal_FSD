// server/seed.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./config/db');

async function seedDatabase() {
    try {
        console.log("⏳ Initializing database seeding...");

        // 1. Create missing tables
        console.log("🛠️ Checking and creating tables...");
        await db.query(`
            CREATE TABLE IF NOT EXISTS events (
                event_id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                event_date DATETIME NOT NULL
            )
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS event_registrations (
                reg_id INT AUTO_INCREMENT PRIMARY KEY,
                event_id INT NOT NULL,
                user_id INT NOT NULL,
                status VARCHAR(50) DEFAULT 'confirmed',
                UNIQUE KEY unique_registration (event_id, user_id),
                FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS alumni_profiles (
                profile_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL UNIQUE,
                graduation_year INT NOT NULL,
                company VARCHAR(255),
                job_title VARCHAR(255),
                linkedin_url VARCHAR(255),
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `);

        // 2. Generate hashed password
        const hash = await bcrypt.hash('password123', 10);

        // 3. Insert Users (Admin, 2 Students, 2 Alumni)
        console.log("👤 Inserting users...");
        const users = [
            ['Admin User', 'admin@college.edu', hash, 'admin', 1],
            ['Sarah Student', 'sarah@college.edu', hash, 'student', 1],
            ['John Student', 'john@college.edu', hash, 'student', 1],
            ['Alice Alumni', 'alice@college.edu', hash, 'alumni', 1],
            ['Bob Alumni', 'bob@college.edu', hash, 'alumni', 1]
        ];

        for (const user of users) {
            await db.query(
                `INSERT IGNORE INTO users (name, email, password_hash, role, is_verified) VALUES (?, ?, ?, ?, ?)`,
                user
            );
        }

        // 4. Get generated User IDs
        const [userRows] = await db.query('SELECT user_id, email FROM users');
        const getUserId = (email) => userRows.find(u => u.email === email)?.user_id;

        const aliceId = getUserId('alice@college.edu');
        const bobId = getUserId('bob@college.edu');
        const sarahId = getUserId('sarah@college.edu');

        // 5. Insert Alumni Profiles
        console.log("🎓 Inserting alumni profiles...");
        if (aliceId && bobId) {
            await db.query(
                `INSERT IGNORE INTO alumni_profiles (user_id, graduation_year, company, job_title) VALUES 
                (?, 2020, 'Google', 'Software Engineer'),
                (?, 2018, 'Microsoft', 'Product Manager')`,
                [aliceId, bobId]
            );
        }

        // 6. Insert Events
        console.log("📅 Inserting events...");
        await db.query(`
            INSERT IGNORE INTO events (event_id, title, description, event_date) VALUES 
            (1, 'Tech Career Fair 2026', 'Meet top tech recruiters and alumni on campus.', '2026-11-15 10:00:00'),
            (2, 'Resume Building Workshop', 'Learn how to pass ATS scanners and stand out.', '2026-10-25 14:00:00'),
            (3, 'Alumni Networking Mixer', 'Casual evening networking with recent graduates.', '2026-12-05 18:00:00')
        `);

        // 7. Insert Event Registrations
        console.log("🎟️ Inserting registrations...");
        if (sarahId) {
            await db.query(
                `INSERT IGNORE INTO event_registrations (event_id, user_id, status) VALUES 
                (1, ?, 'confirmed'),
                (2, ?, 'confirmed')`,
                [sarahId, sarahId]
            );
        }

        console.log("✅ Database seeding completed successfully!");
        console.log("\n--- TEST CREDENTIALS (Password for all: password123) ---");
        console.log("Admin:   admin@college.edu");
        console.log("Student: sarah@college.edu");
        console.log("Alumni:  alice@college.edu");
        console.log("--------------------------------------------------------\n");

    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        process.exit();
    }
}

seedDatabase();