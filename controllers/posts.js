const mySqlConnection = require('../middleware/databaseConnection');
const fs = require('fs');

//Add a Record in a Post Table
exports.createPost = (req, res, next) => {
    
    let url = req.protocol + '://' + req.get('host');
    let formData = req.body;
    console.log(formData);
    let postImage = req.file;
    console.log(postImage);
    let image_url = url + '/images/' + postImage.filename;
    console.log(image_url);
    let userId = req.userId;
    
    //let profileImage = req.profileImage
;
    let newPost = {
        post_content: formData.postContent,
        likes: formData.likes,
        comments: formData.comments,
        post_image: image_url,
        user_id: userId //Retrieve this from authentication later. Not hardcoded
        
    }
    console.log(newPost);
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


exports.getAllPosts = (req, res, next) => {
    const data = [{userId: req.userId}];
    console.log('in posts', data);
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('All posts Retrieved');
        }
        //TODO: Posts with no comments do not display
        //connection.query('SELECT * from posts ORDER BY time_created DESC', (err, rows) => {
        //connection.query('SELECT posts.post_content, posts.post_image, comments.comment_content FROM posts INNER JOIN comments ON posts.post_id=comments.post_id ORDER BY posts.time_created DESC', (err, rows) => {
        const query1 = 'SELECT posts.post_id, posts.post_content, posts.post_image, posts.comments, posts.likes, posts.likes_array, posts.user_id, users.profile_image , users.username FROM posts INNER JOIN users ON posts.user_id=users.user_id ORDER BY posts.time_created DESC';
        const query2 = 'SELECT comments.comment_id, comments.comment_content, users.profile_image, users.username, posts.post_id FROM ((comments INNER JOIN users ON comments.user_id=users.user_id) INNER JOIN posts ON comments.post_id=posts.post_id)';
        const query3 = `SELECT profile_image FROM users WHERE user_id=${req.userId}`;

        const allPostsQuery = query1 + ';' + query2 + ';' + query3;
        connection.query(allPostsQuery , (err, rows) => {
            if(!err) {
                console.log(rows);
                rows.push(data);
                console.log(rows);
                res.send(rows);
            }else {
                console.log(err);
            }
        });
    });
};

//Retrieve total amount of posts
exports.getPostsCount = (req, res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('Number of Total Posts retrieved');
        }

        const query1 = 'SELECT COUNT(post_id) AS postsCount FROM posts';
        const query2 = `SELECT viewed_posts FROM users WHERE user_id = ${req.userId}`;

        const fullQuery = query1 + ';' + query2;
         

        connection.query(fullQuery, (err,count) => {
            if(!err) {
                
                console.log(count);
                res.send(count);
            }else {
                console.log(err);
            }
        });
    });
};

//Update if user has seen all posts
exports.setNotification = (req, res, next) => {
    const userID = req.userId;
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else { 
            console.log('Posts viewed have been updated');
        }

        console.log(req.body.count);
        connection.query('UPDATE users SET viewed_posts = ? WHERE user_id = ?', [req.body.count, userID],(err, count) => {
            if(!err) {

                res.send(`You have viewed all new posts`);
            }else {
                console.log(err);
            }
        });
    });
};

//Check Likes status
exports.checkLikes = (req, res, next) => {
    const postID = req.params.id;
    
   
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('Like Status Checked');
        }

        connection.query('SELECT likes_array FROM posts WHERE post_id = ?', [postID],(err, likesArray) => {
            if(!err) {
                res.send(likesArray);
            }else {
                console.log(err);
            }
        });
    });
};

//Update Likes on post
exports.setLikes = (req, res, next) => {
    const postID = req.body.data.postID;
    const likesArray = req.body.data.likesArray;

    const likesTotal = likesArray.length;

    console.log(postID, likesArray, likesTotal);

    const stringArray = JSON.stringify(likesArray);
    console.log(stringArray);

    //res.send('Likes Test Successful');

    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else { 
            console.log('Likes have been updated');
        }

        const query = 'UPDATE posts SET likes = ?, likes_array = ? WHERE post_id = ?'
        connection.query(query , [likesTotal ,stringArray ,postID] ,(err, response) => {
            if(!err) {

                res.send(`Likes have been updated`);
            }else {
                console.log(err);
            }
        });
    });
};

//PUT(Modify)- Edit Text or image posts

exports.modifyPost = (req, res, next) => {
    let updatedData = req.body;
    console.log(updatedData);
    let updatedImage = req.file;
    console.log(updatedImage);
    let url = req.protocol + '://' + req.get('host');
    

    const updatedContent = updatedData.postContent;
    const postID = updatedData.postID;
    console.log(updatedContent, postID);

    if(updatedImage === null || updatedImage === undefined) {
        mySqlConnection.getConnection((err, connection) => {
            if(err) {
                throw err;
            }else {
                console.log('Post has been modified!');
            }

           connection.query('UPDATE posts SET post_content = ? WHERE post_id = ?', [updatedContent, postID], (err, rows) => {
            
            connection.release();

            if(!err) {
                res.send(`Post text has been updated!!`);
            }else {
                console.log(err);
            }

           });
            
        });
    }else {
        let image_url = url + /*'/mediaPosts/'*/'/images/' + updatedImage.filename;
        mySqlConnection.getConnection((err, connection) => {
            if(err) {
                throw err;
            }else {
                console.log('Post has been modified!');
            }

           connection.query('UPDATE posts SET post_content = ?, post_image = ? WHERE post_id = ?', [updatedContent, image_url ,postID], (err, rows) => {
            
            connection.release();

            if(!err) {
                res.send(`Post text and Image has been updated!!`);
            }else {
                console.log(err);
            }

           });
            
        });
    }
   
};


//DELETE Post

exports.deletePost = (req, res, next) => {
    const postID = req.body.postID;
    console.log(postID);
    
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log(`Post has been deleted`);
        }
        const query1 = `DELETE from comments WHERE post_id = ${postID}`;
        const query2 = `DELETE from posts WHERE post_id = ${postID}`;
        const query3 = `UPDATE users SET viewed_posts = viewed_posts - 1`;

        const allPostsQuery = query1 + ';' + query2 + ';' + query3;

        connection.query(allPostsQuery, (err, rows) => {

            connection.release();

            if(!err) {
                res.send(`Post has been deleted!!`);
            }else {
                console.log(err);
            }

        });
    });
};



