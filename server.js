const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  io.emit('chat message', {user: 'Moderator', text: 'A new user has connected'})
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    io.emit('chat message', {user: 'Moderator', text: 'A user has disconnected'});
  })
});

http.listen(3000, () => {
  console.log('Chat box up and running on 3000')
})