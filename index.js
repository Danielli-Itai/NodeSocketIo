var APP_PORT = process.env.PORT || 80;
//var app = require('express')();
var express = require('express');
var app = express();
var http = require('http').Server(app);

//http.listen(APP_PORT, function(){
//  console.log('listening on *:' + APP_PORT);
//});
app.listen(APP_PORT, function(){
  console.log("Listening" + APP_PORT);
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});





var SOC_PORT = process.env.PORT || 3000;
var app_io = require('express')();
var http_io = require('http').Server(app_io);
http_io.listen(SOC_PORT, function(){
  console.log('listening on *:' + SOC_PORT);
});

var io = require('socket.io')(http_io);
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('chat message', msg);
    if('Hello From client'!=msg){
      io.emit('chat message', msg);
    }
  });
  setInterval(function(){
    io.emit('chat message', 'Hello From server');
  }, 3000);
});


