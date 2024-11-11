const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const { verifyToken } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const courseRoutes = require('./routes/courseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
});
