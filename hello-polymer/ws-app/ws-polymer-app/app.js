var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));


app.ws('/', function(ws,req){
  ws.on('message', function(msg){
    console.log("Server Received Message : " + msg)
    ws.send(msg);
  })
});


var port = process.env.PORT || 8000;
app.listen(port);

console.log('\n\n HTTP server started at port : ' + port + ' !!')