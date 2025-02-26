const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const config = require('./config/config');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true
}));

// Add a test route for root path
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to API' });
});

// Add a test route to check if API is working
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Database connection
mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/referral', require('./routes/referral.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Test URLs:');
    console.log(`- Home: http://localhost:${PORT}`);
    console.log(`- API Test: http://localhost:${PORT}/api/test`);
    console.log(`- Register: http://localhost:${PORT}/api/auth/register`);
    console.log(`- Login: http://localhost:${PORT}/api/auth/login`);
}); 