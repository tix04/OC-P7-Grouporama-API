const express = require('express');
const router = express.Router();

const users = require('../controllers/users');

router.get('/:user_id', users.getOneUser);
router.put('/newUser', users.createUser);
router.put('/:user_id/username', users.modifyUsername);
router.put('/:user_id/password', users.modifyUserPassword);
router.put('/:user_id/firstName', users.modifyFirstName);
router.put('/:user_id/lastName', users.modifyLastName);
router.put('/:user_id/age', users.modifyUserAge);
router.put('/:user_id/email', users.modifyUserEmail);
router.delete('/deleteAccount', users.deleteUser);

module.exports = router;