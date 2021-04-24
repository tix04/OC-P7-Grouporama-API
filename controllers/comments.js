const mySqlConnection = require('../middleware/databaseConnection');
const fs = require('fs');

exports.createComment = (req, res, next) => {
    
    let commentData = req.body;
    console.log(commentData);

    let newComment = {
        user_id: 21, //Make sure to retrieve this from authentication later
        post_id: commentData.postID,
        comment_content: commentData.commentContent
    }
    console.log(newComment);

    mySqlConnection.getConnection((err, connection) => {
        if(err) {
            throw err;
        }else {
            console.log('New Comment has been added!');
        }

        connection.query('INSERT INTO comments SET ?', newComment, (err,rows) => {

            connection.release();

            if(!err) {
                res.send('You have created a new comment!!');
            }else {
                console.log(err);
            }


        });
    });
};