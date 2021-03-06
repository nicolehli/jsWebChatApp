/* testing */
// console.log('hello from our node script!');

/* Basic express server set up - loading external modules */
var express = require('express');
var app = express();
var chatHistory = [];

var http = require('http');
var server = http.Server(app);

/* Routing - server all static content from the client folder */
app.use(express.static('client'));

/* using socket.io for bidirectional communicating */
var io = require('socket.io')(server);

io.on('connection', function (socket) {

  // FIXME FIXED bug all user get history, only new user should get history of chat
  if (chatHistory.length != 0) {
    for(var i = 0; i < chatHistory.length; i++)
        //io.emit('message', chatHistory[i]);
        // using socket.emit instead of io.emit to not emit to everyone
        socket.emit('message', chatHistory[i]);
  }

  // tell client we have new messages, this listens and executes
  socket.on('message', function (msg) {
    io.emit('message', msg);
    chatHistory.push(msg);
  });
});


/* server to listen to port 8080 and listen for message */
server.listen(8080, function() {
  console.log('Chat server running');
});
