// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const User = require('../models/User');

// Define the controller functions first
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { firstName, lastName, email },
            { new: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error('Users fetch error:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Define routes with their corresponding controller functions
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
router.get('/all', verifyToken, getAllUsers);

module.exports = router;