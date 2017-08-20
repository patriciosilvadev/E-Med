$(() => {
    let socket = io.connect('http://localhost:3000');
    let messageForm = $("#messageForm");
    let message = $("#message");
    let chat = $("#chat");



    messageForm.submit(event => {
        // console.log("here!");
        event.preventDefault();
        socket.emit('send message', message.val());

        message.val("");
        return false;
    })

    socket.on('connect', (data) => {
        console.log("we're connected!");
        socket.emit('join', 'Hello World from client');
    });
    socket.on('broad', (data) => {
        $('#chat').html(data);
        socket.emit('join', message.val());
    });
    socket.on('new message', data => {
        console.log(data.msg);

        chat.append('<div class="well">' + data.msg + '</div>')
    })
});