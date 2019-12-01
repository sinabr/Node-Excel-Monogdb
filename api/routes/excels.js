const express = require('express');
const router = express.Router();

// file handling tool
const multer = require('multer');
// storing the uploaded file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
})  
//multer settings
var upload = multer({ 
                    storage: storage
                    ,
                    fileFilter : function(req, file, callback) { //file filter
                        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Wrong extension type'));
                        }
                        callback(null, true);
                    }
                })

const excelsController = require('./controller/excels');

router.post('/uploadxlsx' , upload.single('file') , excelsController.xlsxToMongodb);

module.exports = router;