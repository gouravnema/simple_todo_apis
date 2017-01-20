var mongoose = require('../connection');
var Schema = mongoose.Schema;

var AppSchema = new Schema({
  status:  String,
  secret : String,
  date: { type: Date, default: Date.now },
  deleted: Boolean
});

AppSchema.method('toJSON', function() {
  var app = this.toObject();
  delete app.__v;
  delete app.deleted;
  return app;
});

AppSchema.method('delete', function() {
  var app = this.toObject();
  this.deleted = true;
  return this.save().then((r)=>{
    return r;
  });
});

module.exports =  mongoose.model('App', AppSchema);
