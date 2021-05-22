const express = require('express');
const router = express.Router();

//const auth = require('../middleware/auth');
const comments = require('../controllers/comments');

//router.get('/commentCount', comments.getCommentsCount);
router.get('/:id', comments.checkUpdatedComment);
router.post('/newComment', comments.createComment);
router.delete('/delete', comments.deleteComment);

module.exports = router;