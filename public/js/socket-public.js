var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('currentState', function(data) {
    console.log(data);
    updateHTML(data.lastFourTickets);
});

socket.on('lastFourTickets', function(lastFourTickets) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateHTML(lastFourTickets);
});

function updateHTML(lastFourTickets) {
    for (var i = 0; i < lastFourTickets.length; i++) {
        lblTickets[i].text('Ticket ' + lastFourTickets[i].num);
        lblEscritorios[i].text('Escritorio ' + lastFourTickets[i].desktop);
    }
}