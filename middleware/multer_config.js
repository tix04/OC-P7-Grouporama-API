const multer = require('multer');

const MIME_TYPES = { 
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif' //Tok out comma at the end of this line
};

//Store files in images folder and naming files
const storage = multer.diskStorage({ 
  destination: (req, file, callback) => { 
    callback(null, './images');             
  },
  filename: (req, file, callback) => { 
    const name = file.originalname.split(' ').join('_');
    console.log(name);
    const extension = MIME_TYPES[file.mimetype];
    
    
    callback(null, file.fieldname + Date.now() + '.' + extension);
    
  },
});

module.exports = multer({storage: storage}).single('image');