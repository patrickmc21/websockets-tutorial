// const socket = io();

let user = 'Anonymous';

$('.name-field').submit((e) => {
  e.preventDefault();
  user = $('#name').val();
  $('.name-field').addClass('hidden')
  $('.user-name').text(`Hello, ${user}`);
  $('.user-name').removeClass('hidden');
})

$(() => {
  const socket = io();
  $('.msg').submit((e) => {
    $('#messages').append(`<li>You: ${$('#m').val()}</li>`)
    socket.emit('chat message', {user: user, text: $('#m').val()});
    $('#m').val('');
    return false
  });
  socket.on('chat message', (msg) => {
    if (msg.user !== user) {
      $('#messages').append(`<li>${msg.user}: ${msg.text}</li>`)
    }
  })
});