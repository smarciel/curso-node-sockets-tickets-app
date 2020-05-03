const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.on('nextTicket', (callback) => {
        callback(ticketControl.nextTicket());
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                err: true,
                message: 'El escritorio es necesario.'
            });
        }

        let ticket = ticketControl.attendTicket(data.desktop);
        callback(ticket);

        //emitir ultimos 4
        client.broadcast.emit('lastFourTickets', ticketControl.getLastFourTicket());
    });

    client.emit('currentState', {
        'current': ticketControl.getLastTicket(),
        'lastFourTickets': ticketControl.getLastFourTicket()
    });
});