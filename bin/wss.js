var wss = {
  conns:[],
  wsServer : function(server) {
    self = this;
    var url = require('url')
    var WebSocketServer = require('ws').Server;
    var wss = new WebSocketServer({
      server: server
    });

    wss.on('connection', function connection(ws) {
      var location = url.parse(ws.upgradeReq.url, true);

      // you might use location.query.access_token to authenticate or share sessions
      // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
      ws.on("close", function() {
        console.log("i am dead");
        if (ws.my_sess_id) {
          console.log(ws.my_sess_id);
          delete self.conns[location.query.access_token];
        }
      });

      if (!location.query.access_token) {
        ws.send("terminate");
        ws.close(1008, "access denied");
      } else {
        ws.my_sess_id = location.query.access_token;
        self.conns[location.query.access_token] = ws;
        ws.on('message', function incoming(message) {
          console.log('received: %s', message);
        });
      }
    });
  },
  broadcast: function(message,id){
    self = this;
    if(!id){
      for(c in self.conns){
        self.conns[c].send(message)
      }
    }
    else{
      if(self.conns[id]){
        self.conns[id].send(message);
      }
    }
  }
}
module.exports = wss;
