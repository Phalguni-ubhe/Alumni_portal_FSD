require('dotenv').config(); // MUST BE LINE 1
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Import All Routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const alumniRoutes = require('./routes/alumni');
const adminRoutes = require('./routes/admin'); // Added Admin Route

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Route Middleware - Make sure these are ALL uncommented
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes); 
app.use('/api/alumni', alumniRoutes);
app.use('/api/admin', adminRoutes); // Added Admin Route Middleware

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));