const express = require('express');
const router = express.Router();

const authentication = require('../controllers/authentication');

//router.post('/signup', authentication.signUp);
router.get('/verifyUsername', authentication.verifyUsername);
router.get('/verifyEmail', authentication.verifyEmail);
router.post('/login', authentication.logIn);

module.exports = router;