var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo');
mongoose.Promise = global.Promise;
module.exports = mongoose;
