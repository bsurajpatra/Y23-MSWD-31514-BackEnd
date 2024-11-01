// controllers/userController.js
const User = require('../models/User');

const userController = {
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Additional user-related functions (e.g., update, delete)
};

module.exports = userController;
