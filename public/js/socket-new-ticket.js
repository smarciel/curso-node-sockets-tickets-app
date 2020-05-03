var socket = io();
var label = $('#lblNuevoTicket');

// escuchar
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos la conexión con el servidor');
});

socket.on('currentState', function(lastTicket) {
    label.text(lastTicket.current);
    console.log('Último ticket:', lastTicket.current);
});

$('button').on('click', function() {
    console.log('click');
    socket.emit('nextTicket', function(nextTicket) {
        console.log('El siguiente ticket es: ', nextTicket);
        label.text(nextTicket);
    });
});