const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const authentication = require('../controllers/authentication');


router.get('/verifyUsername', authentication.verifyUsername);
router.get('/verifyEmail', authentication.verifyEmail);
router.get('/verifyPostsCount', auth, authentication.verifyPostsAmount)
router.post('/login', authentication.logIn);

module.exports = router;