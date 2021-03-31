/*const mySql = require('mysql');

const pool = mySql.createPool({ 
    connectionLimit : 10,  //Maximum connection allowed. See Documentation
    host            : 'localhost', //Where database is hosted
    user            : 'root',      //username
    password        : '',          //password
    database        : 'grouporama' //Which database to access
  });*/

  const mySqlConnection = require('../middleware/databaseConnection');
  
//Add a Record in a Post Table
exports.createPost = (req,res, next) => {
    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('New Post has been added!');
        }

        const params = req.body;

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

        //connection.query('SELECT * from posts ORDER BY time_created DESC', (err, rows) => {
        connection.query('SELECT posts.post_content, posts.attached_files, comments.comment_content FROM posts INNER JOIN comments ON posts.post_id=comments.post_id ORDER BY posts.time_created DESC', (err, rows) => {
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



