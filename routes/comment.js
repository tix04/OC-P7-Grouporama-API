const express = require('express');
const router = express.Router();


const comments = require('../controllers/comments');

//router.get('/commentCount', comments.getCommentsCount);
router.post('/newComment', comments.createComment);
//router.put('/:comment_id/content', comments.modifyTextComment);
//router.delete('/:comment_id', comments.deleteComment);

module.exports = router;