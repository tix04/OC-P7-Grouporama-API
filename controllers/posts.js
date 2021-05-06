const mySqlConnection = require('../middleware/databaseConnection');
const fs = require('fs');

//Add a Record in a Post Table
exports.createPost = (req, res, next) => {
    
    let url = req.protocol + '://' + req.get('host');
    let formData = req.body;
    console.log(formData);
    let postImage = req.file;
    console.log(postImage);
    let image_url = url + /*'/mediaPosts/'*/'/images/' + postImage.filename;
    console.log(image_url);

    let newPost = {
        post_content: formData.postContent,
        likes: formData.likes,
        comments: formData.comments,
        post_image: image_url,
        user_id: 18 //Retrieve this from authentication later. Not hardcoded
        
    }
    console.log(newPost);
    //res.send('data received');
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('New Post has been added!');
        }

        const params = newPost;

        connection.query('INSERT INTO posts SET ?', params, (err, rows) => { //Add a Record in a Post Table

            connection.release();

            if(!err) {
                res.send(`You have created a new post!!`);
            }else {
                console.log(err);
            }
            console.log(req.body);
        });
    });
};

//GET all Posts from database
/*TODO:
* Still need to add ability to add Images and video Files
* Only allow images(jpeg, gif, jpg, bmp) and video(mp4, flv...Check other video files efficient for websites)
*/

exports.getAllPosts = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('All posts Retrieved');
        }
        //TODO: Posts with no comments do not display
        //connection.query('SELECT * from posts ORDER BY time_created DESC', (err, rows) => {
        //connection.query('SELECT posts.post_content, posts.post_image, comments.comment_content FROM posts INNER JOIN comments ON posts.post_id=comments.post_id ORDER BY posts.time_created DESC', (err, rows) => {
        const query1 = 'SELECT posts.post_id, posts.post_content, posts.post_image, posts.comments, posts.likes, users.profile_image , users.username FROM posts INNER JOIN users ON posts.user_id=users.user_id ORDER BY posts.post_id DESC';
        const query2 = 'SELECT comments.comment_id, comments.comment_content, users.profile_image, users.username, posts.post_id FROM ((comments INNER JOIN users ON comments.user_id=users.user_id) INNER JOIN posts ON comments.post_id=posts.post_id)';

        const allPostsQuery = query1 + ';' + query2;
        connection.query(allPostsQuery , (err, rows) => {
            if(!err) {
                console.log(rows);
                res.send(rows);
            }else {
                console.log(err);
            }
        });
    });
};

exports.getPostsCount = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('Number of Posts Amount retrieved');
        }

        connection.query('SELECT COUNT(post_id) AS postsCount, viewed_posts FROM posts, poststatus', (err,count) => {
            if(!err) {
                
                console.log(count);
                res.send(count);
            }else {
                console.log(err);
            }
        });
    });
};

exports.setNotification = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else { 
            console.log('Posts viewed have been updated');
        }

        console.log(req.body.count);
        connection.query('UPDATE poststatus SET viewed_posts = ? WHERE summary_id=1', [req.body.count],(err, count) => {
            if(!err) {

                res.send(`You have viewed all new posts`);
            }else {
                console.log(err);
            }
        });
    });
};

/*TODO:
*Create a GET method that only returns posts of connected user by user_id
*/

//PUT(Modify)/Update Text posts

exports.modifyTextPost = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('Post has been modified!');
        }

        const params = req.params.post_id;
        const { post_id, time_created, user_id, likes, comments, content, attached_files } = req.body;

        connection.query('UPDATE posts SET content = ? WHERE post_id = ?',[content, params], (err, rows) => {

            connection.release();

            if(!err) {
                res.send(`Post Record has been updated!!`);
            }else {
                console.log(err);
            }

            console.log(err);
        });
    });
};

//PUT(Modify)/Update media posts

exports.modifyMediaPost = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('Post has been modified!');
        }

        const params = req.params.post_id;
        const { post_id, time_created, user_id, likes, comments, content, attached_files } = req.body;

        connection.query('UPDATE posts SET content = ? WHERE post_id = ?',[attached_files, params], (err, rows) => {

            connection.release();

            if(!err) {
                res.send(`Post Record has been updated!!`);
            }else {
                console.log(err);
            }

            console.log(err);
        });
    });
};

//DELETE Post

exports.deletePost = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('Post has been deleted');
        }

        connection.query('DELETE from users WHERE user_id = ?',[req.params.post_id], (err, rows) => {

            connection.release();

            if(!err) {
                res.send(`Post with post_id: ${ [req.params.post_id]} has been deleted!!`);
            }else {
                console.log(err);
            }

        });
    });
};



