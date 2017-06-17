/* reference socket.IO library */
var socket = io();

/* testing */
// alert('hello from the app.js file');

/* send text message to server */
$('form').submit(function () {
  var text = $('#initials').val() + ' says: ' + $('#message').val();
  socket.emit('message', text);  // emit (send) text message to server
  $('#message').val('');  // clear input for next message
  return false;
});

socket.on('message', function (msg) {
  $('<li>').text(msg).appendTo('#history');
});
