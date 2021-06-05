const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer_config');
const auth = require('../middleware/auth');


const users = require('../controllers/users');

router.get('/userProfile', auth, users.getOneUser);
router.post('/newUser' , multer , users.createUser);
router.put('/profilePhoto', auth, multer, users.modifyProfilePhoto);
router.put('/username', auth, users.modifyUsername);
router.put('/password', auth, users.modifyUserPassword);
router.put('/firstName', auth, users.modifyFirstName);
router.put('/lastName', auth, users.modifyLastName);
router.put('/age', auth, users.modifyUserAge);
router.put('/email', auth, users.modifyUserEmail);
router.delete('/deleteAccount', auth, users.deleteUser);

module.exports = router;