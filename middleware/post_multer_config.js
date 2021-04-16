const post_multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
};

const storage = post_multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './mediaPosts');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        console.log(name);
        const extension = MIME_TYPES[file.mimetype];

        callback(null, file.fieldname + Date.now() + '.' + extension);
    },
});

module.exports = post_multer({storage: storage}).single('image');