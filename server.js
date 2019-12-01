const http = require('http');
const dotenv = require('dotenv');

// Add .env content to process.env
const result = dotenv.config()

if(result.error){
	throw result.error
}


// app => Reqest Listener
const app = require('./app')

// Create a HTTP Server
const server = http.createServer(app);

server.listen(process.env.PORT);