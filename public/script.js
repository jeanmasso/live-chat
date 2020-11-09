 var socket = io();
 var user = prompt('Your name?', 'Anonymous');
 var userId = user + Date.now();

 socket.on('users connected', users => {
    console.log(users + ' users are connected');
  });

  socket.on('user disconnected', user => {
    console.log(user + ' is disconnected');
  });

  socket.emit('user connected', user);

 socket.on("user typing", function (typing) {
    var userTyping = document.createElement('div');
    userTyping.innerHTML = `
        <p>${typing.user} is typing...<p>
    `;

    document.getElementById('contentMsg').appendChild(userTyping);
});

document
.getElementById('message')
.addEventListener('keyup', function (event) {
    event.preventDefault();

    socket.emit("user typing", {
        user: user,
        typing: true,
    });
    setTimeout

});

 socket.on("chat message", function (msg) {
     var message = document.createElement('li');
     message.innerHTML =`
          <div style="text-align:${msg.id == userId ? 'right' : 'left'}">
            <h5>${msg.name}</h5>
            <p>${msg.message}</p>
            <p>${new Intl.DateTimeFormat('fr', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
              }).format(new Date(msg.date))}</p>
          </div>
          `
        ;

     document.getElementById('contentMsg').appendChild(message);
 });

 document
 .getElementById('message')
 .addEventListener('submit', function (event) {
     event.preventDefault();

     var msg = event.target.message.value;
     socket.emit('chat message', {
         id: userId,
         name: user,
         message: msg,
         date: Date.now(),
     });
 });

 


     

