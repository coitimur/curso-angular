//------------------------------------------//
// Get all requires
//------------------------------------------//
var express  = require('express');
var path = require('path');

//set port for listening
var port = process.env.PORT || 3000;

//create app
var app= express();

//------------------------------------------//
// Set route static contents
//------------------------------------------//
app.use('/',express.static(path.resolve(__dirname, '../client')));


//------------------------------------------//
// launch
//------------------------------------------//
app.listen(port);
console.log('Listening in port ' + port);



