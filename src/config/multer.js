const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '..', '..', '/public/uploads/images'));
        // cb(null, "uploads/images/");
        // cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname);
        // console.log('hay', file.fieldname);
        // cb(null, `${}`)
        cb(null, `${file.fieldname}_${Date.now()}-${ext}`);
    },
});

const upload = multer({limits:800000, storage: storage,
    fileFilter: function(req, file, cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
            cb(null, true);
        }else{
            cb(new Error('Only jpg and png files are allowed'));
        }
    }
});



module.exports = upload;