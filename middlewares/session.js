var session = function(router,callback){
  // affix express session to router
  //////////////////////// MODULES////////////////////////
  var session = require('express-session');
  var MongoDBStore = require('connect-mongodb-session')(session);
  /////////////////////END OF MODULES//////////////////////
  /////////////////////CUSTOM LIBS ////////////////////////
  var keygen = require('../lib/keygen');
  var config = require('../setup/config');

  //////////////////////// SESSION ////////////////////////
  var store = new MongoDBStore({
    uri: config.DB_STRING,
    collection: 'sessions'
  });

  // Catch errors
  store.on('error', function(error) {
    var assert = require('assert');
    assert.ifError(error);
    assert.ok(false);
  });

  router.use(session({
    genid: function(req) {
      return "TAG-SESS-" + keygen.getUCaseNumKeys(20);
    },
    secret: 'SN29Qe5yF3o3Nr-kiCz25tiG0ib5uq_NmRrXQ',
    cookie: {
      maxAge: 1000 * 3600 * 24 * 1 // 1 day
    },
    store: store,
    resave: false,
    saveUninitialized: true
  }));
  ////////////////////////END OF SESSION //////////////////
  if(typeof(callback)=="function")callback();
}

module.exports  = session;
