const express = require('express');
const router = express.Router();

const authentication = require('../controllers/authentication');

//router.post('/signup', authentication.signUp);
router.post('/login', authentication.logIn);

module.exports = router;