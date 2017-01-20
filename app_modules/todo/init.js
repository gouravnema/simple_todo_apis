// this module add all the static and public pages to the app
var Todo = function(){

  var self = this;
  var bootstrap = function(app){
      app.use(require('./app_setup'));
      app.use("/app", require('./api/app_crud'));
      app.use("/todo", require('./api/todo_crud'));

  }

  return {
    attach:function(app){
      //attach this module with an existing app
      bootstrap(app);
    },

    boot:function(){
      //bootstrap this module as a self contained app
      //return app
      var app = require("express")();
      bootstrap(app);
      return app
    }
  }
}
module.exports = Todo();
