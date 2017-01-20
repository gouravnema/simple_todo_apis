//////////////////////// MODULES////////////////////////
var app = require('express')();
// var logger = require('morgan')
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var path = require('path');
// var config = require('./setup/config');

app.use("/api",require('./app_modules/todo/init').boot());


app.set('port',3003);
app.set('ip','0.0.0.0');

module.exports = app;
