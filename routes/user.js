const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer_config');
const auth = require('../middleware/auth')

/*const multer = require('multer');
const upload = multer({dest: 'C:\Users\Tix Web Dev PC\Desktop\OC Projects\OC Project 7 Courses\OC Project 7 Exercises and App\Project 7\grouporama-api\images'});*/

const users = require('../controllers/users');

router.get('/userProfile', auth, users.getOneUser);
router.post('/newUser' , multer , users.createUser);
router.put('/:user_id/username', auth, users.modifyUsername);
router.put('/:user_id/password', auth, users.modifyUserPassword);
router.put('/:user_id/firstName', auth, users.modifyFirstName);
router.put('/:user_id/lastName', auth, users.modifyLastName);
router.put('/:user_id/age', auth, users.modifyUserAge);
router.put('/:user_id/email', auth, users.modifyUserEmail);
router.delete('/deleteAccount', auth, users.deleteUser);

module.exports = router;