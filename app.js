

//this is the code where the security https example works


var fs = require("fs");
var express = require("express");
var https = require('https');
var http = require('http');



/////////////////first block of code added from adding
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('mongoose');
var config = require('./config/');
var express = require('express');
var bodyParser = require('body-parser');
//create routing object

var contact = require('./api/contacts/index');
var comment = require('./api/comment/index');
var restaurant_review = require('./api/restaurant_review/index');




/////////////////end of first block





///////////////
/////////////////////////////////////////////
//maybe change listen on 8081 to listen on 3102
var HTTP_PORT = 3102;
//var HTTP_PORT = 8081;
var HTTPS_PORT = 3101;

/////////////////////////////////////////////

var app = express();


////////////////


///////////////////////////////////start of second block of code
mongoose.connect(config.mongo.uri, config.mongo.options);

//configure the express app to parse JSON-formatted body
app.use(bodyParser.json());

//add static path.
app.use(express.static(config.root));
console.log(config.root);

//Add routes for contacts api
app.get('/api/contacts',contact.index);
app.post('/api/contacts',contact.create);
app.put('/api/contacts/:id',contact.update);
app.delete('/api/contacts/:id',contact.delete);


//Add routes for comments api
app.get('/api/comment',comment.index);
app.post('/api/comment',comment.create);
app.put('/api/comment/:id',comment.update);
app.delete('/api/comment/:id',comment.delete);


//Add routes for restaurant_review api
/*
app.get('/api/restaurant_review',comment.index);
app.post('/api/restaurant_review',comment.create);
app.put('/api/restaurant_review/:id',comment.update);
app.delete('/api/restaurant_review/:id',comment.delete);
*/

//Add routes for restaurant_review api

app.get('/api/restaurant_review',restaurant_review.index);
app.post('/api/restaurant_review',restaurant_review.create);
app.put('/api/restaurant_review/:id',restaurant_review.update);
app.delete('/api/restaurant_review/:id',restaurant_review.delete);



////////////////////////////////////////end of second block of code


///////////////////////////////////////start of third block of code

// Listen on port 8000, IP defaults to 127.0.0.1
app.listen(config.port)

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");


///////////////////////////////////////end of third block of code







// Route all Traffic to Secure Server
// Order is important (this should be the first route)
app.all('*', function(req, res, next){
  if (req.secure) {
    return next();
  };
  res.redirect('https://localhost:'+HTTPS_PORT+req.url);
  // res.redirect('https://'+req.hostname+':'+HTTPS_PORT+req.url);
});

// Hello World
app.get('/', function (req, res) {
  res.send('Hello World!');
});

/////////////////////////////////////////////
// Setup Servers

// HTTPS
var secureServer = https.createServer({
    key: fs.readFileSync('keys/private.key'),
    cert: fs.readFileSync('keys/certificate.pem')
  }, app)
  .listen(HTTPS_PORT, function () {
    console.log('Secure Server listening on port ' + HTTPS_PORT);
});

var insecureServer = http.createServer(app).listen(HTTP_PORT, function() {
  console.log('Insecure Server listening on port ' + HTTP_PORT);
})
