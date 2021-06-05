const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');

const posts = require('../controllers/posts');


router.get('/', auth, posts.getAllPosts);
router.get('/postCount', auth, posts.getPostsCount);
router.get('/:id', auth, posts.checkLikes);
router.post('/newPost', auth, multer , posts.createPost);
router.put('/setLikes', auth, posts.setLikes);
router.put('/newPostStatus', auth, posts.setNotification);
router.put('/editPost', auth, multer, posts.modifyPost);
router.delete('/delete', auth, posts.deletePost);

module.exports = router;