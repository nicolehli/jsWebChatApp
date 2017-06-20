/* testing */
// console.log('hello from our node script!');

/* loading external modules */
var express = require('express');
var app = express();
var chatHistory = [];

var http = require('http');
var server = http.Server(app);

/* server all static content from the client folder */
app.use(express.static('client'));

/* using socket.io for bidirectional communicating */
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('message', function (msg) {
    io.emit('message', msg);
    chatHistory.push(msg);
  });
});


/* server to listen to port 8080 and listen for message */
server.listen(8080, function() {
  console.log('Chat server running');
});
