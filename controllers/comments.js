const mySqlConnection = require('../middleware/databaseConnection');
const fs = require('fs');

//Create new Comment
exports.createComment = (req, res, next) => {
    
    let commentData = req.body;
    console.log(commentData);

    let newComment = {
        user_id: commentData.userID, //Make sure to retrieve this from authentication later
        post_id: commentData.postID,
        comment_content: commentData.commentContent,
        
    }

    let commentsUpdated = commentData.comments;

    console.log(newComment, commentsUpdated);
    const query1 = 'INSERT INTO comments SET ?';
    const query2 = `UPDATE posts SET comments=${commentsUpdated} WHERE post_id=${newComment.post_id}`;

    const combinedQuery = query1 + '; ' + query2;

    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('New Comment has been added!');
        }

        connection.query(combinedQuery, [newComment], (err,rows) => {

            connection.release();

            if(!err) {
                res.send('You have created a new comment!!');
            }else {
                console.log(err);
            }


        });
    });
};

//Check updated Comment
exports.checkUpdatedComment = (req, res, next) => {
    
    let postID = req.params.id;
    console.log('this is the post ID', postID);

    
    const query1 = 'SELECT comments.comment_id, comments.comment_content, users.profile_image, users.username, posts.post_id FROM ((comments INNER JOIN users ON comments.user_id=users.user_id) INNER JOIN posts ON comments.post_id=posts.post_id) WHERE comments.post_id = ? ORDER BY comments.time_created ASC';

    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('Updated comment List sent!!');
        }

        connection.query(query1, [postID], (err,rows) => {

            connection.release();

            if(!err) {
                res.send(rows);
            }else {
                console.log(err);
            }


        });
    });
};

exports.deleteComment = (req, res, next) => {

    let commentData = req.body;
    console.log(commentData);

    const query1 = `DELETE FROM comments WHERE comment_id=${commentData.comment_id}`;
    const query2 = `UPDATE posts SET comments=${commentData.comments} WHERE post_id=${commentData.post_id}`;

    const combinedQuery = query1 + '; ' + query2;

    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('Comment has been Deleted!');
        }

        connection.query(combinedQuery, (err, rows) => {
            connection.release();

            if(!err) {
                res.send('You have deleted a comment!!');
            }else {
                console.log(err);
            }
        });
    });
};