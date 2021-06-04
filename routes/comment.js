const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const comments = require('../controllers/comments');

//router.get('/commentCount', comments.getCommentsCount);
router.get('/:id', auth, comments.checkUpdatedComment);
router.post('/newComment', auth, comments.createComment);
router.delete('/delete', comments.deleteComment);

module.exports = router;