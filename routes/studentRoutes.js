const express = require('express');
const { registerStudent,getstudents } = require('../controllers/studentController');

const router = express.Router();

router.post('/register', registerStudent);
router.get("/allstudents",getstudents)

module.exports = router;
