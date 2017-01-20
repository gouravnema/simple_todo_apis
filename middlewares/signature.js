var deviceModel = require('../models/device');
var userModel = require('../models/users');
var signature  = require('../lib/signature');

/*middleware to validate signature and find out the registered user for the  api request
this will take app id from the req along with user info and then
  1. validate signatue
  2. attach user info to req.
  3. if req is found to be invalid it will return response with appropriate error
*/
var ACTIVATE_SIGNATURE_CKECK = true; //make it false to un-armed signature checkes;
var COUNTER_MAX_TOLERANCE = 3;

var signatureMiddleWare = function(req,res,next){
  var a = validateRequestStructure(req,res);
  if(a){
     processRequest(req,res,next);
  }
}


var validateRequestStructure = function(req, res){
  var data = req.body;
  var keys = ["app_id", "signature", "signed"];
  for(keyIndex in keys){
      if(!(keys[keyIndex] in req.body)){
        console.error("Error : Request is not valid, SIGNATURE middleware line 27");
        res.status(400).send(JSON.stringify(keys[keyIndex] + " is not defined"));
        return false;
      }
  }
  return true;
}



var processRequest = function(req,res,next){
  var appId = req.body.app_id;
  var signed = req.body.signed;
  var signature = req.body.signature;
  deviceModel.findByAppKey(appId,function(devices){
      if(!devices || devices.length < 1 ){
        console.error("Error : there is no device , SIGNATURE middleware line 42");
        res.status(404).send('{"error":"App is not active or do not exist"}');
        return;
      }
      device = devices[0]
      var secret =  device.secret;
      var user = device.user;
      var status = device.status;
      var counter = device.hotp_counter;
      if(status != 'ACTIVE'){
        console.error("Error : App is not Active Signature Middleware line 52");
        res.status(404).send('{"error":"App is not active or do not exist"}');
        return;
      }else{
        if(!signatureValidation(req,secret,counter)){
          console.error("Error : signature MISMATCH , SIGNATURE middleware line 57");
          res.status(401).send('{"error":"SIGNATURE MISMATCH"}');
        }
        else{
          userModel.findId(user,function(user){
            req.user = user;
            console.log("Calling next from Signature Middleware");
            next();
          });
        }
      }

  });
};


var signatureValidation = function(req,secret,counter){
  var sentSignature = req.body.signature;
  var appKey = req.body.app_key;
  req.body.signed = req.body.signed.split(/,/);

  if(!ACTIVATE_SIGNATURE_CKECK){
    return true;
  }
  signature.init(secret);
   for(var i = counter; i <= (counter + COUNTER_MAX_TOLERANCE); i++){
     var generatedSignature = signature.generateHOTPToken(req.body,i);
     console.log("COUNTER : " + i +"\tSENT SIGNATURE : "+sentSignature +"\tGENERATED SIGNATURE : "+generatedSignature+"\n");
     if(sentSignature == generatedSignature){
       var incFactor = (i - counter)+1;
       deviceModel.incrementHotpCounter(appKey,incFactor,function(r){});
       return true;
     }
   }

  return false;
}



module.exports = signatureMiddleWare;
