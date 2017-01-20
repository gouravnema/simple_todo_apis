var router = require('express').Router();
var todoModel = require('../db/models/todo');
var appModel = require('../db/models/app');
var ObjectId = require('mongoose').Types.ObjectId;

router.get("/:appId/:id",function(req,res){
  // get function
  var id = req.params.id;
  todoModel.findOne({_id:ObjectId(id), appId:ObjectId(req.params.appId), deleted:false},(err,todo)=>{
    if(err){
      return res.status(500).send({"failed":"failed to fetch"});
    }
    if(todo == null){
      return res.status(404).send({"error":"not found"});
    }
    return res.json(todo);
  });
});

router.get("/:appId",function(req,res){
  // index/search function
  var appId = req.params.appId;
  todoModel.find({deleted:false, appId:ObjectId(req.params.appId)},(err,todo)=>{
    if(err){
      return res.status(500).send({"failed":"failed to fetch"});
    }
    return res.json(todo);
  });
});


router.post("/:appId",function(req,res){
  //create function
  var data  = req.body;
  var appId = ObjectId(req.params.appId);
  console.log(appId);
  appModel.findOne({_id:appId, deleted:false},(err,app)=>{
      if(app==null){
        return res.status(404).json({error:"app do not exist"});
      }
      var todo = new todoModel();
      todo.status = "NEW";
      todo.note = data.note;
      todo.appId = app.id;
      todo.deleted = false;
      todo.save((err)=>{
        if(err){
          return res.status(500).send({"failed":"failed to save"});
        }
        return res.json(todo);
      });
  });
});

router.put("/:appId/:id/done",function(req,res){
  var data  = req.body;
  var appId = ObjectId(req.params.appId);
  var id = ObjectId(req.params.id);
  todoModel.findOne({_id:id, appId:appId, deleted:false},(err,todo)=>{
      if(todo==null){
        return res.status(404).json({error:"todo note do not exist"});
      }
      todo.status = "DONE";
      todo.save((err)=>{
        if(err){
          return res.status(500).send({"failed":"failed to save"});
        }
        return res.json(todo);
      });
  });
});

router.delete("/:appId/:id",function(req,res){
  //delete function
  var id = req.params.id;
  var appId = ObjectId(req.params.appId);

  todoModel.findOne({_id:ObjectId(id),appId:appId,deleted:false},(err,todo)=>{
    if(err){
      return res.status(500).send({"failed":"failed to fetch"});
    }
    if(todo == null){
      return res.status(404).send({"error":"not found"});
    }
    todo.delete();
    return res.json(todo);
  });
});

module.exports = router;
