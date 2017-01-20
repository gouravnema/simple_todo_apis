var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');

//app setup
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
//end app setup


module.exports = app;
