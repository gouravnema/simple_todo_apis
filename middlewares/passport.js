var authentication = function(router,callback){
  var passport = require('passport');
  var googleOAuth = require('passport-google-oauth').OAuth2Strategy;
  var localAuth = require('passport-local');
  var userModel = require('../models/users');
  var config = require('../setup/config');

  //// PASSPORT ////
  router.use(passport.initialize());
  router.use(passport.session());
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  /// AUTH /////

  passport.use(new localAuth((username,password,done)=>{
    return done(null,data);
  }));

  passport.use(new googleOAuth({
    clientID: config.GOOGLE_CLIENT_KEY,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_REDIRECT_URL
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    var data;
    process.nextTick(function() {
      email = profile.emails[0].value;
      img = profile.photos[0].value;
      userModel.findByEmail(email,function(result){
        if(result.length > 0){
          data = result[0];
          data.img = img;
          if(typeof(callback)=="function")callback();
          return done(null, data);
        }
        else{
          data = profile;
          return done(null, data);
        }
      });
      //adds user data to session here in second params of this function
    });
  }
));
}

module.exports = authentication;
