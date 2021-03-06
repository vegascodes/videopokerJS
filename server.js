/** https://github.com/relloller/videopokerJS **/
var http = require('http');
var assert = require('assert');
var express = require('express');
var compression = require('compression');
var passport = require('passport');
require('./api/config/passport');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = require("./api/model/mongodb.js")
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var api = require('./api/index.js');

var app = express();
app.use(compression());
app.use(morgan('dev'));

//CORS settings for swagger.IO & API documentation
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, x-staff-token, X-Requested-With, Content-Type,Content-Length, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api', api);

process.on('uncaughtException', function (err) {
	//for DEV only. shutdown may be desired in production.
  console.log('uncaughtexception',err);
});

app.listen(process.env.PORT || 8080, function() {
    console.log("videopokerjs server listening on port ", process.env.port || 8080);
});