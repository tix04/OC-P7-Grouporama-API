const multer = require('multer');

const MIME_TYPES = { 
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
};

//Store files in images folder and naming files
const storage = multer.diskStorage({ 
  destination: (req, file, callback) => { 
    callback(null, '../images');             
  },
  filename: (req, file, callback) => { 
    const name = req.body.profilePhoto.name.split(' ').join('_');
    console.log(name);
    const extension = MIME_TYPES[file.mimetype];
    
    
    callback(null, name + Date.now() + '.' + extension);
    
  },
});

module.exports = multer({storage: storage}).single('image');