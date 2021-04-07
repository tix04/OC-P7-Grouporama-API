const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer_config');

const posts = require('../controllers/posts');

//router.post('/newPost', posts.createPost);
router.get('/', posts.getAllPosts);
router.get('/postCount', posts.getPostsCount);
router.put('/newPostStatus', posts.setNotification);
router.post('/newPost', multer, posts.createPost);
router.put('/:post_id/content', posts.modifyTextPost);
//router.put('/:post_id', posts.modifyMediaPost);
router.delete('/:post_id', posts.deletePost);

module.exports = router;