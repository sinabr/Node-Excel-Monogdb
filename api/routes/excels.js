const express = require('express');
const router = express.Router();

// file handling tool
const formidableMiddleware = require('express-formidable')
upath = path.join(__dirname, '..', '..', '/uploads') 

const excelsController = require('./controller/excels');

router.post('/uploadxlsx' , formidableMiddleware({uploadDir:upath,keepExtensions:true}) , excelsController.xlsxToMongodb);

module.exports = router;