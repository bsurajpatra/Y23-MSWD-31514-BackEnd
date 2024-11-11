const express = require('express');
const router = express.Router();
const { setSession, getSession, logout } = require('../controllers/sessionController');

router.get('/set-session', setSession);

router.get('/get-session', getSession);

router.get('/logout', logout);

module.exports = router;
