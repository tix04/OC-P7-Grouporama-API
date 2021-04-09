const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer_config')
/*const multer = require('multer');
const upload = multer({dest: 'C:\Users\Tix Web Dev PC\Desktop\OC Projects\OC Project 7 Courses\OC Project 7 Exercises and App\Project 7\grouporama-api\images'});*/

const users = require('../controllers/users');

router.get('/:user_id', users.getOneUser);
router.post('/newUser' , multer , users.createUser);
router.put('/:user_id/username', users.modifyUsername);
router.put('/:user_id/password', users.modifyUserPassword);
router.put('/:user_id/firstName', users.modifyFirstName);
router.put('/:user_id/lastName', users.modifyLastName);
router.put('/:user_id/age', users.modifyUserAge);
router.put('/:user_id/email', users.modifyUserEmail);
router.delete('/deleteAccount', users.deleteUser);

module.exports = router;