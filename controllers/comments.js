const mySqlConnection = require('../middleware/databaseConnection');
const fs = require('fs');

exports.createComment = (req, res, next) => {
    
    let commentData = req.body;
    console.log(commentData);

    let newComment = {
        user_id: 17, //Make sure to retrieve this from authentication later
        post_id: commentData.postID,
        comment_content: commentData.commentContent,
        
    }

    let commentsUpdated = commentData.comments;

    console.log(newComment);
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