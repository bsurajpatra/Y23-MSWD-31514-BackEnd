const express = require('express');
const { registerFaculty, getFaculties } = require('../controllers/facultyController');

const router = express.Router();

router.post('/register', registerFaculty);
router.get('/allfaculties', getFaculties);

module.exports = router;