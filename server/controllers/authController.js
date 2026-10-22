const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Get user from Model
        const user = await UserModel.findByEmail(email);
        
        // 2. Business Logic / Validation
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // 3. Generate Tokens
        const accessToken = jwt.sign(
            { id: user.user_id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { id: user.user_id }, 
            process.env.REFRESH_SECRET, 
            { expiresIn: '7d' }
        );
        
        // 4. Update Database via Model
        await UserModel.updateRefreshToken(user.user_id, refreshToken);
        
        // 5. Send Response
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
        res.json({ accessToken, role: user.role, name: user.name });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.register = async (req, res) => {
    // Implement registration logic using UserModel.create()
};