var router = require('express').Router();
var AppModel = require('../db/models/app');
var ObjectId = require('mongoose').Types.ObjectId;

router.post("/",function(req,res){
  //create function
  var data  = req.body;
  var app = new AppModel();
  app.status = "active";
  app.secret = data.secret;
  app.deleted = false;
  app.save((err)=>{
    if(err){
      return res.status(500).send({"failed":"failed to save"});
    }
    return res.json(app);
  });
});


router.delete("/:id",function(req,res){
  //delete function
  var id = req.params.id;
  AppModel.findOne({_id:ObjectId(id),deleted:false},(err,app)=>{
    if(err){
      return res.status(500).send({"failed":"failed to fetch"});
    }
    if(review == null){
      return res.status(404).send({"error":"not found"});
    }
    app.delete();
    return res.json(app);
  });
});

module.exports = router;
