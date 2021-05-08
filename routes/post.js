const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer_config');

const posts = require('../controllers/posts');

//router.post('/newPost', posts.createPost);
router.get('/', posts.getAllPosts);
router.get('/postCount', posts.getPostsCount);
router.post('/newPost',multer , posts.createPost);
router.put('/newPostStatus', posts.setNotification);
router.put('/editPost', multer, posts.modifyPost);
//router.put('/:post_id', posts.modifyMediaPost);
router.delete('/delete', posts.deletePost);

module.exports = router;