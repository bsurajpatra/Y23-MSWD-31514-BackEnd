// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

// Dashboard route with proper callback function
router.get('/', verifyToken, async (req, res) => {
    try {
        // Add your dashboard data here - this is just example data
        const dashboardData = {
            stats: {
                totalStudents: 0,
                totalFaculty: 0,
                totalCourses: 0
            },
            recentActivity: [],
            notifications: []
        };

        res.json(dashboardData);
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
});

// Additional dashboard routes if needed
router.get('/stats', verifyToken, async (req, res) => {
    try {
        const stats = {
            totalStudents: 0,
            totalFaculty: 0,
            totalCourses: 0
        };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
});

router.get('/recent-activity', verifyToken, async (req, res) => {
    try {
        const recentActivity = [];
        res.json(recentActivity);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recent activity' });
    }
});

// Remove console.logs as they're not needed
module.exports = router;