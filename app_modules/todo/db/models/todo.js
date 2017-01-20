var mongoose = require('../connection');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  status:  String,
  appId: Schema.Types.ObjectId,
  date: { type: Date, default: Date.now },
  deleted: Boolean,
  note: String
});

TodoSchema.method('toJSON', function() {
  var todo = this.toObject();
  delete todo.__v;
  delete todo.deleted;
  return todo;
});

TodoSchema.method('delete', function() {
  var todo = this.toObject();
  this.status = "DELETED";
  this.deleted = true;
  return this.save().then((r)=>{
    return r;
  });
});

module.exports =  mongoose.model('Todo', TodoSchema);
