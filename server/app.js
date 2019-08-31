// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var port = process.env.PORT || 2999;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

var numUsers = 0;

io.on('connection', (socket) => {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    var result = sentiment.analyze(data);
    console.log("New Message", data);
    // we tell the client to execute 'new message'
    socket.emit('new message', {
      username: socket.username,
      message: data,
      score: result,
      time: new Date(),
      id: socket.id
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    console.log("Add User", username);
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', (data) => {
    var result = sentiment.analyze(data);
    console.log("Typing", data, result);
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    var result = sentiment.analyze(data);
    console.log("Stop Typing", data, result);
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    console.log("Disconnected");
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
