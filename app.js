const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const debug = require('debug')('http');
const path = require('path')
const fs = require('fs')
const rfs = require('rotating-file-stream')
const cors = require('cors');

// Optional
// Can be used to index fields in mongodb
mongoose.set('useCreateIndex', true);

// Optional
// Logger files
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


// Enabling Access-Cross-Origin 
app.use(cors());


mongoose.Promise = global.Promise;


// Connect to mongodb Already Installed in the system (localhost)
// DB name: excels
mongoose.connect('mongodb://localhost/excels', { useNewUrlParser: true , useUnifiedTopology: true}).catch(function (reason) {
    console.log('Unable to connect to the mongodb instance. Error: ', reason);
});



// Optional / Not Neccesary
// For Security Sake
const xss = require('xss-clean');



// Optional
// Limit number of requests from an endpoint
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

app.use(limiter);

// Optional
// Helmet is also a security Helmet !
app.use(helmet());

app.use(morgan('dev'));

// Neccessary for parsing the requst body - no body exists here !
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}   ));
app.use(bodyparser.json({limit: '50mb'}));

// Optional
app.use(mongoSanitize())

// Trying to be safe against XSS attacks!
app.use(xss());




// We use Model/Route-Controller Api architecture - And the View is the Front-End
//Adding Routes 
const excelroutes = require('./api/routes/excels');
// More routes can easily added ... (authentication , ...)



//Routing requests to the router 
app.use('/excels' , excelroutesex);



// if reaches here there isn't a matching existing url
app.use((req , res , next)=>{
    const error = new Error("url not found");
    error.status = 404;
    next(error);
});

app.use((error , req , res , next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});


module.exports = app;